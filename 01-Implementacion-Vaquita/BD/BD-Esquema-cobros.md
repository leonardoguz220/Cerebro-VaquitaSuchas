---
title: "BD · esquema: Ciclos, cobros y comprobantes"
tipo: bd
area: implementacion
parent: "[[BD]]"
date: 2026-10-29
tags: [area/implementacion, bd, migraciones, spec-002]
related: ["[[Spec-002-cobros-y-pagos]]", "[[BD-Migraciones]]"]
---

> Padre: [[BD]]

# Esquema: Ciclos, cobros y comprobantes

Migraciones 0040-0045. Spec: [[Spec-002-cobros-y-pagos]] (modelo de datos en la nota de la spec). Las restricciones únicas, claves foráneas, `CHECK` y disparadores refuerzan en la base las reglas que valida el backend ([[Reglas-de-dominio]]). Nunca se edita una migración ya fusionada en `main` ([[Runbook-migrar-produccion]]).

## 0040_billing_cycles.sql

> 0040_billing_cycles: ciclos de cobro, uno por grupo y período (spec 002, data-model.md §1 con los
> ajustes H4 y M2 aprobados el 2026-10-19; RF-002-01, RF-002-02, RF-002-03, RN-002-02,
> RN-002-09, CA-002-02).
> Guarda la copia (snapshot) de precio, tipo de cambio y cuotas vigentes al corte; el panel
> (spec 006) y la reputación (spec 007) leen de aquí. Ciclo inicial y períodos: spec 001,
> research.md R1 y R2.
> RF-002-04: un solo ciclo inicial por grupo.
> Último ciclo del grupo e historial por período.

- Tablas: `billing_cycles`
- Funciones: `billing_cycles_forbid_change`
- Disparadores: `billing_cycles_immutable`, `billing_cycles_set_updated_at`
- Índices: `billing_cycles_group_period_idx`, `billing_cycles_initial_uq`
- Fuente: `database/migrations/0040_billing_cycles.sql`

