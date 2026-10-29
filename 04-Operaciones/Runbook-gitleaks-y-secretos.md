---
title: "Runbook: secretos y escaneo con gitleaks"
tipo: runbook
area: operaciones
parent: "[[Operaciones]]"
date: 2026-10-29
tags: [area/operaciones, runbook, seguridad]
---

> Padre: [[Operaciones]]

Dos capas: el job `gitleaks` del CI revisa los commits nuevos de cada PR ([[Workflow-ci]]) y [[Workflow-gitleaks-weekly]] revisa todo el historial cada lunes. Los hooks bloquean leer archivos con secretos desde la terminal ([[Hooks]]). Las pruebas pueden usar huellas falsas: gitleaks excusa la regla genérica solo en archivos de prueba (PR #206) y se ignoraron 10 huellas de fixtures (PR #196). Si se filtra un secreto: rotarlo en el servicio (por ejemplo Supabase se rotó el 2026-10-27), no solo borrarlo del repo. Reglas: [[Seguridad]].
