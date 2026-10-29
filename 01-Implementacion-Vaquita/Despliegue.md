---
title: "Despliegue e infraestructura"
tipo: hub
area: despliegue
parent: "[[Implementacion-Vaquita]]"
date: 2026-10-29
tags: [area/despliegue, hub]
related: ["[[Operaciones]]"]
---

> Padre: [[Implementacion-Vaquita]]

# Despliegue

| Pieza | Servicio | Detalle |
|---|---|---|
| Frontend | [[Vercel]] | `vaquita-suchas.vercel.app` |
| Backend y base | [[Render]] | blueprint `render.yaml`, plan gratuito |
| Archivos | [[Supabase-Storage]] | bucket privado |
| Telegram | [[Telegram-bot]] | webhook |
| Correo | [[Brevo-correo]] | staging |
| Jobs | [[Cron-de-jobs]] | cada 5 minutos |

Migraciones: [[Runbook-migrar-produccion]]. Pasos manuales que quedan: [[Pasos-pendientes-de-Leo]]. Estado vigente: [[Estado-actual]]. Pipeline: [[CI-CD]].

## Notas hijas

- [[Render]] — Render (backend y base de datos)
- [[Vercel]] — Vercel (frontend)
- [[Supabase-Storage]] — Supabase Storage (comprobantes e imágenes)
- [[Telegram-bot]] — Bot de Telegram (VaquitaVerficacionBot)
- [[Brevo-correo]] — Brevo (correo transaccional de staging)
- [[Cron-de-jobs]] — cron-job.org (disparador de tareas)
