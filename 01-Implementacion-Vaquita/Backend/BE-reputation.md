---
title: "Backend · módulo reputation"
tipo: backend
area: implementacion
parent: "[[Backend]]"
date: 2026-10-29
tags: [area/implementacion, backend, backend, spec-007]
related: ["[[Spec-007-reputacion]]"]
---

> Padre: [[Backend]]

# Módulo backend `reputation`

Calificación de puntualidad, nivel, insignias, ranking por grupo y reportes o exclusiones de cobros.

- Spec que lo define: [[Spec-007-reputacion]]
- Código: `backend/src/modules/reputation/` (capas: controllers, services, domain, repositories, ports)
- Pruebas unitarias del módulo: 6 archivos `*.spec.ts` (más e2e en `backend/test/`, ver [[BE-Pruebas]])
- Tablas: ver [[BD]] y la nota de esquema de la spec

## Endpoints

| Método | Ruta | Controlador |
|---|---|---|
| GET | `/users/me/badges` | badges |
| GET | `/groups/:groupId/ranking` | ranking |
| POST | `/charges/:chargeId/reputation-report` | reports |
| POST | `/charges/:chargeId/reputation-exclusion` | reports |
| GET | `/users/me/reputation` | reputation |

Todas las rutas pasan por el proxy `/api` del frontend ([[Frontend]]). Contrato detallado: [[Spec-007-reputacion]] (nota de contrato dentro de la spec).

## Estructura por capas

- **Dominio** (funciones puras, 100 % con tests): `badges-rules`, `facts`, `host-threshold`, `level`, `punctuality`, `ranking-order`, `rules-version`, `score`, `streak`
- **Servicios:** `badges`, `ranking`, `reconcile.job`, `reports`, `reputation`, `reputation-events.handler`, `reputation-query`
- **Repositorios (SQL):** `badges`, `exclusions`, `reputation`

Reglas de la arquitectura: [[Arquitectura-por-capas]] y [[Reglas-de-dominio]].
