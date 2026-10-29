---
title: "BD · esquema: Notificaciones"
tipo: bd
area: bd
parent: "[[BD]]"
date: 2026-10-29
tags: [area/bd, bd, migraciones, spec-005]
related: ["[[Spec-005-notificaciones]]", "[[BD-Migraciones]]"]
---

> Padre: [[BD]]

# Esquema: Notificaciones

Migraciones 0070-0075. Spec: [[Spec-005-notificaciones]] (modelo de datos en la nota de la spec). Las restricciones únicas, claves foráneas, `CHECK` y disparadores refuerzan en la base las reglas que valida el backend ([[Reglas-de-dominio]]). Nunca se edita una migración ya fusionada en `main` ([[Runbook-migrar-produccion]]).

## 0070_notifications.sql

> 0070_notifications: notificaciones dentro de la app, una fila por persona y aviso (spec 005,
> data-model.md §1, parte A del MVP; RF-005-01, RF-005-02, RF-005-21, RNF-005-01, RNF-005-02).
> type es el código del aviso (catálogo en plan.md §5). dedupe_key combina tipo, entidad, período
> y n.º de recordatorio (y el destinatario si una entidad avisa a varias personas): repetir una
> tarea no duplica avisos. entity_type/entity_id permiten cancelar los avisos pendientes de un
> cobro o grupo (RN-005-02). La limpieza a los 90 días la hace una tarea del backend con DELETE.
> Lista paginada de notificaciones de un usuario, de la más reciente a la más antigua (RF-005-01).
> Contador de no leídas de la campana (RF-005-02).

- Tablas: `notifications`
- Funciones: `notifications_forbid_content_update`
- Disparadores: `notifications_immutable_content`, `notifications_set_updated_at`
- Índices: `notifications_entity_idx`, `notifications_purge_idx`, `notifications_unread_idx`, `notifications_user_idx`
- Fuente: `database/migrations/0070_notifications.sql`

```sql
CREATE TABLE notifications (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  type text NOT NULL,
  category text NOT NULL,
  title text NOT NULL,
  body text NOT NULL,
  link text NULL,
  entity_type text NULL,
  entity_id uuid NULL,
  dedupe_key text NOT NULL,
  read_at timestamptz NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT notifications_pkey PRIMARY KEY (id),
  CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT notifications_dedupe_key_key UNIQUE (dedupe_key),
  CONSTRAINT notifications_category_check
    CHECK (category IN ('recordatorios', 'resoluciones', 'titular', 'grupo')),
  CONSTRAINT notifications_title_check CHECK (char_length(title) BETWEEN 1 AND 120),
  CONSTRAINT notifications_body_check CHECK (char_length(body) <= 500),
  -- Solo rutas internas de la app (/cobros/<id>): nada de enlaces externos ni //host (RNF-005-02).
  CONSTRAINT notifications_link_check CHECK (link ~ '^/[^/]')
);
```

## 0071_notification_preferences.sql

> 0071_notification_preferences: preferencias de aviso por usuario, una fila por persona (spec 005,
> data-model.md §1, parte B; RF-005-17, RF-005-27, RF-005-28). La spec 003 reservó este número.
> La PK es user_id (clave natural definida por el modelo). Un interruptor por canal (correo y
> Telegram) y categoría; todos nacen encendidos. La fila la crea el backend con los valores por
> defecto al verificar el celular o en el primer acceso. Los correos de seguridad (spec 003) no
> pasan por estas preferencias.
> telegram_blocked_at: el usuario bloqueó el bot; desactiva Telegram hasta que lo reactive.
> email_bounced_at: rebote permanente del correo; se deja de enviar.

- Tablas: `notification_preferences`
- Disparadores: `notification_preferences_set_updated_at`
- Fuente: `database/migrations/0071_notification_preferences.sql`

```sql
CREATE TABLE notification_preferences (
  user_id uuid NOT NULL,
  email_recordatorios boolean NOT NULL DEFAULT true,
  email_resoluciones boolean NOT NULL DEFAULT true,
  email_titular boolean NOT NULL DEFAULT true,
  email_grupo boolean NOT NULL DEFAULT true,
  telegram_recordatorios boolean NOT NULL DEFAULT true,
  telegram_resoluciones boolean NOT NULL DEFAULT true,
  telegram_titular boolean NOT NULL DEFAULT true,
  telegram_grupo boolean NOT NULL DEFAULT true,
  telegram_blocked_at timestamptz NULL,
  email_bounced_at timestamptz NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT notification_preferences_pkey PRIMARY KEY (user_id),
  CONSTRAINT notification_preferences_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES users (id) ON DELETE RESTRICT
);
```

## 0072_notification_deliveries.sql

> 0072_notification_deliveries: buzón de salida por canal de cada notificación (spec 005,
> data-model.md §1, partes B y C; RF-005-17, RF-005-20, RNF-005-01, RNF-005-03, RNF-005-04).
> Una fila por notificación y canal. El backend la crea en la misma transacción que la
> notificación y una tarea la envía de forma asíncrona, sin bloquear la operación del usuario.
> respect_window = true: solo se envía entre 08:00 y 20:00 de La Paz (RNF-005-03).
> Reintentos a los 5 min, 30 min y 2 h (RF-005-20): attempts 1, 2 y 3 programan next_attempt_at;
> al cuarto fallo status = 'failed'. last_error no lleva datos personales.
> skip_reason es obligatorio si y solo si status = 'skipped'. Sus valores los fija el backend

