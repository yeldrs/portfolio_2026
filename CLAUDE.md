# CLAUDE.md

This file gives Claude Code the operating context for `portfolio_2026` (yeldrs/portfolio_2026). Read this before making any change.

## What this project is

Static Astro 5 portfolio for a UX/Product Designer. Zero server, zero database, zero runtime logic — everything is pre-rendered at build time (`output: 'static'`, `build.format: 'file'`). Deployed via GitHub Actions to GitHub Pages on every push to `main`. Domain/email via Hostinger (registrar + MX only — Hostinger does **not** host the site).

Three published case studies (900.care, Caisse des Dépôts, Batchcooking) plus one draft (biomimicry, `isDraft: true`).

All code, comments, and UI strings are in English. The user works Figma (design source of truth) → VS Code → GitHub. Figma files are the primary reference for any visual change — never invent visual details Figma doesn't specify; flag when a Figma value has no token equivalent yet.

## Source of truth documents — read before changing anything

- `Whitepaper d'architecture — Portfolio Yassine El Idrissi.txt` — full architecture reference (stack, routing, Content Collections mechanism, design-token chain, known fragility points in §7). Describes target/stable architecture, not history.
- `MAINTENANCE_LOG.md` — running log of what's fixed vs. deliberately deferred. Check this before re-flagging something as "new" debt.
- `src/content/config.ts` — the Zod schema, i.e. the actual contract for any content change.
- `src/styles/tokens.js` — single source of truth for the design system.

If a request touches something these documents don't cover, say so explicitly rather than inventing a convention.

## Stack

| Layer | Tech | Role |
|---|---|---|
| Framework | Astro ^5.14.3 | Static generation, routing, components |
| Content | Content Collections (MDX), @astrojs/mdx ^4.3.8 | Case studies are typed Markdown files |
| Styles | Tailwind CSS ^3.4.18 | Utility classes driven by design tokens |
| Design tokens | `src/styles/tokens.js` (custom JS) | Source of truth for color/spacing/type |
| Build CSS | PostCSS + autoprefixer | Tailwind compilation chain |
| Typing | TypeScript strict (`astro/tsconfigs/strict`) | Content schema validation |

## Architecture map

```
portfolio_2026/
├── astro.config.mjs         → build config, redirects (ONLY source of redirects), integrations
├── tailwind.config.mjs      → colors: { ...tokens.semantic.colors } — CORE of the design system, never duplicate
├── postcss.config.mjs       → CSS chain (do not touch)
├── tsconfig.json            → TypeScript strict
│
├── public/                  → served as-is, no transform
│   ├── images/               → all project images (.webp)
│   ├── documents/            → downloadable CV PDF
│   ├── fonts/                → self-hosted fonts (.woff2 variable, latin subset)
│   ├── CNAME                 → custom domain for GitHub Pages
│   └── robots.txt, manifest.json, favicons
│       (sitemap: generated at build by @astrojs/sitemap → dist/sitemap-index.xml — no manual file)
│
├── src/
│   ├── pages/                → ROUTING (1 file = 1 route)
│   │   ├── index.astro        → homepage (Hero + project list)
│   │   ├── about.astro
│   │   ├── 404.astro
│   │   └── work/[slug].astro  → dynamic template, 1 page per project (via getStaticPaths)
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro   → <head>, SEO (JSON-LD/OG/canonical), fonts, favicons, Navbar+Footer
│   │
│   ├── components/            → 11 .astro components — check whitepaper §3.1 for the import map
│   │                             before modifying shared ones (Container, Button, ArrowButton especially)
│   │
│   ├── content/
│   │   ├── config.ts          → Zod schema — THE contract for project frontmatter
│   │   └── projects/          → 1 .md per case study (900care.md is the most complete template)
│   │
│   └── styles/
│       ├── tokens.js          → primitives + semantic layer, single source of truth
│       └── global.css         → global styles + component classes (.btn, .btn-outline, .h-display)
```

## The core mechanism: Content Collections + getStaticPaths

```
.md file → validated by src/content/config.ts (Zod) → read by getStaticPaths() in work/[slug].astro → HTML page
```

