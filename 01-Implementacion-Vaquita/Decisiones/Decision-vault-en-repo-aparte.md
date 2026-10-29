---
title: "Vault de Obsidian en un repo aparte"
tipo: decision
area: implementacion
parent: "[[Decisiones]]"
status: aceptada
date: 2026-10-28
tags: [area/implementacion, decision, decision, vault]
---

> Padre: [[Decisiones]]

## Contexto
El profesor pidió un segundo cerebro en Obsidian para decidir con memoria del proyecto, con la única condición de estar en otro repo. Leo precisó que debe ser un cerebro especializado en Vaquita y en los temas que lo rodean.

## Decisión
Vault en `Cerebro-VaquitaSuchas` (privado), markdown con frontmatter y `[[wikilinks]]`, organizado en nodos padre por área (ver [[Vaquita-Cerebro]]). El repo del código sigue siendo la fuente de verdad; el vault enlaza y sintetiza.

## Alternativas
`docs/` dentro del repo del código (descartada por el requisito del profesor); Notion (no es texto plano versionable).

## Consecuencias
Hay que sincronizar cuando cambian specs o ADRs ([[Como-mantener-el-vault]]). Ningún secreto, URL de BD ni dato de usuario entra al vault.
