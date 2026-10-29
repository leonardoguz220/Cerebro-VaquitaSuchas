---
title: "Guía de estudio: defensa de Vaquita"
tipo: study
area: implementacion
parent: "[[Estudio-y-presentacion]]"
date: 2026-10-29
tags: [area/implementacion, study, carpeta-compartida]
---

> Padre: [[Estudio-y-presentacion]]

Archivo de la carpeta compartida del proyecto (`estudio/guia-de-estudio-vaquita.md`), copiado completo.

La planilla pide 6 requisitos para poder defender (si falta uno, el tope es 50) y 9 criterios que suman 100. La nota de cada integrante es grupal × 0,6 + individual × 0,4. Abajo, cada punto con qué es, cómo funciona en Vaquita y qué decir.

## Requisitos para defender

1. **Commits de los 3.** Los tres integrantes tienen commits en el repo (`git shortlog -sn`: Leonardo, Adrian y Camila aparecen). Cada uno es dueño de una capa: Camila `database/`, Leonardo `backend/`, Adrian `frontend/`.
2. **3 partes desplegadas.** BD y backend en Render, frontend en Vercel (ver abajo).
3. **Workflow con pruebas.** `.github/workflows/ci.yml`, `backend.yml`, `frontend.yml`.
4. **Hook + subagente.** `.claude/hooks/` y `.claude/agents/`.
5. **Sin secretos (.env).** `.gitignore` ignora `.env` y `.env.*` (solo se sube `.env.example`); además `gitleaks` revisa en CI.
6. **README completo.** Módulos, CI/CD, URLs de despliegue, hooks y stack.

## Criterios

### 1. Repositorio y trabajo en equipo (10)
Monorepo con tres carpetas (`database`, `backend`, `frontend`). Flujo de ramas `trabajo → dev → qa → main`, impuesto por el workflow `branch-flow.yml` (el check se llama `flow`): a `main` solo se llega desde `qa`, a `qa` solo desde `dev`. Commits Conventional Commits (`feat(002): add receipt upload [T3]`), PRs con plantilla, `CODEOWNERS`. Metodología: Spec Driven Development (primero la spec, el código se deriva de ella).

### 2. Base de datos desplegada (10)
PostgreSQL 16 en Render, plan gratuito, definida en `render.yaml` (`vaquita-staging-db`). Las tablas se crean con **migraciones SQL numeradas** (`database/migrations/0001_init.sql` … `0101_...`). Las migraciones **no corren al arrancar** el backend: se aplican a mano con el workflow `migrate-staging.yml` (manual, solo desde `main`). Hay pruebas de integridad (`database/tests/`) con restricciones, triggers y checksums. Limitación a mencionar: la BD gratuita caduca a los 30 días.

### 3. Backend desplegado (10)
NestJS (Node 22) como servicio web en Render (`render.yaml`: `buildCommand` compila, `startCommand` = `npm run start -w backend`, `healthCheckPath: /health`, `autoDeploy: true` desde la rama `dev`). Arranca en `backend/src/main.ts` y escucha en `process.env.PORT`. La conexión a la BD llega por `DATABASE_URL` (variable que Render rellena desde la base); `JWT_SECRET` se genera solo; `CI_ENCRYPTION_KEY` se pega a mano. Capas: `controllers → services → domain (funciones puras) → repositories` (único lugar con SQL). Swagger en `/api/docs`. URL: https://vaquita-staging-api.onrender.com/health. El plan gratis se duerme tras 15 min (la primera petición tarda ~1 min).

### 4. Frontend desplegado (10)
Next.js + React + TypeScript + Tailwind en Vercel: https://vaquita-suchas.vercel.app. Tiene un **proxy `/api`**: el navegador llama a `/api/...` en Vercel y Next lo reenvía al backend usando la variable `BACKEND_URL`. Así la cookie httpOnly con el JWT queda en el mismo dominio y se evitan problemas de CORS.

