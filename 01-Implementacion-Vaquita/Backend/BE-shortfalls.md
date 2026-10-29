---
title: "Backend · módulo shortfalls"
tipo: backend
area: backend
parent: "[[Backend]]"
date: 2026-10-29
tags: [area/backend, backend, backend, spec-011]
related: ["[[Spec-011-faltante-de-grupo]]"]
---

> Padre: [[Backend]]

# Módulo backend `shortfalls`

Faltante de grupo: cotización, rondas, respuestas de miembros, pagos adicionales, devoluciones y cola de disputas.

- Spec que lo define: [[Spec-011-faltante-de-grupo]]
- Código: `backend/src/modules/shortfalls/` (capas: controllers, services, domain, repositories, jobs)
- Pruebas unitarias del módulo: 3 archivos `*.spec.ts` (más e2e en `backend/test/`, ver [[BE-Pruebas]])
- Tablas: ver [[BD]] y la nota de esquema de la spec

## Endpoints

| Método | Ruta | Controlador |
|---|---|---|
| GET | `/admin/shortfall-disputes` | shortfall-disputes |
| GET | `/groups/:groupId/shortfall/preview` | shortfalls |
| POST | `/groups/:groupId/shortfall` | shortfalls |
| GET | `/groups/:groupId/shortfall` | shortfalls |
| POST | `/shortfall-rounds/:roundId/cancel` | shortfalls |
| GET | `/me/shortfalls` | shortfalls |
| POST | `/shortfall-rows/:rowId/respond` | shortfalls |
| POST | `/shortfall-rows/:rowId/pay` | shortfalls |
| POST | `/shortfall-rows/:rowId/confirm-payment` | shortfalls |
| POST | `/shortfall-rows/:rowId/reject-payment` | shortfalls |
| POST | `/shortfall-rows/:rowId/refund` | shortfalls |
| POST | `/shortfall-rows/:rowId/refund/confirm` | shortfalls |
| POST | `/shortfall-rows/:rowId/refund/dispute` | shortfalls |

Todas las rutas pasan por el proxy `/api` del frontend ([[Frontend]]). Contrato detallado: [[Spec-011-faltante-de-grupo]] (nota de contrato dentro de la spec).

## Estructura por capas

- **Dominio** (funciones puras, 100 % con tests): `allowed-actions`, `deadlines`, `shortfall-quote`, `state`
- **Servicios:** `shortfall-actions`, `shortfall-disputes`, `shortfall-lifecycle`, `shortfall-sweeper`, `shortfall-view`, `shortfall-views`, `shortfalls`
- **Repositorios (SQL):** `shortfalls`

Reglas de la arquitectura: [[Arquitectura-por-capas]] y [[Reglas-de-dominio]].
