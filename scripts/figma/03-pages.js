// Figma calls 3 and 4: pages missing from the file. Run once with MOBILE=false, once with MOBILE=true.
// Creates a new section ("07 ... desktop" / "08 ... mobile") below everything else. Requires 01 and 02 to have run.
// Copy is taken from src/data and src/i18n (EN). Long case-study sections are wireframe placeholders.
const MOBILE = false; // <- set to true for the mobile run

const cols = await figma.variables.getLocalVariableCollectionsAsync();
const sem = cols.find((c) => c.name === "Semantic");
const V = {};
for (const id of sem.variableIds) { const v = await figma.variables.getVariableByIdAsync(id); V[v.name] = v; }
const S = {};
(await figma.getLocalTextStylesAsync()).forEach((s) => (S[s.name] = s));
const paint = (name) => figma.variables.setBoundVariableForPaint({ type: "SOLID", color: { r: 0, g: 0, b: 0 } }, "color", V[name]);
const fill = (n, name) => { n.fills = [paint(name)]; return n; };
const stroke = (n, name, w = 1) => { n.strokes = [paint(name)]; n.strokeWeight = w; return n; };
const done = new Set();
const T = async (chars, style, color = "colors/text/text-body-primary") => {
  const s = S[style];
  const k = s.fontName.family + s.fontName.style;
  if (!done.has(k)) { await figma.loadFontAsync(s.fontName); done.add(k); }
  const t = figma.createText();
  await t.setTextStyleIdAsync(s.id);
  t.characters = chars;
  t.textAutoResize = "HEIGHT";
  return fill(t, color);
};
const setText = async (node, str) => { await figma.loadFontAsync(node.fontName); node.characters = str; };

const secName = MOBILE ? "08, UI · Pages ajoutées, mobile" : "07, UI · Pages ajoutées, desktop";
if (figma.currentPage.children.find((n) => n.name === secName)) return { error: "section already exists" };

const W = MOBILE ? 375 : 1512;
const IN = MOBILE ? 343 : 1152;
const COLS = MOBILE ? 1 : 3;
const sizeH1 = MOBILE ? "text-3xl/bold" : "text-5xl/bold";

// ---- layout helpers
const F = (dir, o = {}) => {
  const f = figma.createAutoLayout(dir);
  f.name = o.name || "Frame";
  f.fills = [];
  if (o.gap != null) f.itemSpacing = o.gap;
  if (o.pad != null) f.paddingTop = f.paddingBottom = f.paddingLeft = f.paddingRight = o.pad;
  if (o.padY != null) { f.paddingTop = o.padY; f.paddingBottom = o.padY; }
  if (o.bg) fill(f, o.bg);
  if (o.stroke) stroke(f, o.stroke);
  if (o.r != null) f.cornerRadius = o.r;
  if (o.align) f.counterAxisAlignItems = o.align;
  if (o.w) { f.resize(o.w, 10); f.layoutSizingVertical = "HUG"; }
  return f;
};
const add = (parent, child, fillW = true) => {
  parent.appendChild(child);
  if (fillW) child.layoutSizingHorizontal = "FILL";
  return child;
};
const H1 = (s) => T(s, sizeH1, "colors/text/text-body-primary");
const H2 = (s) => T(s, MOBILE ? "text-2xl/bold" : "text-3xl/bold");
const P = (s) => T(s, "text-base/normal", "colors/text/text-body-secondary");
const Small = (s, c = "colors/text/text-body-tertiary") => T(s, "text-sm/normal", c);

const card = async (title, lines = [], tag) => {
  const c = F("VERTICAL", { name: "Card", gap: 8, pad: 24, bg: "colors/background/background-primary", stroke: "colors/stroke/stroke-secondary", r: 12 });
  if (tag) add(c, await T(tag, "text-xs/semibold", "colors/text/text-body-accent"));
  add(c, await T(title, "text-lg/semibold"));
  for (const l of lines) add(c, await T(l, "text-sm/normal", "colors/text/text-body-secondary"));
  return c;
};
const grid = async (parent, items, cols = COLS) => {
  const wrap = F("VERTICAL", { name: "Grid", gap: 24 });
  for (let i = 0; i < items.length; i += cols) {
    const row = F("HORIZONTAL", { name: "Row", gap: 24 });
    wrap.appendChild(row); row.layoutSizingHorizontal = "FILL";
    items.slice(i, i + cols).forEach((it) => { row.appendChild(it); it.layoutSizingHorizontal = "FILL"; });
    for (let k = items.slice(i, i + cols).length; k < cols; k++) { const sp = F("VERTICAL", { name: "Spacer" }); row.appendChild(sp); sp.layoutSizingHorizontal = "FILL"; }
  }
  add(parent, wrap);
};
const bars = (n) => {
  const g = F("VERTICAL", { name: "Text placeholder", gap: 8 });
  for (let i = 0; i < n; i++) {
    const r = figma.createRectangle(); r.resize(100, 10); r.cornerRadius = 4; fill(r, "colors/stroke/stroke-secondary");
    g.appendChild(r); r.layoutSizingHorizontal = "FILL";
    if (i === n - 1) r.resize(r.width, 10);
  }
  return g;
};
const shot = (label, h = MOBILE ? 220 : 420) => {
  const r = figma.createRectangle(); r.name = "Image placeholder · " + label;
  r.resize(100, h); r.cornerRadius = 12;
  fill(r, "colors/background/background-accent-subtle"); stroke(r, "colors/stroke/stroke-primary-hover");
  return r;
};

