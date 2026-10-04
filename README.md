# Pranav Kuramkote Sudhir · Portfolio

Personal portfolio site: **[www.pranavkuramkotesudhir.com](https://www.pranavkuramkotesudhir.com/)**

A multi-page static site with industry case studies, a GitHub repo showcase, an experience timeline, and a parallax sensor-chart hero. Every page is generated from one content file by a small Node script with **zero dependencies**, then served by GitHub Pages.

## Pages

| Path | What's there |
| --- | --- |
| `/` | Intro, results counted out in dots, selected work, GitHub preview |
| `/work/` | Industry projects with type filters |
| `/work/<project>/` | Case study: results, how it works, problem, build, stack |
| `/repos/` | GitHub repos, plus open slots for upcoming ones |
| `/experience/` | Timeline; each role links to its projects |
| `/about/` | Story, education, certifications, skills |
| `/contact/` | Email, LinkedIn, GitHub, LeetCode, resume |

## Editing content

All text lives in **`src/content.mjs`**: site details, projects, repos, jobs, skills, education and certifications.

```bash
# 1. edit src/content.mjs
npm run build     # regenerate the HTML pages
npm run check     # check links, images, titles and alt text
npm run serve     # preview at http://localhost:8000
# 2. commit everything, including the regenerated pages
```

Node 18 or newer is all you need. There's nothing to install.

**Add a GitHub repo:** in `REPOS`, replace a `{ slot: true, ... }` entry with:

```js
{ name: 'repo-name', title: 'Readable title', lang: 'Python',
  desc: 'One or two sentences on what it does.',
  topics: ['rag', 'pyspark'],
  url: 'https://github.com/PranavKuramkoteSudhir/repo-name',
  demo: 'https://optional-live-demo.example',   // optional
  img: 'assets/img/your-image.webp' }           // optional, 800×500 works well
```

**Add an industry project:** add an object to `PROJECTS` with a new `slug`. Its page appears at `/work/<slug>/` and in the Work menu automatically.

**Update the resume:** replace `assets/PranavKuramkoteSudhir.pdf` (or change `site.resume`).

## Project structure

```
src/content.mjs          ← all site content (edit this)
src/templates.mjs        ← HTML for each page and component
scripts/build.mjs        ← renders pages, 404, sitemap.xml, robots.txt
scripts/check.mjs        ← link / asset / accessibility checks used by CI
assets/css/site.css      ← design tokens (light + dark) and styles
assets/js/site.js        ← menus, filters, parallax, hero chart
assets/img/              ← photo and repo images
index.html, work/, …     ← generated pages (committed, served by Pages)
.github/workflows/       ← CI and deploy
CNAME                    ← custom domain
```

## CI/CD

- **`ci.yml`** runs on every push and pull request. It rebuilds the pages, fails if the committed output is out of date, and runs the link and asset checks.
- **`deploy.yml`** runs on pushes to `main`. When **Settings → Pages → Source** is set to **GitHub Actions**, it builds into `_site/` and deploys to GitHub Pages. When the source is **Deploy from a branch**, it skips itself and Pages serves the committed pages from `main` directly, so the site works with either setting.

The custom domain is kept in `CNAME`. If you switch the Pages source to GitHub Actions, confirm the domain is still set under Settings → Pages → Custom domain.

## Design

Mineral palette (cool mist ground, indigo, verdigris, plum and slate, with one ochre highlight), Bricolage Grotesque and Figtree type, and light and dark themes that follow the visitor's system setting. Parallax and animation switch off when the visitor has reduced motion turned on.