If a `.md` file doesn't satisfy the schema, the build fails — that's intentional, it's the only guardrail against publishing a malformed project. `semanticSlug` becomes the URL segment.

## Design token chain

```
tokens.js (primitives + semantic) → tailwind.config.mjs (colors: { ...tokens.semantic.colors }) → components (Tailwind classes)
```

**Golden rule: edit tokens, never hardcode a color/spacing/radius value in a component.** `tailwind.config.mjs` must never re-declare or duplicate the color mapping — it stays a spread of `tokens.semantic.colors`.

## The `projectImages` index convention

Positions are semantic, not sequential — never reorder or compact this array:

- `0`/`1` = context
- `2`/`3` = role
- `4`/`5` = conception
- `6`/`7` = results
- `8+` = carousel

Empty slots are `""` and must be preserved, not removed.

## Content schema (src/content/config.ts) — required fields

`semanticSlug` (kebab-case, regex-enforced), `title`, `client`, `role`, `roleDescription`, `context`, `problem`, `keyInsights` (string or array), `methodology`, `delivery`, `metrics` (string or array), `cardImage`, `publishDate`. `isDraft` defaults to `false`.

Optional: `description`, `designConception` (`paragraph`, `listItems`), `projectImages`, `clientDetails`, `teamMembers`, `references`.

## Hard rules — never do these

- Never hardcode a color, spacing, or radius value in a component — always route through `tokens.js`.
- Never duplicate the color mapping in `tailwind.config.mjs` — it must stay `colors: { ...tokens.semantic.colors }`.
- Never silently reorder or compact `projectImages` — index positions are semantic; preserve empty `""` slots.
- Never reintroduce resolved debt: duplicate redirect sources (`.htaccess` is gone, `astro.config.mjs` is the only source), a manual sitemap, a Google Fonts dependency, or `deploy/test` as the prod branch (prod is `main`).
- Never propose SSR, a database, or a runtime backend — the site is contractually 100% static.
- Content (titles, metrics, case-study copy) belongs to the user — never invent or embellish it.

If a request would break one of the above: stop, name the specific convention it violates (cite the whitepaper section if relevant), and propose the compliant alternative before writing code.

## Known, tracked debt (do not re-flag as new — see MAINTENANCE_LOG.md for full detail)

- Deployment ambiguity: `.htaccess`/`CNAME` (Apache-style) historically coexisted with GitHub Pages `deploy.yml`. GitHub Pages is the actual host; astro.config.mjs is the only redirect source now.
- `repomix.config.json`'s `ignore.customPatterns` excludes `"Whitepaper*.txt"` (capitalized), but the real file is `whitepaper.txt` (lowercase) — the pattern doesn't match, so the whitepaper is still embedded in full in `repomix-output.xml`. Regenerate after fixing the pattern casing.
- `biomimicry.md`'s `projectImages` reference `/images/biomimicry/*` paths that don't exist on disk yet — do not flip `isDraft` to `false` until the images are provided.

## Workflow expectations

1. Identify the layer before touching code: content (`.md` frontmatter), design (`tokens.js`), component logic (`.astro`), or config (build/deploy). Don't blur layers in one change.
2. Content changes: validate mentally against the Zod schema first — required fields, kebab-case slug, `projectImages` index positions.
3. Design changes: touch `tokens.js` only.
4. Component/logic changes: check what else imports a shared component before modifying it.
5. Ambiguous or missing info, especially anything touching `astro.config.mjs` redirects, the deploy workflow, or the schema: ask one targeted question rather than guessing.
6. After any change: state what to verify (`npm run build` passes, which route/page is affected, visual check needed or not).

## Output conventions

- Full-file blocks for complete files or extended sections, ready to paste, no placeholder comments.
- Minimal comments — only where logic is genuinely non-obvious (index mapping, workarounds).
- File identification: `.astro` files → comment after the second `---` of frontmatter; other files (`.js`, `.ts`, `.css`, `.cjs`) → first line.
- No invisible/non-breaking characters, no decorative comments.