// Generates the portfolio_2026 design-system bundle from src/styles/tokens.js.
// Usage: node build-ds.mjs <repoRoot> <outDir>
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const [repo, out] = process.argv.slice(2);
const { tokens } = await import(pathToFileURL(path.join(repo, "src/styles/tokens.js")).href);
const P = tokens.primitives;
const S = tokens.semantic;

const w = (rel, data) => {
  const f = path.join(out, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, data);
};
const cp = (from, to) => {
  const f = path.join(out, to);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.copyFileSync(path.join(repo, from), f);
};

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

// ---- assets
for (const f of ["lora-italic-latin-var.woff2", "lora-latin-var.woff2", "manrope-latin-var.woff2"])
  cp(`public/fonts/${f}`, `fonts/${f}`);
for (const f of ["coverProject-900care.webp", "coverProject-batchcooking.webp", "coverProject-cdc.webp"])
  cp(`public/images/${f}`, `assets/images/${f}`);
cp("public/favicon.svg", "assets/favicon.svg");

// ---- colors_and_type.css
const flat = (obj, prefix) =>
  Object.entries(obj).flatMap(([k, v]) =>
    typeof v === "object" ? flat(v, `${prefix}-${k}`) : [[`${prefix}-${k}`, v]],
  );
const vars = [
  ...flat(P.color, "--color"),
  ...Object.entries(S.colors).map(([k, v]) => [`--${k}`, v]),
  ...Object.entries(P.fontSize).map(([k, v]) => [`--fs-${k}`, v]),
  ...Object.entries(P.fontWeight).map(([k, v]) => [`--fw-${k}`, String(v)]),
  ...Object.entries(P.spacing).map(([k, v]) => [`--space-${k}`, v]),
  ...Object.entries(P.borderRadius).map(([k, v]) => [`--radius-${k}`, v]),
  ["--radius-card", S.border.radius.card],
  ["--container-max", S.layout.container.maxWidth],
  ["--aspect-card", S.layout.image.aspectRatio.replace("/", " / ")],
  ["--grid-gap", S.layout.grid.gap.base],
  ["--grid-gap-lg", S.layout.grid.gap.large],
];
const range =
  "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD";
w(
  "colors_and_type.css",
  `/* Generated from src/styles/tokens.js (single source of truth). Do not edit by hand. */
@font-face { font-family: 'Manrope'; font-style: normal; font-weight: 200 800; font-display: swap;
  src: url('fonts/manrope-latin-var.woff2') format('woff2'); unicode-range: ${range}; }
@font-face { font-family: 'Lora'; font-style: normal; font-weight: 400 700; font-display: swap;
  src: url('fonts/lora-latin-var.woff2') format('woff2'); unicode-range: ${range}; }
@font-face { font-family: 'Lora'; font-style: italic; font-weight: 400 700; font-display: swap;
  src: url('fonts/lora-italic-latin-var.woff2') format('woff2'); unicode-range: ${range}; }

:root {
${vars.map(([k, v]) => `  ${k}: ${v};`).join("\n")}
  --font-sans: 'Manrope', ui-sans-serif, system-ui, sans-serif;
  --font-serif: 'Lora', ui-serif, Georgia, serif;
}

body { margin: 0; background: var(--background-page); color: var(--text-body-primary); font-family: var(--font-sans); }
.h-display { font-family: var(--font-serif); font-size: var(--fs-4xl); font-weight: 600; color: var(--text-body-primary); margin: 0; line-height: 1.111; }
.link { color: var(--text-link); text-decoration: underline; transition: color .15s; }
.link:hover { color: var(--text-link-hover); }
`,
);

