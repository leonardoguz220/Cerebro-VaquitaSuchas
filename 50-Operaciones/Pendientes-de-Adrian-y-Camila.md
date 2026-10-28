---
title: "Pendientes de Adrian y Camila"
type: runbook
date: 2026-10-28
tags: [operaciones, pendientes]
related: ["[[Equipo]]"]
---
Revisado el 2026-10-28 sobre `dev` (que difiere de `main` solo en un test de backend), specs 000 a 011, workflows y PRs.

## Resumen

- Todas las tareas `Tnnn` de las 12 specs están marcadas `[x]` y no hay PRs abiertos. Solo quedan sin marcar los puntos de integración `I1…I7` de cada `tasks.md` (ver abajo).
- Las pantallas de FE existen para las 12 specs (38 páginas en `frontend/src/app`), con 15 specs E2E de Playwright. Las migraciones de BD llegan hasta `0110_shortfalls.sql` y todas están aplicadas en producción desde hoy.
- Cada `CA-xxx` tiene un test que lo cita, salvo `CA-000-13/15/16/18` (reglas de GitHub y CI, no código) y `CA-011-12`, que sí está cubierto por el test de `shortfalls.e2e-spec.ts` ("CA-011-09 y 12") aunque la cita está abreviada.
- No ejecuté los tests ni las apps: esto sale de leer el repo, los `tasks.md` y el historial de CI de GitHub.

## Adrian (frontend)

1. **Alta. El E2E de `main` está en rojo.** El job `e2e` del push a `main` del 2026-10-28 01:51 (run #215) falló en el paso "E2E con el backend arriba". Después de eso no ha vuelto a correr en `main`. Hay que reproducirlo (levantar todo en local y correr `npx playwright test` en `frontend/`) y arreglarlo.
2. **Alta. El E2E no corre en los PRs.** Solo corre con la etiqueta `e2e` o en push a `main`; todos los PRs recientes lo saltaron. Por eso `shortfall.spec.ts` (spec 011) y los cambios de QA nunca pasaron por ese filtro. Ponerle la etiqueta `e2e` al próximo PR de promoción a `main` y confirmar que pasa completo (`mvp-flow`, `join-request`, `shortfall`, `listing-confirm`, `admin-ban`, `panel-*`).
3. **Media. Marcar los puntos de integración `I3` ("frontend conectado al backend real")** en los `tasks.md` de 000 a 010 (000, 001, 002, 003, 004, 005, 006, 007, 008, 009, 010). Las tareas de conexión ya están hechas; falta confirmar y tildar, en un PR a `dev` junto con lo que cambie.
4. **Baja. Texto desactualizado en `.github/workflows/e2e.yml`**: el encabezado dice que solo cubre `/estado`; ahora corre todo el flujo del MVP.
5. **Opcional. Pasada final en staging** (`vaquita-suchas.vercel.app`) del recorrido completo: registrarse con Telegram, crear grupo, invitar, pagar, confirmar, avisos, cupos, admin y faltante.

Dependencias: el punto 1 bloquea el 2; el 3 es independiente.

## Cami (base de datos)

1. **Sin tareas de código pendientes.** `T001…` de BD están marcadas en todas las specs y la migración `0110_shortfalls.sql` ya está en producción (workflow `Migrate production` #4, en verde, con respaldo).
2. **Alta. Vencimiento de la base gratuita de Render**: expira 30 días después de crearse. Confirmar la fecha de creación y decidir antes de ella si se migra a otra base (el workflow `Migrate production` ya hace `db:dump` con respaldo de 7 días; sirve de base para el traslado).
3. **Media. Marcar los puntos de integración `I1` ("modelo de datos disponible") y `I5` de la spec que corresponda** en los `tasks.md` de 000 a 010 (modelo, índices y puertos de BD), en un PR a `dev`.
4. **Baja. Evidencia de los criterios de infraestructura `CA-000-13`, `15`, `16`, `18`**: no tienen test porque son protección de rama, `.env` ignorado y gitleaks. Dejar una línea en la spec 000 diciendo cómo se comprobó cada uno (capturas o enlace a un run).
5. **Opcional.** No hay seeds de desarrollo para notificaciones (005), reputación (007) ni faltante (011); solo si se quieren datos de demo.

## Mensajes listos para enviar

**Para Adrian:**
> Adrian, el frontend está completo en las 12 specs, solo quedan dos cosas importantes. 1) El E2E de `main` está en rojo desde el 28/10 (run #215, paso "E2E con el backend arriba"): ¿puedes reproducirlo en local con `npx playwright test` y arreglarlo? 2) El E2E solo corre con la etiqueta `e2e`; ponla en el próximo PR de promoción a `main` para confirmar que `mvp-flow`, `shortfall` y el resto pasan completos. Aparte, cuando puedas, tilda los `I3` ("frontend conectado") en los `tasks.md` de las specs 000 a 010 y corrige el comentario de `e2e.yml`, que dice que solo cubre `/estado`.

**Para Cami:**
> Cami, no te queda código de BD pendiente: todas las migraciones hasta la 0110 están en producción con respaldo. Lo importante: la base gratuita de Render expira 30 días después de crearse, así que confirma la fecha y decide antes si se traslada. Aparte, tilda los puntos `I1`/`I5` de integración en los `tasks.md` de 000 a 010 y deja anotado cómo se comprobaron `CA-000-13/15/16/18` (protección de `main`, `.env` ignorado, gitleaks).
