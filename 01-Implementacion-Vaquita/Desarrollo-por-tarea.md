---
title: "Desarrollo por tarea (cómo trabaja cada uno)"
tipo: hub
area: implementacion
parent: "[[Implementacion-Vaquita]]"
date: 2026-10-29
tags: [area/implementacion, hub]
related: ["[[SDD-y-SpecKit]]", "[[Equipo]]"]
---

> Padre: [[Implementacion-Vaquita]]

# Desarrollo por tarea

Cómo se pasa de una spec aprobada a código en `main`.

## Ciclo
1. La spec ([[Specs]]) y su plan ([[Plan]]) están aprobados por las tres capas; el contrato y el modelo quedan congelados.
2. `/speckit-tasks` genera `tasks.md` con tareas `T#` etiquetadas `[BD]`, `[BE]` o `[FE]` (ver las notas `Spec-NNN-tasks`).
3. Cada persona toma tareas de **su capa** y de la misma pantalla o módulo, y las implementa con su subagente: `db-engineer`, `backend-engineer` o `frontend-engineer` ([[Subagentes]]).
4. Escribe los tests de los `CA-xxx` junto con el código ([[SDD-Criterios-CA-y-trazabilidad]]).
5. Rama `bd|be|fe/NNN-tX-descripcion` desde `dev`, PR a `dev` con la [[Plantilla-de-PR]], commit tipo `feat(002): add receipt upload [T3]`.
6. Los checks `flow` y la CI obligan el flujo `dev → qa → main` ([[Flujo-de-ramas]]); auto-merge sin aprobación humana ([[Workflow-auto-merge]]).
7. Se marca `[x]` en `tasks.md` y al cerrar una spec se corre `/speckit-converge` para alinear spec y código ([[Definicion-de-terminado]]).

## Quién hace qué
| Persona | Capa | Rama | Subagente | Specs que lidera |
|---|---|---|---|---|
| Camila Fuentes | BD | `bd/…` | `db-engineer` | 001, 004, 007 |
| Leonardo Guzman | Backend | `be/…` | `backend-engineer` | 002, 003, 005, 010, 011 |
| Adrian Vargas | Frontend | `fe/…` | `frontend-engineer` | 006, 008, 009 |

Detalle por rol: [[Equipo]]. Contrato primero: BD publica el modelo, backend publica la API, frontend arranca con datos simulados y conecta cuando el hito de integración lo marca ([[Frontend]]).

## Tareas por spec
- [[Spec-000-tasks]]
- [[Spec-001-tasks]]
- [[Spec-002-tasks]]
- [[Spec-003-tasks]]
- [[Spec-004-tasks]]
- [[Spec-005-tasks]]
- [[Spec-006-tasks]]
- [[Spec-007-tasks]]
- [[Spec-008-tasks]]
- [[Spec-009-tasks]]
- [[Spec-010-tasks]]
- [[Spec-011-tasks]]

Guías: [[Contribuir-CONTRIBUTING]], [[Backend]], [[Frontend]], [[BD]].

## Notas hijas

- [[Contribuir-CONTRIBUTING]] — CONTRIBUTING.md completo (cómo trabaja el equipo)
- [[Plantilla-de-PR]] — Plantilla de pull request
