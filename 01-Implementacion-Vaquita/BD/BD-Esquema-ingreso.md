---
title: "BD · esquema: Solicitudes de ingreso, chat y reclamos"
tipo: bd
area: bd
parent: "[[BD]]"
date: 2026-10-29
tags: [area/bd, bd, migraciones, spec-010]
related: ["[[Spec-010-solicitudes-de-ingreso]]", "[[BD-Migraciones]]"]
---

> Padre: [[BD]]

# Esquema: Solicitudes de ingreso, chat y reclamos

Migraciones 0050-0056. Spec: [[Spec-010-solicitudes-de-ingreso]] (modelo de datos en la nota de la spec). Las restricciones únicas, claves foráneas, `CHECK` y disparadores refuerzan en la base las reglas que valida el backend ([[Reglas-de-dominio]]). Nunca se edita una migración ya fusionada en `main` ([[Runbook-migrar-produccion]]).

## 0050_join_requests.sql

> 0050_join_requests: solicitudes de ingreso a un grupo (spec 010, data-model.md §1 con los
> ajustes H1 y L1 aprobados el 2026-10-19; RF-010-02, RF-010-13, RF-010-17, RF-010-20, RF-010-28,
> RN-010-01, RN-010-02, RN-010-05, RN-010-10, RNF-010-04, RNF-010-09).
> Una fila por solicitud: estado, plazos, copia de la cotización y de los datos de pago,
> comprobante y cierre. La línea de tiempo vive en join_request_events (0051).
> Los disparadores de negocio (estado inicial, transiciones, cotización inmutable, estados
> finales de solo lectura, límite de 5 activas, no miembro y grupo abierto) van en
> 0054_join_request_triggers.sql. No hay control de capacidad en esta tabla (H1): lo impone el

- Tablas: `join_requests`
- Disparadores: `join_requests_set_updated_at`
- Índices: `join_requests_active_uq`, `join_requests_applicant_idx`, `join_requests_group_idx`, `join_requests_reserved_idx`, `join_requests_retention_idx`, `join_requests_sweep_idx`
- Fuente: `database/migrations/0050_join_requests.sql`

```sql
CREATE TABLE join_requests (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  group_id uuid NOT NULL,
  applicant_id uuid NOT NULL,
  -- 'publicacion': solicitud a un cupo publicado (spec 008).
  source text NOT NULL DEFAULT 'codigo',
  listing_id uuid NULL,
  status text NOT NULL DEFAULT 'abierta',
  opened_at timestamptz NOT NULL,
  -- min(opened_at + 24 h, fin de la ventana de ingreso al abrir) (RN-010-05).
  open_deadline_at timestamptz NOT NULL,
  -- Cotización y datos de pago: se fijan al enviar los datos de pago (RN-010-01, RN-010-10).
  quote_amount_cents bigint NULL,
  quote_price_cents bigint NULL,
  quote_currency text NULL,
  -- Bs por 1 USD.
  quote_exchange_rate numeric(10, 4) NULL,
  quote_total_bs_cents bigint NULL,
  -- Miembros actuales + 1.
  quote_member_count smallint NULL,
  payment_text text NULL,
  -- Copia propia del QR (no depende de cambios posteriores del grupo).
  payment_qr_key text NULL,
  payment_qr_mime text NULL,
  payment_sent_at timestamptz NULL,
  -- payment_sent_at + 15 min (+15 si hay prórroga).
  pay_deadline_at timestamptz NULL,
  -- Una sola prórroga (RF-010-28).
  extended_at timestamptz NULL,
  -- Comprobante del solicitante (RF-010-13).
  proof_key text NULL,
  proof_mime text NULL,
  proof_size_bytes integer NULL,
  proof_method text NULL,
  proof_reference text NULL,
  proof_uploaded_at timestamptz NULL,
  -- proof_uploaded_at + 60 min (RF-010-17).
  decision_deadline_at timestamptz NULL,
  -- Recordatorio a los 30 min (CA-010-14).
  reminder_sent_at timestamptz NULL,
  -- Cierre.
  final_at timestamptz NULL,
  final_reason text NULL,
  -- Titular que confirmó, rechazó o registró efectivo.
  decided_by uuid NULL,
  reject_reason text NULL,
  -- El titular marcó el comprobante como falso (RF-010-16).
  rejected_as_false boolean NOT NULL DEFAULT false,
  accepted_method text NULL,
  -- Cobro de ingreso creado al aceptar (RN-010-03).
  charge_id uuid NULL,
  -- Retención de 2 meses (RNF-010-09).
  content_purged_at timestamptz NULL,
  -- Control optimista.
  version integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT join_requests_pkey PRIMARY KEY (id),
  CONSTRAINT join_requests_group_id_fkey FOREIGN KEY (group_id)
    REFERENCES groups (id) ON DELETE RESTRICT,
  CONSTRAINT join_requests_applicant_id_fkey FOREIGN KEY (applicant_id)
    REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT join_requests_decided_by_fkey FOREIGN KEY (decided_by)
    REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT join_requests_charge_id_fkey FOREIGN KEY (charge_id)
    REFERENCES charges (id) ON DELETE RESTRICT,
  -- Checks de columna.
  CONSTRAINT join_requests_source_check CHECK (source IN ('codigo', 'publicacion')),
  CONSTRAINT join_requests_listing_id_check
    CHECK ((source = 'publicacion') = (listing_id IS NOT NULL)),
```

