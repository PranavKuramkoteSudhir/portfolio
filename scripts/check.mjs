// Site checks used by CI. No dependencies.
// 1. Every local href/src in every generated page points at a file that exists.
// 2. Every page has a <title>, a meta description, and exactly one <h1>.
// 3. Every <img> has an alt attribute.
// Usage: node scripts/check.mjs [dir]   (defaults to the repo root)
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const root = resolve(repo, process.argv[2] || '.');
const skip = new Set(['node_modules', '.git', '.github', 'src', 'scripts', '_site']);

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    if (skip.has(name) && dir === root) return [];
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return htmlFiles(p);
    return p.endsWith('.html') ? [p] : [];
  });
}

const errors = [];
const files = htmlFiles(root);
for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const rel = relative(root, file);
  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${rel}: missing <title>`);
  if (!/<meta name="description" content="[^"]+"/.test(html)) errors.push(`${rel}: missing meta description`);
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) errors.push(`${rel}: expected 1 <h1>, found ${h1}`);
  for (const m of html.matchAll(/<img\b[^>]*>/g)) if (!/\balt=/.test(m[0])) errors.push(`${rel}: <img> without alt`);

  for (const m of html.matchAll(/\b(?:href|src|srcset)="([^"]+)"/g)) {
    let url = m[1].split(' ')[0];
    if (/^(https?:|mailto:|tel:|#|data:)/.test(url)) continue;
    url = url.split('#')[0].split('?')[0];
    if (!url) continue;
    let target = url.startsWith('/') ? join(root, url) : resolve(dirname(file), url);
    if (url.endsWith('/')) target = join(target, 'index.html');
    if (!existsSync(target)) errors.push(`${rel}: broken link -> ${m[1]}`);
  }
}

if (errors.length) {
  console.error(`✗ ${errors.length} problem(s) in ${files.length} pages:\n` + errors.map((e) => '  - ' + e).join('\n'));
  process.exit(1);
}
console.log(`✓ ${files.length} pages checked: links, assets, titles, descriptions, headings and alt text are OK`);
