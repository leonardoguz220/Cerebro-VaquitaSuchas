---
title: "Estado actual del proyecto"
tipo: status
area: implementacion
parent: "[[Implementacion-Vaquita]]"
status: vigente
date: 2026-10-29
tags: [area/implementacion, status]
related: ["[[Despliegue]]", "[[CI-CD]]"]
---

> Padre: [[Implementacion-Vaquita]]

# Estado actual (2026-10-29)

Actualizar al cambiar algo. Fuente: `tasks.md`, PR recientes y la memoria del proyecto ([[Memoria-del-proyecto]]).

## Avance
- Specs 000 a 011 aprobadas; código de las 12 specs fusionado en `main` hasta el PR #263 (2026-10-28). La 011 (faltante) entró con los PR #252 a #255.
- Staging operativo: frontend en Vercel, backend y base en Render, Supabase Storage, Telegram y Brevo configurados ([[Despliegue]]).
- Presentación calificada del 2026-10-22: ya hecha ([[Estudio-y-presentacion]]).

## Pendientes conocidos
- El E2E del flujo feliz del MVP (spec 002 T043) se fusionó en el PR #237; revisar en `tasks.md` si queda algo abierto.
- Los workflows `deploy-*.yml` no se registran en GitHub ([[CI-CD]]).
- La base gratuita de Render caduca 30 días después de crearse: respaldar antes ([[Render]]).
- Revisión de Camila y Adrian de la spec 011 y de los plazos supuestos ([[Decision-plazos-faltante-grupo]]).
- Pasos manuales: [[Pasos-pendientes-de-Leo]] y [[Pendientes-de-Adrian-y-Camila]].

## Tareas abiertas en `tasks.md`

- Spec 000: **I1:** migraciones y convenciones disponibles para el backend (T008 a T012)
- Spec 000: **I2:** contrato técnico congelado (`contracts/api.md` A, B y C)
- Spec 000: **I3:** frontend conectado al backend real (T039, T040)
- Spec 000: **I4:** CI obligatorio y `main` protegida (T041, T046)
- Spec 000: **I5:** staging con tres capas respondiendo (T052)
- Spec 001: **I1:** modelo y funciones puras disponibles para las specs 002 y 010 (T004, T011)
- Spec 001: **I2:** contrato de API congelado (`contracts/api.md`)
- Spec 001: **I3:** frontend conectado al backend real (T017, T021)
- Spec 001: **I4:** la spec 010 abre solicitudes con `InviteCodeService` y une miembros con `addMemberTx` (T023, T027)
- Spec 001: **I5:** `HostEligibilityPort` conectado con las specs 007 y 009 (T013)
- Spec 002: **I1:** modelo de datos disponible (T002 a T006)
- Spec 002: **I2:** contrato de API congelado (`contracts/api.md`)
- Spec 002: **I3:** frontend conectado al backend real (T019, T023, T027, T038)
- Spec 002: **I4:** la spec 010 usa `ensureCurrentCycle`, `PaymentReferenceService` y `createEntryCharge` (T013, T021, T039)
- Spec 002: **I5:** la spec 007 lee los hechos de cobros por `ChargeFactsPort` (T017)
- Spec 002: **I6:** avisos de la spec 005 parte A conectados (T041)
- Spec 003: **I1:** modelo de identidad y `AuthGuard` disponibles para las demás specs (T002, T011, T012, T013)
- Spec 003: **I2:** contrato de API congelado (`contracts/api.md`)
- Spec 003: **I3:** frontend conectado al backend real (T025, T030)
- Spec 003: **I4:** flujo completo de registro con el bot simulado en CI (T026)
- Spec 004: **I1:** modelo y seed disponibles para el backend (T002 a T005)
- Spec 004: **I2:** contrato de API congelado (`contracts/api.md`)
- Spec 004: **I3:** frontend conectado al backend real (T012, T016)
- Spec 004: **I4:** la spec 001 usa `getActivePlanForSubscription` y copia los datos (T017)
- Spec 005: **I1:** parte A disponible para las specs 002, 001 y 010 (T007)
- Spec 005: **I2:** contrato de API congelado (`contracts/api.md`)
- Spec 005: **I3:** frontend conectado al backend real (T013, T024, T028)
- Spec 005: **I4:** envíos por correo con reintentos y ventana (T020)
- Spec 005: **I5:** Telegram conectado con la verificación de celular de la spec 003 (T030)
- Spec 006: **I1:** vistas e índices disponibles (T002, T003)
- Spec 006: **I2:** contrato de API congelado (`contracts/api.md`)
- Spec 006: **I3:** frontend conectado al backend real (T013, T015, T019, T023, T027)
- Spec 006: **I4:** rendimiento verificado con 20 suscripciones × 12 meses (T010, T029)
- Spec 007: **I1:** modelo y funciones puras disponibles (T002, T006)
- Spec 007: **I2:** `ReputationQueryPort` disponible para las specs 001, 008, 009 y 010 (T010, T014)
- Spec 007: **I3:** frontend conectado al backend real (T016, T022, T027, T033)
- Spec 008: **I1:** modelo de datos y puertos disponibles (T004, T008)
- Spec 008: **I2:** contrato de API congelado (`contracts/api.md`)
- Spec 008: **I3:** frontend conectado al backend real (T012, T016, T020)
- Spec 008: **I4:** la spec 010 abre solicitudes desde publicaciones y respeta `slots_offered` (T018)
- Spec 008: **I5:** moderación conectada con la spec 009 (T022)
- Spec 009: **I1:** modelo de datos y puertos `AuditPort` y `BanPort` disponibles (T002 a T011)
- Spec 009: **I2:** núcleo MVP completo: usuarios, baneo, titulares, reclamos y auditoría (T025)
- Spec 009: **I3:** frontend conectado al backend real (T018, T021, T025, T029, T032, T035)
- Spec 009: **I4:** `HostEligibilityPort` conectado con la spec 007 (T020)
- Spec 010: **I1:** modelo de datos disponible (T002 a T006)
- Spec 010: **I2:** contrato de API congelado (`contracts/api.md`)
- Spec 010: **I3:** frontend conectado al backend real (T018, T023, T027, T031, T035, T040)
- Spec 010: **I4:** la aceptación usa `ensureCurrentCycle`, `addMemberTx` y `createEntryCharge` (T029)
- Spec 010: **I5:** reclamos conectados con `BanPort` y `AuditPort` de la spec 009 (T038)
- Spec 010: **I6:** la spec 008 abre solicitudes con `openFromListing` (T036)
- Spec 010: **I7:** avisos de la spec 005 parte A conectados (T044)

Historial: [[Historial-de-PRs]].
