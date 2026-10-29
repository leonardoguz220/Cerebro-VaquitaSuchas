---
title: "SDD · clarificar y analizar"
tipo: sdd
area: sdd
parent: "[[SDD-y-SpecKit]]"
date: 2026-10-29
tags: [area/sdd, sdd]
---

> Padre: [[SDD-y-SpecKit]]

# Clarificar y analizar

- **Clarify** reduce ambigüedad antes de planear: pocas preguntas dirigidas cuyas respuestas se codifican en la spec. En Vaquita sirvió para cerrar, por ejemplo, cómo se cuentan los «3 primeros días» y el regreso de un miembro con deuda ([[ADR-0004-ingreso-con-pago-previo-y-chat]], [[Preguntas-abiertas]]).
- **Analyze** es una revisión cruzada de solo lectura de spec, plan y tasks: criterios sin tarea, tareas sin criterio, contradicciones con la constitución.
- **Converge** cierra el ciclo: tras construir, compara realidad y spec; así la spec no envejece (PR #234 alineó las specs 000-010 con el código).
- Regla práctica de Vaquita para detalles menores: elegir la opción más simple coherente con la spec, anotarla en el PR y seguir; detenerse solo si cambia el modelo, el contrato o una regla de dominio ([[Decision-plazos-faltante-grupo]] es un ejemplo).