- Tablas: `notification_deliveries`
- Disparadores: `notification_deliveries_set_updated_at`
- Índices: `notification_deliveries_due_idx`
- Fuente: `database/migrations/0072_notification_deliveries.sql`

```sql
CREATE TABLE notification_deliveries (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  notification_id uuid NOT NULL,
  channel text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  respect_window boolean NOT NULL,
  attempts smallint NOT NULL DEFAULT 0,
  next_attempt_at timestamptz NOT NULL,
  sent_at timestamptz NULL,
  last_error text NULL,
  skip_reason text NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT notification_deliveries_pkey PRIMARY KEY (id),
  CONSTRAINT notification_deliveries_notification_id_fkey FOREIGN KEY (notification_id)
    REFERENCES notifications (id) ON DELETE RESTRICT,
  CONSTRAINT notification_deliveries_notification_id_channel_key UNIQUE (notification_id, channel),
  CONSTRAINT notification_deliveries_channel_check CHECK (channel IN ('email', 'telegram')),
  CONSTRAINT notification_deliveries_status_check
    CHECK (status IN ('pending', 'sent', 'failed', 'skipped')),
  CONSTRAINT notification_deliveries_attempts_check CHECK (attempts BETWEEN 0 AND 4),
  CONSTRAINT notification_deliveries_last_error_check CHECK (char_length(last_error) <= 200),
  CONSTRAINT notification_deliveries_skip_reason_check
    CHECK ((status = 'skipped') = (skip_reason IS NOT NULL))
);
```

## 0073_group_invitations.sql

> 0073_group_invitations: invitaciones por correo a un grupo (spec 005, data-model.md §1;
> RF-005-14). Buzón de salida: el backend inserta la fila y una tarea envía el correo con
> reintentos. recipient_email es dato de un tercero: la limpieza borra la fila a los 30 días.
> El límite de 10 invitaciones por hora por titular usa rate_limit_events (bucket invite:user).
> Invitaciones pendientes que ya tocan, para la tarea de envío.

- Tablas: `group_invitations`
- Disparadores: `group_invitations_set_updated_at`
- Índices: `group_invitations_due_idx`, `group_invitations_group_idx`
- Fuente: `database/migrations/0073_group_invitations.sql`

```sql
CREATE TABLE group_invitations (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  group_id uuid NOT NULL,
  invited_by uuid NOT NULL,
  recipient_email text NOT NULL,
  sent_at timestamptz NULL,
  status text NOT NULL DEFAULT 'pendiente',
  attempts smallint NOT NULL DEFAULT 0,
  next_attempt_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT group_invitations_pkey PRIMARY KEY (id),
  CONSTRAINT group_invitations_group_id_fkey FOREIGN KEY (group_id)
    REFERENCES groups (id) ON DELETE RESTRICT,
  CONSTRAINT group_invitations_invited_by_fkey FOREIGN KEY (invited_by)
    REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT group_invitations_recipient_email_check
    CHECK (recipient_email = lower(btrim(recipient_email))),
  CONSTRAINT group_invitations_status_check
    CHECK (status IN ('pendiente', 'enviada', 'fallida')),
  CONSTRAINT group_invitations_attempts_check CHECK (attempts >= 0)
);
```

## 0074_notification_triggers.sql

> 0074_notification_triggers: disparadores de la spec 005 (data-model.md §1, "Disparadores";
> RNF-005-01).
> notifications_immutable_content ya existe: se creó en 0070_notifications porque la parte A
> (MVP, T002) lo necesitaba antes que las partes B y C. No se repite aquí.
> 0073 (group_invitations) queda para T025.
> 
> deliveries_no_resurrect: un envío sent, failed o skipped no vuelve a pending, para que una
> repetición de la tarea de entrega no lo mande dos veces (RNF-005-01). Las demás transiciones

- Funciones: `notification_deliveries_forbid_resurrect`
- Disparadores: `deliveries_no_resurrect`
- Fuente: `database/migrations/0074_notification_triggers.sql`

## 0075_notifications_link_internal.sql

> 0075_notifications_link_internal: el enlace de un aviso es siempre una ruta interna (spec 005,
> data-model.md §1; RNF-005-02).
> El CHECK de 0070 (link ~ '^/[^/]') dejaba pasar '/\evil.example': el navegador lee '\' como '/'
> y abre //evil.example, un enlace a otro sitio. Ahora el enlace es una lista de segmentos con
> letras, números, '-' y '_' (las rutas que arma el backend: /grupos, /cupos, /cobros/<id>,
> /grupos/<id>, /solicitudes/<id>); sin barra invertida, '%', ':', espacios, '?' ni segmentos
> vacíos. NULL sigue permitido (aviso sin enlace). Una ruta nueva con otros caracteres se agrega
> en una migración.

- Fuente: `database/migrations/0075_notifications_link_internal.sql`
