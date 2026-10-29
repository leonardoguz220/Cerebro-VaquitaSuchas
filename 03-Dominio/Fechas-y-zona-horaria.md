---
title: "Fechas y zona horaria"
tipo: dominio
area: dominio
parent: "[[Dominio]]"
date: 2026-10-29
tags: [area/dominio, dominio]
---

> Padre: [[Dominio]]

# Fechas y zona horaria

- Se guardan en **UTC** y se muestran en **America/La_Paz** (UTC−4, sin horario de verano).
- Día de cobro: 1 a 31; si el mes es más corto, el último día (31 en febrero pasa a 28 o 29).
- Ventana de ingreso: 3 primeros días del período, el corte cuenta como día 1.
- Plazo de pago: corte + 3 días; el último día vence a las 23:59:59 hora de La Paz.
- Reloj inyectable en el backend (`shared/clock`) y `?now=` en el tick fuera de producción para probar ([[BE-Jobs]]).

Relacionado: [[Estados-de-cobro]], [[Ingreso-al-grupo]].