const navSet = await figma.getNodeByIdAsync("147:350");
const btnSet = await figma.getNodeByIdAsync("16:753");
const kit = await figma.getNodeByIdAsync("273:255");
const footSet = kit.findOne((n) => n.type === "COMPONENT_SET" && n.name === "Footer");
const chipSet = kit.findOne((n) => n.type === "COMPONENT_SET" && n.name === "FilterChip");
const devSet = kit.findOne((n) => n.type === "COMPONENT_SET" && n.name === "DeviceChip");
const wsCard = kit.findOne((n) => n.type === "COMPONENT" && n.name === "WorkshopCard");
if (!footSet || !chipSet || !devSet || !wsCard) return { error: "run 02-ui-kit.js first" };

const button = async (label, type = "Primary") => {
  const i = btnSet.children.find((c) => c.name === `State=Default, Type=${type}`).createInstance();
  const t = i.findOne((n) => n.type === "TEXT");
  if (t) await setText(t, label);
  return i;
};
const chip = async (label, active) => {
  const i = chipSet.children.find((c) => c.name === (active ? "State=Active" : "State=Default")).createInstance();
  await setText(i.findOne((n) => n.type === "TEXT"), label);
  return i;
};
const chipRow = async (labels, activeIdx = 0) => {
  const r = F("HORIZONTAL", { name: "Chips", gap: 8 });
  if (MOBILE) r.layoutWrap = "WRAP";
  for (let i = 0; i < labels.length; i++) r.appendChild(await chip(labels[i], i === activeIdx));
  return r;
};

// page = nav + content + footer
const makePage = (name) => {
  const p = F("VERTICAL", { name, bg: "colors/background/background-page", align: "CENTER" });
  p.resize(W, 100); p.layoutSizingVertical = "HUG";
  const nav = navSet.children.find((c) => c.name === "Device=" + (MOBILE ? "Mobile" : "Desktop")).createInstance();
  p.appendChild(nav); nav.layoutSizingHorizontal = "FILL";
  const content = F("VERTICAL", { name: "Content", gap: MOBILE ? 32 : 48, pad: 0, padY: MOBILE ? 32 : 64 });
  content.resize(IN, 100); content.layoutSizingVertical = "HUG";
  p.appendChild(content);
  return { p, content };
};
const finish = (p) => {
  const foot = footSet.children.find((c) => c.name === "Device=" + (MOBILE ? "Mobile" : "Desktop")).createInstance();
  p.appendChild(foot);
  if (MOBILE) foot.layoutSizingHorizontal = "FILL";
  return p;
};

const pages = [];

