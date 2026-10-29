---
title: "Guía de estudio ampliada"
tipo: study
area: proyecto
parent: "[[Estudio-y-presentacion]]"
date: 2026-10-29
tags: [area/proyecto, study, carpeta-compartida]
---

> Padre: [[Estudio-y-presentacion]]

Archivo de la carpeta compartida del proyecto (`estudio/guia-de-estudio-vaquita-v2.md`), copiado completo.

Cómo usarla: primero entiende QUÉ es Vaquita y cómo está armada (partes 1 a 3). Luego recorre la planilla de calificación punto por punto (parte 4). Al final tienes preguntas probables y frases cortas para memorizar.

La planilla pide 6 requisitos para poder defender (si falta uno, el tope es 50) y 9 criterios que suman 100. La nota de cada integrante es grupal × 0,6 + individual × 0,4.

---

## Parte 1. Qué es Vaquita

Una app web para repartir suscripciones (Netflix, Spotify, Disney+...) entre amigos, familia o compañeros. El titular crea un grupo, el sistema calcula cuánto paga cada quien, convierte dólares a bolivianos, genera los cobros cada mes, manda recordatorios y guarda un historial. Cada miembro sube su comprobante de pago y el titular lo confirma.

Reglas que se repiten en todo el proyecto (sirven para responder muchas preguntas):
- **El dinero va en centavos enteros**, nunca con decimales. Así no hay errores de redondeo. Los centavos sobrantes van al titular y la suma de las cuotas siempre es igual al total.
- **Las reglas de negocio viven solo en el backend.** El frontend muestra lo que el backend calcula. La base de datos refuerza la integridad con restricciones.
- **Cada cobro guarda una copia** del precio y del tipo de cambio del momento, para que el historial no cambie si luego cambian los precios.
- **Estados de un cobro:** `pendiente`, `en_revision`, `pagado`, `atrasado`, `cancelado`.
- **Sin secretos en el código.** Las claves van en variables de entorno.

---

## Parte 2. Las tres capas del sistema (y quién es dueño de cada una)

```
Frontend (Adrian)  →  Backend (Leonardo)  →  Base de datos (Camila)
   Vercel               Render                  Render (PostgreSQL)
```

**Frontend (Next.js + React + TypeScript + Tailwind).** Son las pantallas. Nunca habla con la base de datos y no calcula cuotas ni estados. Llama al backend a través de un proxy `/api` (ver cookie segura más abajo).

**Backend (NestJS, Node 22).** Es el cerebro. Valida permisos, calcula cuotas y estados, aplica las reglas y es el único que escribe en la base. Tiene documentación Swagger en `/api/docs`.

**Base de datos (PostgreSQL 16).** Guarda todo. Se construye con migraciones SQL numeradas, y usa restricciones y triggers para rechazar datos inválidos aunque el backend fallara.

### La cookie segura y el proxy `/api`
Una cookie es un dato pequeño que el navegador guarda y manda solo en cada petición. En Vaquita guarda tu sesión: un token JWT (un "carné" que dice quién eres). Se llama `vq_session`, dura 7 días y está definida en `frontend/src/lib/session-cookies.ts`:
```ts
['Path=/', `Max-Age=${maxAgeSeconds}`, 'HttpOnly', 'SameSite=Lax']
if (isSecureCookie()) parts.push('Secure');   // solo en producción
```
- **HttpOnly:** el JavaScript de la página no puede leerla; si alguien inyecta código malicioso, no puede robar el token.
- **Secure:** solo viaja por HTTPS (se activa en producción).
- **SameSite=Lax:** no se manda en peticiones que vienen de otros sitios (ayuda contra CSRF).

Flujo: el navegador llama a `/api/...` en Vercel → el proxy de Next.js lee la cookie y la reenvía al backend como `Authorization: Bearer <token>` → el backend responde. El navegador nunca ve el token, y como todo pasa por el mismo dominio no hay problemas de CORS. La dirección del backend está en la variable `BACKEND_URL` de Vercel.

### Las migraciones SQL
La base cambia con el tiempo (tablas nuevas, columnas, reglas). Una migración es un archivo SQL numerado que describe un cambio: `0001_init.sql`, `0030_groups.sql`, `0041_charges.sql`... Se aplican en orden, y así cualquiera puede construir la misma base desde cero (tu computadora, CI, Render).

