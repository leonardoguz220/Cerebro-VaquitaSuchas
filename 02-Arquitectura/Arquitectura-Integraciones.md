---
title: "Arquitectura · integraciones externas"
tipo: arquitectura
area: arquitectura
parent: "[[Arquitectura]]"
date: 2026-10-29
tags: [area/arquitectura, arquitectura]
---

> Padre: [[Arquitectura]]

# Integraciones externas

| Integración | Para qué | Cómo se aísla |
|---|---|---|
| [[Telegram-bot]] | Verificar celular y avisos | Puerto `TelegramGateway` con implementación simulada y real |
| [[Brevo-correo]] / Resend | Correo transaccional | Puerto de correo seleccionado por `MAIL_PROVIDER` |
| [[Supabase-Storage]] | Comprobantes y evidencias | Puerto de almacenamiento (`local` o `supabase`) |
| WhatsApp (enlaces `wa.me`) | Compartir invitación y recordatorios | Solo genera texto y enlace; no hay API |
| Tipo de cambio | Conversión USD a Bs | **Sin API**: lo ingresa el titular ([[Conversion-USD-a-Bs]]) |

Sin pasarela de pago: los pagos son por QR o transferencia fuera de la app y la app registra comprobantes ([[Pagos-en-Bolivia]]). Cambiar de proveedor afecta solo a los repositorios ([[ADR-0002-arquitectura-por-capas]]).
