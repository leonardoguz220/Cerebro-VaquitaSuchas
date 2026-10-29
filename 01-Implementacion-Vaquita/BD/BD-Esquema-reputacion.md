---
title: "BD · esquema: Reputación"
tipo: bd
area: implementacion
parent: "[[BD]]"
date: 2026-10-29
tags: [area/implementacion, bd, migraciones, spec-007]
related: ["[[Spec-007-reputacion]]", "[[BD-Migraciones]]"]
---

> Padre: [[BD]]

# Esquema: Reputación

Migraciones 0060-0064. Spec: [[Spec-007-reputacion]] (modelo de datos en la nota de la spec). Las restricciones únicas, claves foráneas, `CHECK` y disparadores refuerzan en la base las reglas que valida el backend ([[Reglas-de-dominio]]). Nunca se edita una migración ya fusionada en `main` ([[Runbook-migrar-produccion]]).

## 0060_user_reputation.sql

> 0060_user_reputation: calificación de puntualidad de cada usuario
> (spec 007, data-model.md §1 y §2; RF-007-01, RF-007-02, RF-007-03, RF-007-05, RN-007-07).
> Es una copia de lectura recalculable desde los cobros (spec 002), que son la fuente de verdad
> (RNF-007-02): el backend la actualiza en la misma transacción que cambia un cobro y la verifica
> con una reconciliación diaria. La habilitación de titulares no la lee: calcula en el momento.
> La calificación exacta (5 × puntuales / considerados) no se guarda; las estrellas mostradas van
> en medias estrellas enteras (9 = 4,5) y NULL significa "Nuevo". La PK es el user_id.

- Tablas: `user_reputation`
- Disparadores: `user_reputation_set_updated_at`
- Fuente: `database/migrations/0060_user_reputation.sql`

```sql
CREATE TABLE user_reputation (
  user_id uuid NOT NULL,
  considered_count integer NOT NULL,
  punctual_count integer NOT NULL,
  late_count integer NOT NULL,
  displayed_half_stars smallint NULL,
  level text NOT NULL,
  current_streak integer NOT NULL,
  rules_version integer NOT NULL,
  computed_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT user_reputation_pkey PRIMARY KEY (user_id),
  CONSTRAINT user_reputation_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT user_reputation_considered_count_check CHECK (considered_count >= 0),
  CONSTRAINT user_reputation_punctual_count_check CHECK (
    punctual_count BETWEEN 0 AND considered_count
  ),
  CONSTRAINT user_reputation_counts_check CHECK (
    punctual_count + late_count = considered_count
  ),
  CONSTRAINT user_reputation_displayed_half_stars_check CHECK (
    displayed_half_stars BETWEEN 0 AND 10
  ),
  CONSTRAINT user_reputation_level_check CHECK (
    level IN ('Nuevo', 'En riesgo', 'Regular', 'Bueno', 'Excelente')
  ),
  CONSTRAINT user_reputation_current_streak_check CHECK (current_streak >= 0),
  -- Menos de 3 cobros considerados = "Nuevo" (RF-007-02).
  CONSTRAINT user_reputation_new_level_check CHECK ((level = 'Nuevo') = (considered_count < 3)),
  -- "Nuevo" no tiene estrellas, y todo otro nivel sí.
  CONSTRAINT user_reputation_new_no_stars_check CHECK (
    (level = 'Nuevo') = (displayed_half_stars IS NULL)
  )
);
```

## 0061_charge_reputation_exclusions.sql

> 0061_charge_reputation_exclusions: cobros que el titular excluye de la reputación tras un
> reporte (spec 007, data-model.md §2; RF-007-14). Una exclusión por cobro. Que excluded_by sea
> el titular del grupo del cobro lo valida el backend.

- Tablas: `charge_reputation_exclusions`
- Disparadores: `charge_reputation_exclusions_set_updated_at`
- Fuente: `database/migrations/0061_charge_reputation_exclusions.sql`