## 0051_join_request_events.sql

> 0051_join_request_events: línea de tiempo de cada solicitud de ingreso (spec 010,
> data-model.md §1 `join_request_events`; RF-010-27, RNF-010-08, CA-010-35).
> Es de solo anexado (forbid_update_delete de 0001): un evento no se corrige ni se borra, y sirve
> de evidencia para los reclamos (spec 009).
> metadata guarda datos propios del evento (p. ej. la cotización enviada o el id del reclamo).
> Línea de tiempo de una solicitud (RF-010-27).
> Solo anexado. Los BEFORE triggers se disparan en orden alfabético de nombre, así que
> join_request_events_forbid_update_delete corre antes que join_request_events_set_updated_at y

- Tablas: `join_request_events`
- Disparadores: `join_request_events_forbid_update_delete`, `join_request_events_set_updated_at`
- Índices: `join_request_events_request_idx`
- Fuente: `database/migrations/0051_join_request_events.sql`

```sql
CREATE TABLE join_request_events (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  request_id uuid NOT NULL,
  type text NOT NULL,
  actor_kind text NOT NULL,
  actor_id uuid NULL,
  from_status text NULL,
  to_status text NULL,
  -- Motivo del rechazo, de la cancelación o de la expiración.
  reason text NULL,
  metadata jsonb NOT NULL DEFAULT '{}',
  occurred_at timestamptz NOT NULL DEFAULT now(),
  -- updated_at = created_at: la tabla es de solo anexado.
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT join_request_events_pkey PRIMARY KEY (id),
  CONSTRAINT join_request_events_request_id_fkey FOREIGN KEY (request_id)
    REFERENCES join_requests (id) ON DELETE RESTRICT,
  CONSTRAINT join_request_events_actor_id_fkey FOREIGN KEY (actor_id)
    REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT join_request_events_type_check
    CHECK (type IN ('abierta', 'datos_pago_enviados', 'plazo_prorrogado', 'comprobante_subido',
                    'confirmada', 'efectivo_registrado', 'rechazada', 'cancelada', 'expirada',
                    'recordatorio_enviado', 'reclamo_abierto', 'reclamo_respondido',
                    'reclamo_resuelto')),
  CONSTRAINT join_request_events_actor_kind_check CHECK (actor_kind IN ('usuario', 'sistema')),
  -- Un evento de usuario nombra a la persona; uno del sistema no tiene actor.
  CONSTRAINT join_request_events_actor_id_check
    CHECK ((actor_kind = 'usuario') = (actor_id IS NOT NULL)),
  -- Convención de estados (spec 000): los estados son los de join_requests (RN-010-05).
  CONSTRAINT join_request_events_from_status_check
    CHECK (from_status IS NULL
           OR from_status IN ('abierta', 'esperando_pago', 'pago_informado', 'aceptada',
                              'rechazada', 'cancelada', 'expirada')),
  CONSTRAINT join_request_events_to_status_check
    CHECK (to_status IS NULL
           OR to_status IN ('abierta', 'esperando_pago', 'pago_informado', 'aceptada',
                            'rechazada', 'cancelada', 'expirada'))
);
```

