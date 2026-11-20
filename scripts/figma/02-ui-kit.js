// Figma call 2/4: missing UI kit components in section "04, UI kit" (FilterChip, IconButton,
// DeviceChip, BonusTag, Footer, WorkshopCard). All colours bound to the Semantic variables.
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
const T = async (chars, style, color) => {
  const s = S[style];
  const k = s.fontName.family + s.fontName.style;
  if (!done.has(k)) { await figma.loadFontAsync(s.fontName); done.add(k); }
  const t = figma.createText();
  await t.setTextStyleIdAsync(s.id);
  t.characters = chars;
  return fill(t, color);
};
const section = await figma.getNodeByIdAsync("273:255");
if (section.findOne((n) => n.name === "FilterChip" && n.type === "COMPONENT_SET")) return { error: "UI kit already added" };

const auto = (c, dir, gap, padX, padY) => {
  c.layoutMode = dir;
  c.primaryAxisSizingMode = "AUTO";
  c.counterAxisSizingMode = "AUTO";
  c.primaryAxisAlignItems = "CENTER";
  c.counterAxisAlignItems = "CENTER";
  c.itemSpacing = gap;
  c.paddingLeft = c.paddingRight = padX;
  c.paddingTop = c.paddingBottom = padY;
  c.fills = [];
  return c;
};
const svg = (d, w, vb, mode, colorVar) => {
  const attrs = mode === "stroke"
    ? 'stroke="#000" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"'
    : 'fill="#000"';
  const n = figma.createNodeFromSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${w}" viewBox="0 0 ${vb} ${vb}"><path d="${d}" ${attrs}/></svg>`);
  n.name = "icon";
  n.findAll((x) => x.type === "VECTOR").forEach((v) => {
    if (mode === "stroke") v.strokes = [paint(colorVar)];
    else v.fills = [paint(colorVar)];
  });
  return n;
};
const sets = [];
const makeSet = (comps, name) => {
  const set = figma.combineAsVariants(comps, figma.currentPage);
  set.name = name;
  section.appendChild(set);
  sets.push(set);
  return set;
};
let cx = 1580;
const rowY = 2020;

// ---- FilterChip: State=Default|Active
const chips = [];
for (const [i, state] of ["Default", "Active"].entries()) {
  const c = figma.createComponent();
  c.name = `State=${state}`;
  auto(c, "HORIZONTAL", 8, 16, 10);
  c.cornerRadius = 999;
  const active = state === "Active";
  fill(c, active ? "colors/background/button-background-primary" : "colors/background/background-primary");
  stroke(c, active ? "colors/background/button-background-primary" : "colors/stroke/stroke-primary-hover");
  c.appendChild(await T("Wood", "text-sm/semibold", active ? "colors/text/text-button-primary" : "colors/text/text-body-accent"));
  figma.currentPage.appendChild(c);
  c.x = i * 120; c.y = 0;
  chips.push(c);
}
const chipSet = makeSet(chips, "FilterChip");
chipSet.x = cx; chipSet.y = rowY; cx += chipSet.width + 80;

// ---- IconButton: Dir=prev|next|up|down, State=Default|Disabled
const dirs = { prev: "M10 3l-5 5 5 5", next: "M6 3l5 5-5 5", up: "M3 10l5-5 5 5", down: "M3 6l5 5 5-5" };
const btns = [];
let di = 0;
for (const dir in dirs) {
  for (const [si, state] of ["Default", "Disabled"].entries()) {
    const c = figma.createComponent();
    c.name = `Dir=${dir}, State=${state}`;
    auto(c, "HORIZONTAL", 0, 0, 0);
    c.resize(44, 44);
    c.cornerRadius = 999;
    const off = state === "Disabled";
    fill(c, "colors/background/background-primary");
    stroke(c, off ? "colors/stroke/stroke-secondary" : "colors/stroke/stroke-primary-hover");
    c.appendChild(svg(dirs[dir], 16, 16, "stroke", off ? "colors/text/text-body-tertiary" : "colors/text/text-body-accent"));
    figma.currentPage.appendChild(c);
    c.x = di * 68; c.y = si * 68;
    btns.push(c);
  }
  di++;
}
const btnSet = makeSet(btns, "IconButton");
btnSet.x = cx; btnSet.y = rowY; cx += btnSet.width + 80;

// ---- DeviceChip: Device=phone|tablet|desktop
const dev = {
  phone: ["Phone", "M17 1.01 7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"],
  tablet: ["Tablet", "M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 1.99-.9 1.99-2L23 6c0-1.1-.9-2-2-2zm-2 14H5V6h14v12z"],
  desktop: ["Desktop", "M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"],
};
const devs = [];
let k = 0;
for (const key in dev) {
  const c = figma.createComponent();
  c.name = `Device=${key}`;
  auto(c, "HORIZONTAL", 4, 8, 2);
  c.paddingLeft = 4;
  c.cornerRadius = 999;
  fill(c, "colors/background/background-primary");
  stroke(c, "colors/stroke/stroke-secondary");
  c.appendChild(svg(dev[key][1], 16, 24, "fill", "colors/text/text-body-secondary"));
  c.appendChild(await T(dev[key][0], "text-xs/semibold", "colors/text/text-body-secondary"));
  figma.currentPage.appendChild(c);
  c.x = k * 120; c.y = 0;
  devs.push(c); k++;
}
const devSet = makeSet(devs, "DeviceChip");
devSet.x = cx; devSet.y = rowY; cx += devSet.width + 80;

