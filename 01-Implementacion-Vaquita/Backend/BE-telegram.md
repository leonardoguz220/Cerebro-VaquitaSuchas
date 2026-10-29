---
title: "Backend · módulo telegram"
tipo: backend
area: implementacion
parent: "[[Backend]]"
date: 2026-10-29
tags: [area/implementacion, backend, backend, spec-003]
related: ["[[Spec-003-usuarios-y-autenticacion]]"]
---

> Padre: [[Backend]]

# Módulo backend `telegram`

Bot de Telegram: webhook, deduplicación de updates y modo simulado para desarrollo.

- Spec que lo define: [[Spec-003-usuarios-y-autenticacion]]
- Código: `backend/src/modules/telegram/` (capas: controllers, services, domain, repositories, ports)
- Pruebas unitarias del módulo: 3 archivos `*.spec.ts` (más e2e en `backend/test/`, ver [[BE-Pruebas]])
- Tablas: ver [[BD]] y la nota de esquema de la spec

## Endpoints

| Método | Ruta | Controlador |
|---|---|---|
| POST | `/telegram/webhook` | telegram |
| POST | `/dev/telegram/simulate` | telegram |
| GET | `/dev/telegram/outbox` | telegram |

Todas las rutas pasan por el proxy `/api` del frontend ([[Frontend]]). Contrato detallado: [[Spec-003-usuarios-y-autenticacion]] (nota de contrato dentro de la spec).

## Estructura por capas

- **Dominio** (funciones puras, 100 % con tests): `telegram-update`
- **Servicios:** `dev-telegram.gateway`, `telegram-dev`, `telegram-dispatcher`, `telegram-webhook`
- **Repositorios (SQL):** `http-telegram.gateway`, `telegram-updates`

Reglas de la arquitectura: [[Arquitectura-por-capas]] y [[Reglas-de-dominio]].
