---
title: "Runbook: migrar la base de staging"
tipo: runbook
area: operaciones
parent: "[[Operaciones]]"
date: 2026-10-29
tags: [area/operaciones, runbook, staging]
---

> Padre: [[Operaciones]]

Workflow manual [[Workflow-migrate-staging]]: entorno `staging` de GitHub (con revisor) y secreto `STAGING_DATABASE_URL` = URL externa de la base de Render ([[Render]]). Actions → *Migrate staging* → Run workflow desde `main`; marcar `seed` para sembrar el catálogo. Verificar `https://<servicio>.onrender.com/health`.
