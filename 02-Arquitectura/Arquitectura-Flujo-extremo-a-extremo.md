---
title: "Arquitectura · flujo de punta a punta"
tipo: arquitectura
area: arquitectura
parent: "[[Arquitectura]]"
date: 2026-10-29
tags: [area/arquitectura, arquitectura]
related: ["[[Funcionamiento-del-sistema]]"]
---

> Padre: [[Arquitectura]]

# Flujo de punta a punta

```mermaid
sequenceDiagram
  participant T as Titular
  participant M as Miembro
  participant S as Sistema
  T->>S: Crea grupo (servicio, plan, tipo de cambio)
  S-->>T: Código de invitación y cuota estimada
  M->>S: Abre solicitud con el código (ventana de ingreso)
  M->>T: Chat de la solicitud
  T->>M: Datos de pago (QR)
  M->>S: Sube comprobante (referencia única)
  T->>S: Confirma el pago
  S-->>M: Es miembro; cobro de ingreso pagado
  S->>S: Cada corte genera ciclo y cobros
  M->>S: Sube comprobante del cobro
  T->>S: Confirma o rechaza
  S->>S: Sin pago en 3 días: atrasado y retiro
```

Capas: navegador → proxy `/api` (Next.js, cookie httpOnly) → backend NestJS → PostgreSQL. Módulos implicados: [[BE-subscriptions]], [[BE-join-requests]], [[BE-billing]], [[BE-notifications]], [[BE-reputation]]. Reglas: [[Ingreso-al-grupo]] y [[Estados-de-cobro]]. Prueba E2E: [[FE-Pruebas-y-flujos]].
