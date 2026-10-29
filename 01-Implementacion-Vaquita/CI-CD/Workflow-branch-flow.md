---
title: "Workflow · branch-flow"
tipo: workflow
area: cicd
parent: "[[CI-CD]]"
date: 2026-10-29
tags: [area/cicd, workflow, ci, github-actions]
fuente: https://github.com/leonardoguz220/VaquitaSuchas/blob/main/.github/workflows/branch-flow.yml
---

> Padre: [[CI-CD]]

Check `flow`: impone trabajo → dev → qa → main.

Archivo: `.github/workflows/branch-flow.yml`. Los secretos solo aparecen por nombre (`secrets.X`); sus valores viven en GitHub y no están aquí. Visión general: [[CI-CD]].

## Comentario del archivo

Impone el flujo de ramas de CONTRIBUTING.md §5: trabajo -> dev -> qa -> main.
Nada llega a main si no viene de qa, ni a qa si no viene de dev.
El check se llama "flow" y debe ser obligatorio en los reglamentos de dev, qa y main.

## Contenido

```yaml
# Impone el flujo de ramas de CONTRIBUTING.md §5: trabajo -> dev -> qa -> main.
# Nada llega a main si no viene de qa, ni a qa si no viene de dev.
# El check se llama "flow" y debe ser obligatorio en los reglamentos de dev, qa y main.
name: Branch flow

on:
  pull_request:
    types: [opened, reopened, edited, synchronize]
    branches: [main, qa, dev]

permissions:
  contents: read

jobs:
  flow:
    name: flow
    runs-on: ubuntu-latest
    timeout-minutes: 2
    steps:
      - name: Comprobar rama de origen y destino
        env:
          BASE: ${{ github.base_ref }}
          HEAD: ${{ github.head_ref }}
        run: |
          case "$BASE" in
            main)
              [ "$HEAD" = "qa" ] || { echo "::error::A main solo se llega desde qa (origen: $HEAD)."; exit 1; }
              ;;
            qa)
              [ "$HEAD" = "dev" ] || { echo "::error::A qa solo se llega desde dev (origen: $HEAD)."; exit 1; }
              ;;
            dev)
              if [ "$HEAD" = "qa" ] || [ "$HEAD" = "main" ]; then
                echo "::error::A dev no se fusiona qa ni main; el trabajo sale de dev y vuelve a dev."
                exit 1
              fi
              ;;
          esac
          echo "Flujo correcto: $HEAD -> $BASE"
```
