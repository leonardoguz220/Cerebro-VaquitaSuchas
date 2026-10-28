---
title: "Vault de Obsidian en un repo aparte"
type: decision
status: aceptada
date: 2026-10-28
tags: [decision, vault, obsidian]
related: ["[[Como-mantener-el-vault]]"]
---
## Contexto
El profesor pidió un segundo cerebro en Obsidian para tomar futuras decisiones con memoria del proyecto, con la única condición de que estuviera en otro repo.

## Decisión
Un vault de Obsidian en `Cerebro-VaquitaSuchas` (privado). Es markdown plano con frontmatter YAML y `[[wikilinks]]`, así Obsidian y las IA lo leen igual. El repo del código sigue siendo la fuente de verdad de specs y ADRs; el vault guarda copias, resúmenes y contexto de decisiones.

## Alternativas
- Carpeta `docs/` dentro del repo del código: descartada por el requisito del profesor.
- Notion u otra herramienta: no es texto plano versionable.

## Consecuencias
- Hay que sincronizar a mano cuando cambian specs o ADRs ([[Como-mantener-el-vault]]).
- Ningún secreto, URL de base de datos ni dato de usuario entra al vault.
