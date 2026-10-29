---
title: "Spec 001: Suscripciones compartidas"
tipo: spec
area: implementacion
parent: "[[Specs]]"
status: aprobada
date: 2026-10-29
tags: [area/implementacion, spec, spec-001]
related: ["[[BE-subscriptions]]", "[[BD-Esquema-grupos]]", "[[ADR-0003-alcance-de-diez-modulos]]"]
fuente: https://github.com/leonardoguz220/VaquitaSuchas/blob/main/specs/001-suscripciones-compartidas/spec.md
spec_id: "001"
lider: "Camila Fuentes (BD)"
prioridad: "P0"
---

> Padre: [[Specs]]

# Spec 001 — Suscripciones compartidas

## Resumen

Los grupos de amigos, familias o compañeros de departamento comparten cuentas de plataformas como Netflix o Spotify. Hoy una persona (el titular) paga el total y debe recordar quién le debe cuánto, convertir de dólares a bolivianos y perseguir a cada miembro. Sin un registro claro hay confusiones y conflictos.

Esta spec define cómo se **crea una suscripción compartida**, cómo se **invita y administra a los miembros** y cómo se **calcula la cuota de cada uno en bolivianos**. Es la base sobre la que la spec 002 genera los cobros mensuales.

## Datos clave

- Estado: aprobada
- Líder: Camila Fuentes (BD)
- Prioridad: P0 (MVP)
- Depende de: [[Spec-003-usuarios-y-autenticacion]], [[Spec-004-catalogo-de-servicios]]
- Última actualización: 2026-10-18
- Tamaño: 28 requisitos funcionales (RF), 20 reglas de negocio (RN), 30 criterios de aceptación (CA)
- Tareas: 42 hechas y 5 abiertas (ver [[Spec-001-tasks]])

## Historias de usuario

- **HU-001-01:** Como titular, quiero crear una suscripción con su precio, moneda, tipo de cambio y día de cobro, para que el sistema calcule las cuotas.
- **HU-001-02:** Como titular, quiero un código de invitación para compartirlo con mis amigos.
- **HU-001-03:** Como invitado, quiero solicitar mi ingreso con un código y ver cuánto me toca pagar en bolivianos, para entrar al grupo una vez confirmado mi pago.
- **HU-001-04:** Como titular, quiero quitar a un miembro o regenerar el código, para controlar quién participa.
- **HU-001-05:** Como miembro, quiero ver quiénes están en el grupo y cuánto paga cada uno, para tener claridad.
- **HU-001-06:** Como miembro, quiero abandonar un grupo, para dejar de compartir una suscripción.
- **HU-001-07:** Como titular, quiero actualizar el tipo de cambio o el precio, para reflejar cambios reales.
- **HU-001-08:** Como titular, quiero transferir la titularidad o cerrar el grupo, para poder retirarme.

## Dónde se implementa

- Backend: [[BE-subscriptions]]
- Base de datos: [[BD-Esquema-grupos]]
- Decisiones relacionadas: [[ADR-0003-alcance-de-diez-modulos]]
- Roadmap: [[Roadmap-de-specs]]

## Documentos de esta spec

- [[Spec-001-texto-completo]] — Texto completo de la spec
- [[Spec-001-plan]] — Plan
- [[Spec-001-tasks]] — Tareas
- [[Spec-001-modelo-de-datos]] — Modelo de datos
- [[Spec-001-contrato-api]] — Contrato de API
- [[Spec-001-investigacion]] — Investigación
- [[Spec-001-quickstart]] — Quickstart

## Notas hijas

- [[Spec-001-texto-completo]] — Spec 001 · Texto completo de la spec
- [[Spec-001-plan]] — Spec 001 · Plan
- [[Spec-001-tasks]] — Spec 001 · Tareas
- [[Spec-001-modelo-de-datos]] — Spec 001 · Modelo de datos
- [[Spec-001-contrato-api]] — Spec 001 · Contrato de API
- [[Spec-001-investigacion]] — Spec 001 · Investigación
- [[Spec-001-quickstart]] — Spec 001 · Quickstart
