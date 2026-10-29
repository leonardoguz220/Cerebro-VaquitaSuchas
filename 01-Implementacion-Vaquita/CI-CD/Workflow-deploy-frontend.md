---
title: "Workflow · deploy-frontend"
tipo: workflow
area: implementacion
parent: "[[CI-CD]]"
date: 2026-10-29
tags: [area/implementacion, workflow, ci, github-actions]
fuente: https://github.com/leonardoguz220/VaquitaSuchas/blob/main/.github/workflows/deploy-frontend.yml
---

> Padre: [[CI-CD]]

Despliegue del frontend a Vercel al cambiar frontend/ en `main`.

Archivo: `.github/workflows/deploy-frontend.yml`. Los secretos solo aparecen por nombre (`secrets.X`); sus valores viven en GitHub y no están aquí. Visión general: [[CI-CD]].

## Comentario del archivo

Despliegue continuo del frontend (Vercel). Corre cuando cambia frontend/ en main, que es la rama de
producción de Vercel. Primero ejecuta las pruebas del frontend (frontend.yml) y solo si pasan pide el
despliegue con un Deploy Hook de Vercel.
Necesita el secreto VERCEL_DEPLOY_HOOK_URL (Vercel > proyecto > Settings > Git > Deploy Hooks, rama main).
Sin él, se omite el despliegue sin fallar. Vercel además despliega por su cuenta cada push; el hook solo
garantiza que el despliegue ocurra después de las pruebas.

## Contenido

```yaml
# Despliegue continuo del frontend (Vercel). Corre cuando cambia frontend/ en main, que es la rama de
# producción de Vercel. Primero ejecuta las pruebas del frontend (frontend.yml) y solo si pasan pide el
# despliegue con un Deploy Hook de Vercel.
# Necesita el secreto VERCEL_DEPLOY_HOOK_URL (Vercel > proyecto > Settings > Git > Deploy Hooks, rama main).
# Sin él, se omite el despliegue sin fallar. Vercel además despliega por su cuenta cada push; el hook solo
# garantiza que el despliegue ocurra después de las pruebas.
name: Deploy frontend

on:
  push:
    branches: [main]
    paths: ['frontend/**', '.github/workflows/deploy-frontend.yml']
  workflow_dispatch:

permissions:
  contents: read

concurrency:
  group: deploy-frontend
  cancel-in-progress: false

jobs:
  test:
    name: pruebas del frontend
    uses: ./.github/workflows/frontend.yml

  deploy:
    name: desplegar en Vercel
    needs: test
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
      - name: Pedir el despliegue a Vercel
        env:
          HOOK: ${{ secrets.VERCEL_DEPLOY_HOOK_URL }}
        run: |
          if [ -z "$HOOK" ]; then
            echo "Falta el secreto VERCEL_DEPLOY_HOOK_URL: se omite el despliegue."
            exit 0
          fi
          curl -fsS -X POST "$HOOK" > /dev/null
          echo "Despliegue solicitado a Vercel."
```
