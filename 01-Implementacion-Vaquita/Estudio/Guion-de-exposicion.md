---
title: "Guion de exposición"
tipo: study
area: implementacion
parent: "[[Estudio-y-presentacion]]"
date: 2026-10-29
tags: [area/implementacion, study, carpeta-compartida]
---

> Padre: [[Estudio-y-presentacion]]

Archivo de la carpeta compartida del proyecto (`estudio/guion-exposicion-vaquita.md`), copiado completo.

Duración total aproximada: 14 minutos, más 3 a 5 de preguntas. Cada parte está escrita para decirse con palabras propias; las frases entre comillas son ejemplos listos. Si el profesor da otro tiempo, recorta las partes marcadas como "si sobra tiempo".

Reparto (se puede intercambiar, pero cada uno habla de su capa):
- **Camila:** apertura, equipo y metodología, base de datos. (~4 min)
- **Leonardo:** backend, módulos, hooks y subagentes. (~5 min)
- **Adrian:** frontend, conexión de punta a punta, CI/CD, avance y cierre. (~5 min)

Antes de empezar, dejen abiertos: https://vaquita-suchas.vercel.app/estado y https://vaquita-staging-api.onrender.com/health. El backend gratuito se duerme tras 15 minutos: abran `/health` unos minutos antes para que ya esté despierto.

---

## PARTE 1. Camila (base de datos) — ~4 min

**1. Apertura (30 s)**
"Buenos días. Somos el Grupo Suchas: Camila en base de datos, Leonardo en backend y Adrian en frontend. Presentamos Vaquita, una aplicación web para compartir suscripciones como Netflix o Spotify. El titular crea un grupo, el sistema calcula cuánto paga cada miembro, convierte de dólares a bolivianos, genera los cobros cada mes y guarda el historial con los comprobantes de pago."

**2. Cómo trabajamos como equipo (1 min)**
"Trabajamos con un solo repositorio con tres carpetas: `database`, `backend` y `frontend`, cada una con su dueño. Usamos Spec Driven Development: primero se escribe y se aprueba la especificación y de ahí sale el código. Tenemos once specs, de la 000 a la 010. Las ramas siguen el flujo trabajo, `dev`, `qa` y `main`, y un workflow de GitHub impide saltarse ese orden. Los commits siguen Conventional Commits, por ejemplo `feat(002): add receipt upload`."
- Mostrar: la lista de commits o `git shortlog` con los tres integrantes.

**3. Base de datos (2 min 30 s)**
"La base es PostgreSQL 16 y está desplegada en Render en su plan gratuito, definida en el archivo `render.yaml`. La estructura se construye con migraciones SQL numeradas: son archivos como `0001_init.sql` o `0030_groups.sql`, y cada uno describe un cambio. Se aplican en orden y cada archivo corre en su propia transacción: si falla, se revierte."

"Para proteger el historial, guardamos una huella, un checksum, de cada migración. Si alguien edita una que ya fue aplicada, el sistema se niega a continuar; el cambio nuevo va en una migración nueva. Además, en Render las migraciones no corren al arrancar el servidor: se aplican con un workflow manual llamado Migrate staging, para que nadie altere la base por accidente."

"La base también defiende sus propias reglas con restricciones y triggers. Por ejemplo, el dinero se guarda en centavos enteros, nunca con decimales, y hay tablas de solo anexado para el historial de eventos y la auditoría, donde no se puede modificar ni borrar. Tenemos pruebas de integridad por cada módulo en la carpeta `database/tests`."
- Mostrar: abrir `database/migrations/0030_groups.sql` (el `CREATE TABLE groups` con `price_cents`).
- Si sobra tiempo: la base gratuita de Render caduca a los 30 días, es una limitación conocida del plan gratuito.

**Pasar la palabra:** "Con la base lista, Leonardo explica el backend que la usa."

---

## PARTE 2. Leonardo (backend, hooks y subagentes) — ~5 min

**1. Backend (2 min 30 s)**
"El backend está hecho con NestJS sobre Node 22 y desplegado en Render como servicio web. Se conecta a la base con una variable de entorno, `DATABASE_URL`, y Render lo redespliega solo cuando hay cambios en la rama `dev`. Tiene un endpoint `GET /health` que comprueba que el servicio y la base están vivos, y documentación Swagger en `/api/docs`."

