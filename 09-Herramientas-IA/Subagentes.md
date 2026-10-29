---
title: "Subagentes de Claude Code"
tipo: hub
area: ia
parent: "[[Herramientas-IA]]"
date: 2026-10-29
tags: [area/ia, hub]
related: ["[[Hooks]]", "[[Skills]]"]
---

> Padre: [[Herramientas-IA]]

# Subagentes

Tres **implementan**, uno por capa y cada uno solo escribe en su carpeta; los demás **revisan**. En una sesión se pueden hacer varias tareas de la misma capa y pantalla.

- [[Agente-backend-engineer]] — Implementa tareas [BE] de Vaquita (Leonardo) en backend/: módulos NestJS por capas, dominio puro, endpoints según contracts/api.md, tareas programadas y tests con Jest y supertest. Úsalo para una tarea [BE] concreta de u
- [[Agente-ca-traceability-checker]] — Revisor de solo lectura que verifica que cada criterio CA-xxx de una tarea o spec de Vaquita tenga un test que lo cite y que la tarea cumpla la definición de terminado. Úsalo antes de marcar una tarea como hecha o de abr
- [[Agente-code-reviewer]] — Senior code reviewer that evaluates changes across five dimensions — correctness, readability, architecture, security, and performance. Use for thorough code review before merge.
- [[Agente-contract-checker]] — Revisor de solo lectura que compara el código de Vaquita con el contrato congelado (contracts/api.md) y el modelo (data-model.md) de una spec. Úsalo antes de abrir un PR que toque endpoints, DTO, servicios del frontend o
- [[Agente-db-engineer]] — Implementa tareas [BD] de Vaquita (Camila) en database/: migraciones SQL numeradas, seeds y pruebas de integridad, siguiendo el data-model.md y el plan de la spec. Úsalo para una tarea [BD] concreta de un tasks.md.
- [[Agente-frontend-engineer]] — Implementa tareas [FE] de Vaquita (Adrian) en frontend/: pantallas Next.js por capas, componentes ui/, proxy /api, hooks y servicios según contracts/api.md, con pruebas de componentes y Playwright. Úsalo para una tarea [
- [[Agente-security-auditor]] — Security engineer focused on vulnerability detection, threat modeling, and secure coding practices. Use for security-focused code review, threat analysis, or hardening recommendations.
- [[Agente-test-engineer]] — QA engineer specialized in test strategy, test writing, and coverage analysis. Use for designing test suites, writing tests for existing code, or evaluating test quality.

Uso: `ca-traceability-checker` solo al cerrar una historia o spec; `contract-checker` solo si el PR toca contratos, DTO o `frontend/src/services/`. Cómo encaja en el trabajo diario: [[Desarrollo-por-tarea]]. Detalle: [[Hooks-y-subagentes-en-detalle]].

## Notas hijas

- [[Agente-backend-engineer]] — Subagente · backend-engineer
- [[Agente-ca-traceability-checker]] — Subagente · ca-traceability-checker
- [[Agente-code-reviewer]] — Subagente · code-reviewer
- [[Agente-contract-checker]] — Subagente · contract-checker
- [[Agente-db-engineer]] — Subagente · db-engineer
- [[Agente-frontend-engineer]] — Subagente · frontend-engineer
- [[Agente-security-auditor]] — Subagente · security-auditor
- [[Agente-test-engineer]] — Subagente · test-engineer
