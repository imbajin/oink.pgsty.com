---
title: Expo layout contract
linkTitle: Expo
description: Resource albums, three image layouts, original-size viewing, native shell integration, and static output contracts.
weight: 45
icon: fa-solid fa-images
contract_status: unreleased
---

> [!NOTE] Unreleased implementation
> This contract describes the local Expo implementation intended for OINK 1.3.
> It is not included in the published v1.2.0 module.

## Content and navigation {#content-and-navigation}

`type: expo` selects an image-album layout. Put `cascade: {type: expo}` on an
album section. One leaf bundle needs only `index.md` and an `images/` directory;
no per-image Markdown or YAML file is needed. Optional image metadata belongs
in the album front matter. Sections list child albums. Navigation uses the ordinary shell tree, including nested
sections, mobile drawer, appearance controls, and the selected language.
Expo defaults to full page width and no table of contents. Explicit page
`page_width` still applies. The existing `gallery` fence remains an inline component.

```yaml
title: Field notes
type: expo
expo:
  images: images/*
  mode: wall
  size: 240
resources:
  - src: images/fern.jpg
    title: Fern
    params:
      id: fern
      alt: A fern frond seen from above
      caption: A study of branching forms.
      byline: Example author
      weight: 10
      original: originals/fern.jpg
```

`expo` overrides the `params.ui.expo` map. Omitted fields use the resolver's
defaults: resource glob `images/*`, mode `wall`, target size `240` CSS pixels.
Allowed modes are `wall`, `cards`, `seamless`; size is an integer from 160 to 360.
Invalid author input warns and falls back. Warning-fatal publishing rejects it.

`expo/items.html` owns image selection and metadata for every output. It uses
Hugo's native resource metadata and the shared media-result contract. Non-image
resources are excluded. An optional `original` must resolve to a bundled image;
no remote source is fetched. GIF originals play without being converted to stills.
Local processable stills larger than 960 pixels receive bounded WebP previews.
GIF posters are available for reduced motion and pause. Originals remain intact.

Images sort by numeric `params.weight`, then the resource collection's name
order for ties. Omitted weight is zero. Titles fall back to the filename;
alt text falls back to the title. Captions and bylines are plain text.
Optional IDs use ASCII letters, digits, underscores and hyphens, and become
`img-<id>` anchors. Missing IDs use a stable filename hash; renaming that file
changes the hash. Invalid or repeated IDs warn. Large collections are split
into authored album volumes; there is no automatic resource pagination.

## Layout and controls {#layout-and-controls}

Wall uses justified rows with six-pixel gaps. Seamless uses the same geometry
with zero gaps. Cards use masonry columns with visible captions. Extreme aspect
ratios use bounded, contained previews; originals are never cropped or modified.
The toolbar contains a three-cell radio group on a shared background, followed
by the play/pause button and an always-visible horizontal size slider between
small and large image icons. Controls share one vertical center. Albums without
GIFs retain a disabled play button so the row stays stable. Accessible names,
tooltips and keyboard focus are localized. Appearance remains in the shared
navigation; the album body has neither an appearance picker nor a page-action
menu. Without JavaScript, static image links and captions remain.

Expo reserves stable document scrollbar space where scrollbars consume layout
width. Albums near the viewport height must settle without repeated reflow, and
opening or closing the viewer must preserve the underlying grid's usable width.

The reader's mode and size choices persist across albums and reloads on the same
origin, independently of the appearance preset. `td-expo-mode` and `td-expo-size`
store only allowlisted values. A valid stored choice takes precedence over author
defaults; invalid or unavailable storage falls back without breaking the album.

GIFs play by default in the lazy-loaded grid and viewer. A pause/play icon controls
animation. `prefers-reduced-motion: reduce` starts with posters; a reader can
explicitly play them. Paper, Slate, Ink, Terminal and both modes use existing
shell colors, typography and radius tokens. No Expo-specific appearance preset
or additional third-party lightbox is introduced.

