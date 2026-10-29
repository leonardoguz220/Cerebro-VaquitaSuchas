---
title: "Backend · módulo listings"
tipo: backend
area: backend
parent: "[[Backend]]"
date: 2026-10-29
tags: [area/backend, backend, backend, spec-008]
related: ["[[Spec-008-cupos-libres]]"]
---

> Padre: [[Backend]]

# Módulo backend `listings`

Publicación, búsqueda y reporte de cupos libres; solicitudes desde una publicación.

- Spec que lo define: [[Spec-008-cupos-libres]]
- Código: `backend/src/modules/listings/` (capas: controllers, services, domain, repositories)
- Pruebas unitarias del módulo: 8 archivos `*.spec.ts` (más e2e en `backend/test/`, ver [[BE-Pruebas]])
- Tablas: ver [[BD]] y la nota de esquema de la spec

## Endpoints

| Método | Ruta | Controlador |
|---|---|---|
| POST | `/groups/:groupId/listing` | group-listing |
| GET | `/groups/:groupId/listing` | group-listing |
| PATCH | `/groups/:groupId/listing` | group-listing |
| POST | `/groups/:groupId/listing/renew` | group-listing |
| DELETE | `/groups/:groupId/listing` | group-listing |
| GET | `/listings` | listings |
| GET | `/listings/:id` | listings |
| POST | `/listings/:id/requests` | listings |
| POST | `/listings/:id/reports` | listings |

Todas las rutas pasan por el proxy `/api` del frontend ([[Frontend]]). Contrato detallado: [[Spec-008-cupos-libres]] (nota de contrato dentro de la spec).

## Estructura por capas

- **Dominio** (funciones puras, 100 % con tests): `estimated-share`, `listing-lifecycle`, `offered-slots`, `plain-text`, `report-rules`, `request-eligibility`, `search-cursor`
- **Servicios:** `listing-reports`, `listing-views`, `listings`, `listings-expire`, `listings-search`
- **Repositorios (SQL):** `listing-reports`, `listings`, `listings-search`

Reglas de la arquitectura: [[Arquitectura-por-capas]] y [[Reglas-de-dominio]].
