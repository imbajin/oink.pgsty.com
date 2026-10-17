---
title: Landing Markdown 内容
description: 独立渲染的 Markdown 保留代码块标识和内容样式。
search_exclude: true
comments: false
layout: landing
outputs: [HTML, print]
sections:
  - type: hero
    data:
      title: Landing Markdown 内容
  - type: markdown
    id: first-markdown
    data:
      title: 第一段 Markdown
      body: |
        ```text {title="first.txt" collapse="3"}
        first 01
        first 02
        first 03
        first 04
        first 05
        first 06
        first 07
        first 08
        first 09
        first 10
        first 11
        first 12
        ```
  - type: markdown
    id: second-markdown
    data:
      title: 第二段 Markdown
      body: |
        ```text {title="second.txt" collapse="3"}
        second 01
        second 02
        second 03
        second 04
        second 05
        second 06
        second 07
        second 08
        second 09
        second 10
        second 11
        second 12
        ```
---
