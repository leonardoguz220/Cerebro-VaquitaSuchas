---
title: "Flujo de ramas dev → qa → main"
type: runbook
date: 2026-10-28
tags: [operaciones, git, ci]
related: ["[[Equipo]]"]
fuente: https://github.com/leonardoguz220/VaquitaSuchas/blob/main/CONTRIBUTING.md
---
## Reglas

- Ramas permanentes: `dev` (por defecto), `qa` y `main`. Nadie hace push directo.
- Las ramas de trabajo salen de `dev` y vuelven a `dev` por PR (squash). Nombres: `spec/NNN-nombre`, `bd/NNN-tX-desc`, `be/NNN-tX-desc`, `fe/NNN-tX-desc`.
- Luego `dev → qa` y `qa → main`, ambos con merge commit para que las ramas no se desfasen.
- **Nunca** se fusiona `main` ni `qa` hacia `dev`: los arreglos van a `dev` y suben por promoción.
- El check `flow` (`.github/workflows/branch-flow.yml`) lo impone. Además deben pasar `lint`, `build`, `test-*` y `gitleaks`.
- No hace falta aprobación humana (decisión de los tres, 2026-10-18); se usa auto-merge. Cambios a `CLAUDE.md`, constitución o specs aprobadas requieren la conformidad de las tres personas por escrito en el PR.
- Commits en inglés con Conventional Commits y la tarea: `feat(002): add receipt upload [T3]`.

## Hooks de Claude Code

Bloquean secretos, push a ramas protegidas o forzado, `--no-verify`, editar migraciones ya en `main` y push con lint o tests rotos. Ver [[Hooks-y-subagentes-en-detalle]].
