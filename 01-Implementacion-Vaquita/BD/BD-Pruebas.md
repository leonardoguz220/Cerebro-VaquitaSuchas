---
title: "BD · pruebas de integridad"
tipo: bd
area: bd
parent: "[[BD]]"
date: 2026-10-29
tags: [area/bd, bd, pruebas]
---

> Padre: [[BD]]

# Pruebas de la base

Cada tabla clave tiene una prueba de integridad (restricciones, disparadores, solo anexado) y varias, de rendimiento:

- `admin.integrity.test.ts`
- `admin.performance.test.ts`
- `app_role.privileges.test.ts`
- `append_only.triggers.test.ts`
- `backup.test.ts`
- `billing.integrity.test.ts`
- `billing.performance.test.ts`
- `catalog.integrity.test.ts`
- `catalog.search.test.ts`
- `catalog.seed.test.ts`
- `config.test.ts`
- `groups.integrity.test.ts`
- `init.functions.test.ts`
- `invitations.integrity.test.ts`
- `job_runs.constraints.test.ts`
- `join-requests.integrity.test.ts`
- `join-requests.performance.test.ts`
- `listings.integrity.test.ts`
- `listings.performance.test.ts`
- `migrations.apply.test.ts`
- `migrations.atomic.test.ts`
- `migrations.checksum.test.ts`
- `migrations.idempotent.test.ts`
- `notifications.integrity.test.ts`
- `notifications.performance.test.ts`
- `numbering.check.test.ts`
- `qa-regressions.integrity.test.ts`
- `rate_limit_events.constraints.test.ts`
- `reports.integrity.test.ts`
- `reports.performance.test.ts`
- `reputation.integrity.test.ts`
- `reputation.performance.test.ts`
- `reset.test.ts`
- `schema.conventions.test.ts`
- `seed.dev.test.ts`
- `seed.test.ts`
- `shortfalls.integrity.test.ts`
- `smoke.connection.test.ts`
- `telegram_updates.constraints.test.ts`
- `users.integrity.test.ts`

Incluyen `app_role.privileges` (el rol de la app solo hace DML), `append_only.triggers` (eventos que no se editan ni borran) y `migrations.*` (checksum, atomicidad, idempotencia). Ver [[Estrategia-de-pruebas]].
