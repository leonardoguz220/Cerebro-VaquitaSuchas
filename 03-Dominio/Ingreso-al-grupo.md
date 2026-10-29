---
title: "Ingreso al grupo con pago previo"
tipo: dominio
area: dominio
parent: "[[Dominio]]"
date: 2026-10-29
tags: [area/dominio, dominio]
---

> Padre: [[Dominio]]

# Ingreso al grupo

Decisión: [[ADR-0004-ingreso-con-pago-previo-y-chat]]. Spec: [[Spec-010-solicitudes-de-ingreso]].

```mermaid
flowchart LR
  A[Código de invitación] --> B[Solicitud abierta<br/>solo en los 3 primeros días]
  B --> C[Chat con el titular]
  C --> D[Titular envía datos de pago<br/>y fija la cuota de ingreso]
  D --> E[Solicitante paga y sube comprobante<br/>15 min, prórroga única de 15]
  E --> F{Titular confirma<br/>en 60 min}
  F -- sí --> G[Miembro + cobro de ingreso pagado]
  F -- no / vence --> H[Solicitud cerrada]
  E -. no paga .-> H
  F -. fraude .-> R[Reclamo al administrador]
```

Reglas clave: nadie entra a mitad de período; cuota de ingreso = precio del mes entre los miembros que tendrá el grupo con la persona incluida; el chat (texto y fotos) no se edita ni se borra y se conserva 2 meses; referencia de pago obligatoria y única por grupo; baneo bloquea correo, celular, cédula y Telegram. Límites de la protección: Vaquita no custodia dinero ([[Riesgos-y-fraude]]).
