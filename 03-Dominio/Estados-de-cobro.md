---
title: "Estados de un cobro"
tipo: dominio
area: dominio
parent: "[[Dominio]]"
date: 2026-10-29
tags: [area/dominio, dominio]
related: ["[[Spec-002-cobros-y-pagos]]"]
---

> Padre: [[Dominio]]

# Estados de un cobro

```mermaid
stateDiagram-v2
  [*] --> pendiente
  pendiente --> en_revision: miembro sube comprobante
  pendiente --> atrasado: vence sin pago
  en_revision --> pagado: titular confirma
  en_revision --> pendiente: rechaza (a tiempo)
  en_revision --> atrasado: rechaza (vencido)
  pendiente --> cancelado: titular cancela con motivo
  atrasado --> cancelado: titular cancela con motivo
  atrasado --> en_revision: sube comprobante
  pagado --> [*]
  cancelado --> [*]
```

- Final: `pagado` y `cancelado`. No se inventan estados.
- Vencido = fecha de corte + 3 días sin pago: pasa a `atrasado` y el miembro es retirado; la deuda queda visible y no puede volver a ese grupo hasta saldarla.
- El **cobro de ingreso** nace `pagado` al confirmar la solicitud ([[Ingreso-al-grupo]]).
- El miembro nunca confirma su propio pago; el titular no genera cobro propio (RN-002-03).
- Tabla completa de transiciones: [[Spec-002-texto-completo]] (RN-002-01). Implementación: `charge-state` en [[BE-billing]]. Reputación: un cobro `atrasado` cuenta como no puntual ([[Reputacion-reglas]]).
