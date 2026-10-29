---
title: "Backend · módulo reports"
tipo: backend
area: implementacion
parent: "[[Backend]]"
date: 2026-10-29
tags: [area/implementacion, backend, backend, spec-006]
related: ["[[Spec-006-panel-y-reportes]]"]
---

> Padre: [[Backend]]

# Módulo backend `reports`

Panel del usuario, calendario, cobranza por grupo, historial y exportaciones CSV.

- Spec que lo define: [[Spec-006-panel-y-reportes]]
- Código: `backend/src/modules/reports/` (capas: controllers, services, domain, repositories, ports)
- Pruebas unitarias del módulo: 7 archivos `*.spec.ts` (más e2e en `backend/test/`, ver [[BE-Pruebas]])
- Tablas: ver [[BD]] y la nota de esquema de la spec

## Endpoints

| Método | Ruta | Controlador |
|---|---|---|
| GET | `/me/calendar` | calendar |
| GET | `/me/calendar/upcoming` | calendar |
| GET | `/groups/:groupId/collection` | collection |
| GET | `/me/dashboard` | dashboard |
| GET | `/me/dashboard/lists` | dashboard |
| GET | `/me/dashboard/charts` | dashboard |
| GET | `/me/history/export.csv` | export |
| GET | `/groups/:groupId/history/export.csv` | export |
| GET | `/me/history` | history |

Todas las rutas pasan por el proxy `/api` del frontend ([[Frontend]]). Contrato detallado: [[Spec-006-panel-y-reportes]] (nota de contrato dentro de la spec).

## Estructura por capas

- **Dominio** (funciones puras, 100 % con tests): `calendar-events`, `collection`, `csv`, `history-cursor`, `list-cursor`, `months`, `savings`
- **Servicios:** `calendar`, `charts`, `dashboard`, `export`, `history`
- **Repositorios (SQL):** `export-limit`, `membership`, `reports`

Reglas de la arquitectura: [[Arquitectura-por-capas]] y [[Reglas-de-dominio]].
