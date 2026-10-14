---
title: Expo image collections
linkTitle: Expo albums
description: Why Expo uses album bundles, optional resource metadata, shared appearance, and a dedicated image sequence.
weight: 60
icon: fa-solid fa-images
design_kind: decision
design_status: accepted
decision_date: 2026-10-13
aliases: [/docs/design/proposals/muse-gallery/]
---

> [!NOTE] OINK 1.3.0 local tag
> Expo is included in the local v1.3.0 tag. Public module publication and
> deployment are separate acceptance steps.

## Context {#context}

Docs organizes explanations, Blog organizes posts, and Book organizes chapters.
Image collections need albums, a compact overview, and a way to inspect each
original without making every image into a separate article.

The initial Graph collection contains 7,658 originals across 149 album pages.
A separate copy supplied real mixed dimensions, long images, animated GIFs,
captions, and existing image anchors. Per-image content files would increase
authoring work without improving this collection's navigation.

## Decisions {#decisions}

An album is one Hugo leaf bundle: `index.md` plus `images/`. Filenames supply
titles until an author adds native `resources` metadata in the album's front
matter. No separate per-image Markdown, YAML, database, or manifest is required.
This keeps the entry cost small while allowing captions, ordering, attribution,
explicit IDs, and separate originals when needed. Renaming a file changes its
fallback anchor; authors who need lasting citations should provide explicit IDs.

Expo is a layout, independent of Paper, Slate, Ink, Terminal, and light/dark
mode. It reuses the shell's navigation and appearance controls, shared media
results, and existing colors, typography, and shape tokens. The original
`gallery` fence remains useful inside ordinary text pages.

Three radio cells select wall, cards, or seamless display, followed by motion
control and a visible size slider. Reader layout choices persist across albums;
appearance stays in navigation and album pages omit the article action menu.
Icons reduce visible UI text; localized accessible names and
tooltips remain necessary for keyboard and assistive-technology users.

GIFs play by default, following the maintainer's October 13 revision. A pause
control and the system's reduced-motion preference provide a static alternative.
This increases transfer cost for animated albums; images are lazy-loaded, and
authors remain responsible for dividing very large collections into albums.
Automatic resource pagination is outside this version's scope.

The viewer starts at original size, shrinking only to fit the available stage.
Expansion uses the more constrained edge and always contains the whole image;
manual zoom supports inspecting details and scrolling long images. An original link and an album
location link preserve access and citation. Album sequencing belongs to Expo's
conditional runtime, while ordinary Image Zoom keeps its single-image behavior.
The viewer uses a native modal dialog rather than adding a lightbox dependency.
Without JavaScript, original-image links and captions remain usable.

One item resolver supplies HTML, Print, Markdown, LLMSFULL, RSS, and album covers.
Static formats retain image content and metadata without depending on viewer
JavaScript. The cost is maintaining these outputs alongside the visual layout.

## Validation and ownership {#validation-and-ownership}

The theme owns `expo/items.html`, the layout, the conditional runtime,
`check-expo.py`, geometry tests, and generated schema projections. The sibling
site owns [bilingual examples](/expo/), `tests/browser/expo.spec.mjs`, and rendered
desktop/mobile, accessibility, appearance, and output checks.

The copied Graph collection is additional large-content evidence. Its acceptance
checks verified all 7,658 original hashes, stable album anchors, and the unchanged
source tree. Generated output, screenshots, and personal image data remain
outside these source repositories. Local acceptance, a public module tag,
consumer upgrades, and deployment are separate completion states.