```sql
CREATE TABLE billing_cycles (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  group_id uuid NOT NULL,
  -- Mes del corte, 'YYYY-MM'.
  period text NOT NULL,
  -- Titular al emitir el ciclo: la spec 006 le atribuye la cuota de referencia aunque luego se
  -- transfiera la titularidad.
  owner_id uuid NOT NULL,
  cycle_type text NOT NULL,
  -- Fecha de corte en calendario de La Paz (ajustada, RN-001-06). Ciclo inicial: fecha de
  -- creación del grupo.
  cut_date date NOT NULL,
  -- cut_date + 3 días (RF-002-03). Informativa en el ciclo inicial.
  due_date date NOT NULL,
  -- Momento real en que se creó el ciclo (puede ser posterior al corte si hubo caída).
  issued_at timestamptz NOT NULL,
  -- Copia de la suscripción al corte (RN-002-02).
  price_cents bigint NOT NULL,
  currency text NOT NULL,
  -- Bs por 1 USD.
  exchange_rate numeric(10, 4) NULL,
  total_bs_cents bigint NOT NULL,
  -- Miembros activos, titular incluido.
  member_count smallint NOT NULL,
  -- floor(total_bs_cents / member_count).
  base_share_cents bigint NOT NULL,
  -- base + resto: referencia del titular (RN-001-10).
  owner_share_cents bigint NOT NULL,
  remainder_cents bigint NOT NULL,
  -- Solo el ciclo inicial: mientras sea NULL se recalcula con cada ingreso o salida (research 001
  -- R1).
  finalized_at timestamptz NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT billing_cycles_pkey PRIMARY KEY (id),
  CONSTRAINT billing_cycles_group_id_fkey FOREIGN KEY (group_id)
    REFERENCES groups (id) ON DELETE RESTRICT,
  CONSTRAINT billing_cycles_owner_id_fkey FOREIGN KEY (owner_id)
    REFERENCES users (id) ON DELETE RESTRICT,
  -- RN-002-09: un ciclo por grupo y período.
  CONSTRAINT billing_cycles_group_id_period_key UNIQUE (group_id, period),
  CONSTRAINT billing_cycles_period_check CHECK (period ~ '^[0-9]{4}-(0[1-9]|1[0-2])$'),
  CONSTRAINT billing_cycles_cycle_type_check CHECK (cycle_type IN ('inicial', 'regular')),
  CONSTRAINT billing_cycles_price_cents_check CHECK (price_cents > 0),
  CONSTRAINT billing_cycles_currency_check CHECK (currency IN ('USD', 'BS')),
  -- El tipo de cambio existe si y solo si el precio está en USD (RF-001-03).
  CONSTRAINT billing_cycles_exchange_rate_currency_check
    CHECK ((currency = 'USD') = (exchange_rate IS NOT NULL)),
  CONSTRAINT billing_cycles_total_bs_cents_check CHECK (total_bs_cents > 0),
  CONSTRAINT billing_cycles_member_count_check CHECK (member_count >= 1),
  CONSTRAINT billing_cycles_base_share_cents_check CHECK (base_share_cents >= 0),
  -- H4: con la suma igual al total, obliga a que la base sea floor y el resto lo asuma el titular.
  CONSTRAINT billing_cycles_remainder_cents_check
    CHECK (remainder_cents >= 0 AND remainder_cents < member_count),
  -- Un ciclo regular nace finalizado; solo el inicial puede estar abierto.
  CONSTRAINT billing_cycles_finalized_at_check
    CHECK (cycle_type = 'inicial' OR finalized_at IS NOT NULL),
  -- RN-001-02: la suma de las cuotas es igual al total.
  CONSTRAINT billing_cycles_shares_sum_check
    CHECK (base_share_cents * (member_count - 1) + owner_share_cents = total_bs_cents),
  CONSTRAINT billing_cycles_owner_share_cents_check
    CHECK (owner_share_cents - base_share_cents = remainder_cents),
  -- M2: el período es el mes del corte.
  CONSTRAINT billing_cycles_period_cut_date_check CHECK (period = to_char(cut_date, 'YYYY-MM')),
  -- M2, RF-002-03: el vencimiento es el corte más 3 días.
  CONSTRAINT billing_cycles_due_date_check CHECK (due_date = cut_date + 3)
);
```

## 0041_charges.sql

> 0041_charges: cobros, uno por miembro y período (spec 002, data-model.md §1 con los ajustes H2 y
> H3 aprobados el 2026-10-19; RF-002-02, RF-002-03, RF-002-04, RN-002-02, RN-002-08, RN-002-10,
> CA-002-02, CA-002-16).
> La copia (precio, moneda, tipo de cambio, total, miembros y monto) se fija al emitir y no cambia.
> Los disparadores de negocio (copia inmutable, estado inicial, transiciones, estados finales de
> solo lectura, titular sin cobro y coherencia con el ciclo) van en 0043_charge_triggers.sql.
> La FK de join_request_id a join_requests la agrega la spec 010.
> RF-002-04: un cobro por grupo, miembro y período. Parcial para que un cobro cancelado no impida

- Tablas: `charges`
- Disparadores: `charges_set_updated_at`
- Índices: `charges_cycle_idx`, `charges_group_period_idx`, `charges_member_period_uq`, `charges_overdue_idx`, `charges_user_status_idx`
- Fuente: `database/migrations/0041_charges.sql`