## 0052_join_messages.sql

> 0052_join_messages: chat de cada solicitud de ingreso y marca de lectura por participante
> (spec 010, data-model.md §1 `join_messages` y `join_request_reads` con el ajuste H2;
> RF-010-05 a RF-010-10, CA-010-21, CA-010-23, CA-010-44).
> El chat lo ven solo el solicitante y el titular; quién puede escribir lo decide el backend.
> La imagen vive en el almacén privado (Supabase Storage); aquí solo su clave.
> Mensajes de una solicitud en orden y contador de no leídos.
> ---------------------------------------------------------------------------------------------
> join_messages_no_update y join_messages_guard_delete (data-model.md §1; CA-010-23, CA-010-44)

- Tablas: `join_messages`, `join_request_reads`
- Funciones: `join_messages_forbid_delete_unless_purge`, `join_messages_forbid_update`
- Disparadores: `join_messages_guard_delete`, `join_messages_no_update`, `join_messages_set_updated_at`, `join_request_reads_set_updated_at`
- Índices: `join_messages_request_idx`, `join_messages_seq_uq`
- Fuente: `database/migrations/0052_join_messages.sql`

```sql
CREATE TABLE join_messages (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  -- Orden estable de los mensajes (RF-010-06); también lo usa el contador de no leídos.
  seq bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
  request_id uuid NOT NULL,
  sender_id uuid NOT NULL,
  body text NULL,
  image_key text NULL,
  image_mime text NULL,
  image_size_bytes integer NULL,
  -- Hora del servidor. Los mensajes no se editan: updated_at queda igual a created_at.
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT join_messages_pkey PRIMARY KEY (id),
  CONSTRAINT join_messages_request_id_fkey FOREIGN KEY (request_id)
    REFERENCES join_requests (id) ON DELETE RESTRICT,
  CONSTRAINT join_messages_sender_id_fkey FOREIGN KEY (sender_id)
    REFERENCES users (id) ON DELETE RESTRICT,
  -- CA-010-21: de 1 a 1000 caracteres.
  CONSTRAINT join_messages_body_check CHECK (char_length(body) BETWEEN 1 AND 1000),
  -- Solo imagen JPEG o PNG.
  CONSTRAINT join_messages_image_mime_check CHECK (image_mime IN ('image/jpeg', 'image/png')),
  -- De 1 byte a 5 MB.
  CONSTRAINT join_messages_image_size_bytes_check
    CHECK (image_size_bytes BETWEEN 1 AND 5242880),
  -- Un mensaje lleva texto, imagen o ambos.
  CONSTRAINT join_messages_content_check CHECK (body IS NOT NULL OR image_key IS NOT NULL),
  -- La clave y el tipo de la imagen van juntos.
  CONSTRAINT join_messages_image_check CHECK ((image_key IS NULL) = (image_mime IS NULL))
);
```

```sql
CREATE TABLE join_request_reads (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  request_id uuid NOT NULL,
  user_id uuid NOT NULL,
  last_read_seq bigint NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT join_request_reads_pkey PRIMARY KEY (id),
  CONSTRAINT join_request_reads_request_id_fkey FOREIGN KEY (request_id)
    REFERENCES join_requests (id) ON DELETE RESTRICT,
  CONSTRAINT join_request_reads_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES users (id) ON DELETE RESTRICT,
  -- Una fila por participante y solicitud.
  CONSTRAINT join_request_reads_request_id_user_id_key UNIQUE (request_id, user_id)
);
```

