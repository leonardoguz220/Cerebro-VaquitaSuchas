---
title: "Estado de despliegue"
type: status
status: vigente
date: 2026-10-28
tags: [operaciones, despliegue]
related: ["[[Runbook-migrar-produccion]]", "[[Pasos-pendientes-de-Leo]]"]
---
Foto al 2026-10-28. Actualizar al cambiar.

| Pieza | Dónde | Notas |
|---|---|---|
| Frontend | Vercel (staging: `vaquita-suchas.vercel.app`) | El merge a `main` hecho por bot no disparó deploy automático; se hizo un deploy manual a producción el 2026-10-22 |
| Backend | Render (blueprint `render.yaml`) | Servicio gratuito: se duerme tras 15 min sin tráfico, por eso los plazos se evalúan al consultar |
| Base de datos | PostgreSQL en Render | La base gratuita expira 30 días después de crearse: hacer `db:dump` antes |
| Almacenamiento | Supabase Storage (bucket privado) | La clave se rotó el 2026-10-27 |
| Correo | Brevo | [[Runbook-correo-staging]] |
| Telegram | Bot `VaquitaVerficacionBot` | `TELEGRAM_BOT_USERNAME` configurado; PR #245 lo vuelve obligatorio en producción (pendiente de fusionar a `dev`) |
| Tareas programadas | cron-job.org cada 5 min a `/internal/jobs/tick` | Respaldo en GitHub Actions (`jobs-tick.yml`) |

## Problemas conocidos
- `deploy-frontend.yml` y `deploy-backend.yml` están en `main` pero GitHub no los registra como workflows (404 al despachar).
- Falta el E2E del frontend para la spec 002 (T043).
