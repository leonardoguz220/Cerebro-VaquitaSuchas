---
title: "Runbook: correo de staging con Brevo"
type: runbook
date: 2026-10-27
tags: [operaciones, correo, staging]
related: ["[[ADR-0006-correo-de-staging-con-brevo]]"]
fuente: https://github.com/leonardoguz220/VaquitaSuchas/blob/main/context/decisiones/0006-correo-de-staging-con-brevo.md
---
Decisión: [[ADR-0006-correo-de-staging-con-brevo]].

Variables en Render (los valores no se guardan aquí): `MAIL_MODE=prod`, `MAIL_PROVIDER=brevo`, `BREVO_API_KEY` (permiso solo transaccional), `MAIL_FROM` (remitente individual verificado).

Verificado de punta a punta en staging el 2026-10-27. Cambiar a Resend u otro proveedor solo requiere variables de entorno.