// ---- BonusTag
const tag = figma.createComponent();
tag.name = "BonusTag";
auto(tag, "HORIZONTAL", 4, 12, 8);
tag.cornerRadius = 6;
fill(tag, "colors/background/background-accent-subtle");
stroke(tag, "colors/stroke/stroke-primary-hover");
tag.appendChild(await T("Track and analyse", "text-xs/semibold", "colors/text/text-body-accent-strong"));
const logos = figma.createAutoLayout("HORIZONTAL", { itemSpacing: 2 });
logos.name = "logos";
logos.fills = [];
for (let i = 0; i < 3; i++) {
  const e = figma.createEllipse();
  e.resize(20, 20);
  fill(e, "colors/background/background-primary");
  stroke(e, "colors/stroke/stroke-primary-hover");
  logos.appendChild(e);
}
tag.appendChild(logos);
section.appendChild(tag);
tag.x = cx; tag.y = rowY; cx += tag.width + 80;

// ---- WorkshopCard (280 wide)
const card = figma.createComponent();
card.name = "WorkshopCard";
auto(card, "VERTICAL", 8, 0, 0);
card.counterAxisAlignItems = "MIN";
card.primaryAxisAlignItems = "MIN";
card.resize(280, 100);
card.layoutSizingHorizontal = "FIXED";
card.layoutSizingVertical = "HUG";
card.cornerRadius = 12;
fill(card, "colors/background/background-primary");
stroke(card, "colors/stroke/stroke-secondary");
card.clipsContent = true;
const img = figma.createRectangle();
img.name = "image";
img.resize(280, 200);
fill(img, "colors/background/background-accent-subtle");
card.appendChild(img);
img.layoutSizingHorizontal = "FILL";
const body = figma.createAutoLayout("VERTICAL", { itemSpacing: 4 });
body.name = "body";
body.fills = [];
body.paddingLeft = body.paddingRight = 16;
body.paddingBottom = 16;
card.appendChild(body);
body.layoutSizingHorizontal = "FILL";
for (const [chars, style, color] of [
  ["01", "text-xs/semibold", "colors/text/text-body-accent"],
  ["Project title", "text-lg/semibold", "colors/text/text-body-primary"],
  ["Context", "text-sm/normal", "colors/text/text-body-secondary"],
  ["Tag", "text-xs/normal", "colors/text/text-body-tertiary"],
]) {
  const t = await T(chars, style, color);
  body.appendChild(t);
  t.textAutoResize = "HEIGHT";
  t.layoutSizingHorizontal = "FILL";
}
section.appendChild(card);
card.x = cx; card.y = rowY;

// ---- Footer: Device=Desktop|Mobile
const foot = [];
for (const [i, d] of ["Desktop", "Mobile"].entries()) {
  const w = d === "Desktop" ? 1152 : 375;
  const c = figma.createComponent();
  c.name = `Device=${d}`;
  auto(c, "VERTICAL", 16, d === "Desktop" ? 48 : 16, 48);
  c.counterAxisAlignItems = "MIN";
  c.primaryAxisAlignItems = "MIN";
  c.resize(w, 100);
  c.layoutSizingHorizontal = "FIXED";
  c.layoutSizingVertical = "HUG";
  fill(c, "colors/background/background-primary");
  const heading = await T("Let's connect !", d === "Desktop" ? "text-3xl/bold" : "text-2xl/bold", "colors/text/text-body-primary");
  const tagline = await T("For any questions or collaboration requests.", "text-base/normal", "colors/text/text-body-secondary");
  const link = await T("Email", "text-base/semibold", "colors/text/text-link");
  const rights = await T("© 2026 All rights reserved.", "text-sm/normal", "colors/text/text-body-tertiary");
  const how = await T("How I work", "text-sm/semibold", "colors/text/text-link");
  for (const t of [heading, tagline, link, how, rights]) c.appendChild(t);
  figma.currentPage.appendChild(c);
  c.x = i * (1152 + 48); c.y = 0;
  foot.push(c);
}
const footSet = makeSet(foot, "Footer");
footSet.x = 1580; footSet.y = 1720;

section.resizeWithoutConstraints(Math.max(section.width, 3200), Math.max(section.height, 2440));
return { sets: sets.map((s) => `${s.name}:${s.id}`), tagId: tag.id, cardId: card.id, cardH: card.height, footH: footSet.height, section: [section.width, section.height] };
