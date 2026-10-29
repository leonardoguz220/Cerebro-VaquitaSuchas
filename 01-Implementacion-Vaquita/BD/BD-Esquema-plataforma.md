---
title: "BD · esquema: Plataforma: extensiones, job_runs, rate_limit_events y telegram_updates"
tipo: bd
area: implementacion
parent: "[[BD]]"
date: 2026-10-29
tags: [area/implementacion, bd, migraciones, spec-000]
related: ["[[Spec-000-setup-del-proyecto]]", "[[BD-Migraciones]]"]
---

> Padre: [[BD]]

# Esquema: Plataforma: extensiones, job_runs, rate_limit_events y telegram_updates

Migraciones 0001-0005. Spec: [[Spec-000-setup-del-proyecto]] (modelo de datos en la nota de la spec). Las restricciones únicas, claves foráneas, `CHECK` y disparadores refuerzan en la base las reglas que valida el backend ([[Reglas-de-dominio]]). Nunca se edita una migración ya fusionada en `main` ([[Runbook-migrar-produccion]]).

## 0001_init.sql

> 0001_init: extensiones y funciones comunes del esquema (spec 000, RF-000-07, data-model.md §2).
> gen_random_uuid() es nativa desde PostgreSQL 13, así que no se instala pgcrypto.
> Búsqueda del catálogo sin tildes (spec 004).
> Mantiene updated_at. Uso: BEFORE UPDATE ... FOR EACH ROW EXECUTE FUNCTION set_updated_at().
> Tablas de solo anexado (eventos, auditoría).
> Uso: BEFORE UPDATE OR DELETE ... FOR EACH ROW EXECUTE FUNCTION forbid_update_delete().
> ERRCODE restrict_violation (23001): la operación viola una restricción de integridad.
> unaccent() es STABLE porque depende del diccionario; fijándolo, esta envoltura es IMMUTABLE

- Funciones: `forbid_update_delete`, `immutable_unaccent`, `set_updated_at`
- Fuente: `database/migrations/0001_init.sql`

## 0002_job_runs.sql

> 0002_job_runs: registro de ejecuciones de tareas programadas (spec 000, RF-000-14, RF-000-07,
> data-model.md §3). error_message no lleva datos personales. Retención de 30 días a cargo de
> la tarea maintenance.cleanup del backend.
> Última ejecución de cada tarea (recuperación al arrancar y observabilidad, RF-000-14).

- Tablas: `job_runs`
- Disparadores: `job_runs_set_updated_at`
- Índices: `job_runs_name_started_idx`
- Fuente: `database/migrations/0002_job_runs.sql`

```sql
CREATE TABLE job_runs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  job_name text NOT NULL,
  trigger text NOT NULL,
  status text NOT NULL,
  started_at timestamptz NOT NULL DEFAULT now(),
  finished_at timestamptz NULL,
  processed_count integer NOT NULL DEFAULT 0,
  error_message text NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT job_runs_pkey PRIMARY KEY (id),
  CONSTRAINT job_runs_trigger_check CHECK (trigger IN ('cron', 'external', 'manual', 'startup')),
  CONSTRAINT job_runs_status_check CHECK (status IN ('running', 'ok', 'error', 'skipped'))
);
```

## 0003_rate_limit_events.sql

> 0003_rate_limit_events: eventos para límites por ventana de tiempo (spec 000, RF-000-07,
> data-model.md §3). Los usan login, recuperación de contraseña, tokens de Telegram, códigos de
> invitación, chat y registro por IP. El backend cuenta eventos con occurred_at > now() - ventana.
> Es de solo anexado: la limpieza de eventos de más de 24 horas la hace maintenance.cleanup con un
> rol que tiene permiso (spec 000, T033 de backend).
> Solo anexado. Los BEFORE triggers se disparan en orden alfabético de nombre, así que
> ..._forbid_update_delete corre antes que ..._set_updated_at y bloquea la operación.
> Como UPDATE está prohibido, este disparador nunca llega a cambiar nada; se deja por la

- Tablas: `rate_limit_events`
- Disparadores: `rate_limit_events_forbid_update_delete`, `rate_limit_events_set_updated_at`
- Índices: `rate_limit_events_lookup_idx`
- Fuente: `database/migrations/0003_rate_limit_events.sql`

```sql
CREATE TABLE rate_limit_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Tipo de límite, p. ej. 'login_fail:email', 'login_fail:ip', 'reset:email', 'tg_token:ip'.
  bucket text NOT NULL,
  -- HMAC-SHA256(clave del servidor, valor): nunca se guarda el correo ni la IP.
  key_hash text NOT NULL,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
```

## 0004_telegram_updates.sql

> 0004_telegram_updates: deduplicación de las actualizaciones del bot de Telegram
> (spec 000, RF-000-22, data-model.md §3, research.md R2).
> Telegram puede reenviar una actualización; el webhook inserta con
> ON CONFLICT (update_id) DO NOTHING y descarta las repetidas. La PK es el update_id natural.
> Las filas de más de 7 días se limpian desde el backend.

- Tablas: `telegram_updates`
- Disparadores: `telegram_updates_set_updated_at`
- Fuente: `database/migrations/0004_telegram_updates.sql`

```sql
CREATE TABLE telegram_updates (
  update_id   bigint      PRIMARY KEY,
  received_at timestamptz NOT NULL DEFAULT now(),
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);
```

## 0005_rate_limit_events_retention.sql

> 0005_rate_limit_events_retention: permite a maintenance.cleanup borrar los eventos viejos de
> rate_limit_events (spec 000, T033, RF-000-07 y RF-000-14). Con 0003 todo DELETE fallaba con
> restrict_violation (23001) y la tarea terminaba en error.
> La tabla sigue siendo de solo anexado en la práctica: UPDATE sigue prohibido y DELETE solo se
> permite para filas de más de 24 horas (la retención que fija el backend), así que un evento
> reciente nunca se puede borrar ni siquiera con el rol de la aplicación.
> Se conserva el nombre alfabético anterior a ..._set_updated_at para que bloquee primero.

- Funciones: `rate_limit_events_guard_delete`
- Disparadores: `rate_limit_events_forbid_update`, `rate_limit_events_guard_delete`
- Fuente: `database/migrations/0005_rate_limit_events_retention.sql`
