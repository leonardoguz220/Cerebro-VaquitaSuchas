---
title: "Spec 000: Setup del proyecto"
tipo: spec
area: implementacion
parent: "[[Specs]]"
status: aprobada
date: 2026-10-29
tags: [area/implementacion, spec, spec-000]
related: ["[[BE-Jobs]]", "[[BE-Shared]]", "[[BD-Esquema-plataforma]]", "[[ADR-0006-correo-de-staging-con-brevo]]"]
fuente: https://github.com/leonardoguz220/VaquitaSuchas/blob/main/specs/000-setup-del-proyecto/spec.md
spec_id: "000"
lider: "Todos (cada capa define su parte)"
prioridad: "P0"
---

> Padre: [[Specs]]

# Spec 000 — Setup del proyecto

## Resumen

Antes de construir features, el equipo necesita una base común: un repositorio ordenado, entornos que cualquiera pueda levantar en su computadora, una base de datos con migraciones, integración continua y un despliegue mínimo que demuestre que las tres capas se hablan entre sí. Sin esto, cada persona trabaja "en su máquina" y la integración falla al final.

Esta spec es **técnica** (no tiene usuarios finales), pero se redacta igual con criterios verificables.

## Datos clave

- Estado: aprobada
- Líder: Todos (cada capa define su parte)
- Prioridad: P0 (base de todo)
- Depende de: —
- Última actualización: 2026-10-18
- Tamaño: 23 requisitos funcionales (RF), 3 reglas de negocio (RN), 18 criterios de aceptación (CA)
- Tareas: 56 hechas y 5 abiertas (ver [[Spec-000-tasks]])

## Historias de usuario

- (ver el texto completo)

## Dónde se implementa

- Backend: [[BE-Jobs]], [[BE-Shared]]
- Base de datos: [[BD-Esquema-plataforma]]
- Decisiones relacionadas: [[ADR-0006-correo-de-staging-con-brevo]]
- Roadmap: [[Roadmap-de-specs]]

## Documentos de esta spec

- [[Spec-000-texto-completo]] — Texto completo de la spec
- [[Spec-000-plan]] — Plan
- [[Spec-000-tasks]] — Tareas
- [[Spec-000-modelo-de-datos]] — Modelo de datos
- [[Spec-000-contrato-api]] — Contrato de API
- [[Spec-000-investigacion]] — Investigación
- [[Spec-000-quickstart]] — Quickstart

## Notas hijas

- [[Spec-000-texto-completo]] — Spec 000 · Texto completo de la spec
- [[Spec-000-plan]] — Spec 000 · Plan
- [[Spec-000-tasks]] — Spec 000 · Tareas
- [[Spec-000-modelo-de-datos]] — Spec 000 · Modelo de datos
- [[Spec-000-contrato-api]] — Spec 000 · Contrato de API
- [[Spec-000-investigacion]] — Spec 000 · Investigación
- [[Spec-000-quickstart]] — Spec 000 · Quickstart
