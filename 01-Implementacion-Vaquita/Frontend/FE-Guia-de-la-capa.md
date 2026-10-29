---
title: "Frontend · guía de la capa (CLAUDE.md y AGENTS.md)"
tipo: guia
area: implementacion
parent: "[[Frontend]]"
date: 2026-10-29
tags: [area/implementacion, guia]
fuente: https://github.com/leonardoguz220/VaquitaSuchas/blob/main/frontend/CLAUDE.md
---

> Padre: [[Frontend]]

Responsable: Adrian Vargas. La carpeta se llena al implementar la spec 000; hasta entonces solo existe esta guía.

El frontend es una aplicación Next.js con React, TypeScript y Tailwind CSS organizada en `app`, `components`, `hooks`, `services` y `lib`. La descripción completa está en `../context/arquitectura.md`.

Reglas de esta parte del código:

- Las páginas componen componentes y no llaman a la API directamente.
- Los componentes de `ui/` son la base; los de `features/` los combinan para cada módulo.
- Los datos llegan por hooks que usan las funciones de `services/`, una por endpoint del contrato.
- El token vive en una cookie httpOnly y todas las llamadas pasan por el proxy `/api/[...path]`.
- El frontend no calcula cuotas, montos ni estados: muestra lo que entrega la API.
- Cada vista con datos cubre los estados de carga, vacío, error y con datos, y se diseña primero para celular.
- Los montos se muestran como `Bs 25,50` y las fechas en America/La_Paz, con funciones de `lib/`.
- Antes de construir una pantalla, lee su mockup en `design/mockups/` (tabla pantalla → ruta → spec) y usa sus colores, tipografías y estados. Es una guía visual: si contradice la spec, el plan §6 o el contrato, mandan estos.

Skills relacionadas (de consulta, no hace falta leerlas en cada tarea): `vaquita-nextjs-conventions`, `frontend-ui-engineering`.


## AGENTS.md

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
