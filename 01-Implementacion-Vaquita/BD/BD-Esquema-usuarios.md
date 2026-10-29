---
title: "BD · esquema: Usuarios e identidad"
tipo: bd
area: bd
parent: "[[BD]]"
date: 2026-10-29
tags: [area/bd, bd, migraciones, spec-003]
related: ["[[Spec-003-usuarios-y-autenticacion]]", "[[BD-Migraciones]]"]
---

> Padre: [[BD]]

# Esquema: Usuarios e identidad

Migraciones 0010-0013. Spec: [[Spec-003-usuarios-y-autenticacion]] (modelo de datos en la nota de la spec). Las restricciones únicas, claves foráneas, `CHECK` y disparadores refuerzan en la base las reglas que valida el backend ([[Reglas-de-dominio]]). Nunca se edita una migración ya fusionada en `main` ([[Runbook-migrar-produccion]]).

## 0010_users.sql

> 0010_users: cuentas de usuario e identidad (spec 003, data-model.md §1; RF-003-02, RF-003-05,
> RF-003-22, RN-003-01, RN-003-02, RN-003-03, CA-003-27).
> La CI nunca se guarda en claro: ci_encrypted es AES-256-GCM y ci_fingerprint un HMAC de la CI
> normalizada. email_fingerprint es un HMAC del correo canónico para el bloqueo por baneo (no único).
> El estado de verificación no es un valor de status: se deduce de verified_at.
> Limpieza de cuentas sin verificar a las 24 h (tarea auth.purge_unverified).
> Revisión del bloqueo por correo al registrar (huella no única: varios alias de Gmail).
> Búsqueda de usuarios por nombre sin tildes ni mayúsculas desde administración (spec 009).

- Tablas: `users`
- Disparadores: `users_set_updated_at`
- Índices: `users_email_fingerprint_idx`, `users_name_search_idx`, `users_unverified_idx`
- Fuente: `database/migrations/0010_users.sql`

```sql
CREATE TABLE users (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  email_fingerprint text NOT NULL,
  password_hash text NOT NULL,
  role text NOT NULL DEFAULT 'usuario',
  status text NOT NULL DEFAULT 'activo',
  ci_encrypted bytea NOT NULL,
  ci_fingerprint text NOT NULL,
  phone_e164 text NULL,
  telegram_user_id bigint NULL,
  verified_at timestamptz NULL,
  data_policy_accepted_at timestamptz NOT NULL,
  data_policy_version text NOT NULL,
  session_version integer NOT NULL DEFAULT 0,
  last_login_at timestamptz NULL,
  -- Secreto de sondeo del registro (cambio aprobado 2026-10-18, PR #31): SHA-256 del secreto,
  -- vence a las 24 h y se marca como canjeado sin borrar el hash.
  registration_secret_hash text NULL,
  registration_secret_expires_at timestamptz NULL,
  registration_secret_redeemed_at timestamptz NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_email_key UNIQUE (email),
  CONSTRAINT users_ci_fingerprint_key UNIQUE (ci_fingerprint),
  CONSTRAINT users_phone_e164_key UNIQUE (phone_e164),
  CONSTRAINT users_telegram_user_id_key UNIQUE (telegram_user_id),
  CONSTRAINT users_registration_secret_hash_key UNIQUE (registration_secret_hash),
  CONSTRAINT users_full_name_check CHECK (char_length(btrim(full_name)) BETWEEN 2 AND 80),
  CONSTRAINT users_email_check CHECK (email = lower(btrim(email))),
  CONSTRAINT users_role_check CHECK (role IN ('usuario', 'admin')),
  CONSTRAINT users_status_check CHECK (status IN ('activo', 'suspendido', 'baneado')),
  CONSTRAINT users_phone_e164_check CHECK (phone_e164 ~ '^\+591[67][0-9]{7}$'),
  CONSTRAINT users_session_version_check CHECK (session_version >= 0),
  CONSTRAINT users_registration_secret_pair CHECK (
    (registration_secret_hash IS NULL) = (registration_secret_expires_at IS NULL)
  ),
  -- Un usuario común verificado tiene celular y Telegram; el admin creado por comando puede no
  -- tenerlos (RN-003-03).
  CONSTRAINT users_verified_requires_identity CHECK (
    verified_at IS NULL OR role = 'admin' OR (phone_e164 IS NOT NULL AND telegram_user_id IS NOT NULL)
  )
);
```

## 0011_phone_verification_tokens.sql