Ejemplo (de `0030_groups.sql`):
```sql
CREATE TABLE groups (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL,
  name text NOT NULL,
  price_cents bigint NOT NULL,   -- dinero en centavos enteros
  currency text NOT NULL,
  exchange_rate numeric(10, 4) NULL,
  ...
```
El ejecutor (`database/src/migrate.ts`):
- Aplica los archivos en orden numérico, **una transacción por archivo** (si uno falla, se revierte).
- Anota cuáles ya se aplicaron para no repetirlos.
- Guarda un **checksum** (huella) de cada archivo: si alguien edita una migración ya aplicada, se niega a continuar. Un cambio nuevo va en una migración nueva (regla RN-000-02).
- Usa un bloqueo para que dos personas no migren a la vez.
- Local: `npm run db:migrate`. En Render NO corren al arrancar: se aplican con el workflow manual "Migrate staging".

---

## Parte 3. Capas internas y módulos

### Capas dentro del backend
Cada módulo se divide en cuatro capas, y cada una solo habla con la de abajo:

| Capa | Qué hace | Qué NO puede hacer |
|---|---|---|
| `controllers` | Reciben la petición HTTP, validan datos (DTO), guards de rol, Swagger | Tener reglas de negocio ni consultar la base |
| `services` | Casos de uso: permisos, pertenencia al grupo, transacciones | Escribir SQL ni conocer HTTP |
| `domain` | Funciones puras: cuotas, conversión USD→Bs, fechas de cobro, transiciones de estado | Importar NestJS ni `pg` |
| `repositories` | Único lugar con SQL, archivos, correo y Telegram | Aplicar reglas de negocio |

Ventaja: las reglas (`domain`) se testean fácil porque son funciones puras. Un módulo puede usar los servicios de otro, nunca sus repositorios. Hay una prueba (`architecture.spec.ts`) que vigila estas reglas.

### Capas dentro del frontend
`app/` (páginas por ruta), `components/ui` (componentes base) y `components/features` (componentes por módulo), `hooks/` (estado y carga de datos), `services/` (una función por endpoint de la API) y `lib/` (utilidades).

### Los módulos (carpetas de `backend/src/modules`)
| Módulo | Para qué sirve |
|---|---|
| `auth` y `users` | Registro, login (JWT en cookie), recuperar contraseña, perfil. El celular se verifica con Telegram. |
| `catalog` | Plataformas y planes con precio en USD. Lo mantiene el administrador. |
| `subscriptions` | Los grupos: titular, día de cobro, tipo de cambio, cuota en centavos, código de invitación. |
| `billing` | Cobros mensuales, comprobantes, estados e historial. |
| `join-requests` | Solicitud de ingreso con chat con el titular, pago y reclamos. |
| `notifications` y `telegram` | Avisos en la app, correo y Telegram; recordatorios y mora disparados por una tarea programada. |
| `reports` | Panel de gasto, ahorro y calendario de cobros. |
| `reputation` | Calificación por puntualidad, insignias y ranking. |
| `listings` | Cupos libres: el titular publica y otros piden entrar. |
| `admin` | Usuarios, baneos, reclamos, catálogo, estadísticas y auditoría. |
| `health` | `/health`: comprueba que el servicio y la base están vivos. |

`shared/` tiene lo común: configuración, base de datos, errores, guards, logs, correo, almacenamiento, reloj y tareas programadas. Cada módulo nació de una spec (000 a 010) en `specs/`.

### Flujo de punta a punta
El titular crea un grupo → alguien abre una solicitud, chatea y paga → el titular confirma y esa persona entra → cada mes el sistema genera los cobros y avisa → los miembros suben comprobante → el titular confirma → el panel y la reputación se actualizan.

---

## Parte 4. La planilla, punto por punto

### Requisitos para defender
1. **Commits de los 3:** Leonardo, Adrian y Camila tienen commits (`git shortlog -sn`).
2. **3 partes desplegadas:** BD y backend en Render, frontend en Vercel.
3. **Workflow con pruebas:** `.github/workflows/ci.yml`, `backend.yml`, `frontend.yml`.
4. **Hook + subagente:** `.claude/hooks/` y `.claude/agents/` (Parte 5).
5. **Sin secretos (.env):** `.gitignore` ignora `.env` y `.env.*` (solo se sube `.env.example`); gitleaks revisa en CI; un hook bloquea leerlos.
6. **README completo:** módulos, CI/CD, URLs, hooks y stack.

