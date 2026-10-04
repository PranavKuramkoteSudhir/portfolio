// HTML templates. Every function returns a string.
// `ctx.root` is the relative path back to the site root ('./', '../', '../../'),
// so the site works on a custom domain, a GitHub Pages project path, or opened locally.
import { site, CATS, PROJECTS, REPOS, JOBS, SKILLS, EDUCATION, CERTS, STORY } from './content.mjs';

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Build a link to a site path. path '' = home, 'work/' = section, 'assets/x.css' = file.
export function href(ctx, path) {
  if (ctx.absolute) return '/' + path;
  if (path === '' || path.endsWith('/')) return ctx.root + path + (ctx.explicitIndex ? 'index.html' : '');
  return ctx.root + path;
}

const ARROW = '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2 7h10M8 3l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';
const CHEV = '<svg class="chev" viewBox="0 0 10 10" aria-hidden="true"><path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';
const CHEV_LG = '<svg width="12" height="12" viewBox="0 0 10 10" aria-hidden="true"><path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';
const ext = 'target="_blank" rel="noopener"';

const dot = (color, extra = '') => `<i class="dot" style="background:${color}${extra}"></i>`;
const catTag = (c) => `<span class="tag">${dot(CATS[c].color)}${CATS[c].label}</span>`;
const bySlug = Object.fromEntries(PROJECTS.map((p) => [p.slug, p]));