"Cada módulo del backend está dividido en cuatro capas. Los controllers reciben la petición y validan los datos. Los services aplican los casos de uso: permisos, pertenencia al grupo, transacciones. El domain tiene las reglas de negocio como funciones puras, por ejemplo cómo se divide la cuota o cuándo un cobro pasa a atrasado; al no depender de ningún framework, se prueban fácilmente. Y los repositories son el único lugar donde hay SQL."

"Tenemos unos 130 endpoints repartidos en módulos: autenticación y usuarios, catálogo de servicios, grupos, solicitudes de ingreso con chat, cobros y comprobantes, notificaciones, panel y reportes, reputación, cupos libres y administración. Una regla importante: las reglas de negocio viven solo en el backend, el frontend nunca calcula cuotas ni estados."
- Mostrar: Swagger en `/api/docs` y la carpeta `backend/src/modules/billing` con sus cuatro carpetas.
- Frase para memorizar sobre el dinero: "Todo el dinero va en centavos enteros, y los centavos sobrantes van al titular, así la suma de las cuotas siempre es igual al total."

**2. Hooks (1 min 30 s)**
"Para trabajar con Claude Code configuramos hooks, que son scripts que se ejecutan automáticamente antes o después de una acción de la IA y pueden bloquearla. Tenemos tres. `guard-files` bloquea leer o escribir archivos con secretos, como el `.env`, y editar migraciones que ya están en `main`. `guard-bash` bloquea el push a `main`, `dev` o `qa`, el push forzado y el `--no-verify`, y antes de cualquier push permitido corre el lint y los tests: si fallan, no deja subir. `post-edit` da formato al código con Prettier después de cada edición."
- Demo opcional (30 s): pedirle a Claude "haz `git push origin main`" y mostrar el mensaje "main está protegida".

**3. Subagentes (1 min)**
"También definimos ocho subagentes, que son ayudantes con un rol y permisos limitados, cada uno en un archivo de la carpeta `.claude/agents`. Tres construyen, uno por capa: `db-engineer`, `backend-engineer` y `frontend-engineer`, y cada uno solo puede escribir en su carpeta. Cinco revisan: `contract-checker` verifica que el código respete el contrato de la API, `ca-traceability-checker` comprueba que cada criterio de la spec tenga su test, y están `code-reviewer`, `security-auditor` y `test-engineer`."

**Pasar la palabra:** "Ahora Adrian muestra lo que ve el usuario y cómo se conecta todo."

---

## PARTE 3. Adrian (frontend, conexión, CI/CD y cierre) — ~5 min

**1. Frontend (1 min 30 s)**
"El frontend está hecho con Next.js, React, TypeScript y Tailwind, y desplegado en Vercel. Tiene pantallas por cada módulo: ingreso y registro, grupos, solicitudes de ingreso con chat, cobros con subida de comprobante, panel con calendario e historial, perfil con reputación, cupos libres y un panel de administración."

"El frontend no habla directamente con la base ni calcula reglas. Todas las llamadas pasan por un proxy `/api` que reenvía al backend. Cuando alguien inicia sesión, el token de sesión se guarda en una cookie `httpOnly`, es decir, que el JavaScript del navegador no puede leer, con `Secure` en producción y `SameSite=Lax`. Así, aunque alguien inyecte código malicioso en la página, no puede robar el token."

**2. Conexión de punta a punta (1 min 30 s)**
"Para comprobar que las tres partes están conectadas tenemos la pantalla `/estado`, que muestra frontend, backend y base de datos en OK. El recorrido es: el navegador llama a Vercel, el proxy reenvía a Render donde está NestJS, y NestJS consulta PostgreSQL."
- Demo en vivo (lo más importante): abrir `/estado`, luego iniciar sesión, mostrar un grupo, un cobro o el panel.
- Plan B si el backend está dormido: explicar que el plan gratuito de Render se duerme tras 15 minutos y la primera petición tarda cerca de un minuto; tener capturas de pantalla a mano.