### Criterio 1. Repositorio y trabajo en equipo (10)
Monorepo con tres carpetas. Flujo de ramas `trabajo → dev → qa → main` impuesto por `branch-flow.yml`. Commits Conventional Commits (`feat(002): add receipt upload [T3]`), plantilla de PR, `CODEOWNERS`. Metodología Spec Driven Development: primero la spec, luego el código.

### Criterio 2. Base de datos desplegada (10)
PostgreSQL 16 en Render (plan gratuito), definida en `render.yaml`. Las tablas salen de las migraciones (Parte 2). Pruebas de integridad en `database/tests/`. Limitación: la base gratuita caduca a los 30 días.

### Criterio 3. Backend desplegado (10)
NestJS en Render como servicio web. En `render.yaml`: `buildCommand` compila, `startCommand` = `npm run start -w backend`, `healthCheckPath: /health`, `autoDeploy: true` desde `dev`. Escucha en el puerto `process.env.PORT`. Se conecta a la base con `DATABASE_URL`, que Render rellena. `JWT_SECRET` se genera solo. URL: https://vaquita-staging-api.onrender.com/health. El plan gratis se duerme tras 15 min (la primera petición tarda ~1 min).

### Criterio 4. Frontend desplegado (10)
Next.js en Vercel: https://vaquita-suchas.vercel.app. Usa el proxy `/api` de la Parte 2.

### Criterio 5. Conexión de punta a punta (15)
Demostración: `/estado` muestra frontend, backend y base en OK, y `/api/health` recorre las tres capas: navegador → Vercel → proxy → Render (NestJS) → PostgreSQL. Flujo funcional para mostrar: login → crear grupo → solicitud → pago/comprobante → cobro.

### Criterio 6. Integración y despliegue continuo (15)
- **CI** (`ci.yml`), en cada PR y push a `main`: `lint`, `build`, `test-database`, `test-backend`, `test-frontend` y `gitleaks` en paralelo, con PostgreSQL 16 y Mailpit en el runner.
- `backend.yml` y `frontend.yml`: por capa, solo si cambió esa carpeta.
- `e2e.yml`: Playwright con el flujo completo en navegador.
- `branch-flow.yml` y `auto-merge.yml`: validan el flujo de ramas y fusionan PRs de `dev` si pasan.
- `gitleaks-weekly.yml`: escaneo semanal de secretos.
- `jobs-tick.yml`: cada 10 min dispara las tareas programadas (cobros, recordatorios, mora).
- **CD:** Render (`autoDeploy`) y Vercel despliegan al hacer push; la BD se migra con `migrate-staging.yml`, manual y deliberado.

### Criterio 7. Hooks (10) y Criterio 8. Subagentes (10)
Ver Parte 5.

### Criterio 9. Avance del proyecto ≥ 50 % (10)
README: las 11 specs (000–010) implementadas y desplegadas en staging. Se comprueba con las tareas `[x]` de cada `specs/NNN-*/tasks.md` y con `specs/00-roadmap.md`.

### Descuentos / extra
Extras posibles: E2E con Playwright, gitleaks, Swagger, pruebas de rendimiento de la BD, Spec Kit. Cosas a reconocer con honestidad: el servicio gratuito se duerme; en staging el bot de Telegram y el correo están en modo desarrollo (`TELEGRAM_MODE=dev`, `MAIL_MODE=dev`) y los archivos van a disco efímero, según `render.yaml`. La verificación de Telegram se simula en `/dev/telegram`; el enlace del registro usa `TELEGRAM_BOT_USERNAME`, y si falta cae al nombre por defecto `VaquitaBot`.

---

## Parte 5. Hooks y subagentes (Claude Code)

Viven en `.claude/` y los usa Claude Code, la IA con la que programa el equipo. No son parte de la app Vaquita.

