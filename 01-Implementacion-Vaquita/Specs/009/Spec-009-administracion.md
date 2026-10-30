---
title: "Spec 009: Administración"
tipo: spec
area: specs
parent: "[[Specs]]"
status: aprobada
date: 2026-10-29
tags: [area/specs, spec, spec-009]
related: ["[[BE-admin]]", "[[BD-Esquema-administracion]]", "[[ADR-0004-ingreso-con-pago-previo-y-chat]]"]
fuente: https://github.com/leonardoguz220/VaquitaSuchas/blob/main/specs/009-administracion/spec.md
spec_id: "009"
lider: "Adrian Vargas (Frontend)"
prioridad: "P2"
---

> Padre: [[Specs]]

# Spec 009 — Administración

## Resumen

Una vez que la app tiene usuarios reales, alguien debe poder mantener el catálogo al día, atender reportes de abuso y ver cómo se usa el sistema, sin tocar la base de datos a mano. Esta spec define el **panel de administración**: gestión de usuarios, del catálogo de servicios, moderación y estadísticas generales.

## Datos clave

- Estado: aprobada
- Líder: Adrian Vargas (Frontend)
- Prioridad: P2 (extra)
- Depende de: [[Spec-002-cobros-y-pagos]], [[Spec-003-usuarios-y-autenticacion]], [[Spec-004-catalogo-de-servicios]], [[Spec-008-cupos-libres]], [[Spec-010-solicitudes-de-ingreso]]
- Última actualización: 2026-10-18
- Tamaño: 30 requisitos funcionales (RF), 12 reglas de negocio (RN), 37 criterios de aceptación (CA)
- Tareas: 43 hechas y 0 abiertas (ver [[Spec-009-tasks]])

## Historias de usuario

- **HU-009-01:** Como administrador, quiero agregar y actualizar servicios y planes del catálogo.
- **HU-009-02:** Como administrador, quiero buscar un usuario y suspenderlo o reactivarlo.
- **HU-009-03:** Como administrador, quiero revisar publicaciones reportadas y decidir qué hacer.
- **HU-009-04:** Como administrador, quiero ver estadísticas generales del uso de la app.
- **HU-009-05:** Como administrador, quiero un registro de mis acciones para rendir cuentas.
- **HU-009-06:** Como administrador, quiero promover a otro administrador.
- **HU-009-07:** Como administrador, quiero revisar un reclamo con toda su evidencia y banear a quien estafó (titular o solicitante), para proteger a los usuarios.
- **HU-009-08:** Como administrador, quiero habilitar manualmente a un usuario como titular, para que el sistema pueda arrancar con titulares de confianza.

## Dónde se implementa

- Backend: [[BE-admin]]
- Base de datos: [[BD-Esquema-administracion]]
- Decisiones relacionadas: [[ADR-0004-ingreso-con-pago-previo-y-chat]]
- Roadmap: [[Roadmap-de-specs]]

## Documentos de esta spec

- [[Spec-009-texto-completo]] — Texto completo de la spec
- [[Spec-009-plan]] — Plan
- [[Spec-009-tasks]] — Tareas
- [[Spec-009-modelo-de-datos]] — Modelo de datos
- [[Spec-009-contrato-api]] — Contrato de API
- [[Spec-009-quickstart]] — Quickstart

## Notas hijas

- [[Spec-009-texto-completo]] — Spec 009 · Texto completo de la spec
- [[Spec-009-plan]] — Spec 009 · Plan
- [[Spec-009-tasks]] — Spec 009 · Tareas
- [[Spec-009-modelo-de-datos]] — Spec 009 · Modelo de datos
- [[Spec-009-contrato-api]] — Spec 009 · Contrato de API
- [[Spec-009-quickstart]] — Spec 009 · Quickstart
