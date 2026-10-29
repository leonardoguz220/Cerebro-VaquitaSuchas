---
title: "BD · esquema: Faltante de grupo"
tipo: bd
area: implementacion
parent: "[[BD]]"
date: 2026-10-29
tags: [area/implementacion, bd, migraciones, spec-011]
related: ["[[Spec-011-faltante-de-grupo]]", "[[BD-Migraciones]]"]
---

> Padre: [[BD]]

# Esquema: Faltante de grupo

Migraciones 0110. Spec: [[Spec-011-faltante-de-grupo]] (modelo de datos en la nota de la spec). Las restricciones únicas, claves foráneas, `CHECK` y disparadores refuerzan en la base las reglas que valida el backend ([[Reglas-de-dominio]]). Nunca se edita una migración ya fusionada en `main` ([[Runbook-migrar-produccion]]).

## 0110_shortfalls.sql

> 0110_shortfalls: faltante de grupo (spec 011, data-model.md; RF-011-04, RF-011-05, RF-011-08 a
> RF-011-15, RN-011-01 a RN-011-06).
> Tres tablas: la ronda de regularización que abre el titular, una fila por miembro afectado
> (con su pago adicional y su devolución) y la línea de tiempo de solo anexado.
> No se modifica charges: el pago adicional no es un cobro del ciclo (plan.md, D1).
> RF-011-05: a lo más una ronda por grupo, período y número; y una sola abierta por grupo.
> Barrido de plazos (RF-011-11).
> "Mis faltantes" (HU-011-02).

- Tablas: `shortfall_rounds`, `shortfall_responses`, `shortfall_events`
- Funciones: `shortfall_responses_check_not_owner`, `shortfall_responses_check_update`, `shortfall_rounds_check_transition`, `shortfall_rounds_forbid_snapshot_change`
- Disparadores: `shortfall_events_forbid_update_delete`, `shortfall_events_set_updated_at`, `shortfall_responses_check_update`, `shortfall_responses_not_owner`, `shortfall_responses_set_updated_at`, `shortfall_rounds_set_updated_at`, `shortfall_rounds_snapshot_immutable`, `shortfall_rounds_transition_guard`
- Índices: `shortfall_events_response_idx`, `shortfall_events_round_idx`, `shortfall_responses_extra_sweep_idx`, `shortfall_responses_refund_sweep_idx`, `shortfall_responses_round_idx`, `shortfall_responses_user_idx`, `shortfall_rounds_one_open_uq`, `shortfall_rounds_period_number_uq`, `shortfall_rounds_sweep_idx`
- Fuente: `database/migrations/0110_shortfalls.sql`

```sql
CREATE TABLE shortfall_rounds (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  group_id uuid NOT NULL,
  cycle_id uuid NOT NULL,
  -- Copia del período del ciclo, 'AAAA-MM'.
  period text NOT NULL,
  round_number smallint NOT NULL DEFAULT 1,
  status text NOT NULL DEFAULT 'abierta',
  -- Copia del ciclo: no se relee el precio ni el tipo de cambio vigentes (RN-011-01).
  total_bs_cents bigint NOT NULL,
  -- Miembros que se quedan, titular incluido.
  member_count_after smallint NOT NULL,
  -- floor(total / member_count_after).
  base_share_cents bigint NOT NULL,
  -- base + resto: referencia del titular (RN-001-10).
  owner_share_cents bigint NOT NULL,
  -- Suma de lo que deben agregar los afectados.
  shortfall_cents bigint NOT NULL,
  opened_by uuid NOT NULL,
  opened_at timestamptz NOT NULL,
  -- Plazo para responder y plazo máximo para pagar (RF-011-04).
  respond_by timestamptz NOT NULL,
  pay_by timestamptz NOT NULL,
  closed_at timestamptz NULL,
  -- Control optimista.
  version integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT shortfall_rounds_pkey PRIMARY KEY (id),
  CONSTRAINT shortfall_rounds_group_id_fkey FOREIGN KEY (group_id)
    REFERENCES groups (id) ON DELETE RESTRICT,
  CONSTRAINT shortfall_rounds_cycle_id_fkey FOREIGN KEY (cycle_id)
    REFERENCES billing_cycles (id) ON DELETE RESTRICT,
  CONSTRAINT shortfall_rounds_opened_by_fkey FOREIGN KEY (opened_by)
    REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT shortfall_rounds_status_check CHECK (status IN ('abierta', 'cerrada', 'cancelada')),
  CONSTRAINT shortfall_rounds_round_number_check CHECK (round_number BETWEEN 1 AND 2),
  CONSTRAINT shortfall_rounds_period_check CHECK (period ~ '^[0-9]{4}-(0[1-9]|1[0-2])$'),
  CONSTRAINT shortfall_rounds_total_check CHECK (total_bs_cents > 0),
  CONSTRAINT shortfall_rounds_member_count_check CHECK (member_count_after >= 2),
  CONSTRAINT shortfall_rounds_base_share_check CHECK (base_share_cents > 0),
  CONSTRAINT shortfall_rounds_owner_share_check CHECK (owner_share_cents >= base_share_cents),
  CONSTRAINT shortfall_rounds_shortfall_check CHECK (shortfall_cents > 0),
  CONSTRAINT shortfall_rounds_deadlines_check
    CHECK (respond_by > opened_at AND pay_by >= respond_by),
  -- Una ronda no abierta tiene fecha de cierre, y solo ella.
  CONSTRAINT shortfall_rounds_closed_at_check CHECK ((status = 'abierta') = (closed_at IS NULL))
);
```

