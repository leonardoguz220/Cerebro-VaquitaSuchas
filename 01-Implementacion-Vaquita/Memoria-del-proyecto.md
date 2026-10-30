---
title: "Memoria del proyecto (hechos duraderos)"
tipo: status
area: proyecto
parent: "[[Implementacion-Vaquita]]"
date: 2026-10-30
tags: [area/proyecto, status]
related: ["[[Estado-actual]]"]
---

> Padre: [[Implementacion-Vaquita]]

# Memoria del proyecto

Hechos que conviene no volver a preguntar. Sin secretos.

- Repo del código: `leonardoguz220/VaquitaSuchas` (Node, PostgreSQL; despliegue Render y Vercel). Leo escribe en español.
- La presentación calificada fue el 2026-10-22 (ya hecha). Desde el 2026-10-26 se terminó el backend con el flujo normal de ramas (`dev → qa → main`).
- `deploy-frontend.yml` y `deploy-backend.yml` están en `main` pero GitHub no los registra como workflows (404 al despachar). Vercel no autodesplegó el merge de un bot; se hizo un deploy manual el 2026-10-22.
- 2026-10-27: correo con Brevo verificado en staging; Leo rotó la clave de Supabase. Frontend de staging `vaquita-suchas.vercel.app`; bot `VaquitaVerficacionBot`. El PR #245 (hacer obligatorio `TELEGRAM_BOT_USERNAME` en producción) estaba pendiente cuando se escribió esto; el historial lo muestra fusionado.
- La base gratuita de Render expira 30 días después de crearse.
- 2026-10-28: el profesor pidió el segundo cerebro en Obsidian en otro repo ([[Decision-vault-en-repo-aparte]]).
- 2026-10-30: todo `dev → qa → main` quedó fusionado (PR #280 y #281). Se crearon los issues #265 a #276 (uno por spec), se conectó `.mcp.json` con GitHub y Context7 (PR #278) y se marcaron 52 puntos de integración (PR #279). El E2E de la 002 T043 ya estaba hecho (PR #237). Ver [[Estado-actual]], [[Issues-de-las-specs]] y [[MCP-GitHub-y-Context7]].

Ver [[Estado-actual]].
