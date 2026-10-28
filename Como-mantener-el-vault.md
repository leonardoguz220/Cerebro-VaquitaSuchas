---
title: "Cómo mantener el vault al día"
type: guide
date: 2026-10-28
tags: [vault, mantenimiento]
related: ["[[00-Inicio]]"]
---
## Convenciones

**Carpetas**
`00-Inbox` · `10-Decisiones` · `20-Specs` · `25-Disenos` · `30-Arquitectura` · `40-Dominio` · `50-Operaciones` · `60-Equipo` · `70-Reuniones` · `80-Estudio` · `90-Plantillas`.

**Nombres de archivo:** `Prefijo-con-guiones.md`, sin espacios ni tildes. Prefijos: `ADR-NNNN-`, `Decision-`, `Spec-NNN-`, `Runbook-`, `AAAA-MM-DD-` para reuniones.

**Frontmatter obligatorio:** `title`, `type` (adr, decision, spec, design, architecture, domain, glossary, runbook, status, meeting, retro, people, study, context, moc, guide), `tags`. Recomendados: `status`, `date` (AAAA-MM-DD), `related` (lista de `"[[Nota]]"`), `fuente` (URL del archivo original en el repo del código).

**Enlaces:** usa `[[Nombre-de-nota]]` y `[[Nota#Seccion]]`. Toda nota enlaza al menos a otra. Los identificadores `RF-`, `RN-` y `CA-` se escriben tal cual para poder buscarlos.

**Etiquetas:** en minúscula y sin tildes: `#adr`, `#spec-011`, `#operaciones`, `#dominio`.

**Estados de decisión:** `propuesta`, `supuesta` (la tomó una persona y falta objeción), `aceptada`, `reemplazada`.

## Rutina

1. **Decisión nueva:** copia [[Plantilla-ADR]], llénala, enlaza las specs afectadas. Si es un ADR del repo del código, el repo manda y aquí va la copia.
2. **Spec nueva o cambiada en VaquitaSuchas:** actualiza su nota en `20-Specs` y el [[Roadmap-de-specs]].
3. **Reunión:** [[Plantilla-Reunion]] el mismo día. Las acciones llevan persona.
4. **Fin de feature:** [[Plantilla-Retro]].
5. **Cambió algo de despliegue:** actualiza [[Estado-de-despliegue]].
6. Antes de cada PR corre `node scripts/check-vault.mjs`; revisa enlaces rotos y frontmatter. CI lo corre también.

## Reglas de seguridad

Nunca guardes contraseñas, tokens, claves de API, URLs de bases de datos, CI de personas ni datos de usuarios. Describe qué variable hay que configurar, no su valor.

## Cómo la IA usa el vault

Ver `CLAUDE.md` en la raíz. Resumen: empezar por [[00-Inicio]], buscar por `type` y `tags`, citar la nota y su `fuente`, y no inventar decisiones.
