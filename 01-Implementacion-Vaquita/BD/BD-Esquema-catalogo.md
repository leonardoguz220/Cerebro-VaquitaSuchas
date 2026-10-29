---
title: "BD · esquema: Catálogo de servicios"
tipo: bd
area: implementacion
parent: "[[BD]]"
date: 2026-10-29
tags: [area/implementacion, bd, migraciones, spec-004]
related: ["[[Spec-004-catalogo-de-servicios]]", "[[BD-Migraciones]]"]
---

> Padre: [[BD]]

# Esquema: Catálogo de servicios

Migraciones 0020-0021. Spec: [[Spec-004-catalogo-de-servicios]] (modelo de datos en la nota de la spec). Las restricciones únicas, claves foráneas, `CHECK` y disparadores refuerzan en la base las reglas que valida el backend ([[Reglas-de-dominio]]). Nunca se edita una migración ya fusionada en `main` ([[Runbook-migrar-produccion]]).

## 0020_catalog.sql

> 0020_catalog: catálogo de servicios y planes (spec 004, RF-004-01, RF-004-02, RF-004-03,
> RF-004-06, RN-004-02, RN-004-03, RN-004-04, data-model.md §1). No hay borrado físico del
> catálogo: se desactiva con is_active (RF-004-06) y las claves foráneas que lo apuntan son
> RESTRICT. Que un servicio sin planes activos no se ofrezca (RN-004-05) lo resuelve la consulta.
> Nombre duplicado ignorando mayúsculas, tildes y espacios al borde ("Música+" = "MUSICA+").
> Listado de servicios activos con filtro por categoría (RF-004-03).
> Detalle de un servicio: sus planes activos ordenados por precio (RF-004-02).

- Tablas: `catalog_services`, `catalog_plans`
- Disparadores: `catalog_plans_set_updated_at`, `catalog_services_set_updated_at`
- Índices: `catalog_plans_service_idx`, `catalog_services_category_idx`, `catalog_services_name_uq`
- Fuente: `database/migrations/0020_catalog.sql`

```sql
CREATE TABLE catalog_services (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  category text NOT NULL,
  -- URL pública https del logo (RF-004-01); sin subida de archivos.
  logo_url text NULL,
  brand_color text NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT catalog_services_pkey PRIMARY KEY (id),
  CONSTRAINT catalog_services_slug_check CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  CONSTRAINT catalog_services_name_check CHECK (char_length(btrim(name)) BETWEEN 2 AND 60),
  CONSTRAINT catalog_services_category_check
    CHECK (category IN ('video', 'musica', 'juegos', 'educacion', 'almacenamiento', 'otras')),
  CONSTRAINT catalog_services_brand_color_check CHECK (brand_color ~ '^#[0-9A-Fa-f]{6}$')
);
```

```sql
CREATE TABLE catalog_plans (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  service_id uuid NOT NULL,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  -- En la moneda del plan, en centavos (RN-004-02).
  price_cents bigint NOT NULL,
  currency text NOT NULL,
  -- Cupos máximos, titular incluido (RN-004-03).
  max_slots smallint NOT NULL,
  -- Precio para una sola persona, en la misma moneda que el plan.
  individual_price_cents bigint NULL,
  is_active boolean NOT NULL DEFAULT true,
  -- Fecha y fuente oficial de la verificación del precio (RN-004-06).
  verified_on date NULL,
  verified_source text NULL,
  sort_order smallint NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT catalog_plans_pkey PRIMARY KEY (id),
  CONSTRAINT catalog_plans_service_id_fkey FOREIGN KEY (service_id)
    REFERENCES catalog_services (id) ON DELETE RESTRICT,
  CONSTRAINT catalog_plans_slug_check CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  CONSTRAINT catalog_plans_name_check CHECK (char_length(btrim(name)) BETWEEN 2 AND 60),
  CONSTRAINT catalog_plans_price_cents_check CHECK (price_cents > 0),
  CONSTRAINT catalog_plans_currency_check CHECK (currency IN ('USD', 'BS')),
  CONSTRAINT catalog_plans_max_slots_check CHECK (max_slots BETWEEN 2 AND 20),
  CONSTRAINT catalog_plans_individual_price_cents_check
    CHECK (individual_price_cents IS NULL OR individual_price_cents > 0)
);
```

## 0021_catalog_search.sql

> 0021_catalog_search: vista de lectura para buscar en el catálogo sin distinguir mayúsculas
> ni tildes (spec 004, RF-004-04, data-model.md §1). La consulta usa LIKE '%texto%' sobre
> name_key con el término normalizado igual (immutable_unaccent(lower(...)), 0001_init.sql);
> con hasta 200 servicios no hace falta índice trigrama (RNF-004-01). La vista no filtra por
> is_active: los servicios activos y con planes activos (RF-004-06, RN-004-05) los filtra la
> consulta del backend.

- Vistas: `catalog_service_search`
- Fuente: `database/migrations/0021_catalog_search.sql`
