---
title: "Arquitectura · tareas programadas"
tipo: arquitectura
area: arquitectura
parent: "[[Arquitectura]]"
date: 2026-10-29
tags: [area/arquitectura, arquitectura]
related: ["[[BE-Jobs]]"]
---

> Padre: [[Arquitectura]]

# Tareas programadas

Diseño: un solo endpoint de tick protegido por token ejecuta los jobs vencidos y deja huella en `job_runs`. Se eligió así porque el plan gratuito de Render se duerme: un scheduler interno no es confiable. Un disparador externo ([[Cron-de-jobs]]) despierta el servicio y, además, los plazos críticos (15 y 60 minutos de ingreso, plazos del faltante) **se evalúan al consultar o actuar**, no solo en el job ([[ADR-0004-ingreso-con-pago-previo-y-chat]]). Los jobs son idempotentes y aceptan una fecha simulada fuera de producción.

Catálogo de jobs: [[BE-Jobs]].
