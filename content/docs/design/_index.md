---
title: Design and development
linkTitle: Design
description: OINK maintainer contracts, accepted decisions, dated research, and proposals in one canonical bilingual section.
weight: 70
icon: fa-solid fa-compass-drafting
no_list: true
search_keywords:
  [
    OINK design,
    maintainer contract,
    architecture,
    decision,
    research,
    proposal,
    PRD,
  ]
contract_status: v1.3.0
cascade:
  search_boost: 0.6
  categories: [Design]
---

> [!NOTE] OINK 1.3.0 local candidate
> This contract includes corrections after the unchanged local v1.3.0 tag
> at `6dede1f`. Validate the current sibling checkout for these corrections;
> the prepared module cache still represents that older tag. Public module
> publication and deployment remain separate acceptance steps.
> Since 2026-10-15, development, CI, and release tests use Hugo Extended 0.166.0.
> The baseline advances with stable releases; older Hugo compatibility is no
> longer maintained. See the [toolchain contract](/docs/design/architecture/#hugo-toolchain).

This section is the durable design record for OINK. It complements the
task-oriented guides elsewhere on the site: use those guides to build a site,
and use this section to understand current invariants, the reasons behind them,
the evidence used to evaluate alternatives, and work that is still only a
proposal.

## Reading this section {#reading-this-section}

| Layer     | Meaning                                                              |
| --------- | -------------------------------------------------------------------- |
| Contracts | Normative behavior that compatible implementations must preserve     |
| Decisions | Accepted rationale and boundaries that explain current behavior      |
| Research  | Dated, non-normative evidence that may need to be refreshed          |
| Proposals | Draft PRDs and RFCs; publication here is not proof of implementation |

## Contract map {#contract-map}

| Contract                                      | Authority                                                                                            |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [Architecture](/docs/design/architecture/)    | Build, configuration, diagnostics, localization, featured images, output, security, accessibility, and performance |
| [Components](/docs/design/components/)        | Component API, Book and release primitives, validation, and output degradation                       |
| [Shell and navigation](/docs/design/shell/)   | Navigation, search, blog presentation, actions, taxonomies, and page-end composition                 |
| [Landing pages](/docs/design/landing/)        | Landing data, the 22-section registry, runtime, accessibility, and outputs                           |
| [Migration boundary](/docs/design/migration/) | Supported 0.4-to-current content and configuration migrations                                        |

## Design records {#design-records}

| Collection                           | Contents                                                                          |
| ------------------------------------ | --------------------------------------------------------------------------------- |
| [Decisions](/docs/design/decisions/) | Accepted diagnostic, configuration, authoring, Expo, and CLI rationale                       |
| [Research](/docs/design/research/)   | Goldmark probes, consumer evidence, CLI acceptance, and October theme reviews                             |
| [Proposals](/docs/design/proposals/) | Active PRDs for knowledge graphs, media convergence, visual presets, and the CLI roadmap |

Create every new OINK PRD or RFC as an English and Chinese page pair under
`content/docs/design/proposals/`. Do not create another repository-local
`plan/`, `plans/`, or `proposal/` tree. Once a proposal is accepted, update the
implementation, owning checker, and relevant contract; preserve the stable
rationale under Decisions and retire the draft through Git history and the
changelog.

## Expo contract {#unreleased-contracts}

The [Expo contract](/docs/design/expo/) describes the local image-album layout
candidate. Its [accepted decision](/docs/design/decisions/expo/) records the
content model and the revisions to the earlier Muse experiment. These pages describe the corrected local candidate beyond tag `6dede1f`;
public module publication and deployment remain separate acceptance steps.

## Authority and maintenance {#authority-and-maintenance}

This directory owns the maintainer design prose in English and Chinese. The theme
repository owns executable facts: `hugo.yaml` owns published defaults; owning
resolvers and checkers define optional shapes; `layouts/` and `assets/` own
rendered behavior; check scripts and `tests/goldens/` own validation; and
`VENDOR.json` owns bundled versions, licenses, files, and checksums.

Whenever public behavior changes, update the implementation, its owning
checker, and both language versions of the relevant contract in the same
delivery. Tests should exercise behavior and output rather than pinning prose.
