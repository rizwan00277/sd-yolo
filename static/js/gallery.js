// Video gallery (split tabs, thumbnails, per-video tracking F1) and architecture tabs.
document.addEventListener('DOMContentLoaded', function () {
  const videos = window.VIDEOS || [];
  const player = document.getElementById('player');
  const thumbs = document.getElementById('thumbs');
  const pairs = [['YOLOv8n', 'SD-YOLOv8n', 'v8'], ['YOLO11n', 'SD-YOLO11n', 'y11'], ['YOLO26n', 'SD-YOLO26n', 'y26']];
  const splitName = { test: 'Test video (unseen)', val: 'Validation video (not trained on)', train: 'Training video (seen during training)' };

  function show(v) {
    player.src = 'static/videos/' + v.id + '.mp4';
    player.poster = 'static/posters/' + v.id + '.jpg';
    player.play().catch(function () {});
    document.getElementById('p-title').textContent = v.label;
    document.getElementById('p-meta').textContent =
      splitName[v.split] + ' · ' + v.id + ' · ' + v.res + ' · ' + v.frames + ' frames';
    let rows = '<thead><tr><th>Tracking F1</th><th>baseline</th><th>SD-YOLO</th></tr></thead><tbody>';
    pairs.forEach(function (p) {
      const a = v.f1[p[0]], b = v.f1[p[1]];
      rows += '<tr class="' + p[2] + '"><td>' + p[0] + '</td><td>' + a.toFixed(2) + '</td><td class="' +
        (b > a ? 'up' : b < a ? 'down' : '') + '">' + b.toFixed(2) + '</td></tr>';
    });
    document.getElementById('p-f1').innerHTML = rows + '</tbody>';
    thumbs.querySelectorAll('.thumb').forEach(function (t) { t.classList.toggle('is-active', t.dataset.id === v.id); });
  }

  function load(split) {
    thumbs.innerHTML = '';
    const list = videos.filter(function (v) { return v.split === split; });
    list.forEach(function (v) {
      const b = document.createElement('button');
      b.className = 'thumb';
      b.dataset.id = v.id;
      b.innerHTML = '<img src="static/posters/' + v.id + '.jpg" alt="" loading="lazy"><span>' + v.label + '</span>';
      b.addEventListener('click', function () { show(v); });
      thumbs.appendChild(b);
    });
    if (list.length) show(list[0]);
  }

  document.querySelectorAll('.split-tabs li').forEach(function (li) {
    li.addEventListener('click', function () {
      document.querySelectorAll('.split-tabs li').forEach(function (x) { x.classList.remove('is-active'); });
      li.classList.add('is-active');
      load(li.dataset.split);
    });
  });
  load('test');

  document.querySelectorAll('.arch-tabs li').forEach(function (li) {
    li.addEventListener('click', function () {
      document.querySelectorAll('.arch-tabs li').forEach(function (x) { x.classList.remove('is-active'); });
      document.querySelectorAll('.arch-panel').forEach(function (x) { x.classList.remove('is-active'); });
      li.classList.add('is-active');
      document.getElementById(li.dataset.target).classList.add('is-active');
    });
  });
});