// ---- About
{
  const { p, content } = makePage("AboutPage" + (MOBILE ? " mobile" : " desktop"));
  add(content, await H1("I'm a Product designer."));
  add(content, await P("I focus on user research and business performance, turning user insights into genuine interactions that stimulate growth, answer needs and keep people coming back. I am committed to projects that have a social and environmental impact"));
  content.appendChild(await button("Let's connect"));
  add(content, await T("Woodworker at heart.", "text-lg/semibold", "colors/text/text-body-accent"));
  add(content, await H2("Experience"));
  await grid(content, [
    await card("UX Product Designer", ["900.care - D2C Startup", "Sept. 2024 - Sept. 2025 (Paris)", "End-to-End role in an Agile team to maximize conversion, retention, and product discovery."]),
    await card("Web Designer", ["Freelance", "2023 - 2024 (Remote)", "Consulting services in digital strategy, Search Engine Optimization (SEO), WordPress and WebFlow."]),
    await card("Art Director", ["Freelance", "June. 2022 - Jan. 2023 (Paris)", "Supported clients, including Maison Le Roux, on visual identity conception and brand strategy."]),
    await card("Art Director", ["Maison Le Roux - Food Industry", "March 2021 - July 2022 (Paris)", "Led brand strategy across digital and retail channels, ensuring consistency across all customer touchpoints."]),
  ]);
  add(content, await H2("My toolkit for impact"));
  await grid(content, [
    await card("Core Design & Tools", ["End-to-end design", "Figma / Loveable / Framer", "Adobe Suite / Affinity", "Web coding"]),
    await card("Methodology & Business", ["Data & UX analytics", "Data-driven design", "Agile & autonomy", "Communication & collaboration"]),
    await card("Tech Imperatives", ["Accessibility", "AI & automation", "Sustainable & responsible design", "Care-design & health-tech"]),
  ]);
  add(content, await H2("Significant Work"));
  await grid(content, [
    await card("An accessible solution for collaborative cooking"),
    await card("An agile tool to design with ethics"),
    await card("Animal Health - Digital Support Service"),
  ]);
  add(content, await H2("Education"));
  await grid(content, [
    await card("Master in Project Management and UX Design", [], "2024-2025"),
    await card("Master in Digital Design", ["École de Design Nantes Atlantique, France"], "2020-2022"),
    await card("Bachelor in Graphic Design", ["Quasar Institute for Advanced Design, Rome, Italy"], "2016-2019"),
  ]);
  add(content, await H2("Languages"));
  await grid(content, [await card("Languages", ["French · Native", "English · C1", "Italian · C1", "Spanish · A2", "Arabic · A1"])], 1);
  pages.push(finish(p));
}

// ---- Workflow
{
  const { p, content } = makePage("WorkflowPage" + (MOBILE ? " mobile" : " desktop"));
  add(content, await H1("Design, code and AI, in one workflow"));
  add(content, await P("I run some of my most recent projects with AI agents. I frame, pilot and rough out the design; the agents build the project and write the code, for me to review and polish. Here are five general steps of my workflow, shown on three different projects, with the tools I used and the mistakes I corrected along the way."));
  add(content, await chipRow(["Framing", "Research", "Design", "Build", "Test and release"], 0), MOBILE);
  const projects = [
    ["Tenon", "A mobile game on the Play Store, adapted from a wooden puzzle.", "phone"],
    ["This portfolio", "My portfolio. Third version, the first built with AI agents. Bilingual, EN and FR.", "desktop"],
    ["Solene Food Journal", "A calm-UX web app to track meals and body signals, with no judgement and no anxiety-inducing diagnosis.", "desktop"],
  ];
  add(content, await chipRow(["All projects", "Tenon", "This portfolio", "Solene Food Journal"], 0), MOBILE);
  await grid(content, await Promise.all(projects.map(([name, tagline]) => card(name, [tagline]))));
  const steps = [
    ["Framing", "Before any code or design, I decide what the project is, who it is for and where it stops. Then I turn that into a rulebook and skills that every agent session starts from."],
    ["Research", "I research until I can write constraints that the design and the agents must respect. The result is a written constraints document, not a pile of references."],
    ["Design", "Wireframes come first and fix the structure and states of each screen. The design system lives in one place that the code reads, the design tokens, and is never hardcoded in components."],
    ["Build", "I write the brief and the acceptance criteria, then review. I check every result in the product itself, not only in the code. When an agent gets something wrong, the lesson becomes a rule."],
    ["Test and release", "I do not trust a change until something other than the agent that wrote it has checked it. I say what I have not tested, and I decide what ships and what stays off."],
  ];
  for (const [i, [title, text]] of steps.entries()) {
    const sec = F("VERTICAL", { name: `Step ${i + 1}`, gap: 16 });
    add(sec, await T(`Step ${i + 1} of 5 · ${title}`, MOBILE ? "text-xl/bold" : "text-2xl/bold", "colors/text/text-heading-accent"));
    add(sec, await P(text));
    const cardsRow = [];
    for (const [name, , dev] of projects) {
      const c = F("VERTICAL", { name: "Project block", gap: 12, pad: 16, bg: "colors/background/background-primary", stroke: "colors/stroke/stroke-secondary", r: 12 });
      add(c, await T(name, "text-base/semibold"));
      const d = devSet.children.find((x) => x.name === "Device=" + dev).createInstance();
      c.appendChild(d);
      add(c, shot("screenshot", MOBILE ? 160 : 200));
      add(c, bars(3));
      cardsRow.push(c);
    }
    await grid(sec, cardsRow);
    add(content, sec);
  }
  pages.push(finish(p));
}