## 0053_join_disputes.sql

> 0053_join_disputes: reclamos sobre una solicitud de ingreso (spec 010, data-model.md §1
> `join_disputes` con el ajuste M1; RF-010-21 a RF-010-24, CA-010-28).
> Cada parte (solicitante o titular) abre como máximo un reclamo por solicitud; la otra parte
> responde una sola vez y un administrador lo resuelve (spec 009, DisputesService.resolve).
> Quién es el acusado según el tipo (titular en 'pago_sin_ingreso', solicitante en
> 'comprobante_falso') lo valida el servicio; la base solo exige que no sea quien lo abre.
> La evidencia vive en el almacén privado (Supabase Storage); aquí solo sus claves.
> Cola del administrador, del más antiguo al más reciente (spec 009).

- Tablas: `join_disputes`
- Funciones: `join_disputes_forbid_resolved_change`, `join_disputes_forbid_second_response`
- Disparadores: `join_disputes_resolved_immutable`, `join_disputes_set_updated_at`, `join_disputes_single_response`
- Índices: `join_disputes_open_idx`, `join_disputes_request_idx`
- Fuente: `database/migrations/0053_join_disputes.sql`

```sql
CREATE TABLE join_disputes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  request_id uuid NOT NULL,
  kind text NOT NULL,
  opened_by uuid NOT NULL,
  accused_id uuid NOT NULL,
  description text NOT NULL,
  evidence_key text NULL,
  evidence_mime text NULL,
  opened_at timestamptz NOT NULL DEFAULT now(),
  -- Respuesta de la parte acusada (RF-010-22).
  response_text text NULL,
  response_evidence_key text NULL,
  response_evidence_mime text NULL,
  responded_at timestamptz NULL,
  status text NOT NULL DEFAULT 'abierto',
  resolution text NULL,
  resolution_reason text NULL,
  resolved_by uuid NULL,
  resolved_at timestamptz NULL,
  -- Retención de 2 meses (RNF-010-09): los archivos se borran del almacén y la fila queda.
  evidence_purged_at timestamptz NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT join_disputes_pkey PRIMARY KEY (id),
  CONSTRAINT join_disputes_request_id_fkey FOREIGN KEY (request_id)
    REFERENCES join_requests (id) ON DELETE RESTRICT,
  CONSTRAINT join_disputes_opened_by_fkey FOREIGN KEY (opened_by)
    REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT join_disputes_accused_id_fkey FOREIGN KEY (accused_id)
    REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT join_disputes_resolved_by_fkey FOREIGN KEY (resolved_by)
    REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT join_disputes_kind_check CHECK (kind IN ('pago_sin_ingreso', 'comprobante_falso')),
  CONSTRAINT join_disputes_description_check
    CHECK (char_length(btrim(description)) BETWEEN 10 AND 500),
  CONSTRAINT join_disputes_evidence_mime_check
    CHECK (evidence_mime IN ('image/jpeg', 'image/png')),
  CONSTRAINT join_disputes_response_text_check
    CHECK (char_length(btrim(response_text)) BETWEEN 10 AND 500),
  CONSTRAINT join_disputes_status_check CHECK (status IN ('abierto', 'resuelto')),
  CONSTRAINT join_disputes_resolution_check
    CHECK (resolution IN ('estafa_confirmada', 'sin_falta')),
  CONSTRAINT join_disputes_resolution_reason_check
    CHECK (char_length(btrim(resolution_reason)) BETWEEN 10 AND 300),
  -- Un reclamo está resuelto si y solo si tiene todos los datos de la resolución.
  CONSTRAINT join_disputes_resolved_check
    CHECK ((status = 'resuelto') = (resolution IS NOT NULL AND resolution_reason IS NOT NULL
                                    AND resolved_by IS NOT NULL AND resolved_at IS NOT NULL)),
  -- La respuesta y su hora van juntas.
  CONSTRAINT join_disputes_response_check
    CHECK ((response_text IS NULL) = (responded_at IS NULL)),
  CONSTRAINT join_disputes_accused_id_check CHECK (opened_by <> accused_id),
  -- CA-010-28: un reclamo por parte y solicitud.
  CONSTRAINT join_disputes_request_id_opened_by_key UNIQUE (request_id, opened_by)
);
```

