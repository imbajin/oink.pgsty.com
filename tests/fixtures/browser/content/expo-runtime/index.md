---
title: Expo runtime fixture
type: expo
resources:
  - src: images/small.png
    title: Small original
    params: {id: small, weight: 1, caption: Small original dimensions are preserved.}
  - src: images/large.png
    title: Large original
    params: {id: large, weight: 2}
  - src: images/long.png
    title: Long original
    params: {id: long, weight: 3}
  - src: images/motion.gif
    title: Animation
    params: {id: motion, weight: 4}
  - src: images/wide.png
    title: Panoramic original
    params: {id: wide, weight: 5}
---

Synthetic raster inputs are generated outside Git by `scripts/prepare-expo-browser.py`.
