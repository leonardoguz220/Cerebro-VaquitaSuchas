---
title: "Spec 004: Catálogo de servicios"
tipo: spec
area: specs
parent: "[[Specs]]"
status: aprobada
date: 2026-10-29
tags: [area/specs, spec, spec-004]
related: ["[[BE-catalog]]", "[[BD-Esquema-catalogo]]"]
fuente: https://github.com/leonardoguz220/VaquitaSuchas/blob/main/specs/004-catalogo-de-servicios/spec.md
spec_id: "004"
lider: "Camila Fuentes (BD)"
prioridad: "P0"
---

> Padre: [[Specs]]

# Spec 004 — Catálogo de servicios

## Resumen

Al crear una suscripción compartida, el titular no debería escribir a mano el nombre de la plataforma, su plan ni cuántas personas admite. Un catálogo de servicios con sus planes, precios de referencia y cupos máximos acelera la creación del grupo, evita errores (por ejemplo, invitar a más personas de las que permite el plan) y habilita el cálculo del ahorro (spec 006).

## Datos clave

- Estado: aprobada
- Líder: Camila Fuentes (BD)
- Prioridad: P0 (MVP)
- Depende de: [[Spec-000-setup-del-proyecto]]
- Última actualización: 2026-10-18
- Tamaño: 9 requisitos funcionales (RF), 6 reglas de negocio (RN), 12 criterios de aceptación (CA)
- Tareas: 25 hechas y 0 abiertas (ver [[Spec-004-tasks]])

## Historias de usuario

- **HU-004-01:** Como titular, quiero elegir un servicio y un plan de una lista para crear mi suscripción sin escribir todo a mano.
- **HU-004-02:** Como titular, quiero ver los cupos máximos del plan para no invitar de más.
- **HU-004-03:** Como usuario, quiero buscar un servicio por nombre o categoría.
- **HU-004-04:** Como equipo, queremos actualizar precios y planes sin romper los grupos existentes.

## Dónde se implementa

- Backend: [[BE-catalog]]
- Base de datos: [[BD-Esquema-catalogo]]
- Decisiones relacionadas: —
- Roadmap: [[Roadmap-de-specs]]

## Documentos de esta spec

- [[Spec-004-texto-completo]] — Texto completo de la spec
- [[Spec-004-plan]] — Plan
- [[Spec-004-tasks]] — Tareas
- [[Spec-004-modelo-de-datos]] — Modelo de datos
- [[Spec-004-contrato-api]] — Contrato de API
- [[Spec-004-quickstart]] — Quickstart

## Notas hijas

- [[Spec-004-texto-completo]] — Spec 004 · Texto completo de la spec
- [[Spec-004-plan]] — Spec 004 · Plan
- [[Spec-004-tasks]] — Spec 004 · Tareas
- [[Spec-004-modelo-de-datos]] — Spec 004 · Modelo de datos
- [[Spec-004-contrato-api]] — Spec 004 · Contrato de API
- [[Spec-004-quickstart]] — Spec 004 · Quickstart
