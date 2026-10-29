---
title: "SDD · spec, plan y tareas"
tipo: sdd
area: sdd
parent: "[[SDD-y-SpecKit]]"
date: 2026-10-29
tags: [area/sdd, sdd]
---

> Padre: [[SDD-y-SpecKit]]

# Spec, plan y tareas

| Artefacto | Responde | Contiene | En Vaquita |
|---|---|---|---|
| `spec.md` | Qué y por qué | Contexto, objetivos, actores, historias `HU`, requisitos `RF`, reglas `RN`, casos borde, criterios `CA`, decisiones | [[Specs]] |
| `plan.md` | Cómo | Modelo de datos, contrato de API, pantallas, decisiones técnicas | [[Plan]] |
| `contracts/api.md` | Contrato | Rutas, request, response, errores, permisos | notas `Spec-NNN-contrato-api` |
| `data-model.md` | Datos | Tablas, restricciones, disparadores | [[BD]] |
| `research.md` | Dudas técnicas | Comparaciones y mediciones | notas `Spec-NNN-investigacion` |
| `tasks.md` | Quién hace qué | Tareas `T#` con capa `[BD]`/`[BE]`/`[FE]` y dependencias | [[Desarrollo-por-tarea]] |
| `quickstart.md` | Cómo probar | Recorrido manual de verificación | notas `Spec-NNN-quickstart` |

Identificadores: `HU-NNN-xx` (historia), `RF-NNN-xx` (requisito funcional), `RN-NNN-xx` (regla de negocio), `CA-NNN-xx` (criterio de aceptación), `T#` (tarea).
