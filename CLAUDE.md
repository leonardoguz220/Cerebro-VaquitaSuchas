# Guía para IA sobre este vault

Este vault es la memoria del proyecto Vaquita. Úsalo antes de proponer o tomar una decisión.

1. Empieza por `00-Inicio.md`. Busca por frontmatter: `type: adr|decision|spec|runbook`, `status`, `tags`, `related`.
2. Las notas con `fuente:` son copias de archivos del repo `leonardoguz220/VaquitaSuchas`; si difieren, manda el repo. Cita siempre la nota y su `fuente`.
3. Estado `supuesta` significa que alguien decidió por simplicidad y falta objeción; no lo trates como definitivo.
4. Para registrar una decisión, usa `90-Plantillas/Plantilla-ADR.md`, enlaza specs afectadas con `[[wikilinks]]` y actualiza `20-Specs`.
5. Nunca escribas secretos, URLs de BD ni datos de usuarios. Escribe en español; nombres de archivo con guiones y sin tildes.
6. Antes de terminar, corre `node scripts/check-vault.mjs`.
