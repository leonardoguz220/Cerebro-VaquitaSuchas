---
title: "Backend · módulo health"
tipo: backend
area: backend
parent: "[[Backend]]"
date: 2026-10-29
tags: [area/backend, backend, backend, spec-000]
related: ["[[Spec-000-setup-del-proyecto]]"]
---

> Padre: [[Backend]]

# Módulo backend `health`

Endpoint `/health` con estado de la app y la base.

- Spec que lo define: [[Spec-000-setup-del-proyecto]]
- Código: `backend/src/modules/health/` (capas: controllers, services, domain, repositories)
- Pruebas unitarias del módulo: 2 archivos `*.spec.ts` (más e2e en `backend/test/`, ver [[BE-Pruebas]])
- Tablas: ver [[BD]] y la nota de esquema de la spec

## Endpoints

| Método | Ruta | Controlador |
|---|---|---|
| GET | `/health` | health |

Todas las rutas pasan por el proxy `/api` del frontend ([[Frontend]]). Contrato detallado: [[Spec-000-setup-del-proyecto]] (nota de contrato dentro de la spec).

## Estructura por capas

- **Dominio** (funciones puras, 100 % con tests): `health`
- **Servicios:** `health`
- **Repositorios (SQL):** `health`

Reglas de la arquitectura: [[Arquitectura-por-capas]] y [[Reglas-de-dominio]].
