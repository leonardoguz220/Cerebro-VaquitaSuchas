---
title: "Flujo de ramas dev → qa → main"
tipo: runbook
area: operaciones
parent: "[[Operaciones]]"
date: 2026-10-29
tags: [area/operaciones, runbook, git]
fuente: https://github.com/leonardoguz220/VaquitaSuchas/blob/main/CONTRIBUTING.md
---

> Padre: [[Operaciones]]

## Reglas

- Ramas permanentes `dev` (por defecto), `qa` y `main`; nadie hace push directo.
- Las ramas de trabajo salen de `dev` y vuelven a `dev` por PR (squash). Nombres: `spec/NNN-nombre`, `bd|be|fe/NNN-tX-desc`.
- `dev → qa` y `qa → main` con merge commit para que las ramas no se desfasen.
- **Nunca** se fusiona `main` ni `qa` hacia `dev`; los arreglos van a `dev` y suben por promoción.
- El check `flow` lo impone ([[Workflow-branch-flow]]) junto con `lint`, `build`, `test-*` y `gitleaks` ([[Workflow-ci]]).
- Sin aprobación humana obligatoria (decisión del 2026-10-18): auto-merge ([[Workflow-auto-merge]]). Cambios a `CLAUDE.md`, constitución o specs aprobadas requieren la conformidad de las tres personas por escrito en el PR.
- Commits en inglés, Conventional Commits con tarea: `feat(002): add receipt upload [T3]`.
- Hooks de Claude Code bloquean push a ramas protegidas, forzado y `--no-verify` ([[Hooks]]).

Ver [[Desarrollo-por-tarea]].
