---
title: "Configuración de Claude Code (settings.json)"
tipo: guia
area: ia
parent: "[[Herramientas-IA]]"
date: 2026-10-29
tags: [area/ia, guia]
fuente: https://github.com/leonardoguz220/VaquitaSuchas/blob/main/.claude/settings.json
---

> Padre: [[Herramientas-IA]]

# Configuración de Claude Code

`.claude/settings.json` define tres listas de permisos y engancha los hooks ([[Hooks]]).

- **allow:** `npm run lint|test|build|typecheck`, `db:up|down|migrate|seed`, prettier en modo check, comandos de solo lectura de git y docker, `git add|commit`, `git push` a ramas `feat/*` y `fix/*`, y `gh pr create|ready|view|list`.
- **ask:** `git push --force-with-lease`, `git reset --hard`, `git clean`, `db:reset`, `db:restore`, `npm install|uninstall` y `docker compose down -v`.
- **deny:** `rm -rf`, `git push --force`, `git push -f` y `git commit --no-verify`.

No contiene secretos. Los agentes no pueden modificar este archivo ([[Hook-guard-bash]]).