### 5. Conexión de punta a punta (15)
Demuéstralo con `/estado` en el frontend (muestra frontend, backend y base en OK) y `/api/health`, que recorre las tres capas: navegador → Vercel → proxy `/api` → Render (NestJS) → PostgreSQL. Flujo funcional para mostrar: login (JWT en cookie httpOnly) → crear grupo → solicitud de ingreso → pago/comprobante → cobro mensual. Regla clave: **las reglas de negocio viven solo en el backend** (el frontend no calcula cuotas); dinero en centavos enteros, los centavos sobrantes van al titular.

### 6. Integración y despliegue continuo (15)
- **CI** (`ci.yml`): en cada PR hacia dev/qa/main y push a main corren en paralelo `lint`, `build`, `test-database`, `test-backend`, `test-frontend` y `gitleaks`. Usan servicios de PostgreSQL 16 y Mailpit dentro del runner.
- `backend.yml` / `frontend.yml`: por capa, solo si cambiaron esos directorios.
- `e2e.yml`: Playwright con el flujo completo en navegador.
- `branch-flow.yml` y `auto-merge.yml`: validan el flujo de ramas y fusionan PRs de `dev` cuando pasan.
- `gitleaks-weekly.yml`: escaneo semanal de secretos.
- **CD**: Render (`autoDeploy` desde `dev`) y Vercel despliegan al hacer push; la BD se migra con `migrate-staging.yml` (manual, deliberado, para no alterar datos al arrancar).
- `jobs-tick.yml`: cada 10 min llama a `/internal/jobs/tick` (cobros, recordatorios, mora).

### 7. Hooks (10)
Configurados en `.claude/settings.json`. Son scripts Node que Claude Code ejecuta **antes (PreToolUse)** o **después (PostToolUse)** de usar una herramienta, y pueden bloquear la acción:
- `guard-files.mjs` (antes de Read/Edit/Write): bloquea tocar archivos con secretos y migraciones ya en `main`.
- `guard-bash.mjs` (antes de Bash): bloquea push a `main/dev/qa`, push forzado, `--no-verify`, leer secretos, modificar hooks/agentes/settings, `db:reset` contra bases no locales, y **exige lint y tests en verde antes de un push**.
- `post-edit.mjs` (después de editar): formatea el archivo con Prettier.
Idea para la defensa: los hooks hacen cumplir las reglas del equipo de forma automática, sin depender de la memoria de nadie.

### 8. Subagentes (10)
Archivos `.claude/agents/*.md` con frontmatter (nombre, descripción, herramientas) y un prompt. Cada uno tiene un rol y un alcance:
- Implementadores: `db-engineer`, `backend-engineer`, `frontend-engineer` (cada uno solo escribe en su carpeta).
- Revisores: `contract-checker` (contrato de API), `ca-traceability-checker` (cada criterio CA-xxx tiene test), `code-reviewer`, `security-auditor`, `test-engineer`.
Ventaja: contexto aislado, roles especializados y menos conflictos entre capas.

### 9. Avance del proyecto ≥ 50 % (10)
README: las 11 specs (000–010) implementadas y desplegadas; el avance real se ve en las tareas `[x]` de cada `specs/NNN-*/tasks.md` y en `specs/00-roadmap.md`. Conviene contar cuántas tareas están marcadas para dar un porcentaje.

### Descuentos / extra (±)
Posibles extras: Playwright E2E, gitleaks, Swagger, pruebas de rendimiento de la BD, Spec Kit. Posibles descuentos: servicios gratuitos que se duermen, bot/correo en modo dev en staging (`MAIL_MODE=dev`, `TELEGRAM_MODE=dev`, archivos en disco efímero según `render.yaml`).

## Preguntas probables y respuesta corta
- **¿Por qué migraciones y no crear tablas desde el código?** Son versionadas, repetibles y revisables en PR; checksums evitan editar una ya aplicada.
- **¿Por qué cookie httpOnly y proxy?** JavaScript no puede leer el token (protege de XSS) y todo va por el mismo dominio.
- **¿Por qué dinero en centavos enteros?** Evita errores de punto flotante; la suma de cuotas siempre iguala el total.
- **¿Cómo se evita subir secretos?** `.gitignore`, `.env.example`, gitleaks en CI y hook que bloquea leerlos.
- **¿Cómo se despliega un cambio?** PR a `dev` → CI verde → auto-merge → Render y Vercel redespliegan; migraciones con workflow manual.
