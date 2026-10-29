---
title: "Spec 011: Faltante de grupo (cubrir la diferencia o pedir devolución)"
tipo: spec
area: implementacion
parent: "[[Specs]]"
status: aprobada
date: 2026-10-29
tags: [area/implementacion, spec, spec-011]
related: ["[[BE-shortfalls]]", "[[BD-Esquema-faltante]]", "[[Decision-plazos-faltante-grupo]]"]
fuente: https://github.com/leonardoguz220/VaquitaSuchas/blob/main/specs/011-faltante-de-grupo/spec.md
spec_id: "011"
lider: "Leonardo Guzman (Backend)"
prioridad: "P1"
---

> Padre: [[Specs]]

# Spec 011 — Faltante de grupo (cubrir la diferencia o pedir devolución)

## Resumen

La cuota de un período se calcula dividiendo el total entre los miembros del grupo al momento del corte (RN-001-02). Si después de que varios miembros pagaron alguien se va (abandona, es retirado por mora o pide salir), el total del servicio ya no se cubre con lo cobrado y hoy el titular absorbe la diferencia sin que nadie lo sepa.

El titular debe poder **avisar al grupo** y que cada miembro que ya pagó elija entre **cubrir** lo que falta (la diferencia se reparte en partes iguales entre los miembros que se quedan) o **pedir su devolución** y salir del grupo.

Vaquita no custodia dinero (spec 002 §3, spec 010 §3). La devolución es entre personas y fuera de la app: aquí solo se **registra** que el titular la hizo y que el miembro la recibió, con plazos y un estado de disputa.

## Datos clave

- Estado: aprobada por el líder (decisiones de la sección 10 tomadas el 2026-10-28; BD y Frontend pueden objetarlas por PR)
- Líder: Leonardo Guzman (Backend)
- Prioridad: P1
- Depende de: [[Spec-001-suscripciones-compartidas]], [[Spec-002-cobros-y-pagos]], [[Spec-005-notificaciones]], [[Spec-010-solicitudes-de-ingreso]]
- Última actualización: 2026-10-28
- Tamaño: 17 requisitos funcionales (RF), 9 reglas de negocio (RN), 16 criterios de aceptación (CA)
- Tareas: 23 hechas y 0 abiertas (ver [[Spec-011-tasks]])

## Historias de usuario

- **HU-011-01:** Como titular, quiero avisar al grupo cuánto falta y cómo se repartiría, para no absorber la diferencia en silencio.
- **HU-011-02:** Como miembro, quiero ver cuánto pagué, cuánto debo agregar y hasta cuándo, para decidir.
- **HU-011-03:** Como miembro, quiero poder cubrir mi parte sin salir del grupo.
- **HU-011-04:** Como miembro, quiero pedir mi devolución y salir si no quiero pagar más.
- **HU-011-05:** Como titular, quiero confirmar los pagos adicionales y registrar las devoluciones, para dejar constancia.
- **HU-011-06:** Como miembro, quiero confirmar o disputar que recibí mi devolución.

## Dónde se implementa

- Backend: [[BE-shortfalls]]
- Base de datos: [[BD-Esquema-faltante]]
- Decisiones relacionadas: [[Decision-plazos-faltante-grupo]]
- Roadmap: [[Roadmap-de-specs]]

## Documentos de esta spec

- [[Spec-011-texto-completo]] — Texto completo de la spec
- [[Spec-011-plan]] — Plan
- [[Spec-011-tasks]] — Tareas
- [[Spec-011-modelo-de-datos]] — Modelo de datos
- [[Spec-011-contrato-api]] — Contrato de API

## Notas hijas

- [[Spec-011-texto-completo]] — Spec 011 · Texto completo de la spec
- [[Spec-011-plan]] — Spec 011 · Plan
- [[Spec-011-tasks]] — Spec 011 · Tareas
- [[Spec-011-modelo-de-datos]] — Spec 011 · Modelo de datos
- [[Spec-011-contrato-api]] — Spec 011 · Contrato de API
- [[Diseno-grupo-incompleto-faltante]] — Diseño: grupo incompleto (faltante de cuotas)
