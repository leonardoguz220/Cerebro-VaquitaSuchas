---
title: "Brevo (correo transaccional de staging)"
tipo: infra
area: implementacion
parent: "[[Despliegue]]"
date: 2026-10-29
tags: [area/implementacion, infra, correo]
---

> Padre: [[Despliegue]]

# Brevo

Proveedor de correo de staging: plan gratuito de 300 correos al día y remitente individual verificado. Decisión: [[ADR-0006-correo-de-staging-con-brevo]]. Variables: ver [[Runbook-correo-staging]]. Verificado de punta a punta en staging el 2026-10-27. Resend queda como alternativa (sin dominio propio solo envía al dueño de la cuenta). Código: `backend/src/shared/mail`, outbox y reintentos en [[BE-notifications]] y [[BE-auth]].
