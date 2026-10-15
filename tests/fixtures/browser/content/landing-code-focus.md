---
title: Landing code keyboard access
description: Landing code keyboard access
search_exclude: true
comments: false
layout: landing
outputs: [HTML, print]
sections:
  - type: hero
    data:
      title: Landing code keyboard access
  - type: capabilities
    id: capability-code
    data:
      items:
        - title: '[Capability code](#capability-code)'
          visual:
            type: code
            title: Capability code
            lines:
              - {prefix: '$ ', text: 'python3 -m http.server 8080 --bind 127.0.0.1 --directory /srv/repo --package-snapshot stable-2026-10-15 --manifest /srv/repo/snapshots/current/verified-package-manifest.json'}
  - type: code-plate
    id: plain-lines
    data:
      title: '[Plain code plate](#plain-lines)'
      lines:
        - {prefix: '$ ', text: 'python3 -m http.server 8080 --bind 127.0.0.1 --directory /srv/repo --package-snapshot stable-2026-10-15 --manifest /srv/repo/snapshots/current/verified-package-manifest.json'}
  - type: code-plate
    id: highlighted-code
    data:
      title: '[Highlighted code plate](#highlighted-code)'
      lang: bash
      code: 'python3 -m http.server 8080 --bind 127.0.0.1 --directory /srv/repo --package-snapshot stable-2026-10-15 --manifest /srv/repo/snapshots/current/verified-package-manifest.json'
---
