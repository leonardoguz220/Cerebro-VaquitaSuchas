---
title: "Spec Driven Development: qué es"
tipo: sdd
area: sdd
parent: "[[SDD-y-SpecKit]]"
date: 2026-10-29
tags: [area/sdd, sdd]
---

> Padre: [[SDD-y-SpecKit]]

# Qué es SDD

**Spec Driven Development** invierte la costumbre de «programar primero y documentar después»: la **especificación** es el artefacto principal y el código es su derivación. Una spec buena describe el *qué* y el *porqué* (problema, usuarios, reglas, casos borde, criterios medibles) y evita el *cómo* (tecnología), que va en el plan.

Por qué ayuda, sobre todo con IA:
- Un asistente de código con una spec clara y testeable produce menos improvisación que con un prompt vago.
- Las decisiones quedan escritas y revisables antes de gastar tiempo en código.
- Equipos por capas (BD, BE, FE) se coordinan por **contrato** sin esperarse.
- Los criterios de aceptación se vuelven tests, así el avance es verificable.

Riesgos: specs excesivas para cambios triviales, specs que envejecen si el código cambia sin actualizarlas (por eso la regla «si la realidad contradice la spec se actualiza la spec en el mismo PR») y falsa seguridad si los criterios no se prueban.

Aplicación aquí: [[SDD-Como-se-aplica-en-Vaquita]]. Herramienta: [[SpecKit-comandos]].
