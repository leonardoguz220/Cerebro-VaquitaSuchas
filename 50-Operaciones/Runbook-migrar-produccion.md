---
title: "Runbook: migrar la base de producción"
type: runbook
date: 2026-10-28
tags: [operaciones, base-de-datos, produccion]
related: ["[[Flujo-de-ramas]]", "[[Estado-de-despliegue]]"]
fuente: https://github.com/leonardoguz220/VaquitaSuchas/blob/main/database/README.md
---
Workflow manual **Migrate production** (`.github/workflows/migrate-production.yml`). Las migraciones nunca corren al arrancar el backend.

## Una sola vez
1. En GitHub, crear el entorno `production` (Settings → Environments) con revisores obligatorios.
2. Guardar en ese entorno el secreto `PRODUCTION_DATABASE_URL` con el usuario dueño del esquema (no el rol de la app). **El valor nunca va en este vault ni en el repo.**

## Cada migración
1. Fusionar la migración a `main` por el flujo [[Flujo-de-ramas]].
2. Actions → *Migrate production* → Run workflow sobre `main`.
3. Escribir `production` en `confirm` (marcar `seed` solo si hay que sembrar el catálogo; es idempotente) y aprobar el entorno.
4. El workflow valida numeración con `db:check`, **respalda antes de migrar** (`db:dump`, artefacto `respaldo-produccion-<run>` con retención de 7 días) y recién entonces migra. Si el respaldo falla, no migra.

## Si algo sale mal
Descargar el artefacto y restaurar con `db:restore -- --allow-remote`, con la URL solo en el entorno de la terminal. El respaldo contiene datos de usuarios: no guardarlo en el repo y borrarlo después.

## Reglas
- Solo corre desde `main`. Nunca editar una migración ya fusionada en `main`.
- `db:reset` solo contra la base local.
- La app se conecta con un rol que solo hace DML (sin `DROP`, `ALTER`, `TRUNCATE`).
