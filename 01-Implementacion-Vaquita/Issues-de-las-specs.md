---
title: "Issues de las specs (#265 a #276)"
tipo: history
area: desarrollo
parent: "[[Desarrollo-por-tarea]]"
date: 2026-10-30
tags: [area/desarrollo, history, issues]
related: ["[[Estado-actual]]"]
fuente: https://github.com/leonardoguz220/VaquitaSuchas/issues
---

> Padre: [[Desarrollo-por-tarea]]

# Un issue por spec

Se creó un issue por cada spec (2026-10-30) usando el MCP de GitHub ([[MCP-GitHub-y-Context7]]). Cada issue enlaza su `spec.md` y `tasks.md`, lista las historias de usuario `HU-NNN-xx` como casillas marcadas, indica el módulo de código y declara «completada en `main`». Todos están cerrados.

| Issue | Spec | Estado | Nota |
|---|---|---|---|
| [#265](https://github.com/leonardoguz220/VaquitaSuchas/issues/265) | [[Spec-000-setup-del-proyecto]] | Cerrado | Completada en `main` |
| [#266](https://github.com/leonardoguz220/VaquitaSuchas/issues/266) | [[Spec-001-suscripciones-compartidas]] | Cerrado | Completada en `main` |
| [#267](https://github.com/leonardoguz220/VaquitaSuchas/issues/267) | [[Spec-002-cobros-y-pagos]] | Cerrado | Completada en `main` |
| [#268](https://github.com/leonardoguz220/VaquitaSuchas/issues/268) | [[Spec-003-usuarios-y-autenticacion]] | Cerrado | Completada en `main` |
| [#269](https://github.com/leonardoguz220/VaquitaSuchas/issues/269) | [[Spec-004-catalogo-de-servicios]] | Cerrado | Completada en `main` |
| [#270](https://github.com/leonardoguz220/VaquitaSuchas/issues/270) | [[Spec-005-notificaciones]] | Cerrado | Completada en `main` |
| [#271](https://github.com/leonardoguz220/VaquitaSuchas/issues/271) | [[Spec-006-panel-y-reportes]] | Cerrado | Completada en `main` |
| [#272](https://github.com/leonardoguz220/VaquitaSuchas/issues/272) | [[Spec-007-reputacion]] | Cerrado | Completada en `main` |
| [#273](https://github.com/leonardoguz220/VaquitaSuchas/issues/273) | [[Spec-008-cupos-libres]] | Cerrado | Completada en `main` |
| [#274](https://github.com/leonardoguz220/VaquitaSuchas/issues/274) | [[Spec-009-administracion]] | Cerrado | Completada en `main` |
| [#275](https://github.com/leonardoguz220/VaquitaSuchas/issues/275) | [[Spec-010-solicitudes-de-ingreso]] | Cerrado | Completada en `main` |
| [#276](https://github.com/leonardoguz220/VaquitaSuchas/issues/276) | [[Spec-011-faltante-de-grupo]] | Cerrado | Completada en `main` |

Detalles propios: el de la spec 000 remite al test de configuración `database/tests/repo-config.test.ts` ([[Trazabilidad-CA-000]]); el de la 002 al E2E `frontend/e2e/mvp-flow.spec.ts`; el de la 010 a la decisión [[ADR-0004-ingreso-con-pago-previo-y-chat]]. Las specs completas están en [[Specs]].