## 0054_join_request_triggers.sql

> 0054_join_request_triggers: disparadores de join_requests (spec 010, data-model.md §1, tabla de
> disparadores con los ajustes H1 y L1 aprobados el 2026-10-19; RF-010-02, RN-010-01,
> RN-010-05, RN-010-10, RNF-010-05, RNF-010-09, CA-010-02, CA-010-03, CA-010-25, CA-010-26,
> CA-010-42).
> Imponen lo que no cabe en un CHECK: estado inicial, solo las transiciones de RN-010-05, estados
> finales de solo lectura, cotización inmutable, límite de 5 solicitudes activas por persona,
> solicitante que no es miembro y grupo abierto. El backend repite las validaciones (función pura
> de transición, RNF-010-05) para dar mensajes claros; la lista de transiciones está duplicada a

- Funciones: `join_requests_check_group_open`, `join_requests_check_initial_status`, `join_requests_check_max_active`, `join_requests_check_not_member`, `join_requests_check_transition`, `join_requests_forbid_final_change`, `join_requests_forbid_quote_change`
- Disparadores: `join_requests_final_readonly`, `join_requests_group_open`, `join_requests_initial_status`, `join_requests_max_active_per_applicant`, `join_requests_not_member`, `join_requests_quote_immutable`, `join_requests_transition_guard`
- Fuente: `database/migrations/0054_join_request_triggers.sql`

## 0055_join_request_links.sql

> 0055_join_request_links: claves foráneas pendientes hacia join_requests (spec 010,
> data-model.md §2, ajustes M2 y M3 de /speckit-analyze; RN-010-03, RF-010-17).
> 0031_group_members y 0041_charges ya están aplicadas (RN-000-02): no se editan y las
> restricciones que dejaron pendientes para la spec 010 se agregan aquí.
> - charges.join_request_id: el cobro de ingreso apunta a la solicitud que lo originó
>   (RF-010-17). El UNIQUE parcial deja un solo cobro de ingreso por solicitud (M2).
> - group_members.join_request_id: la estadía que nace de una solicitud aceptada apunta a ella
>   (spec 001, PR #43 H3). El CHECK liga join_source con la columna: 'solicitud' la exige y

- Índices: `charges_join_request_uq`, `group_members_join_request_uq`
- Fuente: `database/migrations/0055_join_request_links.sql`

## 0056_join_request_coherence.sql

> 0056_join_request_coherence: vínculos y cierres coherentes de las solicitudes de ingreso
> (spec 010, data-model.md §1 y §2; RN-010-03, RN-010-05). Revisión QA: BUG-002, BUG-003,
> BUG-007, BUG-018.
> 
> BUG-002: una estadía 'solicitud' debe venir de una solicitud del mismo grupo y de la misma
>   persona (0055 solo agregó la FK y la unicidad). join_request_id no cambia después (0033).
> BUG-003: el cobro de ingreso debe ser de la persona y el grupo de su solicitud.
> BUG-007: el rechazo del titular (final_reason 'rechazo_titular') lleva motivo y quién decidió;

- Funciones: `charges_check_join_request`, `group_members_check_join_request`, `join_request_link_matches`, `join_requests_check_entry_charge`
- Disparadores: `charges_join_request_matches`, `group_members_join_request_matches`, `join_requests_entry_charge_matches`
- Fuente: `database/migrations/0056_join_request_coherence.sql`
