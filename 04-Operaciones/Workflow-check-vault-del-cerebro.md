---
title: "Workflow check-vault (de este repo)"
tipo: workflow
area: operaciones
parent: "[[Operaciones]]"
date: 2026-10-29
tags: [area/operaciones, workflow]
---

> Padre: [[Operaciones]]

En este repo, `.github/workflows/check-vault.yml` ejecuta `node scripts/check-vault.mjs` en cada PR y en cada push a `main`. Falla si hay frontmatter incompleto, nota sin padre, nota huérfana, enlace roto o algo que parezca un secreto o una URL de base de datos. Ver [[Como-mantener-el-vault]].
