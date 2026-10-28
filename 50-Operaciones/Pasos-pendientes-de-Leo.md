---
title: "Pasos pendientes de Leo"
type: runbook
date: 2026-10-28
tags: [operaciones, pendientes]
related: ["[[Estado-de-despliegue]]"]
---
Todo lo de código ya está hecho. Lo de abajo necesita tu cuenta de GitHub, Render, Vercel o los servicios externos. Van en el orden en que conviene hacerlos.

## 0. Fusionar el PR #221
Cuando el CI esté verde, fusiona el PR #221 a `dev` (squash). Luego `dev → qa → main` con el flujo normal (merge commit).

## 1. T046 Proteger `main` (GitHub) — YA HECHO por Leo, no hace falta
Repo → Settings → Branches → Add branch ruleset (o Add rule) para `main`:
1. Require a pull request before merging, aprobaciones requeridas: 0.
2. Require status checks to pass: `flow`, `lint`, `build`, `test-backend`, `test-frontend`, `test-database`, `gitleaks`. Marca "Require branches to be up to date".
3. Block force pushes. No permitir eliminar la rama.
4. Settings → General → Pull Requests → activa "Allow auto-merge".
5. Repite 1-3 para `qa` y `dev` (en `dev`, solo squash; en `qa` y `main`, solo merge commit).
Prueba: `git push origin main` desde tu PC debe ser rechazado.

## 2. T047 Render (backend y base)
1. render.com → New → Blueprint → elige el repo `leonardoguz220/VaquitaSuchas` (lee `render.yaml`, rama `dev`).
2. Cuando pida variables: `CI_ENCRYPTION_KEY` = salida de `openssl rand -hex 32`; `FRONTEND_ORIGIN` = URL de Vercel (sin barra final).
3. Anota la fecha de creación: la base gratuita caduca a los 30 días (haz `npm run db:dump` antes).
4. Servicio → Settings → Deploy Hook: copia la URL y guárdala como secreto de GitHub `RENDER_DEPLOY_HOOK_URL` (Settings → Secrets and variables → Actions). Pon Auto-Deploy en "After CI Checks Pass" u Off para no desplegar doble.
5. Migraciones: GitHub → Settings → Environments → New `staging` (con revisor: tú). Secreto del entorno `STAGING_DATABASE_URL` = External Database URL de Render. Luego Actions → "Migrate staging" → Run workflow desde `main`.
6. Comprueba: `https://<tu-servicio>.onrender.com/health` responde `status: ok`.

## 3. Disparador de tareas (cron-job.org)
1. Crea cuenta en cron-job.org → Create cronjob.
2. URL: `https://<tu-servicio>.onrender.com/internal/jobs/tick`, método POST, cada 5 minutos.
3. Cabecera: `X-Jobs-Token` = valor de `JOBS_TOKEN` (Render → Environment).
4. Respaldo en GitHub: variable `JOBS_TICK_URL` = URL base del servicio, y secreto `JOBS_TOKEN` con el mismo valor.
Prueba: `curl -X POST -H "X-Jobs-Token: <token>" https://<servicio>.onrender.com/internal/jobs/tick` devuelve `ran: [...]` y `maintenance.cleanup` sale `ok` (ya no da 23001 tras la migración 0005).

## 4. T049 Supabase Storage
1. supabase.com → New project (plan gratis). Storage → New bucket, nombre p. ej. `vaquita`, **privado**.
2. Project Settings → API: copia `Project URL` y la clave `service_role`.
3. En Render → Environment: `STORAGE_DRIVER=supabase`, `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `SUPABASE_BUCKET`. Nunca pongas la clave en el repo.
(La llamada diaria para evitar la pausa por inactividad está pendiente de código dentro de `maintenance.cleanup`; avísame y la hago.)

## 5. T050 Telegram y correo
1. Telegram: @BotFather → /newbot → copia el token. En Render: `TELEGRAM_MODE=prod`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_WEBHOOK_SECRET` (`openssl rand -hex 24`), y la URL pública del servicio donde lo pida el comando.
2. Registra el webhook desde tu PC con esas variables: `npm run telegram:set-webhook -w backend` (necesita `npm run build -w backend` antes). Verifica con `https://api.telegram.org/bot<TOKEN>/getWebhookInfo` (sin errores pendientes).
3. Correo: crea cuenta en Resend (con un correo tuyo verificado) o Brevo. En Render: `MAIL_MODE=prod`, `MAIL_PROVIDER=resend` (o `brevo`), `RESEND_API_KEY` (o `BREVO_API_KEY`), `MAIL_FROM`.
4. Decisión: anótala en `context/decisiones/0006-...md` (o dime cuál elegiste y la escribo yo).

## 6. T053 / T042 Medir argon2id
Tras el primer despliegue, desde tu PC:
`time curl -s -o /dev/null -X POST https://<servicio>.onrender.com/auth/login -H 'content-type: application/json' -d '{"email":"x@x.com","password":"mala-clave-123"}'`
Repítelo 5 veces y dime los tiempos (si pasa de 500 ms ajusto los parámetros y escribo el resultado en `research.md` R5).

## 7. Workflows de deploy que GitHub no registra
`deploy-backend.yml` y `deploy-frontend.yml` ya están en `main` pero no aparecen entre los workflows. Entra a github.com/leonardoguz220/VaquitaSuchas/actions: si hay un aviso rojo con un error de sintaxis, pégamelo y lo corrijo. Si no hay aviso, con el siguiente cambio a `backend/` en `dev` (o a `frontend/` en `main`) deberían registrarse al correr.

## 8. Frontend en Vercel (T048)
Variable `VERCEL_DEPLOY_HOOK_URL` (Vercel → Settings → Git → Deploy Hooks, rama `main`) como secreto de GitHub. Y la variable de la URL del backend que pida el `README` del frontend.