**3. Integración y despliegue continuo (1 min 30 s)**
"Usamos GitHub Actions. El workflow `ci.yml` corre en cada pull request y ejecuta en paralelo: lint, build, pruebas de la base, del backend y del frontend, y un escaneo de secretos con gitleaks. Además hay workflows específicos por capa, `backend.yml` y `frontend.yml`, y `e2e.yml`, que prueba el flujo completo en el navegador con Playwright. Otros workflows validan el flujo de ramas, fusionan automáticamente los pull requests de `dev` cuando todo pasa, y un tick cada 10 minutos dispara las tareas programadas como cobros y recordatorios."
"Para el despliegue, Render y Vercel redespliegan solos cuando se actualiza la rama, y las migraciones de la base se aplican con un workflow manual."
- Mostrar: la pestaña Actions de GitHub con una corrida en verde.

**4. Avance y cierre (30 s)**
"Las once specs, de la 000 a la 010, están implementadas y desplegadas en staging, y el avance se puede verificar en las tareas marcadas en cada `tasks.md`. Reconocemos algunas limitaciones: en staging el bot de Telegram y el correo están en modo desarrollo, y la verificación de Telegram se simula en una pantalla interna; el siguiente paso sería crear el bot real y configurar su nombre y token en Render. Muchas gracias; estamos listos para sus preguntas."

---

## Preguntas probables y quién responde

| Pregunta | Quién | Respuesta corta |
|---|---|---|
| ¿Por qué migraciones y no crear las tablas desde el código? | Camila | Son versionadas, repetibles en cualquier entorno, se revisan en pull request y el checksum evita editar una ya aplicada. |
| ¿Por qué el dinero en centavos enteros? | Camila / Leonardo | Evita errores de redondeo de los decimales; la suma de las cuotas siempre iguala el total. |
| ¿Cómo garantizan integridad en la base? | Camila | Restricciones, claves foráneas, triggers y tablas de solo anexado, con pruebas en `database/tests`. |
| ¿Por qué las reglas solo en el backend? | Leonardo | Una única fuente de verdad: el frontend se puede saltar, el backend no. |
| ¿Para qué sirve la capa domain? | Leonardo | Son funciones puras sin framework ni base de datos, fáciles de probar al 100 %. |
| ¿Qué hace un hook y qué un subagente? | Leonardo | El hook es un script automático que puede bloquear una acción; el subagente es un ayudante con rol y permisos limitados. |
| ¿Cómo evitan subir secretos? | Leonardo / Adrian | `.gitignore` ignora `.env`, solo se sube `.env.example`, gitleaks revisa en el CI y un hook bloquea leerlos. |
| ¿Por qué cookie httpOnly y proxy? | Adrian | El JavaScript no puede leer el token (protege de XSS) y todo va por el mismo dominio, sin problemas de CORS. |
| ¿Por qué frontend en Vercel y backend en Render? | Adrian | Vercel está hecho para Next.js y simplifica el despliegue; Render aloja el servidor NestJS y PostgreSQL gestionado; ambos tienen plan gratuito. (El repo no registra otra razón.) |
| ¿Cómo se despliega un cambio? | Adrian | Pull request a `dev`, CI en verde, fusión automática, Render y Vercel redespliegan; las migraciones con workflow manual. |
| ¿Cómo prueban que funciona? | Adrian | Pruebas unitarias, de integración por criterio, y E2E con Playwright del flujo principal; la pantalla `/estado` comprueba las tres capas. |
| ¿Qué falta o qué limitaciones tienen? | Quien responda primero | Telegram real, correo real y almacenamiento persistente en staging (hoy en modo desarrollo); el plan gratuito de Render se duerme y su base caduca a los 30 días. |
| ¿Por qué el bot de Telegram lleva a otro bot? | Leonardo | En staging está en modo desarrollo; falta crear el bot propio y cargar `TELEGRAM_BOT_USERNAME` y el token en Render; si falta, la app usa el nombre por defecto. |

## Consejos finales
- Ensayen una vez con cronómetro; cada uno que practique pasar la palabra con la frase indicada.
- Si no saben una respuesta, es válido decir: "eso lo revisamos en la spec" y señalar el archivo, mejor que inventar.
- Para esta lista de requisitos de la planilla: commits de los tres, tres partes desplegadas, workflow con pruebas, hook y subagente, sin secretos en el repo y README completo. Nombren cada uno al pasar, así el profesor los marca.
