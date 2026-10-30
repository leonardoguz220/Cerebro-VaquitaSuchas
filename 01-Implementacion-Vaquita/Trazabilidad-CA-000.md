---
title: "Trazabilidad de los criterios de configuración (CA-000-13, 15, 16 y 18)"
tipo: calidad
area: calidad
parent: "[[Calidad-y-Seguridad]]"
date: 2026-10-30
tags: [area/calidad, calidad, spec-000, ca]
related: ["[[Spec-000-setup-del-proyecto]]"]
fuente: https://github.com/leonardoguz220/VaquitaSuchas/database/tests/repo-config.test.ts
---

> Padre: [[Calidad-y-Seguridad]]

# Trazabilidad de CA-000-13, 15, 16 y 18

Estos criterios de la [[Spec-000-setup-del-proyecto]] dependen de configuración de GitHub y no tenían un test que citara su identificador. El PR #277 agregó `database/tests/repo-config.test.ts`, que verifica lo que el repo sí controla (la protección de ramas vive en GitHub):

| Criterio | Qué comprueba el test |
|---|---|
| CA-000-13 | `ci.yml` corre en cada PR a `main`, `qa` y `dev` y declara los jobs `lint`, `build`, `test-database`, `test-backend` y `test-frontend` ([[Workflow-ci]]) |
| CA-000-15 | `branch-flow.yml` define el check `flow` sobre `main`, `qa` y `dev` ([[Workflow-branch-flow]]) |
| CA-000-16 | `backend/.env` y `frontend/.env.local` están ignorados por git y `.env.example` no ([[Seguridad]]) |
| CA-000-18 | `ci.yml` tiene el job `gitleaks` y [[Workflow-gitleaks-weekly]] corre por calendario |

Además, el PR #264 reforzó la prueba de `listings.expire` (RNF-008-03): tras un reporte concurrente, un segundo barrido retoma la publicación que el primero saltó por el bloqueo `SKIP LOCKED`.

Método de trazabilidad: [[SDD-Criterios-CA-y-trazabilidad]]; estrategia general: [[Estrategia-de-pruebas]].
