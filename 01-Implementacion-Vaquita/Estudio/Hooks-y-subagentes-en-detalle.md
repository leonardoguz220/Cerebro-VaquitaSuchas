---
title: "Hooks y subagentes en detalle"
tipo: study
area: implementacion
parent: "[[Estudio-y-presentacion]]"
date: 2026-10-29
tags: [area/implementacion, study, carpeta-compartida]
related: ["[[Hooks]]", "[[Subagentes]]"]
---

> Padre: [[Estudio-y-presentacion]]

Archivo de la carpeta compartida del proyecto (`estudio/hooks-y-subagentes-detallado.md`), copiado completo.

Todo vive en `.claude/` y lo usa Claude Code (la IA con la que programa el equipo). No forma parte de la app Vaquita.

## Parte 1. Hooks

Un hook es un script que Claude Code ejecuta automáticamente cuando Claude va a usar una herramienta (PreToolUse, "antes") o acaba de usarla (PostToolUse, "después"). Recibe por entrada estándar un JSON con lo que Claude quiere hacer y puede (a) dejarlo pasar, (b) negarlo con un mensaje, o (c) dar un aviso. Se registran en `.claude/settings.json`:

| Evento | Herramientas (matcher) | Script |
|---|---|---|
| PreToolUse | Read, Edit, Write, MultiEdit, NotebookEdit | `guard-files.mjs` |
| PreToolUse | Bash | `guard-bash.mjs` |
| PostToolUse | Edit, Write, MultiEdit | `post-edit.mjs` |

`lib.mjs` no es un hook: son funciones compartidas (leer el JSON de entrada, detectar rutas secretas, saber si un archivo ya está en `main`, y `denyPreToolUse`, que imprime el JSON de rechazo).

### 1.1 `guard-files.mjs` (guardia de archivos)
Se ejecuta antes de leer o escribir un archivo. Revisa la ruta en este orden:
1. **Secretos**: si es `.env` o variante (menos `.env.example`), `.pem`, `.key`, `.p12`, `.pfx` o credenciales de servicio, lo niega, incluso para leer.
2. Si la acción es solo leer, o el archivo está fuera del repo, deja pasar.
3. **Reglas de la IA**: niega editar `.claude/hooks/`, `.claude/agents/` y `.claude/settings.json`. Un agente no puede quitarse sus propias reglas; eso lo hace una persona por PR. (Se puede saltar con `VAQUITA_ALLOW_CLAUDE_CONFIG=1`.)
4. **Migraciones ya aplicadas**: niega editar `database/migrations/*.sql` si ese archivo ya existe en `main`. Hay que crear una migración nueva.
5. **Avisos sin bloquear**: al tocar una spec, el modelo de datos, el contrato de API, la constitución, `CLAUDE.md` o `context/`, avisa que el cambio va por PR y hay que avisar a las otras capas. Al editar un test existente, avisa que no se deben debilitar aserciones ligadas a un criterio CA.

### 1.2 `guard-bash.mjs` (guardia de la terminal)
Antes de cada comando de terminal. Divide cadenas (`a && b; c | d`) y revisa cada comando:
1. **`--no-verify`**: negado, porque salta los hooks de git.
2. **`git push`**: niega el push forzado (`--force`, `-f`; `--force-with-lease` solo queda con permiso manual). Niega push a `main`, `dev` o `qa`, tanto si los nombras como si estás parado en esa rama.
3. **Antes de un push permitido** (`checkBeforePush`): calcula qué capas cambiaron respecto a `origin/dev` (database, backend, frontend) y corre `npm run lint` y `npm run test` en cada una. Si algo falla, niega el push y muestra las últimas 25 líneas del error. Si faltan dependencias, también lo niega. Se omite en `--dry-run`, al borrar ramas, o si la persona exportó `VAQUITA_PREPUSH=0`.
4. **Config de IA**: niega modificar `.claude/hooks|agents|settings.json` desde la terminal (`sed -i`, `tee`, `cp`, `mv`, `rm`, redirecciones `>`, `git checkout`).
5. **Secretos**: niega `cat`, `head`, `grep`, etc. sobre archivos `.env`, llaves y credenciales.
6. **Bases de datos**: niega `npm run db:reset|restore|migrate|seed` si `DATABASE_URL` no es local. Staging se migra solo con el workflow manual "Migrate staging".

Además, `settings.json` tiene listas `allow` (comandos permitidos sin preguntar, como `npm run lint`, `git status`), `ask` (piden confirmación, como `git reset --hard`, `npm install`) y `deny` (siempre prohibidos: `rm -rf`, `git push --force`, `git commit --no-verify`).