```sql
CREATE TABLE charges (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  group_id uuid NOT NULL,
  -- Quien debe pagar (nunca el titular del grupo, RN-002-03).
  user_id uuid NOT NULL,
  cycle_id uuid NOT NULL,
  -- Copia del período del ciclo (consultas e índice).
  period text NOT NULL,
  -- RN-002-10: cobro del ciclo o cobro de ingreso de un nuevo miembro (spec 010).
  origin text NOT NULL,
  join_request_id uuid NULL,
  status text NOT NULL DEFAULT 'pendiente',
  -- Copia inmutable (RF-002-02, RN-002-02). amount_cents es la cuota en Bs.
  amount_cents bigint NOT NULL,
  price_cents bigint NOT NULL,
  currency text NOT NULL,
  -- Bs por 1 USD.
  exchange_rate numeric(10, 4) NULL,
  total_bs_cents bigint NOT NULL,
  member_count smallint NOT NULL,
  -- Fecha real de emisión.
  issued_at timestamptz NOT NULL,
  -- Instante exclusivo: el mayor entre el inicio del día corte + 4 en La Paz e issued_at + 3 días
  -- (research 001 R2, RF-002-03).
  due_at timestamptz NOT NULL,
  -- Datos para la reputación (RN-002-08): primera subida de comprobante.
  first_submitted_at timestamptz NULL,
  -- Momento en que pasó a pagado (pago manual: fecha indicada por el titular).
  paid_at timestamptz NULL,
  -- Titular que confirmó o registró el pago.
  settled_by uuid NULL,
  settlement text NULL,
  manual_note text NULL,
  -- Cancelación.
  cancelled_at timestamptz NULL,
  cancelled_by uuid NULL,
  cancel_reason text NULL,
  -- Control optimista.
  version integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT charges_pkey PRIMARY KEY (id),
  CONSTRAINT charges_group_id_fkey FOREIGN KEY (group_id)
    REFERENCES groups (id) ON DELETE RESTRICT,
  CONSTRAINT charges_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT charges_cycle_id_fkey FOREIGN KEY (cycle_id)
    REFERENCES billing_cycles (id) ON DELETE RESTRICT,
  CONSTRAINT charges_settled_by_fkey FOREIGN KEY (settled_by)
    REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT charges_cancelled_by_fkey FOREIGN KEY (cancelled_by)
    REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT charges_origin_check CHECK (origin IN ('ciclo', 'ingreso')),
  -- Solo el cobro de ingreso nace de una solicitud de ingreso.
  CONSTRAINT charges_join_request_id_check
    CHECK ((origin = 'ingreso') = (join_request_id IS NOT NULL)),
  CONSTRAINT charges_status_check
    CHECK (status IN ('pendiente', 'en_revision', 'pagado', 'atrasado', 'cancelado')),
  CONSTRAINT charges_amount_cents_check CHECK (amount_cents > 0),
  -- H3: los mismos CHECK de la copia que el ciclo.
  CONSTRAINT charges_price_cents_check CHECK (price_cents > 0),
  CONSTRAINT charges_currency_check CHECK (currency IN ('USD', 'BS')),
  CONSTRAINT charges_exchange_rate_currency_check
    CHECK ((currency = 'USD') = (exchange_rate IS NOT NULL)),
  CONSTRAINT charges_exchange_rate_check CHECK (exchange_rate IS NULL OR exchange_rate > 0),
  CONSTRAINT charges_total_bs_cents_check CHECK (total_bs_cents > 0),
  CONSTRAINT charges_member_count_check CHECK (member_count >= 1),
  CONSTRAINT charges_settlement_check CHECK (settlement IN ('comprobante', 'manual', 'ingreso')),
  CONSTRAINT charges_manual_note_check CHECK (char_length(manual_note) <= 200),
  CONSTRAINT charges_cancel_reason_check
```

## 0042_receipts.sql

> 0042_receipts: comprobantes de pago y reserva de referencias por grupo (spec 002,
> data-model.md §1 `receipts` y `payment_references`; RF-002-06, RF-002-07, RF-002-08,
> RN-002-06, RN-002-08, CA-002-05, CA-002-26, CA-002-27, CA-010-41).
> El archivo vive en el almacén privado (Supabase Storage); aquí solo su clave.
> El comprobante pasa a 'confirmado' o 'rechazado' cuando el titular decide, y a 'reemplazado'
> cuando el miembro sube otro mientras el cobro está 'en_revision' (RF-002-08). Las transiciones
> las decide el backend; la base solo garantiza un comprobante 'vigente' por cobro y que las
> columnas del archivo no cambien.