// ---- kit.css (component styles mirroring src/components, tokens only)
w(
  "ui_kits/portfolio/kit.css",
  `@import url('../../colors_and_type.css');
*, *::before, *::after { box-sizing: border-box; }
.container { max-width: 80rem; margin: 0 auto; padding: 0 var(--space-md); }
@media (min-width: 768px) { .container { padding: 0 var(--space-xl); } }

/* Navbar */
.nav { position: sticky; top: 0; z-index: 60; padding: var(--space-md) 0; background: color-mix(in srgb, var(--background-primary) 95%, transparent); backdrop-filter: blur(4px); }
.nav .container { display: flex; justify-content: space-between; align-items: center; }
.nav a { color: var(--text-body-primary); text-decoration: none; font-size: var(--fs-base); text-transform: uppercase; font-weight: 400; }
.nav .logo.is-home { font-weight: 800; }
.nav .links { display: flex; align-items: center; gap: var(--space-lg); }
.nav a.active { font-weight: 800; color: var(--text-body-accent); }
.lang { display: flex; align-items: center; gap: 6px; font-size: var(--fs-sm); text-transform: uppercase; padding: var(--space-xxs) 0; }
.flag { width: 17.5px; height: 17.5px; border-radius: 50%; display: inline-block; }
.flag.en { background: #012169; }
.flag.fr { background: linear-gradient(90deg, #002495 33%, #eee 33% 66%, #ed2939 66%); }

/* Buttons */
.btn { display: inline-flex; align-items: center; justify-content: center; padding: var(--space-sm-d) var(--space-lg); border-radius: 9999px; border: 0; cursor: pointer; text-decoration: none; font: 500 var(--fs-base)/1.25 var(--font-sans); color: var(--button-text-primary); box-shadow: 0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1); transition: background-color .2s; white-space: nowrap; }
.btn svg { width: 16px; height: 16px; margin-left: 8px; }
.btn-primary { background: var(--button-background-primary); }
.btn-primary:hover, .btn-primary.is-hover { background: var(--button-hover-primary); }
.btn-primary:active, .btn-primary.is-active { background: var(--button-active-primary); }
.btn-secondary { background: var(--button-background-secondary); }
.btn-secondary:hover, .btn-secondary.is-hover { background: var(--button-hover-secondary); }
.btn-ghost { background: var(--background-primary); color: var(--text-body-accent); font-weight: 600; border: 1px solid var(--stroke-primary-hover); box-shadow: 0 1px 2px 0 rgb(0 0 0 / .05); }
.btn-ghost:hover { background: var(--color-gray-50); }
.pill { display: inline-flex; align-items: center; gap: var(--space-sm); background: var(--background-primary); border: 1px solid var(--stroke-primary-hover); border-radius: 9999px; padding: var(--space-sm-d) var(--space-lg); box-shadow: 0 1px 2px 0 rgb(0 0 0 / .05); font-weight: 600; cursor: pointer; }

/* Hero */
.hero { text-align: center; display: flex; flex-direction: column; align-items: center; gap: var(--space-md); }
.hero h1 { font-family: var(--font-serif); font-style: italic; font-weight: 600; color: var(--text-heading-accent); font-size: var(--fs-6xl); line-height: 1; margin: 0; }
.hero p { font-size: var(--fs-lg); color: var(--text-body-secondary); max-width: 610px; margin: 0; line-height: 1.333; }
.hero .accent { display: block; color: var(--text-body-accent); font-weight: 600; }

/* Project card */
.card { display: flex; gap: var(--space-3xl); align-items: flex-start; }
.card.reverse { flex-direction: row-reverse; }
.card .media { flex: 1 1 50%; aspect-ratio: var(--aspect-card); border-radius: var(--radius-2xl); overflow: hidden; display: block; }
.card .media img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s; }
.card .media:hover img { transform: scale(.9); }
.card .body { flex: 1 1 50%; display: flex; flex-direction: column; gap: var(--space-lg); }
.card .body > div { display: flex; flex-direction: column; gap: var(--space-lg); }
.card .k { display: block; color: var(--text-body-tertiary); margin-bottom: var(--space-xxs); }
.card .v { margin: 0; line-height: 1.5; }
.card .stack > div { margin: 0; }
@media (max-width: 767px) { .card, .card.reverse { flex-direction: column; gap: var(--space-lg); } }

/* Section */
.section h3 { font-size: var(--fs-lg); font-weight: 600; color: var(--text-body-secondary); margin: 0 0 var(--space-sm); }
.section p, .section li { font-size: var(--fs-base); line-height: 1.625; margin: 0; }
.section ul { padding-left: 20px; margin: 0; }

/* Footer */
.footer { border-top: 1px solid var(--stroke-secondary); padding: var(--space-xl) 0; }
.footer .connect { text-align: center; display: flex; flex-direction: column; align-items: center; gap: var(--space-lg); padding: var(--space-2xl) 0; }
.footer .connect h1 { font-family: var(--font-serif); font-style: italic; font-weight: 600; font-size: var(--fs-3xl); margin: 0; }
.footer .connect p { margin: 0; }
.footer .bar { border-top: 1px solid var(--stroke-secondary); padding-top: var(--space-xl); display: flex; justify-content: space-between; align-items: center; }
.footer small { font-size: var(--fs-sm); color: var(--text-body-secondary); }
`,
);

