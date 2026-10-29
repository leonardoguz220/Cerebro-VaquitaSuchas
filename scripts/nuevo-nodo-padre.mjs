// Crea un nodo padre nuevo: carpeta, nota hub, enlace en Vaquita-Cerebro y color en el gráfico.
// Uso: node scripts/nuevo-nodo-padre.mjs <area> "<Titulo>" [color-hex]
// Ejemplo: node scripts/nuevo-nodo-padre.mjs legal "Marco legal" "#00b894"
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const [area, title, hex] = process.argv.slice(2);
if (!area || !title || !/^[a-z0-9-]+$/.test(area)) {
  console.error('Uso: node scripts/nuevo-nodo-padre.mjs <area-en-minusculas> "<Titulo>" [#rrggbb]');
  process.exit(1);
}
const graphPath = join(root, '.obsidian/graph.json');
const graph = JSON.parse(readFileSync(graphPath, 'utf8'));
if (graph.colorGroups.some((g) => g.query === `tag:#area/${area}`)) {
  console.error(`El área "${area}" ya existe.`);
  process.exit(1);
}
const used = new Set(graph.colorGroups.map((g) => g.color.rgb));
const fallback = [0xff7675, 0x74b9ff, 0xa29bfe, 0xfab1a0, 0x55efc4, 0xffeaa7, 0xfd79a8, 0x81ecec, 0xb2bec3, 0xe17055];
const rgb = hex ? parseInt(hex.replace('#', ''), 16) : fallback.find((c) => !used.has(c)) ?? 0x888888;

const n = readdirSync(root).filter((f) => /^\d\d-/.test(f) && !f.startsWith('90-') && !f.startsWith('00-')).length + 1;
const folder = `${String(n).padStart(2, '0')}-${title.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
const name = folder.replace(/^\d\d-/, '');
if (existsSync(join(root, folder))) { console.error(`Ya existe ${folder}`); process.exit(1); }
mkdirSync(join(root, folder));
const today = new Date().toISOString().slice(0, 10);
writeFileSync(join(root, folder, `${name}.md`), `---
title: "${title}"
tipo: hub
area: ${area}
parent: "[[Vaquita-Cerebro]]"
date: ${today}
tags: [area/${area}, hub]
---

> Padre: [[Vaquita-Cerebro]]

# ${title}

Describe aquí de qué trata este nodo padre y por qué importa para Vaquita. Cada nota nueva de este tema lleva \`parent: "[[${name}]]"\`, \`area: ${area}\` y la etiqueta \`area/${area}\`, y se enlaza desde esta nota.
`);
graph.colorGroups.push({ query: `tag:#area/${area}`, color: { a: 1, rgb } });
writeFileSync(graphPath, JSON.stringify(graph, null, 2));

const rootPath = join(root, 'Vaquita-Cerebro.md');
let t = readFileSync(rootPath, 'utf8');
t = t.replace(/(\| \[\[Herramientas-IA\]\][^\n]*\n)/, `$1| [[${name}]] | ${title} |\n`);
if (!t.includes(`[[${name}]]`)) t = t.replace('\n## Cómo usarlo', `\n- [[${name}]] — ${title}\n\n## Cómo usarlo`);
writeFileSync(rootPath, t);
console.log(`Creado ${folder}/${name}.md, color #${rgb.toString(16).padStart(6, '0')} y enlace en Vaquita-Cerebro.\nAhora escribe las notas hijas con parent: "[[${name}]]" y corre node scripts/check-vault.mjs`);
