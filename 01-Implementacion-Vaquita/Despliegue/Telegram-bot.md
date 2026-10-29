---
title: "Bot de Telegram (VaquitaVerficacionBot)"
tipo: infra
area: implementacion
parent: "[[Despliegue]]"
date: 2026-10-29
tags: [area/implementacion, infra, telegram]
---

> Padre: [[Despliegue]]

# Bot de Telegram

Verifica el celular (sin SMS, sin costo) y envía avisos ([[ADR-0005-identidad-cedula-telegram]], [[Spec-005-notificaciones]]). Bot: `VaquitaVerficacionBot` (`TELEGRAM_BOT_USERNAME`). Modos: `TELEGRAM_MODE=dev` (simulado, pantalla `/dev/telegram`) o `prod` (webhook real con `TELEGRAM_BOT_TOKEN` y `TELEGRAM_WEBHOOK_SECRET`, valores solo en Render). El webhook se registra con `npm run telegram:set-webhook -w backend` y se verifica con `getWebhookInfo`.

Flujo de verificación: la app muestra un enlace con token de un solo uso (10 minutos); la persona lo abre, pulsa Iniciar y comparte su contacto; el bot acepta solo si el contacto es de la misma cuenta y es número boliviano. PR #245: `TELEGRAM_BOT_USERNAME` pasa a ser obligatorio en producción. Código: [[BE-telegram]].
