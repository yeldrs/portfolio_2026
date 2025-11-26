const fs = require('fs').promises;
const path = require('path');

async function readJson(file) {
  const txt = await fs.readFile(file, 'utf8');
  return JSON.parse(txt);
}

function flattenTokens(obj, prefix = []) {
  const out = [];
  for (const k of Object.keys(obj)) {
    if (k.startsWith('$')) continue;
    const v = obj[k];
    if (v && typeof v === 'object' && !('$type' in v && '$value' in v)) {
      out.push(...flattenTokens(v, prefix.concat(k)));
    } else {
      out.push(prefix.concat(k).join('.'));
    }
  }
  return out;
}

async function walk(dir, exts, ignore = new Set(['node_modules', '.git', 'dist', 'build', '.next'])) {
  const files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (ignore.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...await walk(full, exts, ignore));
    else {
      if (exts.includes(path.extname(e.name).toLowerCase())) files.push(full);
    }
  }
  return files;
}

function kebabify(dot) {
  return dot.replace(/\./g, '-').toLowerCase();
}

function buildRegexForTopLevels(topLevels) {
  const t = Array.from(topLevels).map(s => s.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')).join('|');
  // dot-notation like colors.blue-chill.600
  const dotRe = new RegExp(`\\b(?:${t})(?:\\.[a-z0-9-]+)+\\b`, 'ig');
  // kebab / css var like --colors-blue-chill-600 or colors-blue-chill-600 or text-body-primary
  const kebabRe = new RegExp(`\\b(?:--)?(?:${t})(?:-[a-z0-9-]+)+\\b`, 'ig');
  return { dotRe, kebabRe };
}

(async function main(){
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error('Usage: node find-missing-tokens.js <figma-json-1> [figma-json-2 ...]');
    process.exit(2);
  }

  // load & flatten figma tokens
  let allDot = new Set();
  for (const f of args) {
    const j = await readJson(f);
    const flat = flattenTokens(j);
    flat.forEach(x => allDot.add(x.toLowerCase()));
  }

  // kebab forms
  const allKebab = new Set(Array.from(allDot).map(kebabify));
  const topLevels = new Set(Array.from(allDot).map(d => d.split('.')[0]));

  // scan files
  const root = process.cwd();
  const exts = ['.js','.ts','.jsx','.tsx','.astro','.css','.scss','.html','.md','.json','.astro'];
  const files = await walk(root, exts);
  const { dotRe, kebabRe } = buildRegexForTopLevels(topLevels);

  const usedDot = new Set();
  const usedKebab = new Set();

  for (const f of files) {
    const txt = await fs.readFile(f, 'utf8').catch(()=>'');
    let m;
    while ((m = dotRe.exec(txt))) usedDot.add(m[0].toLowerCase());
    while ((m = kebabRe.exec(txt))) {
      const token = m[0].replace(/^--/, '').toLowerCase();
      // ignore plain words that are likely not tokens (heuristic: must contain a '-')
      if (token.includes('-')) usedKebab.add(token);
    }
  }

  // normalize dot-kebab cross-check
  const missing = new Set();

  for (const d of usedDot) {
    if (!allDot.has(d) && !allKebab.has(kebabify(d))) missing.add(d);
  }
  for (const k of usedKebab) {
    // try to map kebab back to dot by replacing first '-' with '.' if it starts with a known top-level
    const maybeDot = k.replace(/-/g, '.');
    if (!allKebab.has(k) && !allDot.has(maybeDot)) {
      // also check raw kebab vs dotified forms
      // final check: does any figma dot start with same top-level? (if not, skip)
      const top = k.split('-')[0];
      if (topLevels.has(top)) missing.add(k);
    }
  }

  console.log('Figma tokens (count):', allDot.size);
  console.log('Used dot-notation tokens found (count):', usedDot.size);
  console.log('Used kebab/CSS tokens found (count):', usedKebab.size);
  console.log('--- Missing tokens (used in code but not in Figma) ---');
  if (missing.size === 0) console.log('None 🎉');
  else {
    for (const m of Array.from(missing).sort()) console.log(m);
    console.log(`\nTotal missing: ${missing.size}`);
  }

})().catch(e => { console.error(e); process.exit(1); });