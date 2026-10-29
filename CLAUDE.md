# Guía para IA sobre este vault

Este vault es el cerebro del proyecto Vaquita y de los temas que lo rodean. Úsalo antes de proponer o tomar una decisión.

1. Empieza por `Vaquita-Cerebro.md` y sigue los nodos padre (`tipo: hub`). Cada nota tiene `parent`, `area`, `tipo`, `tags` y, si viene del repo del código, `fuente`.
2. Las notas con `fuente:` son copias o síntesis de archivos de `leonardoguz220/VaquitaSuchas`; si difieren, manda el repo. Cita la nota y su `fuente`.
3. Estado `supuesta` = alguien decidió por simplicidad y falta objeción; no es definitivo.
4. Notas de conocimiento general (negocio, finanzas) son orientativas y piden verificar datos vigentes.
5. Para registrar una decisión: nota en `01-Implementacion-Vaquita/Decisiones` con la estructura de `90-Plantillas/Template-ADR.md`, enlazando specs afectadas y actualizando el hub `Decisiones`.
6. Toda nota nueva lleva `parent` y aparece en la lista de hijas de su hub (se agrega con un enlace `[[Nota]]` en el hub). Sin huérfanas.
7. Nunca escribas secretos, URLs de BD ni datos de usuarios. Español; nombres de archivo con guiones y sin tildes.
8. Para un tema grande nuevo usa `node scripts/nuevo-nodo-padre.mjs <area> "<Titulo>" [#color]` (crea hub, color y enlace en la raíz); toda `area` debe tener color en `.obsidian/graph.json`.
9. Antes de terminar corre `node scripts/check-vault.mjs`.
