---
title: "División de gastos compartidos"
tipo: finanzas
area: finanzas
parent: "[[Finanzas-aplicadas]]"
date: 2026-10-29
tags: [area/finanzas, finanzas]
---

> Padre: [[Finanzas-aplicadas]]

# División de gastos compartidos

**Partes iguales con residuo:** `cuota_base = floor(T / n)`; los `T − n × cuota_base` centavos sobrantes se asignan a una persona determinista (en Vaquita, el titular) para que la suma sea exacta ([[Dinero-y-moneda]]).

Alternativas de reparto (para entender por qué se eligió ésta): por consumo, por porcentaje o por cupos ponderados; reparto repartiendo el residuo de a un centavo entre varios (método del mayor resto). Se prefirió asignarlo al titular por simplicidad, trazabilidad y porque él ya adelanta el pago del servicio.

**Gastos compartidos en general:** apps como Splitwise llevan un saldo entre personas y «simplifican deudas» (menos transferencias). Vaquita **no** simplifica deudas: cada cobro es mensual, entre un miembro y el titular. **Cuando un miembro sale**, la cuota por persona sube; ese caso se modela en [[Faltante-de-grupo-reglas]].

Ejemplo numérico: T = 10 000 centavos, n = 3 → cuota base 3 333; sobran 1; el titular paga 3 334.