## Viewer behavior {#viewer-behavior}

A native modal dialog opens an album image. Default scale is
`min(1, viewportWidth/imageWidth, viewportHeight/imageHeight)`: small images
stay at 100%, large images shrink to fit. Expand uses
`min(viewportWidth/imageWidth, viewportHeight/imageHeight)`: it may enlarge a
small image, but always uses the stricter edge so neither dimension overflows.
Fit and expand have no image-stage scrollbars. Only manual zoom can exceed the
stage and enable scrolling. The underlying page cannot scroll while the viewer
is open. Plus/minus buttons adjust scale
by 1.25; reset restores the initial fit. The percentage reports source pixels
as CSS pixels. Zoom preserves the viewed center; changing images resets scale.

The viewer provides icon links to the original file and the image's stable
location in the album. Locating closes the viewer, scrolls to the image and
returns focus to its trigger. Previous/next stay within the album. Escape closes
and restores focus; arrows change images when horizontal scrolling is unnecessary.
When enlarged horizontally, native arrow scrolling remains available. Hold the
primary mouse button and drag an enlarged image to pan; the image follows the
pointer and stops at its bounds. Touch retains native scrolling. Releasing or
canceling the drag, switching images, resetting, or leaving the window ends panning.

Keyboard shortcuts apply only inside the open viewer and ignore text entry,
composition and Ctrl/Command/Alt combinations. Button tooltips expose their keys.

| Keys | Action |
| --- | --- |
| W / A / S / D | Move the enlarged image up / left / down / right, 80 CSS pixels per press |
| Q / H, E / L | Previous image, next image; boundaries preserve the current view |
| J / −, K / + | Zoom out, zoom in by 1.25 |
| R / 0 | Restore original-size fit and center |
| F | Expand to the available stage using the stricter edge, then center |
| Escape | Close and return focus |

Panning is available only along overflowing axes. Reset and navigation clear the
previous position. F uses the same fit-to-stage action as the expand icon; the
browser's fullscreen state is unchanged. The native dialog supplies focus containment.

The viewer registers with `OinkSurfaceCoordinator`: opening it closes other
floating surfaces, and `closeOthers()` or `closeAll()` can close it. A handoff
keeps focus in the newly opened surface.

The Expo sequence and zoom runtime is loaded only for HTML albums with images.
Inline Image Zoom retains its existing single-image behavior. Expo image links
are not rewrapped by that runtime. No-JS and unsupported-dialog browsers follow
the original image links normally.

## Other outputs {#other-outputs}

Print stacks poster images, titles, captions, bylines and original links, with no
Expo runtime. Markdown and LLMSFULL serialize image links and metadata from the
same resource resolver. LLMS lists album pages through the existing index. RSS
uses static image descriptions. Normal HTML printing expands the album and hides
controls. Content translations remain the author's responsibility; the icon
names are included in all 32 interface catalogs.

## Acceptance and release boundary {#acceptance-and-release-boundary}

The focused theme owner is `python3 bin/check-expo.py`; geometry is covered by
`node --test tests/js/expo-geometry.test.js`. Schema projections are checked by
`python3 bin/generate-config-schema.py --check`. Public examples live at
[Expo](/expo/), with bilingual pages. Browser and accessibility tests belong to
`tests/browser/expo.spec.mjs` in the documentation site. `expo-stability.spec.mjs`
also enables width-consuming scrollbars independently of the host preference and
samples consecutive frames at the viewport-height boundary. The optional
`npm run test:expo:engines` gate checks Chromium, Firefox and WebKit when their
Playwright browsers are installed; use the same local module replacement. The Graph copy remains
an additional large real-content experiment, not the integration authority.

Local builds and regression results do not publish this feature. A future
release still requires a version decision, tag/module acceptance, downstream
adoption and deployment as separate steps.
