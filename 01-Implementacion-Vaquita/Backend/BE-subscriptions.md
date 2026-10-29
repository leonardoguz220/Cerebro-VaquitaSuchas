---
title: "Backend · módulo subscriptions"
tipo: backend
area: implementacion
parent: "[[Backend]]"
date: 2026-10-29
tags: [area/implementacion, backend, backend, spec-001]
related: ["[[Spec-001-suscripciones-compartidas]]"]
---

> Padre: [[Backend]]

# Módulo backend `subscriptions`

Grupos, miembros, código de invitación, cuota, ventana de ingreso, transferencia de titularidad y cierre.

- Spec que lo define: [[Spec-001-suscripciones-compartidas]]
- Código: `backend/src/modules/subscriptions/` (capas: controllers, services, domain, repositories, ports)
- Pruebas unitarias del módulo: 11 archivos `*.spec.ts` (más e2e en `backend/test/`, ver [[BE-Pruebas]])
- Tablas: ver [[BD]] y la nota de esquema de la spec

## Endpoints

| Método | Ruta | Controlador |
|---|---|---|
| POST | `/admin/groups/:groupId/transfer-ownership` | admin-groups |
| GET | `/groups` | groups |
| GET | `/users/me/host-eligibility` | groups |
| POST | `/groups/quote` | groups |
| POST | `/groups` | groups |
| DELETE | `/groups/:id/members/:userId` | groups |
| POST | `/groups/:id/leave` | groups |
| PATCH | `/groups/:id` | groups |
| POST | `/groups/:id/transfer-ownership` | groups |
| POST | `/groups/:id/close` | groups |
| GET | `/groups/:id` | groups |
| PUT | `/groups/:id/payment-info` | groups |
| POST | `/groups/:id/invite-code/regenerate` | groups |

Todas las rutas pasan por el proxy `/api` del frontend ([[Frontend]]). Contrato detallado: [[Spec-001-suscripciones-compartidas]] (nota de contrato dentro de la spec).

## Estructura por capas

- **Dominio** (funciones puras, 100 % con tests): `billing-calendar`, `entry-window`, `group-detail`, `group-edit`, `group-list-cursor`, `group-rules`, `group-summary`, `invite-code`, `money`, `payment-info`, `shares`
- **Servicios:** `group-errors`, `group-view`, `groups`, `invite-code`, `membership`, `payment-info`, `user-events.handler`
- **Repositorios (SQL):** `groups`, `invite-attempts`, `members`

Reglas de la arquitectura: [[Arquitectura-por-capas]] y [[Reglas-de-dominio]].
