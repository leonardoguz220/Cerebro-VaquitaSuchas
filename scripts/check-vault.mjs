// Revisa frontmatter, nota padre, notas huérfanas, enlaces rotos y secretos.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, basename } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const files = [];
const walk = (d) => {
  for (const f of readdirSync(d)) {
    if (f.startsWith('.') || f === 'node_modules' || f === 'scripts') continue;
    const p = join(d, f);
    statSync(p).isDirectory() ? walk(p) : p.endsWith('.md') && files.push(p);
  }
};
walk(root);
const rel = (f) => f.replace(root, '');
const isNote = (f) => !f.includes('90-Plantillas') && !['README.md', 'CLAUDE.md'].includes(basename(f)) || f.includes('/') && false;
const notes = files.filter((f) => !rel(f).startsWith('90-Plantillas') && !['README.md', 'CLAUDE.md'].includes(rel(f)));
const names = new Map();
for (const f of notes) {
  const n = basename(f, '.md');
  if (names.has(n)) console.error(`nombre repetido: ${n}`);
  names.set(n, f);
}
let errors = 0;
const fail = (f, m) => { console.error(`${rel(f)}: ${m}`); errors++; };
const secrets = /(postgres(ql)?:\/\/(?!<)[^\s]+:[^\s]+@|xkeysib-|sbp_[a-z0-9]{10}|ghp_[A-Za-z0-9]{20}|eyJ[A-Za-z0-9_-]{20,}\.)/;
const stripCode = (t) => t.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
const inbound = new Map([...names.keys()].map((k) => [k, 0]));

for (const f of notes) {
  const t = readFileSync(f, 'utf8');
  if (secrets.test(t)) fail(f, 'parece contener un secreto o URL de BD');
  const m = t.match(/^---\n([\s\S]*?)\n---/);
  if (!m) { fail(f, 'falta frontmatter'); continue; }
  const fm = m[1];
  for (const k of ['title', 'tipo', 'area', 'tags']) if (!new RegExp(`^${k}:`, 'm').test(fm)) fail(f, `falta "${k}"`);
  const area = (fm.match(/^area:\s*(\S+)/m) || [])[1];
  if (area && !new RegExp(`^tags:.*area/${area}`, 'm').test(fm)) fail(f, `tags debe incluir area/${area}`);
  const isRoot = basename(f) === 'Vaquita-Cerebro.md';
  const parent = (fm.match(/^parent:\s*"\[\[([^\]]+)\]\]"/m) || [])[1];
  if (!isRoot && !parent) fail(f, 'falta parent');
  if (parent && !names.has(parent)) fail(f, `parent inexistente [[${parent}]]`);
  const self = basename(f, '.md');
  for (const [, raw] of stripCode(t.replace(/^---\n[\s\S]*?\n---/, '')).matchAll(/\[\[([^\]]+)\]\]/g)) {
    const target = raw.split('|')[0].split('#')[0].trim();
    if (!target) continue;
    if (!names.has(target)) fail(f, `enlace roto [[${raw}]]`);
    else if (target !== self) inbound.set(target, inbound.get(target) + 1);
  }
}
for (const [n, c] of inbound) if (c === 0 && n !== 'Vaquita-Cerebro') fail(names.get(n), 'nota huérfana (nadie la enlaza)');
console.log(`${notes.length} notas revisadas, ${errors} problemas.`);
process.exit(errors ? 1 : 0);
