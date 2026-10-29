---
title: "Spec 005: Notificaciones"
tipo: spec
area: specs
parent: "[[Specs]]"
status: aprobada
date: 2026-10-29
tags: [area/specs, spec, spec-005]
related: ["[[BE-notifications]]", "[[BE-telegram]]", "[[BD-Esquema-notificaciones]]"]
fuente: https://github.com/leonardoguz220/VaquitaSuchas/blob/main/specs/005-notificaciones/spec.md
spec_id: "005"
lider: "Leonardo Guzman (Backend)"
prioridad: "P1"
---

> Padre: [[Specs]]

# Spec 005 — Notificaciones

## Resumen

El valor de Vaquita está en que nadie tenga que perseguir a nadie. Para eso la app debe avisar a cada persona lo que le toca hacer: pagar antes de vencer, revisar un comprobante, enterarse de un atraso o de un cambio en su grupo. Esta spec define **qué avisos existen, cuándo se envían, por qué canal y cómo se evitan duplicados y excesos**.

## Datos clave

- Estado: aprobada
- Líder: Leonardo Guzman (Backend)
- Prioridad: P1 (importante)
- Depende de: [[Spec-000-setup-del-proyecto]], [[Spec-001-suscripciones-compartidas]], [[Spec-002-cobros-y-pagos]], [[Spec-003-usuarios-y-autenticacion]], [[Spec-010-solicitudes-de-ingreso]]
- Última actualización: 2026-10-18
- Tamaño: 30 requisitos funcionales (RF), 7 reglas de negocio (RN), 34 criterios de aceptación (CA)
- Tareas: 34 hechas y 5 abiertas (ver [[Spec-005-tasks]])

## Historias de usuario

- **HU-005-01:** Como miembro, quiero que me avisen antes de que se acerque mi cobro para no olvidarme.
- **HU-005-02:** Como miembro, quiero saber cuándo mi pago fue confirmado o rechazado, y por qué.
- **HU-005-03:** Como titular, quiero enterarme cuando un miembro sube un comprobante.
- **HU-005-04:** Como titular, quiero invitar a un amigo por correo o por WhatsApp con mi código.
- **HU-005-05:** Como titular, quiero recordarle a un miembro atrasado con un mensaje listo por WhatsApp.
- **HU-005-06:** Como usuario, quiero ver mis avisos en la app y marcar los que ya leí.
- **HU-005-07:** Como usuario, quiero decidir qué avisos me llegan por correo.

## Dónde se implementa

- Backend: [[BE-notifications]], [[BE-telegram]]
- Base de datos: [[BD-Esquema-notificaciones]]
- Decisiones relacionadas: —
- Roadmap: [[Roadmap-de-specs]]

## Documentos de esta spec

- [[Spec-005-texto-completo]] — Texto completo de la spec
- [[Spec-005-plan]] — Plan
- [[Spec-005-tasks]] — Tareas
- [[Spec-005-modelo-de-datos]] — Modelo de datos
- [[Spec-005-contrato-api]] — Contrato de API
- [[Spec-005-quickstart]] — Quickstart

## Notas hijas

- [[Spec-005-texto-completo]] — Spec 005 · Texto completo de la spec
- [[Spec-005-plan]] — Spec 005 · Plan
- [[Spec-005-tasks]] — Spec 005 · Tareas
- [[Spec-005-modelo-de-datos]] — Spec 005 · Modelo de datos
- [[Spec-005-contrato-api]] — Spec 005 · Contrato de API
- [[Spec-005-quickstart]] — Spec 005 · Quickstart
