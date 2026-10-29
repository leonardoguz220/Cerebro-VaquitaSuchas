---
title: "BD · esquema: Administración"
tipo: bd
area: bd
parent: "[[BD]]"
date: 2026-10-29
tags: [area/bd, bd, migraciones, spec-009]
related: ["[[Spec-009-administracion]]", "[[BD-Migraciones]]"]
---

> Padre: [[BD]]

# Esquema: Administración

Migraciones 0090-0096. Spec: [[Spec-009-administracion]] (modelo de datos en la nota de la spec). Las restricciones únicas, claves foráneas, `CHECK` y disparadores refuerzan en la base las reglas que valida el backend ([[Reglas-de-dominio]]). Nunca se edita una migración ya fusionada en `main` ([[Runbook-migrar-produccion]]).

## 0090_bans.sql

> 0090_bans: baneos de usuarios (spec 009, data-model.md §1; RF-009-19, RF-009-23, RN-009-07,
> CA-009-23, CA-009-34). Un baneo no se borra: se revierte con revoked_*, y otro administrador
> distinto del que baneó lo revierte. Un baneo vigente por persona. Agrega también la FK
> banned_identities.ban_ref -> bans de la spec 003: al revertir, el backend borra esas filas en la
> misma transacción. Que el objetivo no sea administrador y que los datos del baneo no cambien lo
> imponen los disparadores de 0094.

- Tablas: `bans`
- Disparadores: `bans_set_updated_at`
- Índices: `bans_active_user_uq`, `bans_user_idx`
- Fuente: `database/migrations/0090_bans.sql`

```sql
CREATE TABLE bans (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  reason text NOT NULL,
  source text NOT NULL,
  dispute_id uuid NULL,
  banned_by uuid NOT NULL,
  banned_at timestamptz NOT NULL DEFAULT now(),
  revoked_at timestamptz NULL,
  revoked_by uuid NULL,
  revoke_reason text NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT bans_pkey PRIMARY KEY (id),
  CONSTRAINT bans_user_id_fkey FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT bans_dispute_id_fkey FOREIGN KEY (dispute_id)
    REFERENCES join_disputes (id) ON DELETE RESTRICT,
  CONSTRAINT bans_banned_by_fkey FOREIGN KEY (banned_by) REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT bans_revoked_by_fkey FOREIGN KEY (revoked_by)
    REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT bans_reason_check CHECK (char_length(btrim(reason)) BETWEEN 10 AND 300),
  CONSTRAINT bans_source_check CHECK (source IN ('admin', 'reclamo')),
  CONSTRAINT bans_dispute_id_check CHECK ((source = 'reclamo') = (dispute_id IS NOT NULL)),
  CONSTRAINT bans_revoke_reason_check
    CHECK (char_length(btrim(revoke_reason)) BETWEEN 10 AND 300),
  CONSTRAINT bans_revoked_check CHECK (
    (revoked_at IS NULL) = (revoked_by IS NULL) AND (revoked_at IS NULL) = (revoke_reason IS NULL)
  ),
  CONSTRAINT bans_revoked_by_check CHECK (revoked_by IS NULL OR revoked_by <> banned_by),
  CONSTRAINT bans_banned_by_check CHECK (banned_by <> user_id)
);
```

## 0091_host_enablements.sql

> 0091_host_enablements: habilitación manual para ser titular (spec 009, data-model.md §1;
> RF-009-21, RF-007-17). Una habilitación vigente por persona; se revoca con revoked_*.

- Tablas: `host_enablements`
- Disparadores: `host_enablements_set_updated_at`
- Índices: `host_enablements_active_uq`
- Fuente: `database/migrations/0091_host_enablements.sql`

```sql
CREATE TABLE host_enablements (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  reason text NOT NULL,
  enabled_by uuid NOT NULL,
  enabled_at timestamptz NOT NULL DEFAULT now(),
  revoked_at timestamptz NULL,
  revoked_by uuid NULL,
  revoke_reason text NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT host_enablements_pkey PRIMARY KEY (id),
  CONSTRAINT host_enablements_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT host_enablements_enabled_by_fkey FOREIGN KEY (enabled_by)
    REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT host_enablements_revoked_by_fkey FOREIGN KEY (revoked_by)
    REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT host_enablements_reason_check CHECK (char_length(btrim(reason)) BETWEEN 10 AND 300),
  CONSTRAINT host_enablements_revoked_check CHECK (
    (revoked_at IS NULL) = (revoked_by IS NULL) AND (revoked_at IS NULL) = (revoke_reason IS NULL)
  )
);
```

## 0092_admin_audit_log.sql

> 0092_admin_audit_log: registro de las acciones de administración y de cada apertura de
> evidencia (spec 009, data-model.md §1; RF-009-18, RNF-009-03, RNF-009-05, CA-009-18,
> CA-009-19). Solo anexado (forbid_update_delete de 0001): updated_at = created_at. metadata
> guarda los cambios (antes/después) sin datos sensibles: nunca CI, contraseñas ni chats.
> reason (10-300) es obligatorio cuando la acción lo exige; eso lo valida el backend.
> admin_audit_log_append_only corre antes que admin_audit_log_set_updated_at y bloquea la
> operación.

- Tablas: `admin_audit_log`
- Disparadores: `admin_audit_log_append_only`, `admin_audit_log_set_updated_at`
- Índices: `admin_audit_log_action_idx`, `admin_audit_log_admin_idx`, `admin_audit_log_target_idx`
- Fuente: `database/migrations/0092_admin_audit_log.sql`

