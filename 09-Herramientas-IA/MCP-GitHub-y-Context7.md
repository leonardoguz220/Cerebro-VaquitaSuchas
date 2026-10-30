---
title: "MCP conectados: GitHub y Context7 (.mcp.json)"
tipo: guia
area: ia
parent: "[[Herramientas-IA]]"
date: 2026-10-30
tags: [area/ia, guia, mcp]
related: ["[[Herramientas-y-skills-de-IA]]"]
fuente: https://github.com/leonardoguz220/VaquitaSuchas/.mcp.json
---

> Padre: [[Herramientas-IA]]

# MCP de GitHub y Context7

El archivo `.mcp.json` de la raíz de VaquitaSuchas (PR #278) declara dos servidores MCP que Claude Code ofrece activar al abrir el repo. Un MCP conecta a Claude con un servicio externo.

| MCP | Cómo se activa | Para qué se usó |
|---|---|---|
| GitHub | Cada integrante define la variable de entorno `GITHUB_PERSONAL_ACCESS_TOKEN` con un token de permisos mínimos (issues y pull requests del repo). El token **no va en el repo ni en este vault**. | Listar y crear issues y PR; los issues #265 a #276 se crearon así ([[Issues-de-las-specs]]) |
| Context7 | No necesita clave: `npx -y @upstash/context7-mcp` | Consultar documentación de NestJS, Next.js y `pg` |

Verificado funcionando. Los demás MCP recomendados siguen siendo opcionales: cada integrante decide si los activa. Registro completo y precedencia de herramientas: [[Herramientas-y-skills-de-IA]]; reglas de credenciales: [[Seguridad]].
