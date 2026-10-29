---
title: "Backend · módulo notifications"
tipo: backend
area: implementacion
parent: "[[Backend]]"
date: 2026-10-29
tags: [area/implementacion, backend, backend, spec-005]
related: ["[[Spec-005-notificaciones]]"]
---

> Padre: [[Backend]]

# Módulo backend `notifications`

Avisos dentro de la app, correo y Telegram, preferencias, invitaciones por correo, recordatorios y compartir por WhatsApp.

- Spec que lo define: [[Spec-005-notificaciones]]
- Código: `backend/src/modules/notifications/` (capas: controllers, services, domain, repositories, jobs)
- Pruebas unitarias del módulo: 9 archivos `*.spec.ts` (más e2e en `backend/test/`, ver [[BE-Pruebas]])
- Tablas: ver [[BD]] y la nota de esquema de la spec

## Endpoints

| Método | Ruta | Controlador |
|---|---|---|
| POST | `/groups/:id/invitations` | invitations |
| GET | `/notifications` | notifications |
| GET | `/notifications/unread-count` | notifications |
| POST | `/notifications/read-all` | notifications |
| POST | `/notifications/:id/read` | notifications |
| GET | `/notification-preferences` | preferences |
| PUT | `/notification-preferences` | preferences |
| POST | `/notification-preferences/telegram/reactivate` | preferences |
| POST | `/notifications/unsubscribe` | preferences |
| GET | `/groups/:id/invitation-share` | share |
| GET | `/charges/:chargeId/reminder-share` | share |

Todas las rutas pasan por el proxy `/api` del frontend ([[Frontend]]). Contrato detallado: [[Spec-005-notificaciones]] (nota de contrato dentro de la spec).

## Estructura por capas

- **Dominio** (funciones puras, 100 % con tests): `catalog`, `dedupe`, `delivery-rules`, `email-content`, `notification-cursor`, `retry`, `schedule-rules`, `share-text`, `templates`, `unsubscribe-token`
- **Servicios:** `delivery`, `invitations`, `notification`, `preferences`, `purge`, `schedule`, `share`, `telegram-block.handler`, `unsubscribe-links`
- **Repositorios (SQL):** `deliveries`, `invitations`, `notification-facts`, `notifications`, `preferences`, `purge`, `schedule`, `share`

Reglas de la arquitectura: [[Arquitectura-por-capas]] y [[Reglas-de-dominio]].
