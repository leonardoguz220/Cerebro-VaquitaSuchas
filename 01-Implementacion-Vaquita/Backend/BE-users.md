---
title: "Backend · módulo users"
tipo: backend
area: implementacion
parent: "[[Backend]]"
date: 2026-10-29
tags: [area/implementacion, backend, backend, spec-003]
related: ["[[Spec-003-usuarios-y-autenticacion]]"]
---

> Padre: [[Backend]]

# Módulo backend `users`

Perfil propio del usuario y cuenta; CI enmascarada.

- Spec que lo define: [[Spec-003-usuarios-y-autenticacion]]
- Código: `backend/src/modules/users/` (capas: controllers, services, domain, repositories)
- Pruebas unitarias del módulo: 5 archivos `*.spec.ts` (más e2e en `backend/test/`, ver [[BE-Pruebas]])
- Tablas: ver [[BD]] y la nota de esquema de la spec

## Endpoints

| Método | Ruta | Controlador |
|---|---|---|
| PATCH | `/users/me` | users |

Todas las rutas pasan por el proxy `/api` del frontend ([[Frontend]]). Contrato detallado: [[Spec-003-usuarios-y-autenticacion]] (nota de contrato dentro de la spec).

## Estructura por capas

- **Dominio** (funciones puras, 100 % con tests): `ci-mask`, `profile`, `user-self`
- **Servicios:** `identity`, `user-account`, `user-self`, `users`
- **Repositorios (SQL):** `banned-identities`, `users`, `users-account`

Reglas de la arquitectura: [[Arquitectura-por-capas]] y [[Reglas-de-dominio]].
