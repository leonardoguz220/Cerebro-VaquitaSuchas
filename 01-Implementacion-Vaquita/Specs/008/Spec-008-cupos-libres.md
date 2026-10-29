---
title: "Spec 008: Cupos libres"
tipo: spec
area: specs
parent: "[[Specs]]"
status: aprobada
date: 2026-10-29
tags: [area/specs, spec, spec-008]
related: ["[[BE-listings]]", "[[BD-Esquema-cupos]]"]
fuente: https://github.com/leonardoguz220/VaquitaSuchas/blob/main/specs/008-cupos-libres/spec.md
spec_id: "008"
lider: "Adrian Vargas (Frontend)"
prioridad: "P2"
---

> Padre: [[Specs]]

# Spec 008 — Cupos libres

## Resumen

Muchos grupos tienen lugares vacíos: un plan familiar de 6 personas con 4 ocupadas paga más por persona de lo necesario. Y mucha gente busca compartir un servicio y no conoce a nadie. Los **cupos libres** conectan a ambos lados: el titular publica los lugares que le sobran y quien busca abre una solicitud de ingreso (spec 010), conversa con el titular, paga y entra cuando el titular lo confirma.

## Datos clave

- Estado: aprobada
- Líder: Adrian Vargas (Frontend)
- Prioridad: P2 (extra)
- Depende de: [[Spec-001-suscripciones-compartidas]], [[Spec-003-usuarios-y-autenticacion]], [[Spec-005-notificaciones]], [[Spec-007-reputacion]], [[Spec-010-solicitudes-de-ingreso]]
- Última actualización: 2026-10-18
- Tamaño: 22 requisitos funcionales (RF), 16 reglas de negocio (RN), 24 criterios de aceptación (CA)
- Tareas: 29 hechas y 5 abiertas (ver [[Spec-008-tasks]])

## Historias de usuario

- **HU-008-01:** Como titular, quiero publicar los cupos libres de mi suscripción para completar el grupo.
- **HU-008-02:** Como usuario, quiero buscar cupos por servicio y precio para encontrar un grupo.
- **HU-008-03:** Como usuario, quiero enviar una solicitud con un mensaje corto.
- **HU-008-04:** Como titular, quiero ver quién solicita, su puntualidad y aceptar o rechazar.
- **HU-008-05:** Como solicitante, quiero saber el resultado de mi solicitud.
- **HU-008-06:** Como usuario, quiero reportar una publicación sospechosa.
- **HU-008-07:** Como titular, quiero retirar la publicación cuando ya no la necesito.

## Dónde se implementa

- Backend: [[BE-listings]]
- Base de datos: [[BD-Esquema-cupos]]
- Decisiones relacionadas: —
- Roadmap: [[Roadmap-de-specs]]

## Documentos de esta spec

- [[Spec-008-texto-completo]] — Texto completo de la spec
- [[Spec-008-plan]] — Plan
- [[Spec-008-tasks]] — Tareas
- [[Spec-008-modelo-de-datos]] — Modelo de datos
- [[Spec-008-contrato-api]] — Contrato de API
- [[Spec-008-quickstart]] — Quickstart

## Notas hijas

- [[Spec-008-texto-completo]] — Spec 008 · Texto completo de la spec
- [[Spec-008-plan]] — Spec 008 · Plan
- [[Spec-008-tasks]] — Spec 008 · Tareas
- [[Spec-008-modelo-de-datos]] — Spec 008 · Modelo de datos
- [[Spec-008-contrato-api]] — Spec 008 · Contrato de API
- [[Spec-008-quickstart]] — Spec 008 · Quickstart
