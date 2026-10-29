---
title: "Frontend · rutas y pantallas"
tipo: frontend
area: implementacion
parent: "[[Frontend]]"
date: 2026-10-29
tags: [area/implementacion, frontend, rutas]
---

> Padre: [[Frontend]]

# Rutas de Next.js (`frontend/src/app`)

38 pantallas. Interfaz en español de Bolivia, mobile first. El frontend no calcula cuotas ni estados: muestra lo que devuelve el backend.

| Ruta | Spec |
|---|---|
| `/` | [[Spec-000-setup-del-proyecto]] |
| `/admin` | [[Spec-009-administracion]] |
| `/admin/auditoria` | [[Spec-009-administracion]] |
| `/admin/catalogo` | [[Spec-009-administracion]] |
| `/admin/devoluciones` | [[Spec-011-faltante-de-grupo]] |
| `/admin/moderacion` | [[Spec-009-administracion]] |
| `/admin/reclamos` | [[Spec-009-administracion]] |
| `/admin/reclamos/[id]` | [[Spec-009-administracion]] |
| `/admin/titulares` | [[Spec-009-administracion]] |
| `/admin/usuarios` | [[Spec-009-administracion]] |
| `/admin/usuarios/[id]` | [[Spec-009-administracion]] |
| `/ajustes/avisos` | [[Spec-005-notificaciones]] |
| `/avisos/desactivar` | [[Spec-005-notificaciones]] |
| `/cobros` | [[Spec-002-cobros-y-pagos]] |
| `/cobros/[id]` | [[Spec-002-cobros-y-pagos]] |
| `/cupos` | [[Spec-008-cupos-libres]] |
| `/cupos/[id]` | [[Spec-008-cupos-libres]] |
| `/dev/telegram` | [[Spec-003-usuarios-y-autenticacion]] |
| `/estado` | [[Spec-000-setup-del-proyecto]] |
| `/grupos` | [[Spec-001-suscripciones-compartidas]] |
| `/grupos/[id]` | [[Spec-001-suscripciones-compartidas]] |
| `/grupos/[id]/faltante` | [[Spec-011-faltante-de-grupo]] |
| `/grupos/nuevo` | [[Spec-001-suscripciones-compartidas]] |
| `/ingresar` | [[Spec-003-usuarios-y-autenticacion]] |
| `/notificaciones` | [[Spec-005-notificaciones]] |
| `/panel` | [[Spec-006-panel-y-reportes]] |
| `/panel/calendario` | [[Spec-006-panel-y-reportes]] |
| `/panel/historial` | [[Spec-006-panel-y-reportes]] |
| `/perfil` | [[Spec-003-usuarios-y-autenticacion]] |
| `/perfil/insignias` | [[Spec-007-reputacion]] |
| `/perfil/reputacion` | [[Spec-007-reputacion]] |
| `/recuperar` | [[Spec-003-usuarios-y-autenticacion]] |
| `/recuperar/[token]` | [[Spec-003-usuarios-y-autenticacion]] |
| `/registro` | [[Spec-003-usuarios-y-autenticacion]] |
| `/registro/verificar` | [[Spec-003-usuarios-y-autenticacion]] |
| `/solicitudes` | [[Spec-010-solicitudes-de-ingreso]] |
| `/solicitudes/[id]` | [[Spec-010-solicitudes-de-ingreso]] |
| `/unirse` | [[Spec-010-solicitudes-de-ingreso]] |

También existe `app/api` (proxy hacia el backend con cookie httpOnly, ver [[Seguridad]]) y `proxy.ts` (PR #203: lee el cuerpo completo para no romper respuestas 401 de un POST).

Contexto: [[Endpoints-y-pantallas]] · [[FE-Disenos]].
