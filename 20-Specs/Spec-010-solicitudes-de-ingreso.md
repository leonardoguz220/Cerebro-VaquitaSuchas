---
title: "Spec 010 — Solicitudes de ingreso y chat"
type: spec
status: aprobada
date: 2026-10-18
tags: [spec, spec-010]
related: ["[[Roadmap-de-specs]]"]
fuente: https://github.com/leonardoguz220/VaquitaSuchas/blob/main/specs/010-solicitudes-de-ingreso/spec.md
spec_id: "010"
lider: "Leonardo Guzman (Backend)"
prioridad: "P0"
actualizado: "2026-10-18"
---
## Resumen

En el diseño anterior quien tenía el código de invitación se unía al grupo de inmediato y recién pagaba en el siguiente cobro. Eso dejaba al titular expuesto desde el primer día: la persona usaba la cuenta compartida sin haber pagado nada y el titular, que ya había pagado la plataforma, cubría esa cuota.

El equipo decidió que el ingreso funcione como una operación entre pares, parecida a una orden de compraventa: la persona abre una **solicitud de ingreso**, conversa con el titular en un **chat propio de esa solicitud**, el titular le envía los datos de pago (por ejemplo su QR), la persona paga fuera de la app y sube el comprobante, y el titular, que verifica el dinero en su propio banco, confirma. Solo entonces la persona pasa a ser miembro.

Para que el grupo no cambie a mitad de mes, el ingreso solo se abre durante los 3 primeros días de cada período de cobro (la **ventana de ingreso**). Quien paga una cuota de un período que recién empezó no tiene que pagar otra pocos días después, y la cuota se calcula con los miembros que tendrá el grupo durante todo el período.

Vaquita no custodia dinero. En una operación entre pares con custodia, la plataforma retiene lo que se intercambia hasta que ambas partes cumplen. Aquí lo que se entrega es el acceso a la cuenta, y lo tiene el titular. Por eso la protección no viene de la custodia sino de los plazos, de la evidencia que queda registrada (chat, comprobante y línea de tiempo), de un reclamo que revisa un administrador y de una sanción fuerte para quien estafe: el baneo de la cuenta y el bloqueo de todos sus datos de identidad (correo, celular, cédula y cuenta de Telegram).

## Datos clave

- Estado: aprobada
- Líder: Leonardo Guzman (Backend)
- Prioridad: P0 (MVP)
- Depende de: 001 (Suscripciones compartidas), 002 (Cobros y pagos), 003 (Usuarios y autenticación)
- Criterios de aceptación: 47 (`CA-010-xx`)
- Documentos completos en el repo: [spec](https://github.com/leonardoguz220/VaquitaSuchas/blob/main/specs/010-solicitudes-de-ingreso/spec.md), [plan](https://github.com/leonardoguz220/VaquitaSuchas/blob/main/specs/010-solicitudes-de-ingreso/plan.md), [tasks](https://github.com/leonardoguz220/VaquitaSuchas/blob/main/specs/010-solicitudes-de-ingreso/tasks.md)