### Hooks = guardias automáticos
Un hook es un script que Claude Code ejecuta antes (PreToolUse) o después (PostToolUse) de que Claude use una herramienta. Recibe un JSON con lo que Claude quiere hacer y puede dejarlo pasar, avisar o negarlo con un mensaje. Se registran en `.claude/settings.json`:
```json
"PreToolUse": [{ "matcher": "Bash",
  "hooks": [{ "type": "command",
    "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/guard-bash.mjs\"",
    "onFailure": "block" }] }]
```
Y así se niega algo (`lib.mjs`):
```js
export function denyPreToolUse(reason) {
  process.stdout.write(JSON.stringify({ hookSpecificOutput: {
    hookEventName: 'PreToolUse',
    permissionDecision: 'deny',
    permissionDecisionReason: reason } }));
  process.exit(0);
}
```
Los tres hooks:
- **`guard-files.mjs`** (antes de leer/editar archivos): bloquea secretos (`.env`, llaves), editar los hooks, agentes y `settings.json` (un agente no se quita sus propias reglas), y editar migraciones que ya están en `main`. Avisa, sin bloquear, al tocar specs, contratos o tests existentes.
- **`guard-bash.mjs`** (antes de comandos de terminal): bloquea `--no-verify`, push forzado, push a `main/dev/qa`, leer archivos secretos con `cat/grep`, modificar la config de IA desde terminal, y `db:reset/migrate/seed` contra una base que no sea local. Antes de un push permitido corre `npm run lint` y `npm run test` de las capas que cambiaste, y si fallan lo bloquea.
- **`post-edit.mjs`** (después de editar): formatea con Prettier. Los tests relacionados solo corren si se activa `VAQUITA_HOOK_TESTS=1`.

Demo para el profesor: pedirle a Claude "haz `git push origin main`" y ver cómo responde "main está protegida: no se hace push directo".

Complemento: el hook frena en la máquina de la persona, y el CI de GitHub repite las comprobaciones en el PR.

### Subagentes = ayudantes especializados
Un subagente es un archivo `.claude/agents/<nombre>.md` con un encabezado y un prompt:
```md
---
name: backend-engineer
description: "Implementa tareas [BE] de Vaquita (Leonardo) en backend/..."
tools: Read, Grep, Glob, Edit, Write, Bash
---
```
`description` le dice a Claude cuándo delegarle; `tools` limita lo que puede usar. Trabaja en un contexto aparte y devuelve un resumen.

Los que construyen (uno por capa y por persona): `db-engineer` (solo `database/`), `backend-engineer` (solo `backend/`), `frontend-engineer` (solo `frontend/`). Si la tarea toca otra capa, se detienen e informan. Siguen el flujo: leer la tarea en `tasks.md`, escribir primero el test del criterio `CA-xxx`, implementar, correr lint y tests de su capa, marcar `[x]`.

Los que revisan: `contract-checker` y `ca-traceability-checker` (solo lectura: contrato de API congelado y que cada criterio tenga su test), `code-reviewer`, `security-auditor` y `test-engineer`.

Cómo encajan: una persona pide una tarea → Claude delega al subagente de la capa → antes de editar, `guard-files` revisa; después, `post-edit` formatea → al pedir push, `guard-bash` corre lint y tests → los revisores verifican contrato y trazabilidad → el CI repite todo en el PR.

---

## Parte 6. Preguntas probables y respuestas cortas
- **¿Por qué migraciones y no crear tablas desde el código?** Son versionadas, repetibles y revisables en PR; el checksum evita editar una ya aplicada.
- **¿Por qué cookie httpOnly y proxy?** JavaScript no puede leer el token (protege de XSS) y todo va por el mismo dominio (sin CORS).
- **¿Por qué dinero en centavos enteros?** Evita errores de decimales; la suma de las cuotas siempre iguala el total.
- **¿Por qué la lógica solo en el backend?** Para que haya una única fuente de verdad; el frontend se puede saltar, el backend no.
- **¿Para qué la capa `domain`?** Son funciones puras, fáciles de testear al 100 %.
- **¿Cómo se evita subir secretos?** `.gitignore`, `.env.example`, gitleaks en CI y un hook que bloquea leerlos.
- **¿Cómo se despliega un cambio?** PR a `dev` → CI verde → auto-merge → Render y Vercel redespliegan; las migraciones se aplican con un workflow manual.
- **¿Qué hace un hook y qué un subagente?** El hook es código que se ejecuta automáticamente y puede bloquear una acción; el subagente es un ayudante con rol y permisos limitados.
- **¿Qué falta?** Un bot de Telegram real, correo real y almacenamiento persistente en staging (hoy en modo desarrollo).
