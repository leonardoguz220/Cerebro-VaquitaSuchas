---
title: "Spec 007: Reputación"
tipo: spec
area: implementacion
parent: "[[Specs]]"
status: aprobada
date: 2026-10-29
tags: [area/implementacion, spec, spec-007]
related: ["[[BE-reputation]]", "[[BD-Esquema-reputacion]]", "[[ADR-0004-ingreso-con-pago-previo-y-chat]]"]
fuente: https://github.com/leonardoguz220/VaquitaSuchas/blob/main/specs/007-reputacion/spec.md
spec_id: "007"
lider: "Camila Fuentes (BD)"
prioridad: "P2"
---

> Padre: [[Specs]]

# Spec 007 — Reputación

## Resumen

Compartir una suscripción es un acto de confianza: el titular adelanta el dinero y espera que cada miembro pague a tiempo. Hoy esa confianza se basa en la memoria o en la amistad. Una calificación de puntualidad en estrellas, insignias y un ranking dentro del grupo hacen visible quién cumple, motivan a pagar a tiempo y ayudan al titular a decidir a quién aceptar (spec 008).

## Datos clave

- Estado: aprobada
- Líder: Camila Fuentes (BD)
- Prioridad: P2 (extra). La calificación básica (RF-007-01 a RF-007-05, RF-007-12, RF-007-13 y RF-007-15 a RF-007-17) se construye junto con el MVP, porque la spec 001 la usa para habilitar titulares (RF-001-21); las insignias y el ranking quedan en P2
- Depende de: [[Spec-001-suscripciones-compartidas]], [[Spec-002-cobros-y-pagos]]
- Última actualización: 2026-10-18
- Tamaño: 21 requisitos funcionales (RF), 12 reglas de negocio (RN), 25 criterios de aceptación (CA)
- Tareas: 37 hechas y 3 abiertas (ver [[Spec-007-tasks]])

## Historias de usuario

- **HU-007-01:** Como usuario, quiero ver mi calificación de puntualidad en estrellas y entender cómo se calcula.
- **HU-007-02:** Como usuario, quiero ganar insignias por pagar a tiempo.
- **HU-007-03:** Como miembro, quiero ver el ranking de mi grupo.
- **HU-007-04:** Como titular, quiero conocer la puntualidad de quien quiere entrar a mi grupo.
- **HU-007-05:** Como usuario, quiero que un rechazo injusto o un error no me quite puntos para siempre.

## Dónde se implementa

- Backend: [[BE-reputation]]
- Base de datos: [[BD-Esquema-reputacion]]
- Decisiones relacionadas: [[ADR-0004-ingreso-con-pago-previo-y-chat]]
- Roadmap: [[Roadmap-de-specs]]

## Documentos de esta spec

- [[Spec-007-texto-completo]] — Texto completo de la spec
- [[Spec-007-plan]] — Plan
- [[Spec-007-tasks]] — Tareas
- [[Spec-007-modelo-de-datos]] — Modelo de datos
- [[Spec-007-contrato-api]] — Contrato de API
- [[Spec-007-quickstart]] — Quickstart

## Notas hijas

- [[Spec-007-texto-completo]] — Spec 007 · Texto completo de la spec
- [[Spec-007-plan]] — Spec 007 · Plan
- [[Spec-007-tasks]] — Spec 007 · Tareas
- [[Spec-007-modelo-de-datos]] — Spec 007 · Modelo de datos
- [[Spec-007-contrato-api]] — Spec 007 · Contrato de API
- [[Spec-007-quickstart]] — Spec 007 · Quickstart
