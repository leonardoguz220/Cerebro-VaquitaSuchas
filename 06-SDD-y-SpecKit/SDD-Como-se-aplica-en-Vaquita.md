---
title: "SDD · cómo se aplica en Vaquita"
tipo: sdd
area: sdd
parent: "[[SDD-y-SpecKit]]"
date: 2026-10-29
tags: [area/sdd, sdd]
---

> Padre: [[SDD-y-SpecKit]]

# Cómo se aplica SDD en Vaquita

1. La spec es la fuente de verdad; no se programa sin spec aprobada, salvo bugs triviales y configuración ([[CLAUDE-md-del-repo]]).
2. Cada spec la aprueban las tres capas; el líder cambia según la capa más pesada ([[Equipo]]).
3. El modelo de datos y el contrato de API se **congelan** al aprobar el plan; cambiarlos exige un PR que avise a las otras capas ([[Plan]]).
4. Las reglas de negocio viven solo en el backend; el frontend no calcula cuotas ni estados; la BD refuerza con restricciones ([[Dominio]]).
5. Cada capa trabaja con su subagente y solo en su carpeta ([[Subagentes]], [[Hooks]]).
6. Cada `CA-xxx` tiene su test ([[SDD-Criterios-CA-y-trazabilidad]]).
7. Cambios grandes de reglas se registran como decisión ([[Decisiones]]).
8. Al terminar se corre `converge` y se hace una retro de 15 minutos ([[Desarrollo-por-tarea]]).

Resultado: 12 specs con 400+ tareas cerradas ([[Estado-actual]]). Principios: [[Constitution]].
