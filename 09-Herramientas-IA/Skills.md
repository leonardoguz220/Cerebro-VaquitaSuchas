---
title: "Skills de Claude Code"
tipo: hub
area: ia
parent: "[[Herramientas-IA]]"
date: 2026-10-29
tags: [area/ia, hub]
---

> Padre: [[Herramientas-IA]]

# Skills

Las skills de `.claude/skills/` son apoyo opcional; si contradicen `CLAUDE.md`, la constitución, una spec o `CONTRIBUTING.md`, mandan estos ([[CLAUDE-md-del-repo]]). Las de Spec Kit (`speckit-*`) implementan el flujo de [[SpecKit-comandos]]; las `vaquita-*` codifican convenciones propias del proyecto y se copian completas aquí.

| Skill | Descripción |
|---|---|
| `frontend-ui-engineering` | Builds production-quality, accessible, responsive user-facing UIs. Use when building or modifying interfaces and pages, creating components, implementing layouts, meeting WCAG accessibility requiremen |
| `speckit-analyze` | Perform a non-destructive cross-artifact consistency and quality analysis across spec.md, plan.md, and tasks.md after task generation. |
| `speckit-checklist` | Generate a custom checklist for the current feature based on user requirements. |
| `speckit-clarify` | Identify underspecified areas in the current feature spec by asking up to 5 highly targeted clarification questions and encoding answers back into the spec. |
| `speckit-constitution` | Create or update the project constitution from interactive or provided principle inputs. |
| `speckit-converge` | Assess the current codebase against the feature's spec, plan, and tasks, then append any remaining unbuilt work as new tasks to tasks.md so implement can complete it. |
| `speckit-implement` | Execute the implementation plan by processing and executing all tasks defined in tasks.md |
| `speckit-plan` | Execute the implementation planning workflow using the plan template to generate design artifacts. |
| `speckit-specify` | Create or update the feature specification from a natural language feature description. |
| `speckit-tasks` | Generate an actionable, dependency-ordered tasks.md for the feature based on available design artifacts. |
| [[Skill-vaquita-ca-traceability]] | Verifica la trazabilidad spec → test de Vaquita y la definición de terminado antes de abrir o revisar un PR: cada criterio CA-xxx tiene un test con su ID, la spec/plan/tasks reflejan la realidad y no  |
| [[Skill-vaquita-money-and-billing]] | Reglas y procedimiento de Vaquita para dinero, cuotas, conversión USD a Bs, redondeo, fechas de cobro, generación de cobros y máquina de estados. Úsalo al escribir o revisar cualquier cálculo de cuota |
| [[Skill-vaquita-nestjs-conventions]] | Convenciones de Vaquita para el backend NestJS: estructura de módulos, DTO con class-validator, guards por rol y pertenencia al grupo, errores, Swagger, subida de comprobantes, tareas programadas y te |
| [[Skill-vaquita-nextjs-conventions]] | Convenciones de Vaquita para el frontend Next.js + React + TypeScript + Tailwind: proxy /api con cookie httpOnly, rutas por rol, componentes ui reutilizables, estados vacío/carga/error, diseño celular |
| [[Skill-vaquita-postgres-migrations]] | Procedimiento de Vaquita para diseñar el modelo PostgreSQL, escribir migraciones SQL numeradas, restricciones de integridad, el seed y los tests de integridad. Úsalo al crear o cambiar tablas, índices |

Skills genéricas archivadas en `ia/skills-archivadas/` (se pueden volver a activar por PR): `api-and-interface-design`, `ci-cd-and-automation`, `code-review-and-quality`, `debugging-and-error-recovery`, `documentation-and-adrs`, `incremental-implementation`, `interview-me`, `performance-optimization`, `security-and-hardening`, `source-driven-development`, `speckit-taskstoissues`, `test-driven-development`. Origen y licencia: [[Herramientas-y-skills-de-IA]].

## Notas hijas

- [[Skill-vaquita-ca-traceability]] — Skill · vaquita-ca-traceability
- [[Skill-vaquita-money-and-billing]] — Skill · vaquita-money-and-billing
- [[Skill-vaquita-nestjs-conventions]] — Skill · vaquita-nestjs-conventions
- [[Skill-vaquita-nextjs-conventions]] — Skill · vaquita-nextjs-conventions
- [[Skill-vaquita-postgres-migrations]] — Skill · vaquita-postgres-migrations
