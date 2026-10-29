---
title: "Cómo mantener el vault al día"
tipo: guia
area: operaciones
parent: "[[Operaciones]]"
date: 2026-10-29
tags: [area/operaciones, guia]
---

> Padre: [[Operaciones]]

# Cómo mantener el vault

## Estructura
Raíz [[Vaquita-Cerebro]] → nueve nodos padre (carpetas `01-` a `09-`): Implementacion-Vaquita, Arquitectura, Dominio, Operaciones, Modelo-de-negocio, SDD-y-SpecKit, Finanzas-aplicadas, Calidad-y-Seguridad, Herramientas-IA.

## Convenciones
- **Frontmatter obligatorio:** `title`, `tipo`, `area`, `parent`, `tags` (siempre incluye `area/<area>`). Recomendados: `status`, `date`, `related`, `fuente`.
- **Padre:** cada nota enlaza a su padre en `parent` y en la primera línea (`> Padre: [[Hub]]`); cada hub lista sus hijas. No hay notas huérfanas.
- **Nombres:** `Prefijo-con-guiones.md`, sin espacios ni tildes (`ADR-NNNN-`, `Spec-NNN-`, `BE-`, `FE-`, `BD-`, `Workflow-`, `Runbook-`).
- **Enlaces:** `[[Nota]]` y `[[Nota#Seccion]]`; los identificadores `RF-`, `RN-` y `CA-` se escriben tal cual.
- **Colores del grafo:** por etiqueta `area/…` en `.obsidian/graph.json`.
- Las notas con `fuente:` son copias o síntesis de archivos del repo `leonardoguz220/VaquitaSuchas`; si difieren, manda el repo.

## Rutina
1. Decisión nueva: [[Plantilla-ADR]] en `Decisiones`, enlazando las specs afectadas.
2. Spec nueva o cambiada: actualiza su hub `Spec-NNN-*` y [[Specs]].
3. Cambió despliegue o hay un hallazgo: actualiza [[Estado-actual]] y [[Memoria-del-proyecto]].
4. Antes de cada PR: `node scripts/check-vault.mjs` (frontmatter, padre, huérfanas, enlaces rotos y secretos). El CI ([[Workflow-check-vault-del-cerebro]]) lo corre.
5. Ramas `nota/<tema>` y PR a `main`.

## Seguridad
Nunca guardes contraseñas, tokens, claves, URLs de base de datos, CI ni datos de usuarios: describe la variable, no su valor.

## Cómo la IA usa el vault
Ver `CLAUDE.md` de la raíz: empezar por [[Vaquita-Cerebro]], seguir los hubs, citar `fuente` y no inventar decisiones.
