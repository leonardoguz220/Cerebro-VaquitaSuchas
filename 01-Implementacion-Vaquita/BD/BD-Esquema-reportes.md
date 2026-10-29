---
title: "BD · esquema: Vistas e índices de reportes"
tipo: bd
area: bd
parent: "[[BD]]"
date: 2026-10-29
tags: [area/bd, bd, migraciones, spec-006]
related: ["[[Spec-006-panel-y-reportes]]", "[[BD-Migraciones]]"]
---

> Padre: [[BD]]

# Esquema: Vistas e índices de reportes

Migraciones 0100-0101. Spec: [[Spec-006-panel-y-reportes]] (modelo de datos en la nota de la spec). Las restricciones únicas, claves foráneas, `CHECK` y disparadores refuerzan en la base las reglas que valida el backend ([[Reglas-de-dominio]]). Nunca se edita una migración ya fusionada en `main` ([[Runbook-migrar-produccion]]).

## 0100_reports_views.sql

> 0100_reports_views: vistas de lectura del panel y los reportes (spec 006, data-model.md §2;
> RF-006-02, RF-006-03, RF-006-06, RN-006-01, RN-006-02, RN-006-06, RN-006-07, RNF-006-06).
> Leen las copias del ciclo y del cobro, nunca los valores actuales del grupo, salvo el precio
> individual de referencia, que el grupo copia una sola vez al crearse. Excluyen los cobros
> 'cancelado'. Todo en centavos enteros (bigint).
> individual_price_bs_cents: NULL si no hay precio individual, o si está en USD y el ciclo no
> tiene tipo de cambio («sin dato»).
> Cobranza del titular por grupo y período (RF-006-06). pending_cents incluye en_revision.

- Vistas: `v_group_collection`, `v_user_cost_lines`
- Fuente: `database/migrations/0100_reports_views.sql`

## 0101_reports_indexes.sql

> 0101_reports_indexes: índices de los reportes (spec 006, data-model.md §2; RNF-006-01).
> Gasto, ahorro y gráficos por persona (< 1 s con 20 suscripciones y 12 meses) y cuotas de
> referencia del titular por período.

- Índices: `billing_cycles_owner_period_idx`, `charges_user_period_idx`
- Fuente: `database/migrations/0101_reports_indexes.sql`
