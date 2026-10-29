---
title: "BD · esquema: Cupos libres"
tipo: bd
area: implementacion
parent: "[[BD]]"
date: 2026-10-29
tags: [area/implementacion, bd, migraciones, spec-008]
related: ["[[Spec-008-cupos-libres]]", "[[BD-Migraciones]]"]
---

> Padre: [[BD]]

# Esquema: Cupos libres

Migraciones 0080-0083. Spec: [[Spec-008-cupos-libres]] (modelo de datos en la nota de la spec). Las restricciones únicas, claves foráneas, `CHECK` y disparadores refuerzan en la base las reglas que valida el backend ([[Reglas-de-dominio]]). Nunca se edita una migración ya fusionada en `main` ([[Runbook-migrar-produccion]]).

## 0080_listings.sql

> 0080_listings: publicaciones de cupos libres de un grupo (spec 008, data-model.md §1; RF-008-01,
> RF-008-02, RF-008-05, RF-008-14, RF-008-18, RN-008-07, RNF-008-02). El titular no se guarda:
> es el titular actual del grupo. La cuota estimada y los cupos disponibles se calculan al
> consultar. retirada y cerrada son finales; expirada no bloquea otra publicación del grupo.
> end_reason: 'titular' | 'moderacion' | 'cupos_completos' | 'grupo_lleno' | 'grupo_cerrado' |
> 'grupo_congelado' (sin CHECK IN: el modelo solo exige que exista en los estados finales).
> Transiciones, grupo abierto y cupos libres los imponen los disparadores de 0082.
> Una sola publicación activa u oculta por grupo (RF-008-02, CA-008-03).

- Tablas: `listings`
- Disparadores: `listings_set_updated_at`
- Índices: `listings_group_active_uq`, `listings_group_idx`, `listings_search_idx`
- Fuente: `database/migrations/0080_listings.sql`

```sql
CREATE TABLE listings (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  group_id uuid NOT NULL,
  slots_offered smallint NOT NULL,
  description text NULL,
  conditions text NULL,
  status text NOT NULL DEFAULT 'activa',
  published_at timestamptz NOT NULL,
  expires_at timestamptz NOT NULL,
  renewed_at timestamptz NULL,
  hidden_at timestamptz NULL,
  moderation_cleared_at timestamptz NULL,
  ended_at timestamptz NULL,
  end_reason text NULL,
  version integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT listings_pkey PRIMARY KEY (id),
  CONSTRAINT listings_group_id_fkey FOREIGN KEY (group_id)
    REFERENCES groups (id) ON DELETE RESTRICT,
  CONSTRAINT listings_slots_offered_check CHECK (slots_offered BETWEEN 0 AND 19),
  CONSTRAINT listings_slots_offered_open_check CHECK (status = 'cerrada' OR slots_offered >= 1),
  CONSTRAINT listings_description_check
    CHECK (description IS NULL OR char_length(description) <= 300),
  CONSTRAINT listings_conditions_check
    CHECK (conditions IS NULL OR char_length(conditions) <= 300),
  CONSTRAINT listings_status_check
    CHECK (status IN ('activa', 'oculta', 'expirada', 'retirada', 'cerrada')),
  CONSTRAINT listings_ended_check CHECK (
    (status IN ('retirada', 'cerrada')) = (ended_at IS NOT NULL AND end_reason IS NOT NULL)
  ),
  CONSTRAINT listings_hidden_at_check CHECK ((status = 'oculta') = (hidden_at IS NOT NULL)),
  CONSTRAINT listings_expires_at_check CHECK (expires_at > published_at)
);
```

## 0081_listing_reports.sql

> 0081_listing_reports: reportes de usuarios sobre una publicación (spec 008, data-model.md §1;
> RF-008-17, CA-008-18). Un reporte por usuario y publicación. Solo se insertan: el disparador de
> solo anexado y el que impide que el titular reporte su publicación van en 0082.

- Tablas: `listing_reports`
- Disparadores: `listing_reports_set_updated_at`
- Índices: `listing_reports_listing_idx`
- Fuente: `database/migrations/0081_listing_reports.sql`

```sql
CREATE TABLE listing_reports (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  listing_id uuid NOT NULL,
  reporter_id uuid NOT NULL,
  reason text NOT NULL,
  comment text NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT listing_reports_pkey PRIMARY KEY (id),
  CONSTRAINT listing_reports_listing_id_fkey FOREIGN KEY (listing_id)
    REFERENCES listings (id) ON DELETE RESTRICT,
  CONSTRAINT listing_reports_reporter_id_fkey FOREIGN KEY (reporter_id)
    REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT listing_reports_listing_id_reporter_id_key UNIQUE (listing_id, reporter_id),
  CONSTRAINT listing_reports_reason_check
    CHECK (reason IN ('spam', 'datos_falsos', 'conducta_indebida', 'otro')),
  CONSTRAINT listing_reports_comment_check
    CHECK (comment IS NULL OR char_length(comment) <= 300)
);
```

## 0082_listings_links.sql

> 0082_listings_links: FK de join_requests.listing_id y disparadores de listings y
> listing_reports (spec 008, data-model.md §1; RF-008-01, RF-008-05, RF-008-06, RF-008-18,
> RNF-008-06, CA-008-02, CA-008-18). Códigos de error: check_violation (23514) para transiciones,
> grupo no disponible y reporte del titular; restrict_violation (23001) para editar una
> publicación final, como forbid_update_delete() en 0001.
> Cupos reservados y aceptados por publicación; rechazo de solicitudes abiertas al cerrarla.
> ---------------------------------------------------------------------------------------------
> listings_transition_guard (RF-008-05, RF-008-18)

- Funciones: `listing_reports_check_not_owner`, `listings_check_group_active`, `listings_check_transition`
- Disparadores: `listing_reports_append_only`, `listing_reports_not_owner`, `listings_only_when_group_active`, `listings_transition_guard`
- Índices: `join_requests_listing_idx`
- Fuente: `database/migrations/0082_listings_links.sql`

## 0083_listings_coherence.sql

> 0083_listings_coherence: publicación del mismo grupo y cupos libres al editar (spec 008,
> data-model.md §1; RF-008-14, CA-008-02). Revisión QA: BUG-004, BUG-005.
> 
> BUG-004: una solicitud 'publicacion' apunta a una publicación de su mismo grupo (0082 solo
>   agregó la FK).
> BUG-005: listings_only_when_group_active (0082) revisaba los cupos libres al publicar y al
>   volver a 'activa', pero no al subir slots_offered de una publicación ya activa. Se redefine
>   la función: también revisa cuando una publicación activa sube slots_offered. Bajarlo (cada

- Funciones: `join_requests_check_listing_group`, `listings_check_group_active`
- Disparadores: `join_requests_listing_same_group`, `listings_only_when_group_active`
- Fuente: `database/migrations/0083_listings_coherence.sql`
