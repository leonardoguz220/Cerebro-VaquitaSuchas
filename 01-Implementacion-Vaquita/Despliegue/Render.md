---
title: "Render (backend y base de datos)"
tipo: infra
area: implementacion
parent: "[[Despliegue]]"
date: 2026-10-29
tags: [area/implementacion, infra, render]
related: ["[[Workflow-deploy-backend]]"]
fuente: https://github.com/leonardoguz220/VaquitaSuchas/blob/main/render.yaml
---

> Padre: [[Despliegue]]

# Render

Blueprint `render.yaml` en la raíz: base `vaquita-staging-db` (PostgreSQL 16, plan gratuito, región Virginia) y servicio web `vaquita-staging-api` (Node 22, plan gratuito, rama `dev`, `autoDeploy`). Healthcheck `/health`. Las migraciones **no** corren al arrancar: se aplican con [[Workflow-migrate-staging]].

Limitaciones del plan gratuito: el servicio se duerme tras 15 minutos sin tráfico (primera petición tarda cerca de un minuto, por eso los plazos cortos se evalúan al consultar, ver [[BE-Jobs]]) y la **base caduca a los 30 días de creada**: hacer `db:dump` antes ([[BD-Herramientas-y-runbook]]).

Variables de entorno relevantes (valores solo en Render): `DATABASE_URL`, `JWT_SECRET`, `FINGERPRINT_KEY`, `JOBS_TOKEN`, `CI_ENCRYPTION_KEY` (32 bytes hex), `FRONTEND_ORIGIN`, `MAIL_MODE`/`MAIL_PROVIDER`, `TELEGRAM_MODE`, `STORAGE_DRIVER`, `JOBS_INPROCESS`.

```yaml
# Staging de Vaquita en Render (spec 000 T047, research R1). Se crea desde el panel con
# New > Blueprint apuntando a este repositorio. Plan gratuito: la base caduca a los 30 días.
# Las migraciones no corren al arrancar: se aplican con el workflow «Migrate staging» (T051).

databases:
  - name: vaquita-staging-db
    plan: free
    region: virginia
    postgresMajorVersion: "16"
    databaseName: vaquita
    user: vaquita

services:
  - type: web
    name: vaquita-staging-api
    runtime: node
    plan: free
    region: virginia
    branch: dev
    # --include=dev: NODE_ENV=production también rige el build y Nest CLI es dependencia de desarrollo.
    buildCommand: npm ci --include=dev --workspace backend --include-workspace-root && npm run build -w backend
    startCommand: npm run start -w backend
    healthCheckPath: /health
    autoDeploy: true
    envVars:
      - key: NODE_VERSION
        value: "22"
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: vaquita-staging-db
          property: connectionString
      - key: JWT_SECRET
        generateValue: true
      - key: FINGERPRINT_KEY
        generateValue: true
      - key: JOBS_TOKEN
        generateValue: true
      # 32 bytes en hexadecimal: se pega a mano (openssl rand -hex 32).
      - key: CI_ENCRYPTION_KEY
        sync: false
      # Hasta T049 y T050: archivos en disco efímero, bot simulado y correo sin proveedor.
      - key: MAIL_MODE
        value: dev
      - key: TELEGRAM_MODE
        value: dev
      - key: STORAGE_DRIVER
        value: local
      - key: JOBS_INPROCESS
        value: "true"
      # URL de Vercel cuando exista (T048).
      - key: FRONTEND_ORIGIN
        sync: false
```