/* ---------------- layout ---------------- */
export function layout(ctx, { key, title, description, body, path }) {
  const full = title ? `${title} · ${site.name}` : `${site.name} · ${site.role}`;
  const desc = description || site.description;
  const canonical = site.url + '/' + (path || '');
  const nav = (k) => (key === k ? ' class="on" aria-current="page"' : '');
  const ddOn = (k) => (key === k || (k === 'work' && key === 'repos') ? ' on' : '');
  const tab = (k) => (key === k || (k === 'about' && key === 'experience') ? ' class="on" aria-current="page"' : '');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(full)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(full)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${site.url}/${site.photo.jpg}">
<meta name="twitter:card" content="summary">
<meta name="theme-color" content="#EEF1F1" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#111518" media="(prefers-color-scheme: dark)">
<link rel="icon" href="${href(ctx, 'assets/favicon.svg')}" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700&family=Figtree:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="${href(ctx, 'assets/css/site.css')}">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="top">
  <div class="wrap">
    <a class="name" href="${href(ctx, '')}">${esc(site.shortName)} <small>${esc(site.role)}</small></a>
    <nav class="links" aria-label="Primary">
      <a href="${href(ctx, '')}"${nav('home')}>Home</a>
      <div class="dd${ddOn('work')}">
        <button type="button" aria-expanded="false" aria-haspopup="true">Work ${CHEV}</button>
        <div class="menu">
          <span class="cap" style="display:block">Industry projects</span>
          ${PROJECTS.map((p) => `<a href="${href(ctx, `work/${p.slug}/`)}">${dot(CATS[p.cat].color)}<span><b>${esc(p.title)}</b><span class="t">${esc(p.where)}</span></span></a>`).join('\n          ')}
          <div class="sep"></div>
          <a href="${href(ctx, 'work/')}">${dot('var(--ink)')}<span><b>All industry projects</b></span></a>
          <a href="${href(ctx, 'repos/')}">${dot('transparent', ';box-shadow:inset 0 0 0 1.5px var(--ink)')}<span><b>GitHub repos</b><span class="t">Open-source work</span></span></a>
        </div>
      </div>
      <div class="dd${ddOn('about')}${key === 'experience' ? ' on' : ''}">
        <button type="button" aria-expanded="false" aria-haspopup="true">About ${CHEV}</button>
        <div class="menu">
          <a href="${href(ctx, 'about/')}">${dot('var(--c1)')}<span><b>Story</b><span class="t">Mechanical engineer to AI engineer, plus education</span></span></a>
          <a href="${href(ctx, 'experience/')}">${dot('var(--c2)')}<span><b>Experience</b><span class="t">Mercedes-Benz, Veeco, HCL, Quest Global</span></span></a>
          <a href="${href(ctx, 'about/')}#skills">${dot('var(--c3)')}<span><b>Skills</b><span class="t">Grouped by the kind of work</span></span></a>
        </div>
      </div>
      <a href="${href(ctx, 'contact/')}" class="hire${key === 'contact' ? ' on' : ''}">Get in touch</a>
    </nav>
  </div>
</header>

<main id="main" tabindex="-1">
${body}
</main>

<footer>
  <div class="wrap">
    <span>© <span data-year>2026</span> ${esc(site.name)}</span>
    <span class="foot-links"><a href="${site.links.github}" ${ext}>GitHub</a><a href="${site.links.linkedin}" ${ext}>LinkedIn</a><a href="${site.links.leetcode}" ${ext}>LeetCode</a><a href="${href(ctx, site.resume)}" ${ext}>Resume</a></span>
  </div>
</footer>

<nav class="tabbar" aria-label="Sections">
  <a href="${href(ctx, '')}"${tab('home')}><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 9l7-6 7 6v8H3z"/></svg>Home</a>
  <a href="${href(ctx, 'work/')}"${tab('work')}><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="6" width="14" height="11" rx="2"/><path d="M7 6V4h6v2"/></svg>Work</a>
  <a href="${href(ctx, 'repos/')}"${tab('repos')}><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M7 6l-4 4 4 4M13 6l4 4-4 4"/></svg>Repos</a>
  <a href="${href(ctx, 'about/')}"${tab('about')}><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="10" cy="7" r="3.2"/><path d="M3.5 17c1.2-3 3.6-4.5 6.5-4.5s5.3 1.5 6.5 4.5"/></svg>About</a>
  <a href="${href(ctx, 'contact/')}"${tab('contact')}><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="2.5" y="4.5" width="15" height="11" rx="2"/><path d="M3 5.5l7 5.5 7-5.5"/></svg>Contact</a>
</nav>

<script src="${href(ctx, 'assets/js/site.js')}" defer></script>
</body>
</html>
`;
}

/* ---------------- components ---------------- */
function motif(p) {
  return `<div class="dots-motif" style="color:${CATS[p.cat].color}" aria-hidden="true">${p.motif.map((v) => `<i style="height:${v * 2.6 + 4}px"></i>`).join('')}</div>`;
}
function card(ctx, p) {
  return `<a class="card" href="${href(ctx, `work/${p.slug}/`)}" data-cat="${p.cat}">
  <div class="meta">${catTag(p.cat)}<span class="where">${esc(p.where)}</span></div><span class="arrow">${ARROW}</span>
  ${motif(p)}<h3>${esc(p.title)}</h3><p>${esc(p.blurb)}</p>
  <div class="res"><b>${p.res[0]}</b><span>${esc(p.res[1])}</span></div>
</a>`;
}
function picture(ctx, cls = '', eager = false) {
  return `<picture><source srcset="${href(ctx, site.photo.webp)}" type="image/webp"><img src="${href(ctx, site.photo.jpg)}" alt="${esc(site.photo.alt)}" width="720" height="900"${eager ? ' fetchpriority="high"' : ' loading="lazy"'}${cls}></picture>`;
}
function repoCard(ctx, r, i) {
  const n = String(i + 1).padStart(2, '0');
  if (r.slot) {
    return `<div class="repo empty"><div class="rhead"><span class="slot">Repo slot ${n}</span></div><h3>Coming soon</h3><div class="idea"><b>Idea:</b> ${esc(r.idea)}. ${esc(r.why)}</div><div class="rfoot"><span>${dot('var(--faint)')}${esc(r.lang)}</span></div></div>`;
  }
  return `<article class="repo filled">
  ${r.img ? `<a class="thumb" href="${r.url}" ${ext} tabindex="-1" aria-hidden="true"><img src="${href(ctx, r.img)}" alt="" width="800" height="500" loading="lazy"></a>` : ''}
  <div class="rhead"><span class="slot">Repo ${n} · ${esc(r.name)}</span></div>
  <h3><a href="${r.url}" ${ext}>${esc(r.title)}</a></h3>
  <p>${esc(r.desc)}</p>
  <div class="topics">${(r.topics || []).map((t) => `<span>${esc(t)}</span>`).join('')}</div>
  <div class="rfoot"><span>${dot('var(--c1)')}${esc(r.lang)}</span><span class="ractions"><a href="${r.url}" ${ext}>Code ↗</a>${r.demo ? `<a href="${r.demo}" ${ext}>Live demo ↗</a>` : ''}</span></div>
</article>`;
}
function phead(ctx, crumbs, title, lede) {
  const c = crumbs.map(([label, path]) => (path !== undefined ? `<a href="${href(ctx, path)}">${label}</a>` : `<span>${label}</span>`)).join('<span>/</span>');
  return `<header class="phead"><div class="field" data-speed="0.22"></div><div class="wrap"><nav class="crumb" aria-label="Breadcrumb">${c}</nav><h1>${title}</h1>${lede ? `<p class="lede">${lede}</p>` : ''}</div></header>`;
}
function dots20(cls) { return `<div class="grid" aria-hidden="true">${cls.map((c) => `<i class="${c}"></i>`).join('')}</div>`; }
const fill = (n, fn) => Array.from({ length: n }, (_, i) => fn(i));

/* ---------------- pages ---------------- */
export function home(ctx) {
  return `<section class="hero" style="padding:0">
  <canvas id="field" aria-hidden="true"></canvas>
  <div class="wrap">
    <div class="copy">
      <span class="status">${dot('var(--c1)')}${esc(site.status)} · relocating</span>
      <h1>Data that keeps <em>the line</em> moving.</h1>
      <p class="lede">I’m ${esc(site.name.split(' ')[0])}, an AI engineer who builds RAG assistants, LLM agents and predictive models on real plant data, most recently at Mercedes-Benz and Veeco.</p>
      <div class="btns"><a class="btn solid" href="${href(ctx, 'work/')}">See the work ${ARROW}</a><a class="btn" href="${href(ctx, 'repos/')}">GitHub repos</a></div>
    </div>
    <div class="visual">
      <figure class="portrait" data-speed="-0.05">${picture(ctx, '', true)}</figure>
      <div class="nowcard" data-speed="0.06"><b>${esc(site.currently)}</b><span>${esc(site.location)} · ${esc(site.relocation.toLowerCase())}</span></div>
    </div>
  </div>
  <div class="note" aria-hidden="true"><span>${dot('var(--c3)')}Line-sensor readings</span><span>${dot('var(--hi)')}Flagged 6 h early</span></div>
</section>

<section><div class="wrap"><div class="impact">
  <div class="top-row"><h2>Four results, counted out.</h2><span class="cap">One dot = 5% unless noted</span></div>
  <div class="units">
    <div class="unit"><b>200+</b>${dots20(fill(20, () => 'on'))}<span class="key">1 dot = 10 people</span><p>Engineers and technicians using the plant assistant</p></div>
    <div class="unit"><b>85%</b>${dots20(fill(20, (i) => (i < 17 ? 'on' : '')))}<span class="key">17 of 20 accepted</span><p>Answer acceptance on the RAG assistant</p></div>
    <div class="unit"><b>−15%</b>${dots20(fill(20, (i) => (i < 3 ? 'off' : 'on')))}<span class="key">3 of 20 removed</span><p>Unplanned downtime on pilot lines</p></div>
    <div class="unit"><b>6 h</b>${dots20(fill(20, (i) => (i >= 14 ? 'hi' : '')))}<span class="key">1 dot = 1 hour</span><p>Earlier drift warning than static alarms</p></div>
  </div>
</div></div></section>

<section style="padding-top:8px"><div class="wrap">
  <div class="head"><div><span class="cap">Industry projects</span><h2>Selected work</h2></div><a class="more" href="${href(ctx, 'work/')}">All projects ${ARROW}</a></div>
  <div class="cards">${PROJECTS.slice(0, 4).map((p) => card(ctx, p)).join('\n')}</div>
</div></section>

<section style="padding-top:8px"><div class="wrap">
  <div class="head"><div><span class="cap">Open source</span><h2>On GitHub</h2></div><a class="more" href="${href(ctx, 'repos/')}">All repos ${ARROW}</a></div>
  <div class="repos">${REPOS.slice(0, 3).map((r, i) => repoCard(ctx, r, i)).join('\n')}</div>
</div></section>`;
}

export function work(ctx) {
  return `${phead(ctx, [['Home', ''], ['Work']], 'Industry <em>projects</em>', 'Systems built for real plants and clients. Each one opens to the problem, the build, how it works and what changed.')}
<section style="padding-top:0"><div class="wrap">
  <div class="head" style="margin-bottom:20px"><nav class="seg" aria-label="Work type"><a class="on" href="${href(ctx, 'work/')}" aria-current="page">Industry projects</a><a href="${href(ctx, 'repos/')}">GitHub repos</a></nav></div>
  <div class="filters" id="filters" role="group" aria-label="Filter by type"><button type="button" class="chip" aria-pressed="true" data-c="all">All</button>${Object.entries(CATS).map(([k, c]) => `<button type="button" class="chip" aria-pressed="false" data-c="${k}">${dot(c.color)}${c.label}</button>`).join('')}</div>
  <div class="cards" id="workCards">${PROJECTS.map((p) => card(ctx, p)).join('\n')}</div>
</div></section>`;
}

export function repos(ctx) {
  const filled = REPOS.filter((r) => !r.slot).length;
  return `${phead(ctx, [['Home', ''], ['Work', 'work/'], ['GitHub']], 'Open-source <em>repos</em>', `Public projects you can clone and run. ${filled} published, with more on the way.`)}
<section style="padding-top:0"><div class="wrap">
  <div class="head" style="margin-bottom:24px"><nav class="seg" aria-label="Work type"><a href="${href(ctx, 'work/')}">Industry projects</a><a class="on" href="${href(ctx, 'repos/')}" aria-current="page">GitHub repos</a></nav><a class="more" href="${site.links.github}" ${ext}>GitHub profile ↗</a></div>
  <div class="repos">${REPOS.map((r, i) => repoCard(ctx, r, i)).join('\n')}</div>
</div></section>`;
}

export function project(ctx, p) {
  const i = PROJECTS.indexOf(p);
  const pv = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length];
  const nx = PROJECTS[(i + 1) % PROJECTS.length];
  return `${phead(ctx, [['Home', ''], ['Work', 'work/'], [catTag(p.cat)]], esc(p.title), esc(p.blurb))}
<div class="wrap">
  <dl class="facts">
    <div class="fact"><dt class="cap">Where</dt><dd>${esc(p.where)}</dd></div>
    <div class="fact"><dt class="cap">When</dt><dd>${esc(p.when)}</dd></div>
    <div class="fact"><dt class="cap">Context</dt><dd>${esc(p.context)}</dd></div>
    <div class="fact"><dt class="cap">Type</dt><dd>${CATS[p.cat].label}</dd></div>
  </dl>
  <section style="padding-block:24px 40px"><div class="outbox">${p.out.map((o) => `<div><b>${o[0]}</b><span>${esc(o[1])}</span></div>`).join('')}</div></section>
  <div class="prose"><h2 class="cap">How it works</h2><ol class="line">${p.flow.map((f, k) => `<li class="${f[2] || ''}"><span class="st">${k + 1}</span><b>${esc(f[0])}</b><span>${esc(f[1])}</span></li>`).join('')}</ol></div>
  <div class="prose"><h2 class="cap">The problem</h2><p>${esc(p.problem)}</p></div>
  <div class="prose"><h2 class="cap">What I built</h2><ul>${p.built.map((b) => `<li>${esc(b)}</li>`).join('')}</ul></div>
  <div class="prose"><h2 class="cap">Stack</h2><div class="stack">${p.stack.map((s) => `<span>${esc(s)}</span>`).join('')}</div></div>
  <nav class="pager" aria-label="More projects"><a href="${href(ctx, `work/${pv.slug}/`)}"><span class="cap">← Previous</span><b>${esc(pv.title)}</b></a><a class="nx" href="${href(ctx, `work/${nx.slug}/`)}"><span class="cap">Next →</span><b>${esc(nx.title)}</b></a></nav>
</div>`;
}

export function experience(ctx) {
  return `${phead(ctx, [['Home', ''], ['About', 'about/'], ['Experience']], 'Six years, <em>four teams</em>', 'Open a role to see what I did there and the projects that came out of it.')}
<section style="padding-top:0"><div class="wrap"><div class="tl">
${JOBS.map((j) => `<details class="job${j.now ? ' now' : ''}"${j.now ? ' open' : ''}>
  <summary><div><h2 class="job-title">${esc(j.title)}</h2><div class="org">${esc(j.org)} · ${esc(j.place)}</div></div><span class="when">${esc(j.when)}</span><span class="tog">${CHEV_LG}</span></summary>
  <div class="body"><ul>${j.pts.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>${j.rel.length ? `<div class="rel"><span class="cap">Projects</span>${j.rel.map((s) => `<a href="${href(ctx, `work/${s}/`)}">${dot(CATS[bySlug[s].cat].color)}${esc(bySlug[s].title)}</a>`).join('')}</div>` : ''}</div>
</details>`).join('\n')}
</div></div></section>`;
}

export function about(ctx) {
  return `${phead(ctx, [['Home', ''], ['About']], 'Trained on machines, <em>working on their data</em>', '')}
<section style="padding-top:0"><div class="wrap"><div class="about">
  <div class="story">${STORY.map((p) => `<p>${esc(p)}</p>`).join('')}
    <div class="btns" style="margin-top:8px"><a class="btn solid" href="${href(ctx, site.resume)}" ${ext}>Resume (PDF) ↗</a><a class="btn" href="${href(ctx, 'experience/')}">Experience ${ARROW}</a></div>
  </div>
  <div class="side">
    <figure class="portrait about-photo">${picture(ctx)}</figure>
    <div class="box"><h2 class="cap">Education</h2>${EDUCATION.map(([a, b, y]) => `<div class="row"><div><b>${esc(a)}</b><span>${esc(b)}</span></div><time>${y}</time></div>`).join('')}</div>
    <div class="box"><h2 class="cap">Certifications</h2>${CERTS.map(([a, b, y]) => `<div class="row"><div><b>${esc(a)}</b><span>${esc(b)}</span></div><time>${y}</time></div>`).join('')}</div>
  </div>
</div></div></section>
<section id="skills" style="padding-top:0"><div class="wrap">
  <div class="head"><div><span class="cap">Toolkit</span><h2>Skills</h2></div></div>
  <div class="skills">${SKILLS.map(([name, cat, list]) => `<div class="skill"><h3>${dot(CATS[cat].color)}${esc(name)}</h3><ul>${list.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>`).join('')}</div>
</div></section>`;
}

export function contact(ctx) {
  return `${phead(ctx, [['Home', ''], ['Contact']], 'Let’s <em>talk</em>', 'Open to AI engineering, ML engineering and data-platform roles in manufacturing and industrial AI. Happy to relocate.')}
<div class="wrap contact">
  <div class="ways">
    <div class="way"><span class="cap">Email</span><a class="v" id="em" href="mailto:${site.email}">${site.email}</a><button type="button" id="copy" data-copy="${site.email}">Copy</button></div>
    <div class="way"><span class="cap">LinkedIn</span><span class="v">pranav-kuramkote-sudhir</span><a class="go" href="${site.links.linkedin}" ${ext}>Open ↗</a></div>
    <div class="way"><span class="cap">GitHub</span><span class="v">PranavKuramkoteSudhir</span><a class="go" href="${site.links.github}" ${ext}>Open ↗</a></div>
    <div class="way"><span class="cap">LeetCode</span><span class="v">PranavKuramkoteSudhir</span><a class="go" href="${site.links.leetcode}" ${ext}>Open ↗</a></div>
    <div class="way"><span class="cap">Resume</span><span class="v">PDF</span><a class="go" href="${href(ctx, site.resume)}" ${ext}>Open ↗</a></div>
  </div>
  <div class="impact" style="gap:16px">
    <span class="cap">Based in</span>
    <h2>${esc(site.location)}</h2>
    <p style="color:var(--on-deep-muted)">${esc(site.relocation)} across the US for the right team.</p>
  </div>
</div>`;
}

export function notFound(ctx) {
  return `${phead(ctx, [['Home', '']], 'Page <em>not found</em>', 'That page doesn’t exist, or it moved when this site was rebuilt.')}
<section style="padding-top:0"><div class="wrap"><div class="btns"><a class="btn solid" href="${href(ctx, '')}">Go home ${ARROW}</a><a class="btn" href="${href(ctx, 'work/')}">See the work</a></div></div></section>`;
}
