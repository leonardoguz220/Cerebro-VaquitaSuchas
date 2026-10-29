---
title: "Conversión USD a Bs"
tipo: finanzas
area: finanzas
parent: "[[Finanzas-aplicadas]]"
date: 2026-10-29
tags: [area/finanzas, finanzas]
---

> Padre: [[Finanzas-aplicadas]]

# Conversión USD a Bs

Muchos servicios cobran en USD. En Bolivia el tipo de cambio oficial estuvo fijo por años (cerca de 6,96 Bs por USD) pero hubo escasez de dólares y brechas con el mercado paralelo; **verificar el régimen cambiario vigente**. Por eso Vaquita deja el tipo de cambio como **valor manual del titular** (decimal positivo con hasta 4 decimales) y no consulta una API externa ([[Alcance-del-MVP]]).

Reglas: cada ciclo y cobro guarda una copia del precio, la moneda y el tipo de cambio usados; cambiar el tipo de cambio después no altera cobros ya generados; `total_bs_centavos` se calcula una vez ([[Dinero-y-moneda]]). Riesgo: si el titular usa un tipo de cambio distinto al que le cuesta pagar el servicio, absorbe la diferencia; la transparencia del valor en el grupo mitiga la disputa.

Utilidad en pantalla: `frontend/src/lib/exchange-rate.ts` ([[FE-Componentes-y-servicios]]).