### 1.3 `post-edit.mjs` (formato tras editar)
Se ejecuta después de editar un archivo de `backend/`, `frontend/` o `database/`:
1. Pasa Prettier (`--write`) a `.ts, .tsx, .js, .json, .css, .md`. Si falla, no bloquea.
2. Los tests relacionados con el archivo (Jest o Vitest) solo corren si se activa `VAQUITA_HOOK_TESTS=1`. Están apagados por defecto porque, al escribir primero el test, fallaría en cada paso y gastaría muchos tokens. Si se activan y fallan, devuelve `decision: block` con el error para que Claude lo corrija.
3. No corre tests de `database/` ni e2e (necesitan PostgreSQL; eso lo hace el CI).

**Idea central para el profesor:** las reglas del equipo (no subir secretos, no tocar `main`, no romper el lint) no dependen de que alguien las recuerde; un script las hace cumplir. Se complementan con el CI en GitHub: el hook frena en la máquina y el CI frena en el PR.

## Parte 2. Subagentes

Un subagente es un archivo `.claude/agents/<nombre>.md` con un encabezado (`name`, `description`, `tools`) y un prompt. Claude principal lo invoca para delegarle una tarea; el subagente trabaja en un contexto aparte, solo con las herramientas listadas, y devuelve un resumen. `description` es lo que Claude lee para decidir cuándo usarlo.

### 2.1 Los tres que implementan (uno por capa y por persona)
Todos con `tools: Read, Grep, Glob, Edit, Write, Bash`. Siguen el flujo: leer la línea de la tarea en `tasks.md`, leer solo las secciones de contrato/modelo que cita, escribir primero el test del `CA-xxx`, implementar, correr lint y tests de su capa, marcar `[x]` y proponer el commit (`feat(NNN): ... [Txxx]`), sin hacer commit ni push salvo que se lo pidan.

- **`db-engineer`** (Camila): solo escribe en `database/`. Migraciones SQL numeradas, seeds y pruebas de integridad según `data-model.md`.
- **`backend-engineer`** (Leonardo): solo escribe en `backend/`. Capas `controllers → services → domain (funciones puras) → repositories (único lugar con SQL)`. Dinero en centavos enteros, grupo ajeno → 404, miembro sin rol → 403, errores sin trazas, sin `console.log` ni datos personales en logs.
- **`frontend-engineer`** (Adrian): solo escribe en `frontend/`. Pantallas Next.js, componentes, proxy `/api`, hooks y servicios según el contrato, con pruebas de componentes y Playwright. No calcula cuotas ni estados.

Si la tarea exige tocar otra capa, se detienen y lo informan: así no se pisan entre personas.

### 2.2 Los de revisión
- **`contract-checker`** (solo lectura: Read, Grep, Glob, Bash): compara el código con `contracts/api.md` y `data-model.md` congelados. Se usa si el PR toca contratos, DTO del backend o `frontend/src/services/`.
- **`ca-traceability-checker`** (solo lectura): verifica que cada criterio `CA-xxx` tenga un test que lo cite y que la tarea cumpla la definición de terminado. Se usa al cerrar una historia o una spec, no en cada tarea.
- **`code-reviewer`**: revisión de código en cinco dimensiones (corrección, legibilidad, arquitectura, seguridad, rendimiento), con comentarios clasificados.
- **`security-auditor`**: busca vulnerabilidades y amenazas (entradas, autenticación, secretos, etc.).
- **`test-engineer`**: diseña estrategia de pruebas, escribe tests y analiza huecos de cobertura.

### 2.3 Por qué es útil
- Separación por rol y por carpeta: tres personas y una IA sin pisarse.
- Los revisores son de solo lectura: no pueden estropear lo que revisan.
- Cada uno carga solo el contexto que necesita, así gasta menos y se equivoca menos.

## Parte 3. Cómo encajan (para explicarlo en 30 segundos)
Una persona pide una tarea de `tasks.md`. Claude delega al subagente de la capa (backend-engineer, por ejemplo). Ese subagente edita archivos; antes de cada edición `guard-files` revisa que no sean secretos ni migraciones viejas, y después `post-edit` formatea. Cuando se pide un push, `guard-bash` bloquea ramas protegidas y corre lint y tests. Al final, los revisores (contract-checker, ca-traceability-checker) verifican contrato y trazabilidad, y el CI de GitHub repite las comprobaciones en el PR.
