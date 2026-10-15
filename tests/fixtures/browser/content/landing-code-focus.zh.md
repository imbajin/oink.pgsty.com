---
title: 落地页代码键盘访问
description: 落地页代码键盘访问
search_exclude: true
comments: false
layout: landing
outputs: [HTML, print]
sections:
  - type: hero
    data:
      title: 落地页代码键盘访问
  - type: capabilities
    id: capability-code
    data:
      items:
        - title: '[能力区块代码](#capability-code)'
          visual:
            type: code
            title: 能力区块代码
            lines:
              - {prefix: '$ ', text: 'python3 -m http.server 8080 --bind 127.0.0.1 --directory /srv/repo --package-snapshot stable-2026-10-15 --manifest /srv/repo/snapshots/current/verified-package-manifest.json'}
  - type: code-plate
    id: plain-lines
    data:
      title: '[逐行代码面板](#plain-lines)'
      lines:
        - {prefix: '$ ', text: 'python3 -m http.server 8080 --bind 127.0.0.1 --directory /srv/repo --package-snapshot stable-2026-10-15 --manifest /srv/repo/snapshots/current/verified-package-manifest.json'}
  - type: code-plate
    id: highlighted-code
    data:
      title: '[高亮代码面板](#highlighted-code)'
      lang: bash
      code: 'python3 -m http.server 8080 --bind 127.0.0.1 --directory /srv/repo --package-snapshot stable-2026-10-15 --manifest /srv/repo/snapshots/current/verified-package-manifest.json'
---
