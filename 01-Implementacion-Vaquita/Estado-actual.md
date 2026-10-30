---
title: "Estado actual del proyecto"
tipo: status
area: proyecto
parent: "[[Implementacion-Vaquita]]"
status: vigente
date: 2026-10-30
tags: [area/proyecto, status]
related: ["[[Despliegue]]", "[[CI-CD]]"]
---

> Padre: [[Implementacion-Vaquita]]

# Estado actual del proyecto (2026-10-30)

Actualizar al cambiar algo. Fuente: `tasks.md`, issues y PR de VaquitaSuchas y la memoria del proyecto ([[Memoria-del-proyecto]]).

## Avance
- **Todo lo de `dev` ya está en `main`** (promoción `dev → qa → main` con los PR #280 y #281, el 2026-10-30). No quedan tareas abiertas en los `tasks.md` de las specs 000 a 011 ([[Specs]]).
- **Spec 011 (faltante de grupo) verificada**; sus plazos siguen como supuestos del líder hasta que Camila y Adrian los revisen ([[Decision-plazos-faltante-grupo]]).
- **E2E de la spec 002 (T043) hecho** (flujo feliz del MVP en `frontend/e2e/mvp-flow.spec.ts`, PR #237); ya no es un pendiente.
- **52 puntos de integración (I1 a In) marcados como verificados** en los `tasks.md` (PR #279).
- **Criterios de configuración CA-000-13, 15, 16 y 18** ahora tienen un test que los cita (PR #277, [[Trazabilidad-CA-000]]).
- **Un issue por spec**: #265 a #276, todos cerrados ([[Issues-de-las-specs]]).
- **MCP de GitHub y Context7 conectados** con `.mcp.json` (PR #278, [[MCP-GitHub-y-Context7]]).
- Staging operativo: frontend en Vercel, backend y base en Render, Supabase Storage, Telegram y Brevo ([[Despliegue]]).
- El método SDD con Spec Kit es el que usa el equipo ([[SDD-y-SpecKit]]); la planilla de calificación del profesor está resumida en [[Guia-de-estudio-ampliada]].

## Pendientes conocidos
- Los workflows `deploy-*.yml` no se registran en GitHub ([[CI-CD]]).
- La base gratuita de Render caduca 30 días después de crearse: respaldar antes ([[Render]]).
- Revisión de Camila y Adrian de la spec 011.
- Pasos manuales: [[Pasos-pendientes-de-Leo]] y [[Pendientes-de-Adrian-y-Camila]].

Historial: [[Historial-de-PRs]].
