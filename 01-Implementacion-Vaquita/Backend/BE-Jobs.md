---
title: "Backend · jobs programados"
tipo: backend
area: backend
parent: "[[Backend]]"
date: 2026-10-29
tags: [area/backend, backend, jobs]
related: ["[[Arquitectura-Jobs]]"]
---

> Padre: [[Backend]]

# Jobs programados

Un único endpoint, `POST /internal/jobs/tick` (cabecera `X-Jobs-Token`, valor en variable de entorno), ejecuta todos los jobs vencidos. Lo llama **cron-job.org cada 5 minutos** y, de respaldo, el workflow `jobs-tick.yml` cada 10 minutos ([[Workflow-jobs-tick]]). Con `JOBS_INPROCESS=true` también corre dentro del proceso. El servicio gratuito de Render se duerme, por eso los plazos cortos (15 y 60 minutos) también se evalúan al consultar y no solo en los jobs.

Fuera de producción, el tick acepta `?now=` para simular una fecha (PR #226), lo que permite probar plazos y cobros.

| Job | Módulo | Qué hace |
|---|---|---|
| `billing.generate` | billing | Genera los ciclos y cobros del mes en cada día de corte |
| `billing.overdue` | billing | Marca `atrasado`, retira miembros morosos tras 3 días y deja la deuda visible |
| `billing.retention` | billing | Borra comprobantes viejos según la retención |
| `notifications.schedule` | notifications | Recordatorios y avisos programados (parte diaria dentro del tick) |
| `notifications.deliver` | notifications | Envía el buzón de salida por canal (correo, Telegram) con reintentos |
| `notifications.purge` | notifications | Limpia avisos viejos |
| `listings.expire` | listings | Vence publicaciones de cupos |
| `reputation.reconcile` | reputation | Reconcilia la reputación |
| `shortfalls.sweep` | shortfalls | Vence plazos del faltante y cierra rondas |
| `maintenance.cleanup` | shared | Limpieza (por ejemplo `rate_limit_events` de más de 24 h) |
| `example.noop` | shared | Ejemplo de job |

Cada ejecución queda en `job_runs` ([[BD-Esquema-plataforma]]). Código: `backend/src/shared/jobs/`. Specs: [[Spec-000-setup-del-proyecto]] (RF-000-14), [[Spec-002-cobros-y-pagos]], [[Spec-010-solicitudes-de-ingreso]], [[Spec-011-faltante-de-grupo]].