```sql
CREATE TABLE charge_reputation_exclusions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  charge_id uuid NOT NULL,
  reason text NOT NULL,
  excluded_by uuid NOT NULL,
  excluded_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT charge_reputation_exclusions_pkey PRIMARY KEY (id),
  CONSTRAINT charge_reputation_exclusions_charge_id_key UNIQUE (charge_id),
  CONSTRAINT charge_reputation_exclusions_charge_id_fkey FOREIGN KEY (charge_id)
    REFERENCES charges (id) ON DELETE RESTRICT,
  CONSTRAINT charge_reputation_exclusions_excluded_by_fkey FOREIGN KEY (excluded_by)
    REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT charge_reputation_exclusions_reason_check
    CHECK (char_length(btrim(reason)) BETWEEN 10 AND 300)
);
```

## 0062_reputation_reports.sql

> 0062_reputation_reports: reportes del dueño de un cobro sobre su efecto en la reputación
> (spec 007, data-model.md §2; RF-007-14). Un reporte por persona y cobro. Que reporter_id sea el
> dueño del cobro lo valida el backend.

- Tablas: `reputation_reports`
- Disparadores: `reputation_reports_set_updated_at`
- Fuente: `database/migrations/0062_reputation_reports.sql`

```sql
CREATE TABLE reputation_reports (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  charge_id uuid NOT NULL,
  reporter_id uuid NOT NULL,
  comment text NOT NULL,
  status text NOT NULL DEFAULT 'abierto',
  decided_by uuid NULL,
  decided_at timestamptz NULL,
  decision_reason text NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT reputation_reports_pkey PRIMARY KEY (id),
  CONSTRAINT reputation_reports_charge_id_fkey FOREIGN KEY (charge_id)
    REFERENCES charges (id) ON DELETE RESTRICT,
  CONSTRAINT reputation_reports_reporter_id_fkey FOREIGN KEY (reporter_id)
    REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT reputation_reports_decided_by_fkey FOREIGN KEY (decided_by)
    REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT reputation_reports_charge_id_reporter_id_key UNIQUE (charge_id, reporter_id),
  CONSTRAINT reputation_reports_comment_check
    CHECK (char_length(btrim(comment)) BETWEEN 10 AND 300),
  CONSTRAINT reputation_reports_status_check
    CHECK (status IN ('abierto', 'excluido', 'rechazado'))
);
```

## 0063_user_badges.sql

> 0063_user_badges: insignias obtenidas (spec 007, data-model.md §2; RF-007-06, RF-007-07,
> RF-007-08). Una insignia obtenida se conserva aunque la racha vuelva a 0: una fila por usuario
> y código. El avance hacia las que faltan se calcula al consultar.

- Tablas: `user_badges`
- Disparadores: `user_badges_set_updated_at`
- Fuente: `database/migrations/0063_user_badges.sql`

```sql
CREATE TABLE user_badges (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  badge_code text NOT NULL,
  earned_at timestamptz NOT NULL,
  source_charge_id uuid NULL,
  rules_version integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT user_badges_pkey PRIMARY KEY (id),
  CONSTRAINT user_badges_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT user_badges_source_charge_id_fkey FOREIGN KEY (source_charge_id)
    REFERENCES charges (id) ON DELETE RESTRICT,
  CONSTRAINT user_badges_user_id_badge_code_key UNIQUE (user_id, badge_code),
  CONSTRAINT user_badges_badge_code_check CHECK (badge_code IN ('primer_pago', 'racha_3',
    'racha_6', 'racha_12', 'sin_atrasos_6m', 'grupo_completo'))
);
```

## 0064_reputation_ownership.sql

> 0064_reputation_ownership: quién reporta y quién excluye un cobro (spec 007, data-model.md §2;
> RF-007-14). Revisión QA: BUG-013, BUG-014.
> 
> BUG-013: reporter_id es el dueño del cobro, y un reporte decidido (excluido o rechazado) guarda
>   quién, cuándo y por qué; uno abierto no los tiene.
> BUG-014: excluded_by es el titular del grupo del cobro.
> El backend ya lo valida (reports.service.ts report y exclude); la base lo refuerza.
> Solo el sentido «decidido => quién, cuándo y por qué»: un estado fuera de la lista lo rechaza

- Funciones: `charge_reputation_exclusions_check_owner`, `reputation_reports_check_reporter`
- Disparadores: `charge_reputation_exclusions_by_owner`, `reputation_reports_reporter_is_owner`
- Fuente: `database/migrations/0064_reputation_ownership.sql`
