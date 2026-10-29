---
title: "cron-job.org (disparador de tareas)"
tipo: infra
area: despliegue
parent: "[[Despliegue]]"
date: 2026-10-29
tags: [area/despliegue, infra, jobs]
---

> Padre: [[Despliegue]]

# Disparador de tareas

Principal: **cron-job.org** hace `POST /internal/jobs/tick` cada 5 minutos con la cabecera `X-Jobs-Token`. Respaldo: [[Workflow-jobs-tick]] (cada 10 minutos, usa la variable `JOBS_TICK_URL` y el secreto `JOBS_TOKEN`). Qué ejecuta: [[BE-Jobs]].
