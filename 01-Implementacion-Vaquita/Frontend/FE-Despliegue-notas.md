---
title: "Frontend · notas de despliegue (DEPLOY.md)"
tipo: runbook
area: implementacion
parent: "[[Frontend]]"
date: 2026-10-29
tags: [area/implementacion, runbook]
related: ["[[Vercel]]"]
fuente: https://github.com/leonardoguz220/VaquitaSuchas/blob/main/frontend/DEPLOY.md
---

> Padre: [[Frontend]]

El frontend (Next.js) se despliega en Vercel. El proyecto usa `frontend` como directorio raíz.

| Qué                     | Dónde                                                                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Configuración de Vercel | `vercel.json` en esta carpeta, más las variables de entorno del proyecto                                   |
| Despliegue continuo     | `../.github/workflows/deploy-frontend.yml`: prueba y luego pide el despliegue |
| Pruebas                 | `../.github/workflows/frontend.yml`                                                  |
| Variable obligatoria    | `BACKEND_URL`: dirección del backend en Render, sin barra final; el proxy `/api` reenvía allí                             |

Flujo: un cambio en `frontend/` llega a `main` por la promoción `dev → qa → main`, el workflow ejecuta las pruebas y, si pasan, pide el despliegue a Vercel con el secreto `VERCEL_DEPLOY_HOOK_URL`. Comprobación: la página `/estado` muestra el backend y la base como activos.
