# SD-YOLO: Cross-Generation Small-Drone Detection with Compact YOLO Modules

**Project page:** https://rizwan00277.github.io/sd-yolo/

Lightweight modules for small-drone detection are usually tested on one YOLO release with
frame-level splits. This project applies one stage-wise modification path (a stride-4 P2 head,
then attention, downsampling and neck modules chosen on validation) to **YOLOv8n, YOLO11n and
YOLO26n** under a single video-disjoint protocol on the Drone-vs-Bird videos
(76 videos, 46 unseen test videos, 73.3% of drones smaller than 32×32 px).

**Highlights**

- Selected on validation only, **P2 + ELA + ADown** raises test mAP50–95 of YOLO11n and YOLO26n
  by **26%** and **35%** and AP_small by **44%** and **60%** (Holm-corrected p ≤ 0.037),
  with 11–12% fewer parameters.
- The exploratory best-on-test variants (SD-YOLOv8n, SD-YOLO11n, SD-YOLO26n) reach up to
  **48%** higher mAP50–95.
- Module effects depend on the generation: P2 is the only module that raises mean AP_small in
  all three, so lightweight modules should be re-validated for each YOLO release.

The page shows tracking videos, results tables, analysis figures and architecture diagrams.
The paper is under review; the paper link and code will be added after publication.

**Authors:** Muhammad Rizwan, Abdul Rehman Khan, Muhammad Muzaffar Khan, Sibghat Ullah,
Muhammad Ishfaq Hussain, Waqas Ahmed, Moongu Jeon, Asifullah Khan
(PIEAS, Islamabad · CUHK · GIST).

Page built on the [Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template).
