---
title: "Frontend · pruebas y flujos E2E"
tipo: frontend
area: frontend
parent: "[[Frontend]]"
date: 2026-10-29
tags: [area/frontend, frontend, pruebas]
---

> Padre: [[Frontend]]

# Pruebas y flujos E2E (Playwright)

Pruebas unitarias con Vitest/Jest junto al código y E2E con Playwright en `frontend/e2e/`:

- `admin-ban.spec.ts`
- `auth.spec.ts`
- `estado.spec.ts`
- `groups.spec.ts`
- `join-request.spec.ts`
- `listing-confirm.spec.ts`
- `listings-a11y.spec.ts`
- `listings-helpers.ts`
- `listings-xss.spec.ts`
- `mvp-flow.spec.ts`
- `panel-charts.spec.ts`
- `panel-empty.spec.ts`
- `panel-fixtures.ts`
- `panel-savings-negative.spec.ts`
- `recover.spec.ts`
- `register.spec.ts`
- `shortfall.spec.ts`

Flujos cubiertos: registro y login, recuperar contraseña, grupos, solicitud de ingreso, **flujo feliz del MVP** (`mvp-flow.spec.ts`, hasta confirmar el cobro), panel (vacío, gráficos, ahorro negativo), cupos libres (confirmación, accesibilidad, XSS), baneo de administración y faltante de grupo. El workflow [[Workflow-e2e]] levanta base, backend y frontend en modo dev.

Visión global: [[Estrategia-de-pruebas]] y [[Accesibilidad]].