// ---- preview cards
const card = (group, title, css, body) =>
  `<!-- @dsCard group="${group}" -->
<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title>
<link rel="stylesheet" href="../colors_and_type.css">
<style>*{box-sizing:border-box}body{padding:24px;background:var(--background-page)}h2.cap{font:600 12px/1 var(--font-sans);text-transform:uppercase;letter-spacing:.06em;color:var(--text-body-secondary);margin:0 0 16px}${css}</style></head><body>
${body}
</body></html>`;

const swatches = (title, entries, cols = 6) =>
  `<h2 class="cap">${title}</h2><div class="grid">${entries
    .map(
      ([name, val, ref]) =>
        `<div class="sw"><div class="chip" style="background:${val}"></div><b>${name}</b><span>${val}</span>${ref ? `<i>${ref}</i>` : ""}</div>`,
    )
    .join("")}</div>`;
const swCss = `.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:16px}.sw{display:flex;flex-direction:column;gap:4px;font-size:12px}.sw .chip{height:56px;border-radius:12px;border:1px solid var(--stroke-secondary);margin-bottom:4px}.sw b{font-weight:600;word-break:break-all}.sw span{color:var(--text-body-secondary)}.sw i{color:var(--text-body-tertiary);font-style:normal}`;

const prim = (key) => Object.entries(P.color[key]).map(([k, v]) => [`${key}-${k}`, v]);
w("preview/colors-gray.html", card("Colors", "Gray ramp", swCss, swatches("Gray", prim("gray"))));
w("preview/colors-accent.html", card("Colors", "Accent action ramp", swCss, swatches("Accent action (violet)", prim("accent-action"))));
w(
  "preview/colors-base.html",
  card("Colors", "Base and surface", swCss, swatches("Base and surface", [
    ["white", P.color.base.white],
    ["black", P.color.base.black],
    ["surface-page", P.color.surface.page],
  ])),
);
const group = (prefix) =>
  Object.entries(S.colors).filter(([k]) => k.startsWith(prefix)).map(([k, v]) => [k, v]);
w("preview/colors-semantic-bg-text.html", card("Colors", "Semantic: backgrounds and text", swCss,
  swatches("Backgrounds", group("background")) + "<br>" + swatches("Text", group("text-"))));
w("preview/colors-semantic-ui.html", card("Colors", "Semantic: buttons and strokes", swCss,
  swatches("Buttons", group("button")) + "<br>" + swatches("Strokes", group("stroke"))));

w("preview/type-families.html", card("Type", "Font families", `.r{display:flex;gap:32px;flex-wrap:wrap}.s{font-size:48px;line-height:1.1;margin:8px 0}`,
  `<h2 class="cap">Families</h2><div class="r"><div><div class="s" style="font-family:var(--font-sans);font-weight:800">Manrope</div><div style="font-family:var(--font-sans)">Sans, body and UI, 200 to 800</div></div><div><div class="s" style="font-family:var(--font-serif);font-weight:600">Lora</div><div style="font-family:var(--font-serif)">Serif, display headings, 400 to 700</div></div><div><div class="s" style="font-family:var(--font-serif);font-style:italic;font-weight:600">Lora Italic</div><div style="font-family:var(--font-serif);font-style:italic">Hero and footer accents</div></div></div>`));
const lh = { xs: 1.333, sm: 1.143, base: 1.25, lg: 1.333, "2xl": 1.167, "3xl": 1.2, "4xl": 1.111, "5xl": 1, "6xl": 1 };
w("preview/type-scale.html", card("Type", "Type scale", `.t{display:flex;align-items:baseline;gap:24px;padding:8px 0;border-bottom:1px solid var(--stroke-secondary)}.t code{width:90px;font:12px var(--font-sans);color:var(--text-body-secondary)}`,
  `<h2 class="cap">Scale</h2>` + Object.entries(lh).map(([k, l]) =>
    `<div class="t"><code>${k} ${P.fontSize[k]}</code><span style="font-size:var(--fs-${k});line-height:${l};font-family:${["3xl","4xl","5xl","6xl"].includes(k) ? "var(--font-serif)" : "var(--font-sans)"};font-weight:${["3xl","4xl","5xl","6xl"].includes(k) ? 600 : 400}">Product designer</span></div>`).join("")));

