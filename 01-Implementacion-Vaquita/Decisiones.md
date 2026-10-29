---
title: "Decisiones"
tipo: hub
area: implementacion
parent: "[[Implementacion-Vaquita]]"
date: 2026-10-29
tags: [area/implementacion, hub]
related: ["[[Specs]]", "[[Dominio]]"]
---

> Padre: [[Implementacion-Vaquita]]

# Decisiones

Registro de decisiones (ADR) y decisiones puntuales. Cada una tiene contexto, alternativas y consecuencias. Estados: `propuesta`, `supuesta` (alguien decidió por simplicidad y falta objeción), `aceptada`, `reemplazada`.

Resumen cronológico:

| Fecha | Decisión |
|---|---|
| 2026-10-17 | [[ADR-0001-postgresql-como-base-de-datos]], [[ADR-0002-arquitectura-por-capas]], [[ADR-0003-alcance-de-diez-modulos]], [[ADR-0004-ingreso-con-pago-previo-y-chat]], [[ADR-0005-identidad-cedula-telegram]] (actualizada el 18) |
| 2026-10-18 | Aprobación de las specs 000-010 por las tres capas ([[Specs]]); PR sin aprobación humana obligatoria ([[Flujo-de-ramas]]) |
| 2026-10-26 | [[ADR-0006-correo-de-staging-con-brevo]] |
| 2026-10-28 | [[Decision-plazos-faltante-grupo]] (supuesta) y [[Decision-vault-en-repo-aparte]] |

Para registrar una nueva decisión usa [[Plantilla-ADR]]. Preguntas aún sin cerrar: [[Preguntas-abiertas]].

## Notas hijas

- [[ADR-0001-postgresql-como-base-de-datos]] — 0001. PostgreSQL como base de datos
- [[ADR-0002-arquitectura-por-capas]] — 0002. Arquitectura por capas
- [[ADR-0003-alcance-de-diez-modulos]] — 0003. Alcance de diez módulos, construcción por prioridad
- [[ADR-0004-ingreso-con-pago-previo-y-chat]] — 0004. Ingreso al grupo con pago previo y chat por solicitud
- [[ADR-0005-identidad-cedula-telegram]] — 0005. Identidad con cédula y celular verificado por Telegram
- [[ADR-0006-correo-de-staging-con-brevo]] — 0006. Correo de staging con Brevo
- [[Decision-plazos-faltante-grupo]] — Plazos supuestos del faltante de grupo (spec 011)
- [[Decision-vault-en-repo-aparte]] — Vault de Obsidian en un repo aparte
- [[Plantilla-ADR]] — Plantilla de ADR
