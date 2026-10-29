---
title: "Workflow · jobs-tick"
tipo: workflow
area: implementacion
parent: "[[CI-CD]]"
date: 2026-10-29
tags: [area/implementacion, workflow, ci, github-actions]
fuente: https://github.com/leonardoguz220/VaquitaSuchas/blob/main/.github/workflows/jobs-tick.yml
---

> Padre: [[CI-CD]]

Respaldo del disparador de jobs: llama al endpoint de tick cada 10 minutos.

Archivo: `.github/workflows/jobs-tick.yml`. Los secretos solo aparecen por nombre (`secrets.X`); sus valores viven en GitHub y no están aquí. Visión general: [[CI-CD]].

## Comentario del archivo

Respaldo del disparador de tareas programadas (spec 000, T045, RF-000-14).
El disparador principal es cron-job.org; este llama al mismo endpoint cada 10 minutos.
Se desactiva con la variable del repositorio JOBS_TICK_ENABLED = false.
Necesita el secreto JOBS_TOKEN y la variable JOBS_TICK_URL (URL base del servicio, sin barra final).

## Contenido

```yaml
# Respaldo del disparador de tareas programadas (spec 000, T045, RF-000-14).
# El disparador principal es cron-job.org; este llama al mismo endpoint cada 10 minutos.
# Se desactiva con la variable del repositorio JOBS_TICK_ENABLED = false.
# Necesita el secreto JOBS_TOKEN y la variable JOBS_TICK_URL (URL base del servicio, sin barra final).
name: jobs-tick

on:
  schedule:
    - cron: '*/10 * * * *'
  workflow_dispatch:

permissions: {}

jobs:
  tick:
    name: tick
    runs-on: ubuntu-latest
    timeout-minutes: 2
    if: ${{ vars.JOBS_TICK_ENABLED != 'false' && vars.JOBS_TICK_URL != '' }}
    steps:
      - name: Llamar a POST /internal/jobs/tick
        env:
          JOBS_TOKEN: ${{ secrets.JOBS_TOKEN }}
          JOBS_TICK_URL: ${{ vars.JOBS_TICK_URL }}
        run: |
          set -euo pipefail
          curl -fsS --max-time 60 --retry 2 -X POST \
            -H "X-Jobs-Token: ${JOBS_TOKEN}" \
            "${JOBS_TICK_URL}/internal/jobs/tick" > /dev/null
```