- Tablas: `receipts`, `payment_references`
- Funciones: `receipts_forbid_file_change`
- Disparadores: `payment_references_set_updated_at`, `receipts_file_immutable`, `receipts_set_updated_at`
- Índices: `payment_references_active_uq`, `payment_references_source_idx`, `receipts_charge_idx`, `receipts_one_active_uq`, `receipts_retention_idx`
- Fuente: `database/migrations/0042_receipts.sql`

```sql
CREATE TABLE receipts (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  charge_id uuid NOT NULL,
  uploaded_by uuid NOT NULL,
  -- La "última subida" de la reputación (spec 007, RF-007-12).
  uploaded_at timestamptz NOT NULL DEFAULT now(),
  -- Clave en el almacén, p. ej. receipts/<groupId>/<chargeId>/<uuid>.jpg.
  file_key text NOT NULL,
  mime text NOT NULL,
  size_bytes integer NOT NULL,
  method text NOT NULL,
  -- Texto como lo escribió la persona; la clave normalizada va en payment_references.
  reference text NOT NULL,
  status text NOT NULL DEFAULT 'vigente',
  -- Retención de 2 meses (RN-002-06): el archivo se borra del almacén y la fila queda.
  file_deleted_at timestamptz NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT receipts_pkey PRIMARY KEY (id),
  CONSTRAINT receipts_charge_id_fkey FOREIGN KEY (charge_id)
    REFERENCES charges (id) ON DELETE RESTRICT,
  CONSTRAINT receipts_uploaded_by_fkey FOREIGN KEY (uploaded_by)
    REFERENCES users (id) ON DELETE RESTRICT,
  -- CA-002-05: solo imagen JPEG o PNG, o PDF.
  CONSTRAINT receipts_mime_check CHECK (mime IN ('image/jpeg', 'image/png', 'application/pdf')),
  -- CA-002-05: de 1 byte a 5 MB.
  CONSTRAINT receipts_size_bytes_check CHECK (size_bytes BETWEEN 1 AND 5242880),
  CONSTRAINT receipts_method_check CHECK (method IN ('qr', 'transferencia')),
  CONSTRAINT receipts_reference_check CHECK (char_length(btrim(reference)) BETWEEN 1 AND 100),
  CONSTRAINT receipts_status_check
    CHECK (status IN ('vigente', 'reemplazado', 'rechazado', 'confirmado'))
);
```

```sql
CREATE TABLE payment_references (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  group_id uuid NOT NULL,
  reference_key text NOT NULL,
  source_type text NOT NULL,
  source_id uuid NOT NULL,
  reserved_at timestamptz NOT NULL DEFAULT now(),
  released_at timestamptz NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT payment_references_pkey PRIMARY KEY (id),
  CONSTRAINT payment_references_group_id_fkey FOREIGN KEY (group_id)
    REFERENCES groups (id) ON DELETE RESTRICT,
  CONSTRAINT payment_references_source_type_check
    CHECK (source_type IN ('receipt', 'join_request'))
);
```

## 0043_charge_triggers.sql

> 0043_charge_triggers: disparadores de charges (spec 002, data-model.md §1, tabla de
> disparadores con los ajustes H2, H3 y M1 aprobados el 2026-10-19; RN-002-01, RN-002-02,
> RN-002-03, RN-002-10, RNF-002-03, CA-002-16, CA-002-21, constitución II).
> Imponen lo que no cabe en un CHECK: copia inmutable, estado inicial según el origen, solo las
> transiciones de RN-002-01, estados finales de solo lectura, titular sin cobro y coherencia con
> el ciclo. El backend repite las validaciones (función pura transition() de
> domain/charge-state.ts) para dar mensajes claros; la lista de transiciones está duplicada a
> propósito para que un error de programación no corrompa el historial.

- Funciones: `charges_check_cycle_consistency`, `charges_check_initial_status`, `charges_check_not_owner`, `charges_check_transition`, `charges_forbid_final_change`, `charges_forbid_snapshot_change`
- Disparadores: `charges_cycle_consistency`, `charges_final_readonly`, `charges_initial_status`, `charges_not_owner`, `charges_snapshot_immutable`, `charges_transition_guard`
- Fuente: `database/migrations/0043_charge_triggers.sql`

