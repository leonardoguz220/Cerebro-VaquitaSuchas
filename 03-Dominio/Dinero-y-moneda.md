---
title: "Dinero y moneda"
tipo: dominio
area: dominio
parent: "[[Dominio]]"
date: 2026-10-29
tags: [area/dominio, dominio]
related: ["[[Finanzas-aplicadas]]"]
---

> Padre: [[Dominio]]

# Dinero y moneda

- Moneda base de cobro: boliviano (Bs). El precio del servicio puede estar en USD o Bs.
- Centavos enteros (Bs 25,50 → `2550`), nunca `float`. Formato de pantalla `Bs 25,50`.
- Conversión: `total_bs_centavos` a partir del precio y el tipo de cambio (decimal positivo con hasta 4 decimales, p. ej. `6.9600`) que ingresa el titular ([[Conversion-USD-a-Bs]]).
- **Reparto (RN-001-02):** `cuota_base = floor(total / n)`; el resto (0 a n−1 centavos) se suma a la cuota **del titular**, de modo que la suma de cuotas es siempre el total ([[Division-de-gastos-compartidos]]).
- **Snapshot (RN-001-03, RN-002-02):** el cobro usa las cuotas calculadas al generarse; su monto es inmutable.
- La función pura vive en el dominio de [[BE-subscriptions]] (`shares`, `money`) y [[BE-billing]] (`cycle-calculation`); la skill `vaquita-money-and-billing` documenta el procedimiento ([[Skills]]).

Ejemplo: total Bs 100,00 entre 3 miembros: cuota base 33,33; el titular paga 33,34.