w("preview/spacing.html", card("Spacing", "Spacing scale", `.b{display:flex;align-items:center;gap:16px;margin:6px 0;font-size:12px}.b code{width:110px;color:var(--text-body-secondary)}.b div{height:16px;background:var(--background-brand);border-radius:2px}`,
  `<h2 class="cap">Spacing</h2>` + Object.entries(P.spacing).map(([k, v]) => `<div class="b"><code>${k} ${v}</code><div style="width:${v}"></div></div>`).join("")));
w("preview/radius.html", card("Spacing", "Radius", `.r{display:flex;gap:24px}.r div{width:120px;height:120px;background:var(--background-primary);border:1px solid var(--stroke-neutral-primary);display:flex;align-items:flex-end;padding:8px;font-size:12px}`,
  `<h2 class="cap">Radius</h2><div class="r">${Object.entries(P.borderRadius).map(([k, v]) => `<div style="border-radius:${v}">${k} ${v}</div>`).join("")}<div style="border-radius:9999px;justify-content:center;align-items:center">full</div></div>`));

const arrow = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>`;
const kit = `<link rel="stylesheet" href="../ui_kits/portfolio/kit.css">`;
w("preview/buttons.html", card("Components", "Button", `.r{display:flex;gap:16px;flex-wrap:wrap;align-items:center;margin-bottom:16px}`,
  `${kit}<h2 class="cap">Button (rounded-full)</h2>
<div class="r"><a class="btn btn-primary">View project ${arrow}</a><a class="btn btn-primary is-hover">Hover ${arrow}</a><a class="btn btn-primary is-active">Active ${arrow}</a><a class="btn btn-secondary">Secondary ${arrow}</a><a class="btn btn-primary">No arrow</a></div>
<h2 class="cap">Ghost CTA and email pill</h2><div class="r"><a class="btn btn-ghost">Case studies</a><span class="pill">contact@yassineelidrissi.com</span></div>`));
w("preview/navbar.html", card("Components", "Navbar", `body{padding:0}`,
  `${kit}<nav class="nav"><div class="container"><a class="logo is-home">Yassine El Idrissi</a><div class="links"><a>Work</a><a class="active">About</a><a>Contact</a><span class="lang"><span class="flag en"></span>EN</span></div></div></nav>`));
w("preview/hero.html", card("Components", "Hero", `body{padding:48px 24px}`,
  `${kit}<div class="hero"><h1>Hello, I'm Yassine</h1><p>I'm a product designer who translates user insights into genuine experiences that are measurable, valuable, and more importantly...<span class="accent">... built for people.</span></p></div>`));
w("preview/project-card.html", card("Components", "Project card", `body{padding:24px;max-width:1100px}`,
  `${kit}<article class="card"><a class="media"><img src="../assets/images/coverProject-900care.webp" alt=""></a><section class="body"><h1 class="h-display">UX &amp; growth for a sustainable e&#8209;commerce</h1><div class="stack"><div><span class="k">Client</span><p class="v">900.care</p></div><div><span class="k">Description</span><p class="v">Full-cycle product design at 900.care, focused on improving first-order conversion and long term retention.</p></div><div><span class="k">Role</span><p class="v">UX research and Product design</p></div></div><div><a class="btn btn-primary">View project ${arrow}</a></div></section></article>`));
w("preview/project-section.html", card("Components", "Project section", `body{max-width:640px}.section+.section{margin-top:24px}`,
  `${kit}<div class="section"><h3>Context</h3><p>Paragraph variant (string): one block of body text, 16px, relaxed leading.</p></div><div class="section"><h3>Key insights</h3><ul><li>List variant (string[])</li><li>Rendered as a bulleted list</li></ul></div>`));
w("preview/footer.html", card("Components", "Footer", `body{padding:0}`,
  `${kit}<footer class="footer"><div class="container"><div class="connect"><h1>Let's connect !</h1><p>For any questions or collaboration requests.</p><span class="pill">contact@yassineelidrissi.com</span></div></div><div class="container"><div class="bar"><small>&copy; 2026 Yassine EL IDRISSI. All rights reserved.</small><span>in</span></div></div></footer>`));