> 0011_phone_verification_tokens: un token de un solo uso por intento de verificación del celular
> con el bot de Telegram (spec 003, data-model.md §1; RF-003-21).
> token_hash es el SHA-256 del token que va en el enlace al bot (el token real no se guarda) y
> requested_ip_hash un HMAC de la IP (la IP no se guarda). expires_at = creación + 10 min.
> La FK a users borra en cascada: excepción justificada a la regla de RESTRICT porque son datos
> técnicos descartables de una cuenta que no se completó (data-model.md §1).
> Último token de un usuario (reenvío y estado de la verificación).
> Buscar el token abierto de la cuenta de Telegram que pulsó Iniciar al compartir el contacto.

- Tablas: `phone_verification_tokens`
- Disparadores: `phone_verification_tokens_set_updated_at`
- Índices: `phone_tokens_started_idx`, `phone_tokens_user_idx`
- Fuente: `database/migrations/0011_phone_verification_tokens.sql`

```sql
CREATE TABLE phone_verification_tokens (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  purpose text NOT NULL,
  token_hash text NOT NULL,
  expires_at timestamptz NOT NULL,
  started_at timestamptz NULL,
  started_by_telegram_id bigint NULL,
  used_at timestamptz NULL,
  outcome text NULL,
  requested_ip_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT phone_verification_tokens_pkey PRIMARY KEY (id),
  CONSTRAINT phone_verification_tokens_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES users (id) ON DELETE CASCADE,
  CONSTRAINT phone_verification_tokens_token_hash_key UNIQUE (token_hash),
  CONSTRAINT phone_verification_tokens_purpose_check CHECK (purpose IN ('registro', 'cambio_celular')),
  CONSTRAINT phone_verification_tokens_outcome_check CHECK (
    outcome IS NULL OR outcome IN (
      'verificado',
      'rechazado_no_boliviano',
      'rechazado_contacto_ajeno',
      'rechazado_duplicado',
      'rechazado_bloqueado'
    )
  )
);
```

## 0012_password_reset_tokens.sql

> 0012_password_reset_tokens: tokens de recuperación de contraseña (spec 003, data-model.md §1;
> RF-003-10, RF-003-11, RF-003-13).
> Solo se guarda el SHA-256 del token; el token real solo viaja por correo (RF-003-11).
> expires_at es la creación más 30 min (lo fija el backend). used_at se marca al usar el token y
> también al pedir uno nuevo, de modo que un usuario tiene a lo sumo un token abierto (RF-003-13).
> Búsqueda de los tokens abiertos de un usuario para invalidarlos al pedir uno nuevo.

- Tablas: `password_reset_tokens`
- Disparadores: `password_reset_tokens_set_updated_at`
- Índices: `password_reset_open_idx`
- Fuente: `database/migrations/0012_password_reset_tokens.sql`

```sql
CREATE TABLE password_reset_tokens (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  token_hash text NOT NULL,
  expires_at timestamptz NOT NULL,
  used_at timestamptz NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (id),
  CONSTRAINT password_reset_tokens_token_hash_key UNIQUE (token_hash),
  -- ON DELETE CASCADE: datos técnicos descartables sin valor histórico; misma excepción
  -- justificada que los tokens de verificación del celular.
  CONSTRAINT password_reset_tokens_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES users (id) ON DELETE CASCADE
);
```

## 0013_banned_identities.sql

> 0013_banned_identities: huellas irreversibles de los datos de cuentas baneadas
> (spec 003, RF-003-19, CA-003-24, data-model.md §1).
> fingerprint = HMAC-SHA256(clave del servidor, 'kind:valor normalizado'), calculada en el backend.
> Ninguna columna guarda el correo, el celular, la CI ni el Telegram en claro (CA-003-24).
> No es de solo anexado: revertir un baneo (spec 009, RF-009-23) borra las filas con ese ban_ref.
> La consulta "¿está bloqueado este dato?" usa el índice de banned_identities_kind_fingerprint_key.

- Tablas: `banned_identities`
- Disparadores: `banned_identities_set_updated_at`
- Fuente: `database/migrations/0013_banned_identities.sql`

```sql
CREATE TABLE banned_identities (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  kind text NOT NULL,
  fingerprint text NOT NULL,
  -- Id del baneo. La FK a bans (id) la agrega la spec 009 en la migración 0090.
  ban_ref uuid NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT banned_identities_pkey PRIMARY KEY (id),
  CONSTRAINT banned_identities_kind_check CHECK (kind IN ('email', 'phone', 'ci', 'telegram')),
  CONSTRAINT banned_identities_kind_fingerprint_key UNIQUE (kind, fingerprint)
);
```
