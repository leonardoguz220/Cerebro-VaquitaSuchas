---
title: "Backend · módulo join-requests"
tipo: backend
area: backend
parent: "[[Backend]]"
date: 2026-10-29
tags: [area/backend, backend, backend, spec-010]
related: ["[[Spec-010-solicitudes-de-ingreso]]"]
---

> Padre: [[Backend]]

# Módulo backend `join-requests`

Solicitudes de ingreso con pago previo: chat, plazos, comprobante, confirmación, cobro de ingreso y reclamos.

- Spec que lo define: [[Spec-010-solicitudes-de-ingreso]]
- Código: `backend/src/modules/join-requests/` (capas: controllers, services, domain, repositories, jobs, ports)
- Pruebas unitarias del módulo: 16 archivos `*.spec.ts` (más e2e en `backend/test/`, ver [[BE-Pruebas]])
- Tablas: ver [[BD]] y la nota de esquema de la spec

## Endpoints

| Método | Ruta | Controlador |
|---|---|---|
| GET | `/join-requests/:id/messages` | chat |
| POST | `/join-requests/:id/messages` | chat |
| GET | `/join-requests/:id/messages/:messageId/image` | chat |
| POST | `/join-requests/:id/read` | chat |
| POST | `/join-requests/:id/disputes` | disputes |
| POST | `/join-requests/:id/disputes/:disputeId/response` | disputes |
| GET | `/join-requests/:id/disputes` | disputes |
| GET | `/admin/disputes` | disputes |
| GET | `/admin/disputes/:disputeId/evidence` | disputes |
| POST | `/admin/disputes/:disputeId/resolve` | disputes |
| POST | `/join-requests` | join-requests |
| GET | `/join-requests` | join-requests |
| GET | `/join-requests/:id` | join-requests |
| POST | `/join-requests/:id/payment-data` | join-requests |
| POST | `/join-requests/:id/extend` | join-requests |
| POST | `/join-requests/:id/proof` | join-requests |
| POST | `/join-requests/:id/confirm` | join-requests |
| POST | `/join-requests/:id/cash-payment` | join-requests |
| POST | `/join-requests/:id/reject` | join-requests |
| POST | `/join-requests/:id/cancel` | join-requests |
| GET | `/join-requests/:id/proof/file` | join-requests |
| GET | `/join-requests/:id/payment-qr` | join-requests |
| GET | `/me/join-requests/summary` | join-requests |
| GET | `/groups/:groupId/join-requests` | join-requests |

Todas las rutas pasan por el proxy `/api` del frontend ([[Frontend]]). Contrato detallado: [[Spec-010-solicitudes-de-ingreso]] (nota de contrato dentro de la spec).

## Estructura por capas

- **Dominio** (funciones puras, 100 % con tests): `allowed-actions`, `can-open-request`, `chat-rules`, `deadlines`, `dispute-queue-cursor`, `dispute-rules`, `effective-state`, `entry-quote`, `extension`, `open-request-errors`, `page-cursor`, `payment-info`, `request-files`, `request-state`, `slots`
- **Servicios:** `chat`, `disputes`, `entry-payment`, `group-events.handlers`, `join-requests`, `request-lifecycle`, `request-sweeper`, `request-view`, `request-views`, `reserved-slots.adapter`, `retention`
- **Repositorios (SQL):** `disputes`, `events`, `messages`, `requests`

Reglas de la arquitectura: [[Arquitectura-por-capas]] y [[Reglas-de-dominio]].