// ---- UI kit page
w("ui_kits/portfolio/index.html", `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Portfolio UI kit: Home</title><link rel="stylesheet" href="kit.css"></head><body>
<nav class="nav"><div class="container"><a class="logo is-home">Yassine El Idrissi</a><div class="links"><a>Work</a><a>About</a><a>Contact</a><span class="lang"><span class="flag en"></span>EN</span></div></div></nav>
<main class="container" style="padding-bottom:96px;padding-top:80px;display:flex;flex-direction:column;gap:96px">
<section style="display:flex;flex-direction:column;align-items:center;gap:64px;min-height:70vh;justify-content:center"><div class="hero"><h1>Hello, I'm Yassine</h1><p>I'm a product designer who translates user insights into genuine experiences that are measurable, valuable, and more importantly...<span class="accent">... built for people.</span></p></div><a class="btn btn-ghost">Case studies</a></section>
<section style="display:flex;flex-direction:column;gap:112px">
${[["900care", "UX &amp; growth for a sustainable e&#8209;commerce", "900.care", "Full-cycle product design at 900.care, focused on improving first-order conversion and long term retention.", "UX research and Product design", true],
   ["cdc", "Caisse des Dépôts", "Caisse des Dépôts", "Case study placeholder, copy comes from the YAML content file.", "Product design", false],
   ["batchcooking", "Batchcooking", "Batchcooking", "Case study placeholder, copy comes from the YAML content file.", "Product design", true]]
 .map(([img, h, c, d, r, rev]) => `<article class="card${rev ? " reverse" : ""}"><a class="media"><img src="../../assets/images/coverProject-${img}.webp" alt=""></a><section class="body"><h1 class="h-display">${h}</h1><div class="stack"><div><span class="k">Client</span><p class="v">${c}</p></div><div><span class="k">Description</span><p class="v">${d}</p></div><div><span class="k">Role</span><p class="v">${r}</p></div></div><div><a class="btn btn-primary">View project ${arrow}</a></div></section></article>`).join("\n")}
</section></main>
<footer class="footer"><div class="container"><div class="connect"><h1>Let's connect !</h1><p>For any questions or collaboration requests.</p><span class="pill">contact@yassineelidrissi.com</span></div></div><div class="container"><div class="bar"><small>&copy; 2026 Yassine EL IDRISSI. All rights reserved.</small><span>in</span></div></div></footer>
</body></html>`);

// ---- docs
w("README.md", `# portfolio_2026 design system

Source of truth: \`src/styles/tokens.js\` in the yeldrs/portfolio_2026 repo. This project is a generated mirror, pushed on request with /design-sync. Do not edit tokens here; change them in the repo and sync again.

## Foundations
- Colors: gray ramp, accent-action (violet) ramp, base white/black, page surface #f4f7f8. Components use the semantic roles (background-*, text-*, button-*, stroke-*, text-link), never raw ramps.
- Type: Manrope (sans, UI and body), Lora (serif, display headings; italic for hero and footer accents). Scale 12 to 60px.
- Spacing: xxs 2px to 6xl 112px. Radius: md 6, xl 12, 2xl 16, card 12, pills are fully rounded.
- Layout: container max 1200px (rendered as max-w-7xl), card images 4:3.

## Files
- \`colors_and_type.css\`: all tokens as CSS variables plus @font-face. Link this first.
- \`ui_kits/portfolio/\`: kit.css (component styles, tokens only) and index.html (home page composition).
- \`preview/\`: one card per foundation or component.
- \`fonts/\`, \`assets/\`: self-hosted fonts and the three published case-study covers.

## Rules
- No hardcoded colour, spacing or radius: use the CSS variables.
- No em dashes in site copy. Bilingual EN/FR site; keep UI strings short.
- Site copy shown in the kit is placeholder or taken from published content; do not rewrite owner text.
`);
w("SKILL.md", `---
name: portfolio-2026-design
description: Design with the portfolio_2026 design system (violet accent, Manrope and Lora, rounded-full buttons, 4:3 cards). Use for new pages, layouts and components of Yassine El Idrissi's portfolio.
---

Read README.md, link colors_and_type.css and ui_kits/portfolio/kit.css, and reuse the existing components (navbar, hero, project card, section, footer, buttons). Use CSS variables only.
`);

console.log(
  fs.readdirSync(out, { recursive: true }).filter((f) => fs.statSync(path.join(out, f)).isFile()).join("\n"),
);
