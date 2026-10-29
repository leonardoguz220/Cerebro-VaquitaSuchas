---
title: "Endpoints y pantallas"
tipo: arquitectura
area: arquitectura
parent: "[[Arquitectura]]"
date: 2026-10-29
tags: [area/arquitectura, arquitectura, carpeta-compartida, api]
related: ["[[Backend]]", "[[FE-Rutas]]"]
---

> Padre: [[Arquitectura]]

Archivo de la carpeta compartida (`estudio/endpoints-vaquita.md`), completo. Los endpoints por módulo extraídos del código están en las notas `BE-*` ([[Backend]]) y las rutas en [[FE-Rutas]].

Sacado leyendo los controllers de `backend/src/modules/*/controllers` y las páginas de `frontend/src/app`. Son unos 130 endpoints. Los de `groups.controller.ts` aparecen con rutas parciales porque comparten el prefijo `/groups/:groupId/members`, etc.; para el detalle exacto mira `specs/NNN-*/contracts/api.md` o Swagger en `/api/docs`.

## Backend (NestJS)

### Autenticación y usuarios (`auth`, `users`)
- POST /auth/register, POST /auth/register/link, GET /auth/register/status: registro y verificación del celular por Telegram
- GET /auth/policy: política de datos
- POST /auth/login, POST /auth/logout, GET /auth/me
- POST /auth/password/forgot, /reset, /change
- POST /users/me/phone-change, GET /users/me/phone-change/status
- PATCH /users/me: editar perfil

### Catálogo (`catalog`)
- GET /catalog/services, GET /catalog/services/:slug, GET /catalog/categories

### Grupos (`subscriptions`)
- GET /groups, POST /groups, POST /groups/quote (simula la cuota)
- GET /users/me/host-eligibility
- Dentro de un grupo: ver, editar, cerrar, regenerar código de invitación, transferir titularidad, quitar miembro
- POST /admin/groups/:groupId/transfer-ownership

### Solicitudes de ingreso (`join-requests`)
- POST/GET /join-requests, GET /join-requests/:id
- POST: payment-data, extend, proof, confirm, cash-payment, reject, cancel
- GET: proof/file, payment-qr, /me/join-requests/summary
- Chat: GET/POST /join-requests/:id/messages, GET imagen, POST read
- Reclamos: POST/GET /join-requests/:id/disputes, response, evidence, resolve

### Cobros (`billing`)
- GET /me/charges, GET /charges/:chargeId
- POST /charges/:chargeId/confirm, reject, manual-payment, cancel
- POST /charges/:chargeId/receipts (subir comprobante), GET .../receipts/:receiptId/file
- GET /groups/:groupId/billing/summary, GET /groups/:groupId/charges

### Notificaciones (`notifications`, `telegram`)
- GET /notifications, GET /notifications/unread-count, POST /notifications/read-all, POST /notifications/:id/read
- GET/PUT /notification-preferences, POST /notification-preferences/telegram/reactivate, POST /notifications/unsubscribe
- POST /groups/:id/invitations, GET /groups/:id/invitation-share, GET /charges/:chargeId/reminder-share
- POST /telegram/webhook (Telegram real), POST /telegram/simulate y GET /telegram/outbox (solo modo desarrollo)

### Panel y reportes (`reports`)
- GET /me/dashboard, /me/dashboard/lists, /me/dashboard/charts
- GET /me/calendar, /me/calendar/upcoming
- GET /me/history, GET /me/history/export.csv, GET /groups/:groupId/history/export.csv
- GET /groups/:groupId/collection

### Reputación (`reputation`)
- GET /users/me/reputation, GET /users/me/badges, GET /groups/:groupId/ranking
- POST /charges/:chargeId/reputation-report, POST /charges/:chargeId/reputation-exclusion

### Cupos libres (`listings`)
- GET /listings, GET /listings/:id, POST /listings/:id/requests, POST /listings/:id/reports
- Del titular: POST/GET/PATCH/DELETE /groups/:groupId/listing, POST .../listing/renew

### Administración (`admin`)
- Usuarios: GET /admin/users, GET /admin/users/:userId, POST suspend, reactivate, role, ban
- POST /admin/bans/:banId/revoke
- Titulares: GET /admin/host-enablements, POST /admin/users/:userId/host-enablement y /revoke
- Catálogo: GET /admin/catalog, crear/editar/activar/desactivar servicios y planes, import/preview e import/apply
- Moderación de cupos: GET /admin/listings/reports, restore, delete, delete-and-suspend
- GET /admin/stats, GET /admin/audit-log

### Salud
- GET /health: comprueba servicio y base

## Frontend (Next.js): pantallas en `frontend/src/app`
- `/` inicio, `/ingresar` login, `/registro` y `/registro/verificar`, `/recuperar` y `/recuperar/[token]`
- `/grupos`, `/grupos/nuevo`, `/grupos/[id]`
- `/unirse` (con código de invitación), `/solicitudes` y `/solicitudes/[id]` (con chat y pago)
- `/cobros` y `/cobros/[id]` (subir comprobante, confirmar)
- `/cupos` y `/cupos/[id]` (cupos libres)
- `/panel`, `/panel/calendario`, `/panel/historial`
- `/perfil`, `/perfil/reputacion`, `/perfil/insignias`
- `/notificaciones`, `/ajustes/avisos`, `/avisos/desactivar`
- `/admin` con `usuarios`, `usuarios/[id]`, `catalogo`, `moderacion`, `reclamos`, `reclamos/[id]`, `titulares` y `auditoria`
- `/estado` (comprueba frontend, backend y base) y `/dev/telegram` (bot simulado, solo en desarrollo)
- `/api/[...path]`: el proxy que reenvía todo al backend con la cookie de sesión. El frontend no tiene endpoints propios de negocio.
