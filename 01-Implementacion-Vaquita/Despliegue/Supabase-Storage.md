---
title: "Supabase Storage (comprobantes e imágenes)"
tipo: infra
area: despliegue
parent: "[[Despliegue]]"
date: 2026-10-29
tags: [area/despliegue, infra, supabase]
related: ["[[BE-Shared]]"]
---

> Padre: [[Despliegue]]

# Supabase Storage

Bucket **privado** `vaquita` para comprobantes, imágenes de chat y evidencias. En Render: `STORAGE_DRIVER=supabase`, `SUPABASE_URL`, `SUPABASE_SERVICE_KEY` y `SUPABASE_BUCKET`; la clave de servicio nunca va al repo (se rotó el 2026-10-27). Con `STORAGE_DRIVER=local` los archivos van a disco efímero (solo desarrollo). Retención: chat, solicitudes y comprobantes se conservan 2 meses ([[ADR-0004-ingreso-con-pago-previo-y-chat]], [[BE-billing]]).

Pendiente: una llamada diaria para evitar la pausa por inactividad del plan gratuito, dentro de `maintenance.cleanup` ([[Pasos-pendientes-de-Leo]]).
