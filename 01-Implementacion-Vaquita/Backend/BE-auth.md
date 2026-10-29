---
title: "Backend · módulo auth"
tipo: backend
area: backend
parent: "[[Backend]]"
date: 2026-10-29
tags: [area/backend, backend, backend, spec-003]
related: ["[[Spec-003-usuarios-y-autenticacion]]"]
---

> Padre: [[Backend]]

# Módulo backend `auth`

Registro con CI, correo y contraseña, verificación de celular por Telegram, sesión (cookie httpOnly), recuperación y cambio de contraseña, cambio de celular, bloqueo por intentos.

- Spec que lo define: [[Spec-003-usuarios-y-autenticacion]]
- Código: `backend/src/modules/auth/` (capas: controllers, services, domain, repositories, jobs)
- Pruebas unitarias del módulo: 18 archivos `*.spec.ts` (más e2e en `backend/test/`, ver [[BE-Pruebas]])
- Tablas: ver [[BD]] y la nota de esquema de la spec

## Endpoints

| Método | Ruta | Controlador |
|---|---|---|
| POST | `/auth/register` | auth |
| POST | `/auth/register/link` | auth |
| GET | `/auth/register/status` | auth |
| GET | `/auth/policy` | auth |
| POST | `/auth/login` | auth |
| POST | `/auth/logout` | auth |
| GET | `/auth/me` | auth |
| POST | `/auth/password/forgot` | password |
| POST | `/auth/password/reset` | password |
| POST | `/auth/password/change` | password |
| POST | `/users/me/phone-change` | phone-change |
| GET | `/users/me/phone-change/status` | phone-change |

Todas las rutas pasan por el proxy `/api` del frontend ([[Frontend]]). Contrato detallado: [[Spec-003-usuarios-y-autenticacion]] (nota de contrato dentro de la spec).

## Estructura por capas

- **Dominio** (funciones puras, 100 % con tests): `ci`, `email`, `key-hash`, `login`, `login-lock`, `mail-templates`, `password-policy`, `password-reset`, `phone`, `phone-verification`, `register-status`, `registration`, `session-token`, `tokens`, `validate-registration`
- **Servicios:** `auth-session`, `login`, `mail-outbox`, `password`, `password-hasher`, `phone-change`, `registration`, `registration-status`, `session`, `telegram-verification.handler`
- **Repositorios (SQL):** `auth-session`, `login`, `phone-tokens`, `rate-limit`, `registration`, `reset-tokens`, `unverified-users`

Reglas de la arquitectura: [[Arquitectura-por-capas]] y [[Reglas-de-dominio]].
