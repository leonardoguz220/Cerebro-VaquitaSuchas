---
title: "Spec 006: Panel y reportes"
tipo: spec
area: specs
parent: "[[Specs]]"
status: aprobada
date: 2026-10-29
tags: [area/specs, spec, spec-006]
related: ["[[BE-reports]]", "[[BD-Esquema-reportes]]"]
fuente: https://github.com/leonardoguz220/VaquitaSuchas/blob/main/specs/006-panel-y-reportes/spec.md
spec_id: "006"
lider: "Adrian Vargas (Frontend)"
prioridad: "P1"
---

> Padre: [[Specs]]

# Spec 006 — Panel y reportes

## Resumen

Quien comparte varias suscripciones pierde de vista cuánto gasta al mes, cuánto ahorra por compartir y qué le falta pagar o cobrar. El panel responde esas preguntas de un vistazo y los reportes dejan exportar el historial para quien necesite conciliar cuentas.

## Datos clave

- Estado: aprobada
- Líder: Adrian Vargas (Frontend)
- Prioridad: P1 (importante)
- Depende de: [[Spec-001-suscripciones-compartidas]], [[Spec-002-cobros-y-pagos]], [[Spec-004-catalogo-de-servicios]]
- Última actualización: 2026-10-18
- Tamaño: 17 requisitos funcionales (RF), 11 reglas de negocio (RN), 22 criterios de aceptación (CA)
- Tareas: 35 hechas y 0 abiertas (ver [[Spec-006-tasks]])

## Historias de usuario

- **HU-006-01:** Como usuario, quiero ver cuánto gasto al mes en suscripciones para controlar mi presupuesto.
- **HU-006-02:** Como usuario, quiero ver cuánto me ahorro compartiendo.
- **HU-006-03:** Como miembro, quiero ver mis deudas pendientes y pagarlas desde ahí.
- **HU-006-04:** Como titular, quiero ver cuánto me falta cobrar y quién está atrasado.
- **HU-006-05:** Como usuario, quiero un calendario con mis próximas fechas de cobro y vencimiento.
- **HU-006-06:** Como usuario, quiero ver la evolución de mi gasto en los últimos meses.
- **HU-006-07:** Como titular o miembro, quiero exportar el historial a un archivo CSV.

## Dónde se implementa

- Backend: [[BE-reports]]
- Base de datos: [[BD-Esquema-reportes]]
- Decisiones relacionadas: —
- Roadmap: [[Roadmap-de-specs]]

## Documentos de esta spec

- [[Spec-006-texto-completo]] — Texto completo de la spec
- [[Spec-006-plan]] — Plan
- [[Spec-006-tasks]] — Tareas
- [[Spec-006-modelo-de-datos]] — Modelo de datos
- [[Spec-006-contrato-api]] — Contrato de API
- [[Spec-006-quickstart]] — Quickstart

## Notas hijas

- [[Spec-006-texto-completo]] — Spec 006 · Texto completo de la spec
- [[Spec-006-plan]] — Spec 006 · Plan
- [[Spec-006-tasks]] — Spec 006 · Tareas
- [[Spec-006-modelo-de-datos]] — Spec 006 · Modelo de datos
- [[Spec-006-contrato-api]] — Spec 006 · Contrato de API
- [[Spec-006-quickstart]] — Spec 006 · Quickstart