```sql
CREATE TABLE shortfall_responses (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  round_id uuid NOT NULL,
  user_id uuid NOT NULL,
  -- Lo que la persona pagó en el período y lo que debe agregar (cotización, inmutable).
  paid_cents bigint NOT NULL,
  extra_due_cents bigint NOT NULL,
  choice text NOT NULL DEFAULT 'pendiente',
  responded_at timestamptz NULL,
  -- Pago adicional (RF-011-10).
  extra_status text NOT NULL DEFAULT 'no_aplica',
  extra_method text NULL,
  extra_reference text NULL,
  extra_informed_at timestamptz NULL,
  extra_confirmed_at timestamptz NULL,
  extra_confirmed_by uuid NULL,
  extra_deadline_at timestamptz NULL,
  extra_reject_reason text NULL,
  -- Devolución (RF-011-12, RF-011-13).
  refund_status text NOT NULL DEFAULT 'no_aplica',
  refund_amount_cents bigint NULL,
  refund_method text NULL,
  refund_reference text NULL,
  refund_opened_at timestamptz NULL,
  refund_due_at timestamptz NULL,
  refund_sent_at timestamptz NULL,
  refund_confirmed_at timestamptz NULL,
  refund_disputed_at timestamptz NULL,
  refund_dispute_reason text NULL,
  -- Control optimista.
  version integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT shortfall_responses_pkey PRIMARY KEY (id),
  CONSTRAINT shortfall_responses_round_id_fkey FOREIGN KEY (round_id)
    REFERENCES shortfall_rounds (id) ON DELETE RESTRICT,
  CONSTRAINT shortfall_responses_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT shortfall_responses_extra_confirmed_by_fkey FOREIGN KEY (extra_confirmed_by)
    REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT shortfall_responses_round_user_uq UNIQUE (round_id, user_id),
  CONSTRAINT shortfall_responses_choice_check
    CHECK (choice IN ('pendiente', 'cubrir', 'devolucion', 'sin_respuesta')),
  CONSTRAINT shortfall_responses_extra_status_check
    CHECK (extra_status IN ('no_aplica', 'pendiente_pago', 'informado', 'confirmado', 'vencido')),
  CONSTRAINT shortfall_responses_refund_status_check
    CHECK (refund_status IN ('no_aplica', 'pendiente', 'enviada', 'confirmada', 'disputada')),
  CONSTRAINT shortfall_responses_paid_check CHECK (paid_cents > 0),
  CONSTRAINT shortfall_responses_extra_due_check CHECK (extra_due_cents > 0),
  CONSTRAINT shortfall_responses_extra_method_check
    CHECK (extra_method IS NULL OR extra_method IN ('qr', 'transferencia')),
  CONSTRAINT shortfall_responses_refund_method_check
    CHECK (refund_method IS NULL OR refund_method IN ('qr', 'transferencia', 'efectivo')),
  CONSTRAINT shortfall_responses_extra_reference_check
    CHECK (extra_reference IS NULL OR char_length(btrim(extra_reference)) BETWEEN 1 AND 100),
  CONSTRAINT shortfall_responses_refund_reference_check
    CHECK (refund_reference IS NULL OR char_length(btrim(refund_reference)) BETWEEN 1 AND 100),
  CONSTRAINT shortfall_responses_reject_reason_check
    CHECK (extra_reject_reason IS NULL OR char_length(btrim(extra_reject_reason)) BETWEEN 5 AND 200),
  CONSTRAINT shortfall_responses_dispute_reason_check
    CHECK (refund_dispute_reason IS NULL
           OR char_length(btrim(refund_dispute_reason)) BETWEEN 5 AND 300),
  -- RF-011-08: sin respuesta no hay pago adicional ni devolución todavía.
  CONSTRAINT shortfall_responses_pending_check
    CHECK (choice <> 'pendiente' OR (extra_status = 'no_aplica' AND refund_status = 'no_aplica')),
  -- Cubrir abre el pago adicional; solo vence para volverse devolución (RF-011-11).
  CONSTRAINT shortfall_responses_extra_choice_check
    CHECK (extra_status = 'no_aplica'
           OR choice = 'cubrir'
           OR (extra_status = 'vencido' AND choice = 'sin_respuesta')),
```

```sql
CREATE TABLE shortfall_events (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  round_id uuid NOT NULL,
  response_id uuid NULL,
  type text NOT NULL,
  actor_kind text NOT NULL,
  actor_id uuid NULL,
  reason text NULL,
  metadata jsonb NOT NULL DEFAULT '{}',
  occurred_at timestamptz NOT NULL DEFAULT now(),
  -- updated_at = created_at: la tabla es de solo anexado.
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT shortfall_events_pkey PRIMARY KEY (id),
  CONSTRAINT shortfall_events_round_id_fkey FOREIGN KEY (round_id)
    REFERENCES shortfall_rounds (id) ON DELETE RESTRICT,
  CONSTRAINT shortfall_events_response_id_fkey FOREIGN KEY (response_id)
    REFERENCES shortfall_responses (id) ON DELETE RESTRICT,
  CONSTRAINT shortfall_events_actor_id_fkey FOREIGN KEY (actor_id)
    REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT shortfall_events_type_check
    CHECK (type IN ('ronda_abierta', 'ronda_cancelada', 'ronda_cerrada', 'cubrir_elegido',
                    'devolucion_elegida', 'sin_respuesta', 'pago_informado', 'pago_confirmado',
                    'pago_rechazado', 'pago_vencido', 'devolucion_registrada',
                    'devolucion_confirmada', 'devolucion_disputada')),
  CONSTRAINT shortfall_events_actor_kind_check CHECK (actor_kind IN ('usuario', 'sistema')),
  CONSTRAINT shortfall_events_actor_id_check CHECK ((actor_kind = 'usuario') = (actor_id IS NOT NULL))
);
```
