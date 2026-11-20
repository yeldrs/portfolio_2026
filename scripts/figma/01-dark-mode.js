// Figma call 1/4: page-max-width token, Dark mode on "Semantic", DS dark board, dark mobile home.
// Paste as the `code` of one use_figma call. Idempotent for the mode and the token.
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const prim = cols.find((c) => c.name === "Primitive");
const sem = cols.find((c) => c.name === "Semantic");
let darkId;
const ex = sem.modes.find((m) => m.name === "Dark");
if (ex) darkId = ex.modeId;
else {
  try { darkId = sem.addMode("Dark"); } catch (e) { return { error: String(e) }; }
}
const light = sem.modes.find((m) => m.name !== "Dark").modeId;

const pv = {};
for (const id of prim.variableIds) { const v = await figma.variables.getVariableByIdAsync(id); pv[v.name] = v; }
const V = {};
for (const id of sem.variableIds) { const v = await figma.variables.getVariableByIdAsync(id); V[v.name] = v; }

// Token added in tokens.js (layout.page.maxWidth)
let pageVar = V["Layout/page-max-width"];
if (!pageVar) {
  pageVar = figma.variables.createVariable("Layout/page-max-width", sem, "FLOAT");
  pageVar.scopes = ["WIDTH_HEIGHT"];
  V[pageVar.name] = pageVar;
}
pageVar.setValueForMode(light, 1152);
pageVar.setValueForMode(darkId, 1152);

// Dark values: flip the shade of the aliased primitive, with explicit overrides for text and surfaces.
const flip = { 50: 950, 100: 900, 200: 800, 300: 700, 350: 700, 400: 600, 500: 500, 600: 400, 700: 300, 800: 200, 900: 100, 950: 50 };
const special = {
  "colors/text/text-body-primary": "colors/neutral/50",
  "colors/text/text-body-secondary": "colors/neutral/300",
  "colors/text/text-body-tertiary": "colors/neutral/500",
  "colors/background/background-primary": "colors/neutral/900",
  "colors/background/background-page": "colors/neutral/950",
  "colors/text/text-button-primary": "colors/neutral/950",
  "colors/text/text-button-primary-hover": "colors/neutral/950",
  "colors/text/text-link": "colors/neutral/300",
  "colors/text/text-link-hover": "colors/base/White",
};
const report = { mapped: 0, special: 0, missed: [] };
const colorVars = [];
for (const name in V) {
  const v = V[name];
  if (v.resolvedType !== "COLOR") continue;
  colorVars.push(v);
  const cur = v.valuesByMode[light];
  let target = null;
  if (special[v.name]) target = pv[special[v.name]];
  else if (cur && cur.type === "VARIABLE_ALIAS") {
    const p = await figma.variables.getVariableByIdAsync(cur.id);
    const m = p && p.name.match(/^colors\/([^/]+)\/(\d+)$/);
    if (m) {
      let n = flip[m[2]];
      if (m[1] !== "neutral" && /subtle/.test(v.name)) n = 950;
      target = pv[`colors/${m[1]}/${n}`];
    } else if (p && p.name === "colors/base/White") target = pv["colors/neutral/900"];
    else if (p && /colors\/base\/(Black|Base)/.test(p.name)) target = pv["colors/neutral/50"];
  }
  if (target) {
    v.setValueForMode(darkId, { type: "VARIABLE_ALIAS", id: target.id });
    special[v.name] ? report.special++ : report.mapped++;
  } else report.missed.push(v.name);
}

// ---- DS board (section 03) shown in Dark mode
const section03 = await figma.getNodeByIdAsync("273:254");
const styles = await figma.getLocalTextStylesAsync();
const S = {}; styles.forEach((s) => (S[s.name] = s));
await figma.loadFontAsync(S["text-xs/normal"].fontName);
await figma.loadFontAsync(S["text-2xl/bold"].fontName);
const paint = (name) => figma.variables.setBoundVariableForPaint({ type: "SOLID", color: { r: 0, g: 0, b: 0 } }, "color", V[name]);
const txt = async (chars, style, color) => {
  const t = figma.createText();
  await t.setTextStyleIdAsync(S[style].id);
  t.characters = chars;
  t.fills = [paint(color)];
  return t;
};
const board = figma.createAutoLayout("VERTICAL", { name: "DS · Dark mode", itemSpacing: 24 });
board.paddingTop = board.paddingBottom = board.paddingLeft = board.paddingRight = 24;
board.cornerRadius = 12;
board.fills = [paint("colors/background/background-page")];
section03.appendChild(board);
board.x = 100; board.y = 640;
board.appendChild(await txt("Dark mode · Semantic colors", "text-2xl/bold", "colors/text/text-body-primary"));
const grid = figma.createAutoLayout("HORIZONTAL", { name: "Swatches", itemSpacing: 16 });
grid.layoutWrap = "WRAP";
grid.counterAxisSpacing = 16;
board.appendChild(grid);
grid.resize(880, 100);
grid.layoutSizingHorizontal = "FIXED";
grid.layoutSizingVertical = "HUG";
const colorNames = colorVars.map((v) => v.name).sort();
for (const name of colorNames) {
  const card = figma.createAutoLayout("HORIZONTAL", { name: name, itemSpacing: 8 });
  card.paddingTop = card.paddingBottom = card.paddingLeft = card.paddingRight = 8;
  card.counterAxisAlignItems = "CENTER";
  card.cornerRadius = 8;
  card.fills = [paint("colors/background/background-primary")];
  card.strokes = [paint("colors/stroke/stroke-secondary")];
  card.strokeWeight = 1;
  const sw = figma.createRectangle();
  sw.resize(40, 40); sw.cornerRadius = 8;
  sw.fills = [paint(name)];
  sw.strokes = [paint("colors/stroke/stroke-neutral-primary")];
  sw.strokeWeight = 1;
  card.appendChild(sw);
  const label = await txt(name.replace("colors/", ""), "text-xs/normal", "colors/text/text-body-primary");
  card.appendChild(label);
  card.resize(280, 56);
  card.layoutSizingHorizontal = "FIXED";
  card.layoutSizingVertical = "HUG";
  grid.appendChild(card);
}
board.setExplicitVariableModeForCollection(sem, darkId);
section03.resizeWithoutConstraints(Math.max(section03.width, 1120), Math.max(section03.height, board.y + board.height + 100));

// ---- Dark clone of the mobile home (section 02)
const src = await figma.getNodeByIdAsync("147:116");
const section02 = await figma.getNodeByIdAsync("273:253");
const clone = src.clone();
section02.appendChild(clone);
clone.name = "HomePage mobile · Dark";
clone.x = src.x + src.width + 120;
clone.y = src.y;
clone.setExplicitVariableModeForCollection(sem, darkId);
section02.resizeWithoutConstraints(Math.max(section02.width, clone.x + clone.width + 100), section02.height);

await clone.screenshot();
return { darkId, light, report, boardId: board.id, cloneId: clone.id, swatches: colorNames.length, modes: sem.modes.map((m) => m.name) };
