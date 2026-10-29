---
title: "BD · esquema: Grupos y miembros"
tipo: bd
area: bd
parent: "[[BD]]"
date: 2026-10-29
tags: [area/bd, bd, migraciones, spec-001]
related: ["[[Spec-001-suscripciones-compartidas]]", "[[BD-Migraciones]]"]
---

> Padre: [[BD]]

# Esquema: Grupos y miembros

Migraciones 0030-0033. Spec: [[Spec-001-suscripciones-compartidas]] (modelo de datos en la nota de la spec). Las restricciones únicas, claves foráneas, `CHECK` y disparadores refuerzan en la base las reglas que valida el backend ([[Reglas-de-dominio]]). Nunca se edita una migración ya fusionada en `main` ([[Runbook-migrar-produccion]]).

## 0030_groups.sql

> 0030_groups: grupos de suscripción compartida (spec 001, data-model.md §1; RF-001-01, RF-001-02,
> RF-001-03, RF-001-06, RF-001-09, RF-001-10, RF-001-11, RF-001-20, RN-001-04, RN-001-09,
> RN-001-12, RN-001-13).
> Las cuotas no se guardan: se calculan al consultar a partir de total_bs_cents (RF-001-12).
> created_at cuenta como el corte inicial del grupo (inicio de la ventana de ingreso inicial).
> Los disparadores de negocio (capacidad, titular, límite de 5, copias inmutables, cerrado de
> solo lectura) van en 0032_group_triggers.sql.
> Mis grupos como titular y conteo de grupos activos de un titular (RN-001-14).

- Tablas: `groups`
- Disparadores: `groups_set_updated_at`
- Índices: `groups_owner_active_idx`
- Fuente: `database/migrations/0030_groups.sql`

```sql
CREATE TABLE groups (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  -- Exactamente un titular (RN-001-01).
  owner_id uuid NOT NULL,
  name text NOT NULL,
  status text NOT NULL DEFAULT 'activo',
  closed_at timestamptz NULL,
  -- Grupo en solo lectura por titular baneado (spec 009, RF-009-22).
  frozen_at timestamptz NULL,
  frozen_reason text NULL,
  -- Copia del catálogo al crear (RN-001-12, spec 004 RF-004-08); NULL = servicio personalizado.
  catalog_plan_id uuid NULL,
  service_name_snapshot text NOT NULL,
  plan_name_snapshot text NULL,
  logo_url_snapshot text NULL,
  brand_color_snapshot text NULL,
  -- Cupos máximos del plan al crear.
  plan_max_slots_snapshot smallint NULL,
  -- Precio individual de referencia (spec 006).
  individual_price_cents_snapshot bigint NULL,
  individual_price_currency_snapshot text NULL,
  -- Precio real definido por el titular, en centavos de la moneda del precio.
  price_cents bigint NOT NULL,
  currency text NOT NULL,
  -- Bs por 1 USD (RN-001-04).
  exchange_rate numeric(10, 4) NULL,
  -- RF-001-11: total en Bs redondeado al centavo, mitad hacia arriba.
  total_bs_cents bigint GENERATED ALWAYS AS (
    CASE WHEN currency = 'BS' THEN price_cents
         ELSE round(price_cents * exchange_rate)::bigint END
  ) STORED,
  billing_day smallint NOT NULL,
  -- Cupos totales, titular incluido.
  total_slots smallint NOT NULL,
  invite_code text NOT NULL,
  accepting_members boolean NOT NULL DEFAULT true,
  payment_info_text text NULL,
  -- Clave del archivo QR en el almacén privado.
  payment_qr_key text NULL,
  payment_qr_mime text NULL,
  -- Control optimista.
  version integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT groups_pkey PRIMARY KEY (id),
  CONSTRAINT groups_owner_id_fkey FOREIGN KEY (owner_id)
    REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT groups_catalog_plan_id_fkey FOREIGN KEY (catalog_plan_id)
    REFERENCES catalog_plans (id) ON DELETE RESTRICT,
  CONSTRAINT groups_invite_code_key UNIQUE (invite_code),
  CONSTRAINT groups_name_check CHECK (char_length(btrim(name)) BETWEEN 2 AND 60),
  CONSTRAINT groups_status_check CHECK (status IN ('activo', 'cerrado')),
  CONSTRAINT groups_closed_at_check CHECK ((status = 'cerrado') = (closed_at IS NOT NULL)),
  CONSTRAINT groups_frozen_reason_check
    CHECK (frozen_reason IS NULL OR frozen_reason = 'titular_baneado'),
  CONSTRAINT groups_frozen_at_check CHECK ((frozen_at IS NULL) = (frozen_reason IS NULL)),
  CONSTRAINT groups_individual_price_currency_snapshot_check
    CHECK (individual_price_currency_snapshot IN ('USD', 'BS')),
  CONSTRAINT groups_plan_name_snapshot_check
    CHECK ((catalog_plan_id IS NULL) = (plan_name_snapshot IS NULL)),
  CONSTRAINT groups_price_cents_check CHECK (price_cents > 0),
  CONSTRAINT groups_currency_check CHECK (currency IN ('USD', 'BS')),
  -- RF-001-03: el tipo de cambio existe si y solo si el precio está en USD.
  CONSTRAINT groups_exchange_rate_currency_check
    CHECK ((currency = 'USD') = (exchange_rate IS NOT NULL)),
  CONSTRAINT groups_exchange_rate_check CHECK (exchange_rate IS NULL OR exchange_rate > 0),
  -- Bs 1,00 a Bs 5.000,00 (RN-001-09).
  CONSTRAINT groups_total_bs_cents_check CHECK (total_bs_cents BETWEEN 100 AND 500000),
  CONSTRAINT groups_billing_day_check CHECK (billing_day BETWEEN 1 AND 31),
  CONSTRAINT groups_total_slots_check CHECK (total_slots BETWEEN 2 AND 20),
```

