---
title: "CI/CD (GitHub Actions)"
tipo: hub
area: implementacion
parent: "[[Implementacion-Vaquita]]"
date: 2026-10-29
tags: [area/implementacion, hub]
related: ["[[Despliegue]]", "[[Operaciones]]"]
---

> Padre: [[Implementacion-Vaquita]]

# CI/CD

Flujo obligatorio: trabajo → `dev` → `qa` → `main` ([[Flujo-de-ramas]]). Checks requeridos en las ramas: `flow`, `lint`, `build`, `test-backend`, `test-frontend`, `test-database` y `gitleaks`. Los PR a `dev` se fusionan con squash y los de promoción con merge commit; no se hace push directo a ninguna rama protegida.

| Etapa | Workflows |
|---|---|
| Reglas y fusión | [[Workflow-branch-flow]], [[Workflow-auto-merge]] |
| Validación | [[Workflow-ci]], [[Workflow-backend]], [[Workflow-frontend]], [[Workflow-e2e]], [[Workflow-gitleaks-weekly]] |
| Despliegue | [[Workflow-deploy-backend]] (Render, rama `dev`), [[Workflow-deploy-frontend]] (Vercel, rama `main`) |
| Base de datos | [[Workflow-migrate-staging]], [[Workflow-migrate-production]] |
| Tareas programadas | [[Workflow-jobs-tick]] |

Problema conocido: `deploy-backend.yml` y `deploy-frontend.yml` están en `main` pero GitHub no los registra como workflows (404 al despachar); ver [[Estado-actual]]. Dónde corre cada cosa: [[Despliegue]].

## Notas hijas

- [[Workflow-auto-merge]] — Workflow · auto-merge
- [[Workflow-backend]] — Workflow · backend
- [[Workflow-branch-flow]] — Workflow · branch-flow
- [[Workflow-ci]] — Workflow · ci
- [[Workflow-deploy-backend]] — Workflow · deploy-backend
- [[Workflow-deploy-frontend]] — Workflow · deploy-frontend
- [[Workflow-e2e]] — Workflow · e2e
- [[Workflow-frontend]] — Workflow · frontend
- [[Workflow-gitleaks-weekly]] — Workflow · gitleaks-weekly
- [[Workflow-jobs-tick]] — Workflow · jobs-tick
- [[Workflow-migrate-production]] — Workflow · migrate-production
- [[Workflow-migrate-staging]] — Workflow · migrate-staging
