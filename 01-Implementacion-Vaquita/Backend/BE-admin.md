---
title: "Backend · módulo admin"
tipo: backend
area: backend
parent: "[[Backend]]"
date: 2026-10-29
tags: [area/backend, backend, backend, spec-009]
related: ["[[Spec-009-administracion]]"]
---

> Padre: [[Backend]]

# Módulo backend `admin`

Administración: usuarios, baneos, habilitación de titulares, catálogo (CRUD e importación CSV), moderación de cupos, auditoría y estadísticas.

- Spec que lo define: [[Spec-009-administracion]]
- Código: `backend/src/modules/admin/` (capas: controllers, services, domain, repositories, ports)
- Pruebas unitarias del módulo: 7 archivos `*.spec.ts` (más e2e en `backend/test/`, ver [[BE-Pruebas]])
- Tablas: ver [[BD]] y la nota de esquema de la spec

## Endpoints

| Método | Ruta | Controlador |
|---|---|---|
| GET | `/admin/audit-log` | admin-audit |
| POST | `/admin/bans/:banId/revoke` | admin-bans |
| GET | `/admin/catalog` | admin-catalog |
| POST | `/admin/catalog/services` | admin-catalog |
| PATCH | `/admin/catalog/services/:id` | admin-catalog |
| POST | `/admin/catalog/services/:id/activate` | admin-catalog |
| POST | `/admin/catalog/services/:id/deactivate` | admin-catalog |
| POST | `/admin/catalog/plans` | admin-catalog |
| PATCH | `/admin/catalog/plans/:id` | admin-catalog |
| POST | `/admin/catalog/plans/:id/activate` | admin-catalog |
| POST | `/admin/catalog/plans/:id/deactivate` | admin-catalog |
| POST | `/admin/catalog/import/preview` | admin-catalog |
| POST | `/admin/catalog/import/apply` | admin-catalog |
| GET | `/admin/host-enablements` | admin-hosts |
| POST | `/admin/users/:userId/host-enablement` | admin-hosts |
| POST | `/admin/users/:userId/host-enablement/revoke` | admin-hosts |
| GET | `/admin/listings/reports` | admin-listings |
| POST | `/admin/listings/:id/restore` | admin-listings |
| POST | `/admin/listings/:id/delete` | admin-listings |
| POST | `/admin/listings/:id/delete-and-suspend` | admin-listings |
| GET | `/admin/stats` | admin-stats |
| GET | `/admin/users` | admin-users |
| GET | `/admin/users/:userId` | admin-users |
| POST | `/admin/users/:userId/suspend` | admin-users |
| POST | `/admin/users/:userId/reactivate` | admin-users |
| POST | `/admin/users/:userId/role` | admin-users |
| POST | `/admin/users/:userId/ban` | admin-users |

Todas las rutas pasan por el proxy `/api` del frontend ([[Frontend]]). Contrato detallado: [[Spec-009-administracion]] (nota de contrato dentro de la spec).

## Estructura por capas

- **Dominio** (funciones puras, 100 % con tests): `admin-rules`, `audit-cursor`, `audit-entry`, `ban-effects`, `catalog-validation`, `csv-parse`, `reason`, `suspension-mail`
- **Servicios:** `admin-errors`, `audit`, `ban`, `catalog-admin`, `catalog-import`, `host-enablement`, `listings-moderation`, `stats`, `users-admin`
- **Repositorios (SQL):** `audit`, `bans`, `catalog-admin`, `host-enablements`, `listings-moderation`, `stats`, `suspensions`, `users-admin`

Reglas de la arquitectura: [[Arquitectura-por-capas]] y [[Reglas-de-dominio]].
