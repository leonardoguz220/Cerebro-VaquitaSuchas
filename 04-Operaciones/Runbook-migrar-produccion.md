---
title: "Runbook: migrar la base de producción"
tipo: runbook
area: operaciones
parent: "[[Operaciones]]"
date: 2026-10-29
tags: [area/operaciones, runbook, produccion]
related: ["[[BD-Migraciones]]"]
fuente: https://github.com/leonardoguz220/VaquitaSuchas/blob/main/database/README.md
---

> Padre: [[Operaciones]]

Workflow manual [[Workflow-migrate-production]]. Las migraciones nunca corren al arrancar el backend.

## Una sola vez
1. En GitHub crear el entorno `production` con revisores obligatorios.
2. Guardar en ese entorno el secreto `PRODUCTION_DATABASE_URL` (usuario dueño del esquema, no el rol de la app). **El valor nunca va al repo ni al vault.**

## Cada migración
1. Fusionar la migración a `main` ([[Flujo-de-ramas]]).
2. Actions → *Migrate production* → Run workflow sobre `main`.
3. Escribir `production` en `confirm` (`seed` solo si hay que sembrar el catálogo, es idempotente) y aprobar el entorno.
4. El workflow valida numeración (`db:check`), **respalda antes** (`db:dump`, artefacto `respaldo-produccion-<run>` con retención de 7 días) y migra. Si el respaldo falla, no migra.

## Si algo falla
Descargar el artefacto y restaurar con `db:restore -- --allow-remote` usando la URL solo en el entorno de la terminal. El respaldo contiene datos de usuarios: no guardarlo en el repo y borrarlo después.

## Reglas
Solo desde `main`; nunca editar una migración ya fusionada; `db:reset` solo local; la app usa un rol solo DML. PR #258 y #261 crearon el workflow y el respaldo previo con TLS. Ver [[BD-Herramientas-y-runbook]].
