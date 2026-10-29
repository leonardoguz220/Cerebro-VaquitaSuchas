---
title: "Backend · adaptadores y comandos CLI"
tipo: backend
area: implementacion
parent: "[[Backend]]"
date: 2026-10-29
tags: [area/implementacion, backend, cli]
---

> Padre: [[Backend]]

# Adaptadores y CLI

## Adaptadores (`backend/src/app-adapters/`)
Conectan un módulo con otro sin acoplarlos: elegibilidad de titular, cupos de publicación, cobros abiertos, bloqueos de propiedad, calificaciones de reputación, conteo de grupos por usuario y los puertos nulos de solicitudes de ingreso.

## Comandos (`backend/src/cli/`)
- `host-enable`: habilita manualmente a un titular.
- `seed-admin`: crea el administrador inicial (las credenciales las pasa quien opera, nunca van al repo).
- `seed-dev-users` y `seed-users`: usuarios de desarrollo.
- `telegram-set-webhook`: registra el webhook del bot ([[Telegram-bot]]).

Se ejecutan desde `backend/dist/cli` tras `npm run build -w backend` y leen `backend/.env` si existe (PR #188).
