# CLAUDE.md

This file gives Claude Code the operating context for `portfolio_2026` (yeldrs/portfolio_2026). Read this before making any change.

## What this project is

Static Astro 5 portfolio for a UX/Product Designer. Zero server, zero database, zero runtime logic — everything is pre-rendered at build time (`output: 'static'`, `build.format: 'file'`). Deployed via GitHub Actions to GitHub Pages on every push to `main`. Domain/email via Hostinger (registrar + MX only — Hostinger does **not** host the site).

**Bilingual site (EN/FR).** English lives at the root, unprefixed (`/work/900care`); French lives under `/fr/` (`/fr/work/900care`). See "i18n architecture" below before touching routing, content, or UI strings.

Three published case studies (900.care, Caisse des Dépôts, Batchcooking) plus one draft (biomimicry, `isDraft: true`), each in both languages.

All code and comments are in English. UI strings live in `src/i18n/ui.ts` (en/fr) — never hardcode a user-facing string directly in a component. The user works Figma (design source of truth) → VS Code → GitHub. Figma files are the primary reference for any visual change — never invent visual details Figma doesn't specify; flag when a Figma value has no token equivalent yet.

## Source of truth documents — read before changing anything

- `Whitepaper d'architecture — Portfolio Yassine El Idrissi.txt` — full architecture reference (stack, routing, Content Collections mechanism, design-token chain, known fragility points in §7). Describes target/stable architecture, not history.
- `MAINTENANCE_LOG.md` — running log of what's fixed vs. deliberately deferred. Read it once near the start of a session (before proposing work), not on every message — check it before re-flagging something as "new" debt.
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
├── astro.config.mjs         → build config, i18n routing (defaultLocale en, prefixDefaultLocale false),
│                               redirects (ONLY source of redirects, mirrored for /fr/*), integrations
├── tailwind.config.mjs      → colors: { ...tokens.semantic.colors } — CORE of the design system, never duplicate
├── postcss.config.mjs       → CSS chain (do not touch)
├── tsconfig.json            → TypeScript strict
│
├── public/                  → served as-is, no transform
│   ├── images/               → all project images (.webp) — shared across locales, see image convention below
│   ├── documents/            → downloadable CV PDFs (EN + FR filenames)
│   ├── fonts/                → self-hosted fonts (.woff2 variable, latin subset)
│   ├── CNAME                 → custom domain for GitHub Pages
│   ├── llms.txt               → mentions the bilingual structure, keep in sync if routes change
│   └── robots.txt, manifest.json, favicons (single global files, not localized — see Hard rules)
│       (sitemap: generated at build by @astrojs/sitemap → dist/sitemap-index.xml, with hreflang — no manual file)
│
├── src/
│   ├── pages/                → ROUTING ONLY — every file here should be thin (a getStaticPaths + a
│   │   │                        <Layout lang="…" /> render), never markup logic. That lives in layouts/.
│   │   ├── index.astro, about.astro, 404.astro     → English (default locale, unprefixed)
│   │   ├── work/[slug].astro                        → EN case studies (filters collection by `en/` slug prefix)
│   │   └── fr/index.astro, fr/about.astro,
│   │       fr/work/[slug].astro                     → French mirrors (filters by `fr/` prefix)
│   │
│   ├── layouts/              → actual page composition (the opposite of pages/ — this is where markup lives)
│   │   ├── BaseLayout.astro   → <head>, SEO (JSON-LD/OG/canonical/hreflang), fonts, favicons, Navbar+Footer
│   │   ├── HomeLayout.astro   → homepage body, takes `lang` prop
│   │   ├── AboutLayout.astro  → about/CV page body, takes `lang` prop
│   │   └── ProjectLayout.astro → case-study template, takes `project` + `lang` props
│   │
│   ├── components/            → reusable UI atoms (Container, Button, ArrowButton, Navbar, Footer,
│   │                             ProjectCard, ProjectCarousel, etc.) — check what else imports a shared
│   │                             one before modifying it
│   │
│   ├── i18n/
│   │   ├── ui.ts              → EN/FR UI string dictionary — every hardcoded label goes here, not inline
│   │   └── utils.ts           → useTranslations(), getLocalizedPath(), cleanPathname(), plainText()
│   │
│   ├── data/                  → home/about page content as typed TS (not a content collection — deliberate,
│   │   │                        see below), one file per locale
│   │   ├── home.en.ts / home.fr.ts, home.types.ts
│   │   └── about.en.ts / about.fr.ts, about.types.ts
│   │
│   ├── content/
│   │   ├── config.ts          → Zod schema — THE contract for project frontmatter
│   │   ├── resolveImages.ts   → makes cardImage/projectImages inherit from the en/ entry (see convention below)
│   │   └── projects/
│   │       ├── en/            → 1 .md per case study, EN — THE source of truth for images (900care.md is
│   │       │                    the most complete template)
│   │       └── fr/            → matching .md per case study, same semanticSlug, FR copy only — never
│   │                            declare cardImage/projectImages here (see convention below)
│   │
│   └── styles/
│       ├── tokens.js          → primitives + semantic layer, single source of truth
│       └── global.css         → global styles + component classes (.btn, .btn-outline, .h-display)
```

## i18n architecture

- **Routing**: Astro's native `i18n` config (`astro.config.mjs`) — `defaultLocale: 'en'`, `locales: ['en','fr']`, `prefixDefaultLocale: false`. This is why `src/pages/` needs a real file per locale (`work/[slug].astro` + `fr/work/[slug].astro`) instead of one dynamic `[locale]` route — Astro has no built-in way to share one route file while leaving the default locale unprefixed.
- **UI strings**: `src/i18n/ui.ts` (dictionary) + `useTranslations(lang)` from `src/i18n/utils.ts`. Adding a new UI-facing string means adding a key to both the `en` and `fr` objects in `ui.ts`.
- **Case-study content**: `src/content/projects/{en,fr}/*.md`, same `semanticSlug` in both, validated by the same Zod schema (`config.ts`). A project without a `fr/*.md` file simply doesn't generate an `/fr/work/...` page yet — not a bug.
- **Home/about content**: plain typed TS in `src/data/` (not a Content Collection) — deliberate choice, this content changes rarely and the existing `*.types.ts` interfaces already give the same safety a Zod schema would, without the added complexity of a nested-array schema.
- **Adding a project**: drop a `.md` in `content/projects/en/` (images + copy). Add the `fr/` counterpart when the translation is ready — same `semanticSlug`, no image fields (see convention below). Zero route files to touch either way.

## The core mechanism: Content Collections + getStaticPaths

```
.md file → validated by src/content/config.ts (Zod) → read by getStaticPaths() in work/[slug].astro
  (or fr/work/[slug].astro) → images resolved via resolveImages.ts → HTML page
```

If a `.md` file doesn't satisfy the schema, the build fails — that's intentional, it's the only guardrail against publishing a malformed project. `semanticSlug` becomes the URL segment (identical across locales).

## Image convention — single source of truth in en/

`cardImage` and `projectImages` are declared **once**, in the `en/*.md` entry, and are optional in the Zod schema so `fr/*.md` entries can omit them entirely. `src/content/resolveImages.ts` fills them in for any entry missing them by looking up the sibling `en/` entry with the same `semanticSlug`, at build time, in both `HomeLayout.astro` and `fr/work/[slug].astro`. **Never re-add `cardImage`/`projectImages` to a `fr/*.md` file** — editing an image means editing the `en/` file only, and every locale picks it up automatically.

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

Empty slots are `""` and must be preserved, not removed. Declared once in `en/*.md` only — see "Image convention" above.

## Content schema (src/content/config.ts) — required fields

`semanticSlug` (kebab-case, regex-enforced), `title`, `client`, `role`, `publishDate`. `isDraft` defaults to `false`.

Optional: `description`, `roleDescription`, `context`, `problem`, `keyInsights`, `methodology`, `delivery`, `metrics` (each string or array — see "Section fields" below), `designConception` (`paragraph`, `listItems`), `cardImage`, `projectImages`, `clientDetails`, `teamMembers`, `references`. `cardImage`/`projectImages` are optional in the schema specifically so `fr/*.md` can omit them (see image convention) — an `en/*.md` entry should still always provide them in practice.

### Section fields (context, problem, roleDescription, keyInsights, methodology, designConception, delivery, metrics)

Each is optional and accepts a plain string or a `string[]` (rendered as a bulleted list) — `ProjectLayout.astro` computes a `has*` boolean per field (`hasContext`, `hasProblem`, etc.) and hides that section's heading + body entirely when the field is missing or empty (empty string, empty array, or an array of only blank strings). Omitting a field in a `.md` file is enough to hide its section on the case-study page — no other change needed.

## Hard rules — never do these

- Never hardcode a color, spacing, or radius value in a component — always route through `tokens.js`.
- Never duplicate the color mapping in `tailwind.config.mjs` — it must stay `colors: { ...tokens.semantic.colors }`.
- Never silently reorder or compact `projectImages` — index positions are semantic; preserve empty `""` slots.
- Never declare `cardImage`/`projectImages` in a `fr/*.md` (or any non-`en/`) project file — they inherit from `en/` via `resolveImages.ts`. Adding them back reintroduces the exact duplication this convention removes.
- Never hardcode a user-facing string in a component — add a key to both locales in `src/i18n/ui.ts` and read it via `useTranslations()`.
- Never reintroduce resolved debt: duplicate redirect sources (`.htaccess` is gone, `astro.config.mjs` is the only source), a manual sitemap, a Google Fonts dependency, or `deploy/test` as the prod branch (prod is `main`).
- Never propose SSR, a database, or a runtime backend — the site is contractually 100% static.
- Content (titles, metrics, case-study copy, CV/about copy) belongs to the user — never invent or embellish it. A faithful, clearly-flagged translation of copy the user already wrote (e.g. EN → FR) is acceptable when asked; inventing new claims or phrasing is not.
- Never edit the actual wording/copy ("rédaction") of any content the user owns — project case studies (`src/content/projects/**`), CV/about (`src/data/about.*.ts`), homepage (`src/data/home.*.ts`), or any other user-authored text — without the user's explicit request or validation for that specific edit. This applies even when the edit looks like an improvement, a typo fix, or a natural side-effect of a structural/schema change: touching schema, layout, or rendering logic around a field (e.g. adding list support) must never itself alter the field's existing wording. Flag any wording that seems to need a fix and wait for confirmation instead of changing it.
- Never credit Claude/an AI assistant as co-author or contributor anywhere — not in git commits, not in PR descriptions, not on the site itself. `.claude/settings.json` sets `attribution.commit`/`attribution.pr` to `""` to enforce this at the tool level; don't override it locally or re-add a "Co-Authored-By" / "Generated with Claude Code" trailer by hand.

If a request would break one of the above: stop, name the specific convention it violates (cite the whitepaper section if relevant), and propose the compliant alternative before writing code.

## Known, tracked debt (do not re-flag as new — see MAINTENANCE_LOG.md for full detail)

- Deployment ambiguity: `.htaccess`/`CNAME` (Apache-style) historically coexisted with GitHub Pages `deploy.yml`. GitHub Pages is the actual host; astro.config.mjs is the only redirect source now.
- `repomix.config.json`'s `ignore.customPatterns` excludes `"Whitepaper*.txt"` (capitalized), but the real file is `whitepaper.txt` (lowercase) — the pattern doesn't match, so the whitepaper is still embedded in full in `repomix-output.xml`. Regenerate after fixing the pattern casing.
- `biomimicry.md`'s `projectImages` (in `en/`) reference `/images/biomimicry/*` paths that don't exist on disk yet — do not flip `isDraft` to `false` until the images are provided.
- `src/data/home.fr.ts` (hero title/subtitle) still holds `[FR TODO]` placeholders — the owner will supply the real copy.
- `about.en.ts` and `about.fr.ts` are intentionally out of sync in richness (owner decision): `about.fr.ts` was rebuilt from an updated CV (new role, restructured skills, Languages section); `about.en.ts` was deliberately left as the older, simpler version. Don't "fix" this asymmetry without asking — it's a known, chosen state, not drift.
- FR CV PDF: `about.fr.ts`'s download link points to `/documents/Resume_UXDESIGNEROPS_EL_IDRISSI_YASSINE_FR.pdf`, which doesn't exist yet — 404 until the owner adds it.

## Workflow expectations

1. Identify the layer before touching code: content (`.md` frontmatter or `src/data/`), UI strings (`src/i18n/ui.ts`), design (`tokens.js`), component/layout logic (`.astro`), or config (build/deploy). Don't blur layers in one change.
2. Content changes: validate mentally against the Zod schema first — required fields, kebab-case slug, `projectImages` index positions, and (for `fr/*.md`) that `cardImage`/`projectImages` are absent, not re-declared.
3. Design changes: touch `tokens.js` only.
4. Component/logic changes: check what else imports a shared component before modifying it.
5. Ambiguous or missing info, especially anything touching `astro.config.mjs` redirects, the deploy workflow, or the schema: ask one targeted question rather than guessing.
6. After any change: state what to verify (`npm run build` passes, which route/page is affected, visual check needed or not).
7. After a major change (new feature, architecture change, multi-file refactor, dependency or config change) — append a dated entry to `MAINTENANCE_LOG.md`, following its existing `[date] — file/area — action — reason — status` format, under a `### FAIT` (or `### DETTE / À SURVEILLER` for deferred items) heading for the session. Skip this for trivial edits (typo fixes, single-line tweaks, comment-only changes).

## Output conventions

- Full-file blocks for complete files or extended sections, ready to paste, no placeholder comments.
- Minimal comments — only where logic is genuinely non-obvious (index mapping, workarounds).
- File identification: `.astro` files → comment after the second `---` of frontmatter; other files (`.js`, `.ts`, `.css`, `.cjs`) → first line.
- No invisible/non-breaking characters, no decorative comments.