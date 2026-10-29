---
title: "Spec 010: Solicitudes de ingreso y chat"
tipo: spec
area: implementacion
parent: "[[Specs]]"
status: aprobada
date: 2026-10-29
tags: [area/implementacion, spec, spec-010]
related: ["[[BE-join-requests]]", "[[BD-Esquema-ingreso]]", "[[ADR-0004-ingreso-con-pago-previo-y-chat]]", "[[ADR-0005-identidad-cedula-telegram]]"]
fuente: https://github.com/leonardoguz220/VaquitaSuchas/blob/main/specs/010-solicitudes-de-ingreso/spec.md
spec_id: "010"
lider: "Leonardo Guzman (Backend)"
prioridad: "P0"
---

> Padre: [[Specs]]

# Spec 010 — Solicitudes de ingreso y chat

## Resumen

En el diseño anterior quien tenía el código de invitación se unía al grupo de inmediato y recién pagaba en el siguiente cobro. Eso dejaba al titular expuesto desde el primer día: la persona usaba la cuenta compartida sin haber pagado nada y el titular, que ya había pagado la plataforma, cubría esa cuota.

El equipo decidió que el ingreso funcione como una operación entre pares, parecida a una orden de compraventa: la persona abre una **solicitud de ingreso**, conversa con el titular en un **chat propio de esa solicitud**, el titular le envía los datos de pago (por ejemplo su QR), la persona paga fuera de la app y sube el comprobante, y el titular, que verifica el dinero en su propio banco, confirma. Solo entonces la persona pasa a ser miembro.

Para que el grupo no cambie a mitad de mes, el ingreso solo se abre durante los 3 primeros días de cada período de cobro (la **ventana de ingreso**). Quien paga una cuota de un período que recién empezó no tiene que pagar otra pocos días después, y la cuota se calcula con los miembros que tendrá el grupo durante todo el período.

Vaquita no custodia dinero. En una operación entre pares con custodia, la plataforma retiene lo que se intercambia hasta que ambas partes cumplen. Aquí lo que se entrega es el acceso a la cuenta, y lo tiene el titular. Por eso la protección no viene de la custodia sino de los plazos, de la evidencia que queda registrada (chat, comprobante y línea de tiempo), de un reclamo que revisa un administrador y de una sanción fuerte para quien estafe: el baneo de la cuenta y el bloqueo de todos sus datos de identidad (correo, celular, cédula y cuenta de Telegram).

## Datos clave

- Estado: aprobada
- Líder: Leonardo Guzman (Backend)
- Prioridad: P0 (MVP)
- Depende de: [[Spec-001-suscripciones-compartidas]], [[Spec-002-cobros-y-pagos]], [[Spec-003-usuarios-y-autenticacion]]
- Última actualización: 2026-10-18
- Tamaño: 37 requisitos funcionales (RF), 19 reglas de negocio (RN), 47 criterios de aceptación (CA)
- Tareas: 49 hechas y 7 abiertas (ver [[Spec-010-tasks]])

## Historias de usuario

- **HU-010-01:** Como solicitante, quiero abrir una solicitud con el código del grupo y conversar con el titular, para acordar mi ingreso.
- **HU-010-02:** Como titular, quiero enviar mis datos de pago y el monto exacto a quien quiere entrar, para cobrar antes de darle acceso.
- **HU-010-03:** Como solicitante, quiero ver cuánto debo pagar y cuánto tiempo me queda, para pagar sin apuros ni dudas.
- **HU-010-04:** Como solicitante, quiero subir mi comprobante dentro de la solicitud, para que el titular lo revise.
- **HU-010-05:** Como titular, quiero confirmar el ingreso solo cuando el dinero me llegó a mi banco, para no perder dinero.
- **HU-010-06:** Como solicitante, quiero enviar fotos en el chat, para mostrar capturas de mi pago o de un problema.
- **HU-010-07:** Como solicitante que pagó y no fue agregado, quiero abrir un reclamo, para que un administrador revise lo ocurrido.
- **HU-010-08:** Como administrador, quiero ver la evidencia completa de un reclamo, para decidir con fundamento y sancionar a quien estafe.
- **HU-010-09:** Como titular que recibió un comprobante falso, quiero abrir un reclamo, para que se sancione a quien intentó engañarme.
- **HU-010-10:** Como solicitante, quiero saber cuándo se abre el ingreso a un grupo, para intentarlo en la fecha correcta.

## Dónde se implementa

- Backend: [[BE-join-requests]]
- Base de datos: [[BD-Esquema-ingreso]]
- Decisiones relacionadas: [[ADR-0004-ingreso-con-pago-previo-y-chat]], [[ADR-0005-identidad-cedula-telegram]]
- Roadmap: [[Roadmap-de-specs]]

## Documentos de esta spec

- [[Spec-010-texto-completo]] — Texto completo de la spec
- [[Spec-010-plan]] — Plan
- [[Spec-010-tasks]] — Tareas
- [[Spec-010-modelo-de-datos]] — Modelo de datos
- [[Spec-010-contrato-api]] — Contrato de API
- [[Spec-010-investigacion]] — Investigación
- [[Spec-010-quickstart]] — Quickstart

## Notas hijas

- [[Spec-010-texto-completo]] — Spec 010 · Texto completo de la spec
- [[Spec-010-plan]] — Spec 010 · Plan
- [[Spec-010-tasks]] — Spec 010 · Tareas
- [[Spec-010-modelo-de-datos]] — Spec 010 · Modelo de datos
- [[Spec-010-contrato-api]] — Spec 010 · Contrato de API
- [[Spec-010-investigacion]] — Spec 010 · Investigación
- [[Spec-010-quickstart]] — Spec 010 · Quickstart