// ---- Workshop
{
  const { p, content } = makePage("WorkshopPage" + (MOBILE ? " mobile" : " desktop"));
  add(content, await Small("Portfolio / Design and workshop"));
  add(content, await H1("Design and workshop projects"));
  add(content, await chipRow(["All", "Wood", "3D and plans", "Prototyping"], 0), MOBILE);
  const list = [
    ["01", "Stand, Salon du Chocolat", "Maison Le Roux", "3D and plans"],
    ["02", "Wooden rings", "Bent veneers and solid wood", "Wood"],
    ["03", "Waiter's corkscrew", "Wooden bottle opener and corkscrew", "Wood, Prototyping"],
    ["04", "Polybud", "Modular earphone, master's project", "3D and plans, Prototyping"],
    ["05", "Biomimicry", "Natural History Museum of Nantes", "Wood, 3D and plans"],
    ["06", "Crafting an agile tool to design with ethics", "Caisse des Dépôts, Master EDNA", "Prototyping"],
  ];
  const items = [];
  for (const row of list) {
    const inst = wsCard.createInstance();
    const texts = inst.findAll((n) => n.type === "TEXT");
    for (let i = 0; i < 4; i++) await setText(texts[i], row[i]);
    items.push(inst);
  }
  await grid(content, items, MOBILE ? 1 : 3);
  pages.push(finish(p));
}

// ---- 404
{
  const { p, content } = makePage("404 " + (MOBILE ? "mobile" : "desktop"));
  content.counterAxisAlignItems = "CENTER";
  content.paddingTop = content.paddingBottom = MOBILE ? 64 : 112;
  const n404 = await T("404", MOBILE ? "text-5xl/bold" : "text-6xl/bold", "colors/text/text-heading-accent");
  n404.textAlignHorizontal = "CENTER";
  add(content, n404);
  const t = await T("Page not found", MOBILE ? "text-2xl/bold" : "text-4xl/bold"); t.textAlignHorizontal = "CENTER"; add(content, t);
  const b = await P("Sorry, the page you're looking for doesn't exist or has been moved. Try returning to the homepage or browsing my case studies."); b.textAlignHorizontal = "CENTER"; add(content, b);
  content.appendChild(await button("Go home"));
  pages.push(finish(p));
}

// ---- Case studies missing from the file (detected from the two existing project frames)
{
  const hay = [];
  for (const id of ["89:111", "171:148"]) {
    const f = await figma.getNodeByIdAsync(id);
    if (f) f.findAll((n) => n.type === "TEXT").forEach((t) => hay.push(t.characters));
  }
  const text = hay.join("\n");
  const projs = [
    ["900.care", "UX & growth for a sustainable e‑commerce", "900.care", "Full-cycle product design at 900.care, focused on improving first-order conversion and long term retention.", "UX research and Product design"],
    ["Caisse des Dépôts", "Crafting an agile tool to design with ethics", "Caisse des Dépôts et Consignations (CDC)", "A tangible, methodological toolkit to track ethical, sustainable, and inclusive principles into major digital platform development.", "Product designer"],
    ["cooking", "Building an accessible solution for collaborative cooking", "Personal social innovation project", "Designing a marketplace to explore student food insecurity and social isolation by turning underutilized kitchens into collaborative learning spaces.", "Product designer"],
  ];
  for (const [key, title, client, desc, role] of projs) {
    if (!MOBILE && text.includes(key)) continue;
    const { p, content } = makePage("ProjectPage " + client.split(" ")[0] + (MOBILE ? " mobile" : " desktop"));
    add(content, await Small("Project · " + client, "colors/text/text-body-accent"));
    add(content, await H1(title));
    add(content, await P(desc));
    add(content, await Small("Role: " + role, "colors/text/text-body-secondary"));
    add(content, shot("cover", MOBILE ? 220 : 480));
    for (const h of ["Context", "Problem", "Role", "Key insights", "Methodology", "Design conception", "Delivery", "Metrics", "Credits & References"]) {
      add(content, await H2(h));
      add(content, bars(4));
      if (["Context", "Design conception", "Delivery"].includes(h)) add(content, shot(h));
    }
    pages.push(finish(p));
  }
}

// ---- new section placed below everything else
let bottom = 0;
figma.currentPage.children.forEach((n) => { bottom = Math.max(bottom, n.y + n.height); });
const sec = figma.createSection();
sec.name = secName;
sec.x = 0; sec.y = bottom + 240;
let x = 100, maxH = 0;
for (const p of pages) {
  sec.appendChild(p);
  p.x = x; p.y = 120;
  x += p.width + 120;
  maxH = Math.max(maxH, p.height);
}
sec.resizeWithoutConstraints(x, maxH + 240);
await pages[0].screenshot();
return { section: sec.id, pages: pages.map((p) => `${p.name}:${p.id}:${Math.round(p.height)}`) };
