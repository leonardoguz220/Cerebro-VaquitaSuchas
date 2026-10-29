---
title: "Backend · código compartido"
tipo: backend
area: implementacion
parent: "[[Backend]]"
date: 2026-10-29
tags: [area/implementacion, backend, shared]
---

> Padre: [[Backend]]

# Código compartido (`backend/src/shared`)

Carpetas: `clock`, `config`, `db`, `domain`, `errors`, `events`, `guards`, `http`, `jobs`, `logging`, `mail`, `ports`, `storage`.

- `config`: lectura y validación de variables de entorno (por ejemplo `MAIL_MODE`, `TELEGRAM_MODE`, `STORAGE_DRIVER`, `JOBS_INPROCESS`). Los valores reales viven solo en Render; ver [[Despliegue]].
- `db`: acceso a PostgreSQL con `pg` (sin ORM; SQL en repositorios).
- `errors`: errores con el código HTTP correcto y sin detalles internos.
- `guards`: sesión, rol y administración.
- `jobs`: ver [[BE-Jobs]].
- `mail`: Resend o Brevo según `MAIL_PROVIDER` ([[ADR-0006-correo-de-staging-con-brevo]]).
- `storage`: archivos en disco o Supabase Storage ([[Supabase-Storage]]).
- `logging`: logs sin contraseñas, tokens ni datos personales ([[Seguridad]]).
- `clock`, `events`, `http`, `ports`, `domain`: reloj inyectable, eventos internos entre módulos, utilidades HTTP y puertos.

Los módulos no se importan entre sí directamente: se hablan por puertos y adaptadores (`backend/src/app-adapters/`), verificado por `architecture.spec.ts` ([[Arquitectura-por-capas]]).
