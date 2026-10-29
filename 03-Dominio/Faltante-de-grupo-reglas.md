---
title: "Faltante de grupo: reglas y estados"
tipo: dominio
area: dominio
parent: "[[Dominio]]"
date: 2026-10-29
tags: [area/dominio, dominio]
---

> Padre: [[Dominio]]

# Faltante de grupo

Spec: [[Spec-011-faltante-de-grupo]]. Plazos supuestos: [[Decision-plazos-faltante-grupo]].

- **Cotización:** `cuota_nueva = floor(T / m')`, donde `T` es el total del ciclo y `m'` los miembros activos que se quedan (titular incluido). A cada afectado le toca `max(cuota_nueva − pagado, 0)`; el resto lo absorbe el titular. No se relee precio ni tipo de cambio.
- **Afectado:** miembro activo, distinto del titular, con cobro `pagado` menor que la cuota nueva.
- **Ronda:** una abierta por grupo y hasta 2 por período; cancelar equivale a absorber mientras nadie haya respondido.

```mermaid
stateDiagram-v2
  state "Pago adicional" as E
  [*] --> no_aplica
  no_aplica --> pendiente_pago: cubrir
  pendiente_pago --> informado: miembro informa método y referencia
  informado --> confirmado: titular confirma
  informado --> pendiente_pago: titular rechaza con motivo
  pendiente_pago --> vencido: vence (pasa a devolución)
```

Devolución: `pendiente → enviada → confirmada | disputada` (disputa también si el titular no registra en 5 días). El silencio equivale a pedir devolución. Todo en centavos y con línea de tiempo de solo anexado.
