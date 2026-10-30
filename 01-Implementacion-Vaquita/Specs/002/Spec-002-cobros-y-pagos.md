---
title: "Spec 002: Cobros y pagos"
tipo: spec
area: specs
parent: "[[Specs]]"
status: aprobada
date: 2026-10-29
tags: [area/specs, spec, spec-002]
related: ["[[BE-billing]]", "[[BD-Esquema-cobros]]"]
fuente: https://github.com/leonardoguz220/VaquitaSuchas/blob/main/specs/002-cobros-y-pagos/spec.md
spec_id: "002"
lider: "Leonardo Guzman (Backend)"
prioridad: "P0"
---

> Padre: [[Specs]]

# Spec 002 — Cobros y pagos

## Resumen

Una vez formado el grupo, el dolor real es el cobro mensual: recordar quién pagó, quién no, y tener pruebas. Hoy se hace por chat, con capturas perdidas y discusiones.

Esta spec define el ciclo de vida de un **cobro mensual**: su generación automática en la fecha de corte, la subida del **comprobante** por parte del miembro, la **confirmación o rechazo** del titular y el **historial** visible para todo el grupo.

## Datos clave

- Estado: aprobada
- Líder: Leonardo Guzman (Backend)
- Prioridad: P0 (MVP)
- Depende de: [[Spec-001-suscripciones-compartidas]]
- Última actualización: 2026-10-18
- Tamaño: 25 requisitos funcionales (RF), 18 reglas de negocio (RN), 33 criterios de aceptación (CA)
- Tareas: 53 hechas y 0 abiertas (ver [[Spec-002-tasks]])

## Historias de usuario

- **HU-002-01:** Como miembro, quiero ver cuánto debo este mes, a quién pagarle y hasta cuándo.
- **HU-002-02:** Como miembro, quiero subir mi comprobante para demostrar que pagué.
- **HU-002-03:** Como titular, quiero ver los comprobantes y confirmarlos o rechazarlos con un motivo.
- **HU-002-04:** Como titular, quiero registrar un pago recibido en efectivo, para que quede en el historial.
- **HU-002-05:** Como miembro, quiero ver el estado del mes de todo el grupo y el historial, para que haya transparencia.
- **HU-002-06:** Como titular, quiero que los cobros se generen solos cada mes, para no hacerlo a mano.
- **HU-002-07:** Como titular, quiero cancelar un cobro (ej. un miembro que se va), para que no figure como deuda.

## Dónde se implementa

- Backend: [[BE-billing]]
- Base de datos: [[BD-Esquema-cobros]]
- Decisiones relacionadas: —
- Roadmap: [[Roadmap-de-specs]]

## Documentos de esta spec

- [[Spec-002-texto-completo]] — Texto completo de la spec
- [[Spec-002-plan]] — Plan
- [[Spec-002-tasks]] — Tareas
- [[Spec-002-modelo-de-datos]] — Modelo de datos
- [[Spec-002-contrato-api]] — Contrato de API
- [[Spec-002-investigacion]] — Investigación
- [[Spec-002-quickstart]] — Quickstart

## Notas hijas

- [[Spec-002-texto-completo]] — Spec 002 · Texto completo de la spec
- [[Spec-002-plan]] — Spec 002 · Plan
- [[Spec-002-tasks]] — Spec 002 · Tareas
- [[Spec-002-modelo-de-datos]] — Spec 002 · Modelo de datos
- [[Spec-002-contrato-api]] — Spec 002 · Contrato de API
- [[Spec-002-investigacion]] — Spec 002 · Investigación
- [[Spec-002-quickstart]] — Spec 002 · Quickstart
