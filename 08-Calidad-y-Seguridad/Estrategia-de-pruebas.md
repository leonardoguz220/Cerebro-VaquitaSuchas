---
title: "Estrategia de pruebas"
tipo: calidad
area: calidad
parent: "[[Calidad-y-Seguridad]]"
date: 2026-10-29
tags: [area/calidad, calidad]
---

> Padre: [[Calidad-y-Seguridad]]

# Estrategia de pruebas

Pirámide del proyecto (CLAUDE.md §7): unitarios para el **100 %** de las reglas de dominio; integración con un test por `CA` de endpoint; E2E al menos del flujo feliz del MVP.

| Nivel | Herramienta | Dónde |
|---|---|---|
| Unitario | Jest (backend), Vitest/Jest (frontend) | `*.spec.ts` / `*.test.ts` junto al código ([[BE-Pruebas]]) |
| Integración backend | Jest + PostgreSQL real | `backend/test/*.e2e-spec.ts` |
| Integridad de BD | Jest sobre la base | `database/tests` ([[BD-Pruebas]]) |
| E2E | Playwright | `frontend/e2e` ([[FE-Pruebas-y-flujos]]) |
| Seguridad | gitleaks, pruebas de fuga y XSS | [[Seguridad]] |

Reglas: cada test cita su `CA-xxx` ([[SDD-Criterios-CA-y-trazabilidad]]); si un criterio no se puede testear se reescribe. Qué corre en CI: [[Workflow-ci]], [[Workflow-backend]], [[Workflow-frontend]], [[Workflow-e2e]]. Patrones: [[Patrones-de-testing]]. Fecha simulada (`?now=`) permite probar plazos ([[BE-Jobs]]).