## 0044_charge_events.sql

> 0044_charge_events: línea de tiempo de cada cobro (spec 002, data-model.md §1 `charge_events`
> con el ajuste H1; RF-002-17, RNF-002-04).
> Es de solo anexado (forbid_update_delete de 0001): un evento no se corrige ni se borra.
> group_id es una copia para consultar el historial del grupo sin unir con charges.
> metadata guarda datos propios del evento, p. ej. { "receiptId": "…", "invalidReceipt": true,
> "paidAt": "…" }; la reputación (spec 007) lee metadata.invalidReceipt.
> El seed de desarrollo de cobros va en T047 (M3), no aquí.
> Línea de tiempo de un cobro (RF-002-17).

- Tablas: `charge_events`
- Disparadores: `charge_events_forbid_update_delete`, `charge_events_set_updated_at`
- Índices: `charge_events_charge_idx`, `charge_events_group_idx`
- Fuente: `database/migrations/0044_charge_events.sql`

```sql
CREATE TABLE charge_events (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  charge_id uuid NOT NULL,
  group_id uuid NOT NULL,
  type text NOT NULL,
  actor_kind text NOT NULL,
  actor_id uuid NULL,
  from_status text NULL,
  to_status text NULL,
  -- Motivo de rechazo o cancelación, o nota del pago manual.
  reason text NULL,
  metadata jsonb NOT NULL DEFAULT '{}',
  occurred_at timestamptz NOT NULL DEFAULT now(),
  -- updated_at = created_at: la tabla es de solo anexado.
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT charge_events_pkey PRIMARY KEY (id),
  CONSTRAINT charge_events_charge_id_fkey FOREIGN KEY (charge_id)
    REFERENCES charges (id) ON DELETE RESTRICT,
  CONSTRAINT charge_events_group_id_fkey FOREIGN KEY (group_id)
    REFERENCES groups (id) ON DELETE RESTRICT,
  CONSTRAINT charge_events_actor_id_fkey FOREIGN KEY (actor_id)
    REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT charge_events_type_check
    CHECK (type IN ('generado', 'ingreso_registrado', 'comprobante_subido',
                    'comprobante_reemplazado', 'rechazado', 'confirmado', 'pago_manual',
                    'atrasado', 'cancelado', 'retiro_por_mora')),
  CONSTRAINT charge_events_actor_kind_check CHECK (actor_kind IN ('usuario', 'sistema')),
  -- Un evento de usuario nombra a la persona; uno del sistema no tiene actor.
  CONSTRAINT charge_events_actor_id_check
    CHECK ((actor_kind = 'usuario') = (actor_id IS NOT NULL)),
  -- H1: los estados son los de charges (RN-002-01).
  CONSTRAINT charge_events_from_status_check
    CHECK (from_status IS NULL
           OR from_status IN ('pendiente', 'en_revision', 'pagado', 'atrasado', 'cancelado')),
  CONSTRAINT charge_events_to_status_check
    CHECK (to_status IS NULL
           OR to_status IN ('pendiente', 'en_revision', 'pagado', 'atrasado', 'cancelado'))
);
```

## 0045_charge_events_group_and_review.sql

> 0045_charge_events_group_and_review: copia del grupo en los eventos y comprobante en revisión
> (spec 002, data-model.md §1; RF-002-17, RN-002-01, RN-002-08). Revisión QA: BUG-008, BUG-015.
> 
> BUG-008: charge_events.group_id es una copia del grupo del cobro para el historial del grupo
> (charge_events_group_idx); nada impedía guardar otro grupo y mostrar un cobro ajeno.
> BUG-015: en_revision ocurre al subir un comprobante (RN-002-01), y first_submitted_at es la
> fecha que usa la reputación (RN-002-08). El backend la fija en el mismo UPDATE
> (first_submitted_at = COALESCE(first_submitted_at, ...)).

- Funciones: `charge_events_check_group`
- Disparadores: `charge_events_group_matches_charge`
- Fuente: `database/migrations/0045_charge_events_group_and_review.sql`
