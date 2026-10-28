// Revisa frontmatter obligatorio y que cada [[wikilink]] apunte a una nota existente.
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
const names = new Set(files.map((f) => basename(f, '.md')));
let errors = 0;
const fail = (f, m) => { console.error(`${f.replace(root, '')}: ${m}`); errors++; };
const secrets = /(postgres(ql)?:\/\/[^\s]+:[^\s]+@|xkeysib-|sbp_[a-z0-9]{10}|eyJ[A-Za-z0-9_-]{20,}\.)/;

for (const f of files) {
  const t = readFileSync(f, 'utf8');
  const inTemplates = f.includes('90-Plantillas');
  if (secrets.test(t)) fail(f, 'parece contener un secreto o URL de BD');
  if (basename(f) === 'README.md' || basename(f) === 'CLAUDE.md') continue;
  const m = t.match(/^---\n([\s\S]*?)\n---/);
  if (!m) { fail(f, 'falta frontmatter'); continue; }
  for (const k of ['title', 'type', 'tags']) if (!new RegExp(`^${k}:`, 'm').test(m[1])) fail(f, `falta "${k}" en el frontmatter`);
  if (inTemplates) continue;
  for (const [, raw] of t.replace(/`[^`]*`/g, "").matchAll(/\[\[([^\]]+)\]\]/g)) {
    const target = raw.split('|')[0].split('#')[0].trim();
    if (target && !names.has(target)) fail(f, `enlace roto [[${raw}]]`);
  }
}
console.log(`${files.length} notas revisadas, ${errors} problemas.`);
process.exit(errors ? 1 : 0);
