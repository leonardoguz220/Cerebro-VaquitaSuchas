---
title: "Vercel (frontend)"
tipo: infra
area: despliegue
parent: "[[Despliegue]]"
date: 2026-10-29
tags: [area/despliegue, infra, vercel]
related: ["[[Frontend]]"]
---

> Padre: [[Despliegue]]

# Vercel

Frontend Next.js en `vaquita-suchas.vercel.app` (rama `main` es producción). La variable `BACKEND_URL` apunta al backend; el proxy `/api` recorre las tres capas, así que `/api/health` y la pantalla `/estado` prueban el sistema completo. Deploy hook `VERCEL_DEPLOY_HOOK_URL` guardado como secreto de GitHub ([[Workflow-deploy-frontend]]).

Historial: el merge a `main` hecho por un bot no disparó el deploy automático; el 2026-10-22 se hizo un deploy manual de producción ([[Estado-actual]]). `frontend/vercel.json` solo declara el framework (`nextjs`). Notas: [[FE-Despliegue-notas]].
