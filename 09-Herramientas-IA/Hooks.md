---
title: "Hooks de Claude Code"
tipo: hub
area: ia
parent: "[[Herramientas-IA]]"
date: 2026-10-29
tags: [area/ia, hub]
---

> Padre: [[Herramientas-IA]]

# Hooks

Guardias automáticos que corren antes o después de cada herramienta de Claude Code (configurados en `.claude/settings.json`). Un hook que bloquea algo legítimo se corrige por PR; ningún agente puede editar hooks, agentes ni `settings.json`.

- [[Hook-guard-files]] (PreToolUse sobre Read/Edit/Write)
- [[Hook-guard-bash]] (PreToolUse sobre Bash)
- [[Hook-post-edit]] (PostToolUse, formato)
- [[Hook-lib]]

Explicación didáctica: [[Hooks-y-subagentes-en-detalle]]. Reglas que refuerzan: [[Flujo-de-ramas]], [[Runbook-gitleaks-y-secretos]], [[Seguridad]].

## Notas hijas

- [[Hook-guard-files]] — Hook · guard-files.mjs
- [[Hook-guard-bash]] — Hook · guard-bash.mjs
- [[Hook-post-edit]] — Hook · post-edit.mjs
- [[Hook-lib]] — Hook · lib.mjs
