---
title: "Arquitectura · datos y principios de modelado"
tipo: arquitectura
area: arquitectura
parent: "[[Arquitectura]]"
date: 2026-10-29
tags: [area/arquitectura, arquitectura]
related: ["[[BD-Relaciones]]", "[[BD]]"]
---

> Padre: [[Arquitectura]]

# Datos y principios de modelado

PostgreSQL es la única fuente de verdad ([[ADR-0001-postgresql-como-base-de-datos]]). Principios que se repiten en el esquema:

- **Dinero en centavos enteros** y copia (snapshot) de precio, moneda, tipo de cambio y número de miembros en cada ciclo y cobro; el historial no cambia si luego se edita la suscripción ([[Dinero-y-moneda]]).
- **Integridad en la base:** unicidades (un titular por grupo, un cobro por grupo, miembro y período, referencias de pago únicas por grupo), claves foráneas, `CHECK` de estados y disparadores que impiden cambios inválidos ([[BD]]).
- **Estadías, no membresías:** una persona puede salir y volver; `group_members` guarda estadías inmutables (migración 0033).
- **Eventos de solo anexado:** `charge_events`, `join_request_events`, `shortfall_events`, mensajes de chat; no se editan ni se borran y sirven de evidencia ([[BD-Pruebas]]).
- **Máquinas de estado en funciones puras de dominio** (cobros, solicitudes, faltante) y en la BD por `CHECK`/disparadores ([[Estados-de-cobro]], [[Ingreso-al-grupo]], [[Faltante-de-grupo-reglas]]).
- **Privacidad:** CI cifrada (`CI_ENCRYPTION_KEY`), identidades baneadas guardadas como huellas irreversibles (`banned_identities`), fechas en UTC y mostradas en America/La_Paz.
- **Buzón de salida:** `notification_deliveries` desacopla el aviso del envío por canal con reintentos.

Mapa de tablas: [[BD-Relaciones]]. Migraciones: [[BD-Migraciones]].