## 0031_group_members.sql

> 0031_group_members: estadías de las personas en un grupo (spec 001, data-model.md §1; RN-001-01,
> RN-001-05, RF-001-19). Una fila por estadía; el titular tiene una fila con role = 'titular'.
> Volver al grupo es una fila nueva. Un cierre de grupo no cierra las filas (RF-001-18): left_at
> solo se llena por abandono, expulsión, mora o baneo.
> La FK de join_request_id a join_requests y su CHECK ligado a join_source los agrega la spec 010.
> Los disparadores de capacidad, titular y estadía inmutable van en 0032_group_triggers.sql.
> Una sola estadía activa por persona y grupo (RN-001-05).
> Un solo titular activo por grupo (RN-001-01).

- Tablas: `group_members`
- Disparadores: `group_members_set_updated_at`
- Índices: `group_members_active_uq`, `group_members_group_active_idx`, `group_members_owner_uq`, `group_members_user_idx`
- Fuente: `database/migrations/0031_group_members.sql`

```sql
CREATE TABLE group_members (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  group_id uuid NOT NULL,
  user_id uuid NOT NULL,
  role text NOT NULL,
  joined_at timestamptz NOT NULL DEFAULT now(),
  join_source text NOT NULL,
  join_request_id uuid NULL,
  left_at timestamptz NULL,
  left_reason text NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT group_members_pkey PRIMARY KEY (id),
  CONSTRAINT group_members_group_id_fkey FOREIGN KEY (group_id)
    REFERENCES groups (id) ON DELETE RESTRICT,
  CONSTRAINT group_members_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT group_members_role_check CHECK (role IN ('titular', 'miembro')),
  CONSTRAINT group_members_join_source_check CHECK (join_source IN ('creacion', 'solicitud')),
  CONSTRAINT group_members_left_reason_check
    CHECK (left_reason IN ('abandono', 'quitado', 'mora', 'baneo')),
  CONSTRAINT group_members_left_at_check CHECK ((left_at IS NULL) = (left_reason IS NULL))
);
```

## 0032_group_triggers.sql

> 0032_group_triggers: disparadores de groups y group_members (spec 001, data-model.md §2,
> versión aprobada en el PR #43). Imponen lo que no cabe en un CHECK: un titular coherente con
> owner_id, capacidad, estadías cerradas inmutables, cupos no menores que los miembros, máximo
> de 5 grupos activos por titular, copia del catálogo inmutable y grupo cerrado de solo lectura.
> El backend repite las validaciones para dar mensajes claros; aquí se garantiza que una carrera
> entre dos peticiones no rompa la regla.
> 
> set_updated_at ya está en ambas tablas (groups_set_updated_at en 0030 y

- Funciones: `group_members_check_capacity`, `group_members_forbid_left_change`, `groups_check_max_active_owned`, `groups_check_owner_member`, `groups_check_slots_not_below_members`, `groups_forbid_closed_change`, `groups_forbid_snapshot_change`, `groups_owner_member_consistency`
- Disparadores: `group_members_capacity`, `group_members_left_immutable`, `groups_closed_readonly`, `groups_immutable_snapshots`, `groups_max_active_owned`, `groups_slots_not_below_members`
- Fuente: `database/migrations/0032_group_triggers.sql`

## 0033_group_members_identity_immutable.sql

> 0033_group_members_identity_immutable: una estadía no cambia de grupo ni de persona (spec 001,
> data-model.md §2; RN-001-05, RN-001-09, CA-001-07, CA-001-16).
> group_members_capacity (0032) controla capacidad, grupo cerrado y congelado solo al insertar;
> sin este disparador, un UPDATE de group_id movía una estadía a un grupo lleno o cerrado y uno de
> user_id la pasaba a otra persona. Solo cambian role (transferencia de titularidad), left_at y
> left_reason (cierre de la estadía, que protege group_members_left_immutable) y updated_at.
> Orden de los BEFORE UPDATE (alfabético): group_members_identity_immutable,
> group_members_left_immutable, group_members_set_updated_at.

- Funciones: `group_members_forbid_identity_change`
- Disparadores: `group_members_identity_immutable`
- Fuente: `database/migrations/0033_group_members_identity_immutable.sql`
