---
title: "SDD · criterios CA y trazabilidad"
tipo: sdd
area: sdd
parent: "[[SDD-y-SpecKit]]"
date: 2026-10-29
tags: [area/sdd, sdd]
---

> Padre: [[SDD-y-SpecKit]]

# Criterios de aceptación y trazabilidad

Cada `CA-NNN-xx` se redacta como *Dado / cuando / entonces* y debe tener **un test que cita su identificador** (nombre del test o comentario). Si no se puede testear, se reescribe el criterio. Al cerrar una historia o spec se corre el subagente `ca-traceability-checker` y la skill `vaquita-ca-traceability` ([[Agente-ca-traceability-checker]], [[Skill-vaquita-ca-traceability]]): verifica que cada CA tenga su test, que spec, plan y tareas reflejen la realidad y que no queden secretos.

Ejemplo: `CA-011-01` (total Bs 100,00, 3 que se quedan: cuota 33,33, el titular absorbe el centavo, cada afectado agrega 8,33) está cubierto por pruebas de dominio y e2e de [[BE-shortfalls]].

Relacionado: [[Estrategia-de-pruebas]], [[Definicion-de-terminado]].
