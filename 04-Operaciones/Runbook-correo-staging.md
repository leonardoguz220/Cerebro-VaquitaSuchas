---
title: "Runbook: correo de staging con Brevo"
tipo: runbook
area: operaciones
parent: "[[Operaciones]]"
date: 2026-10-29
tags: [area/operaciones, runbook, correo]
---

> Padre: [[Operaciones]]

Decisión: [[ADR-0006-correo-de-staging-con-brevo]]. Variables en Render (valores solo allí): `MAIL_MODE=prod`, `MAIL_PROVIDER=brevo`, `BREVO_API_KEY` (permiso solo transaccional), `MAIL_FROM` (remitente individual verificado). Verificado de punta a punta el 2026-10-27. Para cambiar de proveedor basta con variables de entorno. Infra: [[Brevo-correo]].
