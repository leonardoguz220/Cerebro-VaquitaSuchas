---
title: "Workflow · frontend"
tipo: workflow
area: implementacion
parent: "[[CI-CD]]"
date: 2026-10-29
tags: [area/implementacion, workflow, ci, github-actions]
fuente: https://github.com/leonardoguz220/VaquitaSuchas/blob/main/.github/workflows/frontend.yml
---

> Padre: [[CI-CD]]

Pruebas del frontend por carpeta; reutilizable por el despliegue.

Archivo: `.github/workflows/frontend.yml`. Los secretos solo aparecen por nombre (`secrets.X`); sus valores viven en GitHub y no están aquí. Visión general: [[CI-CD]].

## Comentario del archivo

Workflow del frontend (monorepo: una carpeta, un workflow). Corre solo si cambia frontend/.
Complementa a ci.yml, que sigue siendo el que exigen las reglas de rama.

## Contenido

```yaml
# Workflow del frontend (monorepo: una carpeta, un workflow). Corre solo si cambia frontend/.
# Complementa a ci.yml, que sigue siendo el que exigen las reglas de rama.
name: Frontend

on:
  # Lo reutiliza deploy-frontend.yml: prueba antes de pedir el despliegue.
  workflow_call:
  pull_request:
    branches: [main, qa, dev]
    paths: ['frontend/**', 'package.json', 'package-lock.json', '.github/workflows/frontend.yml']
  push:
    branches: [main]
    paths: ['frontend/**', 'package.json', 'package-lock.json', '.github/workflows/frontend.yml']

permissions:
  contents: read

concurrency:
  group: frontend-${{ github.ref }}
  cancel-in-progress: true

jobs:
  frontend:
    name: frontend (lint, build, test)
    runs-on: ubuntu-latest
    timeout-minutes: 15
    env:
      CI: 'true'
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
          cache: npm

      - name: Instalar dependencias
        run: npm ci

      - name: Lint (ESLint, Prettier y tsc)
        run: npm run lint -w frontend

      - name: Build
        run: npm run build -w frontend

      - name: Pruebas
        run: npm run test -w frontend
```
