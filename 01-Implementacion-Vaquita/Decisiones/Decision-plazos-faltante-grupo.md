---
title: "Plazos supuestos del faltante de grupo (spec 011)"
tipo: decision
area: implementacion
parent: "[[Decisiones]]"
status: supuesta
date: 2026-10-28
tags: [area/implementacion, decision, decision, spec-011]
related: ["[[Spec-011-faltante-de-grupo]]", "[[Faltante-de-grupo-reglas]]"]
---

> Padre: [[Decisiones]]

## Contexto

Si alguien sale de un grupo después de que otros pagaron, el total del servicio ya no se cubre y el titular absorbe la diferencia en silencio. La spec 011 crea una «ronda de regularización». Vaquita no custodia dinero: cualquier devolución es un registro entre personas.

## Decisiones (supuestos del líder)

Leonardo las tomó el 2026-10-28 eligiendo la opción más simple (regla 9.4 de `CLAUDE.md`). Camila (BD) y Adrian (FE) pueden objetarlas por PR.

| Tema | Supuesto |
|---|---|
| Plazo para responder | 48 horas desde la apertura |
| Plazo para pagar el extra | 48 horas desde que el miembro elige cubrir, con tope de 96 horas desde la apertura |
| Plazo para disputar si el titular no registra la devolución | 5 días |
| Silencio | Equivale a pedir devolución y el miembro sale del grupo |
| Reparto | El titular entra en el reparto (`m'` lo incluye) |
| Rondas | Una abierta por grupo y hasta 2 por período |
| Comprobantes | Método (`qr` o `transferencia`) y referencia, sin archivo |
| Disputas | Cola de solo lectura para el administrador (`/admin/devoluciones`), sin tocar la cola de la spec 009 |
| Absorber | Cancelar la ronda mientras nadie haya respondido |

Los plazos son configuración, no constantes de dominio.

## Alternativas

El diseño original ([[Diseno-grupo-incompleto-faltante]]) proponía 7 días para el reclamo y comprobante con imagen; se simplificó.

## Consecuencias

Si BD o FE objetan, se cambia la spec por PR y se actualiza esta nota. Pendiente: revisión por capa. Detalle: [[Spec-011-faltante-de-grupo]], [[Faltante-de-grupo-reglas]].
