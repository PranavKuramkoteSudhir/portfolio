// Static site build: renders every page from src/content.mjs into plain HTML files.
// No dependencies. Usage:
//   node scripts/build.mjs                  -> writes the site into the repo root (what GitHub Pages serves)
//   node scripts/build.mjs --out=_site      -> writes a deployable copy into _site/ (used by the deploy workflow)
//   node scripts/build.mjs --explicit-index -> links point at .../index.html (for opening files directly)
import { mkdirSync, writeFileSync, cpSync, rmSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, PROJECTS } from '../src/content.mjs';
import * as T from '../src/templates.mjs';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = Object.fromEntries(process.argv.slice(2).map((a) => { const [k, v] = a.replace(/^--/, '').split('='); return [k, v ?? true]; }));
const outDir = args.out ? resolve(repo, args.out) : repo;
const explicitIndex = Boolean(args['explicit-index']);

const pages = [
  { path: '', key: 'home', render: T.home },
  { path: 'work/', key: 'work', title: 'Work', render: T.work },
  { path: 'repos/', key: 'repos', title: 'GitHub repos', render: T.repos },
  { path: 'experience/', key: 'experience', title: 'Experience', render: T.experience },
  { path: 'about/', key: 'about', title: 'About', render: T.about },
  { path: 'contact/', key: 'contact', title: 'Contact', render: T.contact },
  ...PROJECTS.map((p) => ({ path: `work/${p.slug}/`, key: 'work', title: p.title, description: p.blurb, render: (ctx) => T.project(ctx, p) })),
];

// Generated folders (cleaned before each build so removed projects don't linger)
const generatedDirs = ['work', 'repos', 'experience', 'about', 'contact'];
if (outDir !== repo) rmSync(outDir, { recursive: true, force: true });
for (const d of generatedDirs) rmSync(join(outDir, d), { recursive: true, force: true });

let count = 0;
for (const pg of pages) {
  const depth = pg.path.split('/').filter(Boolean).length;
  const ctx = { root: depth ? '../'.repeat(depth) : './', explicitIndex };
  const html = T.layout(ctx, { key: pg.key, title: pg.title, description: pg.description, path: pg.path, body: pg.render(ctx) });
  const file = join(outDir, pg.path, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  count++;
}

// 404 page uses root-absolute links because it can be served at any depth.
writeFileSync(join(outDir, '404.html'), T.layout({ absolute: true }, { key: '', title: 'Not found', path: '404.html', body: T.notFound({ absolute: true }) }));

// sitemap + robots
writeFileSync(join(outDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${site.url}/${p.path}</loc></url>`).join('\n')}
</urlset>
`);
writeFileSync(join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`);

// When building into a separate folder, copy static files alongside.
if (outDir !== repo) {
  for (const f of ['assets', 'CNAME', '.nojekyll']) if (existsSync(join(repo, f))) cpSync(join(repo, f), join(outDir, f), { recursive: true });
}

console.log(`Built ${count} pages + 404 into ${outDir === repo ? 'repo root' : outDir}${explicitIndex ? ' (explicit index links)' : ''}`);