```sql
CREATE TABLE admin_audit_log (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  admin_id uuid NOT NULL,
  action text NOT NULL,
  target_type text NOT NULL,
  target_id uuid NULL,
  reason text NULL,
  metadata jsonb NOT NULL DEFAULT '{}',
  occurred_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT admin_audit_log_pkey PRIMARY KEY (id),
  CONSTRAINT admin_audit_log_admin_id_fkey FOREIGN KEY (admin_id)
    REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT admin_audit_log_action_check CHECK (action IN (
    'catalogo_crear', 'catalogo_editar', 'catalogo_activar', 'catalogo_desactivar',
    'catalogo_importar', 'usuario_suspender', 'usuario_reactivar', 'usuario_banear',
    'baneo_revertir', 'rol_promover', 'rol_quitar', 'titular_habilitar',
    'titular_quitar_habilitacion', 'reclamo_abrir_evidencia', 'reclamo_resolver',
    'publicacion_restaurar', 'publicacion_eliminar', 'publicacion_eliminar_y_suspender',
    'titularidad_transferir'
  )),
  CONSTRAINT admin_audit_log_target_type_check CHECK (target_type IN (
    'user', 'group', 'catalog_service', 'catalog_plan', 'join_dispute', 'listing', 'ban'
  )),
  CONSTRAINT admin_audit_log_reason_check
    CHECK (reason IS NULL OR char_length(btrim(reason)) BETWEEN 10 AND 300)
);
```

## 0093_user_suspensions.sql

> 0093_user_suspensions: historial de suspensiones (spec 009, data-model.md §1; RF-009-10,
> RN-009-04). El estado vigente está en users.status. Una suspensión abierta por persona; nadie
> se suspende a sí mismo. Que el objetivo no sea administrador lo impone 0094.

- Tablas: `user_suspensions`
- Disparadores: `user_suspensions_set_updated_at`
- Índices: `user_suspensions_open_uq`
- Fuente: `database/migrations/0093_user_suspensions.sql`

```sql
CREATE TABLE user_suspensions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  reason text NOT NULL,
  suspended_by uuid NOT NULL,
  suspended_at timestamptz NOT NULL DEFAULT now(),
  reactivated_at timestamptz NULL,
  reactivated_by uuid NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT user_suspensions_pkey PRIMARY KEY (id),
  CONSTRAINT user_suspensions_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT user_suspensions_suspended_by_fkey FOREIGN KEY (suspended_by)
    REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT user_suspensions_reactivated_by_fkey FOREIGN KEY (reactivated_by)
    REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT user_suspensions_reason_check CHECK (char_length(btrim(reason)) BETWEEN 10 AND 300),
  CONSTRAINT user_suspensions_reactivated_check
    CHECK ((reactivated_at IS NULL) = (reactivated_by IS NULL)),
  CONSTRAINT user_suspensions_suspended_by_check CHECK (suspended_by <> user_id)
);
```

## 0094_admin_triggers.sql

> 0094_admin_triggers: disparadores de la spec 009 (data-model.md §1; RN-009-01, RN-009-02,
> RN-009-07, CA-009-12, CA-009-13, CA-009-29). admin_audit_log_append_only ya está en 0092.
> Códigos de error: check_violation (23514) para el último administrador y para banear o
> suspender a un administrador; restrict_violation (23001) para cambiar un baneo, como
> forbid_update_delete() en 0001.
> ---------------------------------------------------------------------------------------------
> last_admin_guard (RN-009-01, CA-009-12)
> Un cambio de role o status que deje cero administradores activos falla. El candado de

- Funciones: `bans_forbid_change`, `check_target_not_admin`, `users_check_last_admin`
- Disparadores: `admin_not_banned_or_suspended`, `bans_immutable_fields`, `last_admin_guard`
- Fuente: `database/migrations/0094_admin_triggers.sql`

## 0095_admin_audit_log_recent_idx.sql

> 0095_admin_audit_log_recent_idx: índice del log de auditoría sin filtros (spec 009 T037,
> CA-009-21). La pantalla de auditoría abre con las entradas más recientes primero
> (AuditRepository.list, ORDER BY occurred_at DESC, id DESC) y pagina con cursor sobre el mismo
> par. Sin este índice esa consulta recorre toda la tabla, que es de solo anexado y crece sin
> límite; con él lee solo la página. Los filtros por administrador, acción y objeto ya tienen sus
> índices en 0092.

- Índices: `admin_audit_log_recent_idx`
- Fuente: `database/migrations/0095_admin_audit_log_recent_idx.sql`

## 0096_admin_history_integrity.sql

> 0096_admin_history_integrity: historial de administración coherente (spec 009, data-model.md §1;
> RN-009-02, RN-009-07, RF-009-10, RF-009-21, RF-009-23). Revisión QA: BUG-009, BUG-011, BUG-017.
> 
> BUG-009: admin_not_banned_or_suspended (0094) impedía banear o suspender a un admin, pero no
>   promover a admin a alguien con baneo o suspensión vigente.
> BUG-011: como bans_immutable_fields (0094), una suspensión solo cambia al reactivarse y una
>   habilitación solo al revocarse, una vez; después no cambian.
> BUG-017: la reversión, la revocación y la reactivación no son anteriores al inicio.

- Funciones: `host_enablements_forbid_change`, `user_suspensions_forbid_change`, `users_check_admin_not_banned`
- Disparadores: `host_enablements_immutable_fields`, `user_suspensions_immutable_fields`, `users_admin_not_banned`
- Fuente: `database/migrations/0096_admin_history_integrity.sql`
