---
title: "Spec Kit: comandos y flujo"
tipo: sdd
area: sdd
parent: "[[SDD-y-SpecKit]]"
date: 2026-10-29
tags: [area/sdd, sdd]
---

> Padre: [[SDD-y-SpecKit]]

# Spec Kit

GitHub Spec Kit es un conjunto de plantillas y comandos para SDD. En este repo vive en `.specify/` y como skills `speckit-*` ([[Spec-Kit-en-el-repo]], [[Skills]]).

| Comando | Cuándo | Resultado |
|---|---|---|
| `/speckit-constitution` | Una vez y al enmendar principios | [[Constitution]] |
| `/speckit-specify` | Inicio de cada feature | `spec.md` (qué y por qué) |
| `/speckit-clarify` | Tras specify, antes de plan | Hasta 5 preguntas y respuestas guardadas en la spec |
| `/speckit-plan` | Spec aprobada | `plan.md`, modelo y contratos |
| `/speckit-checklist` | Tras plan | Checklist de calidad de requisitos |
| `/speckit-tasks` | Plan aprobado | `tasks.md` ordenado por dependencias |
| `/speckit-analyze` | Tras tasks, antes de implementar; solo lectura | Detecta inconsistencias entre spec, plan y tareas |
| `/speckit-implement` | Ejecutar tareas de una capa | Código y tests |
| `/speckit-converge` | Al terminar | Compara código con spec y agrega las tareas que faltan |

En Vaquita `analyze` se corre **una vez por spec**, no por tarea (CLAUDE.md §2). Aplicación: [[SDD-Como-se-aplica-en-Vaquita]].
