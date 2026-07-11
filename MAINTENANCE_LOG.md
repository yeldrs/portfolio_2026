# MAINTENANCE LOG — Portfolio Yassine El Idrissi

Journal des actions de maintenance, nettoyage et évolution du site.
Format : `[date] — fichier/zone — action — raison — statut`.
Complète l'ACTION LOG historique du whitepaper (`Whitepaper d'architecture — Portfolio Yassine El Idrissi.txt`).

---

## 2026-07-11 — Audit d'architecture + nettoyage

### Décisions cadrage (validées par le propriétaire)
- **Hébergement :** domaine + email achetés chez Hostinger (registrar / MX). Le **site** est servi par **GitHub Pages** (`CNAME` + `.github/workflows/deploy.yml`). → `.htaccess` (Apache) est très probablement inactif mais conservé (risque > bénéfice à le supprimer).
- **Design System :** consigne « ne pas toucher ». Aucune modification de `tokens.js` / `tailwind.config.mjs`. Divergences documentées ci-dessous, non corrigées.
- **Formulaire de contact :** `ContactFormSection.astro` à supprimer (contact réel = copie d'email via `Footer.astro`).

### FAIT
- `[2026-07-11]` — `.github/agents/assistant.agent.md` — **supprimé** — fichier vide (0 octet), résidu — statut : fait
- `[2026-07-11]` — `src/components/Welcome.astro` — **supprimé** — orphelin (résidu du starter Astro, jamais importé) — statut : fait
- `[2026-07-11]` — `src/components/ContactFormSection.astro` — **supprimé** — orphelin + endpoint Formspree factice ; décision propriétaire — statut : fait
- `[2026-07-11]` — `public/images/profile-pic1.jpg` — **supprimé** — non référencé nulle part (doublon de `profile-pic.webp`) — statut : fait
- `[2026-07-11]` — `public/.htaccess` — **nettoyé** — retrait de la 1re ligne polluée `CeciEstUnTestDeCasse` ; directives conservées — statut : fait
- `[2026-07-11]` — `README.md` — **remplacé** — le template Astro par défaut → README réel (stack, structure, ajout projet, DS) — statut : fait

## 2026-07-11 (suite 4) — SEO / SEO IA + i18n commentaires

### FAIT — SEO / découvrabilité IA
- `[2026-07-11]` — `src/layouts/BaseLayout.astro` — **`lang="fr"` → `lang="en"`** (tout le contenu est en anglais ; corrige un signal SEO/a11y erroné) — statut : fait
- `[2026-07-11]` — `BaseLayout.astro` — **`<link rel="canonical">`** par page, en **URL propre** (strip du `.html` imposé par build.format:'file') → évite l'indexation en double /x et /x.html. Vérifié dans dist (home, /about, /work/*) — statut : fait
- `[2026-07-11]` — `BaseLayout.astro` — **Open Graph + Twitter Card** (og:type/site_name/title/description/url/image/locale, twitter:summary_large_image) ; nouvelles props `image` + `structuredData` — statut : fait
- `[2026-07-11]` — `BaseLayout.astro` — **JSON-LD schema.org `Person`** site-wide (nom, jobTitle « UX Product Designer », sameAs LinkedIn, image) — statut : fait
- `[2026-07-11]` — `src/pages/work/[slug].astro` — **JSON-LD `CreativeWork`** par étude de cas (name, description, url propre, image, dateCreated, creator Person, about=client) + passe description/cardImage/structuredData à BaseLayout — statut : fait
- `[2026-07-11]` — `index.astro` + `about.astro` — **meta description par page** ajoutées (accueil + about) ; titre accueil nettoyé — statut : fait
- `[2026-07-11]` — `public/llms.txt` — **créé** : résumé du site pour agents IA (identité, 3 études de cas avec liens, pages, notes) — statut : fait
- `[2026-07-11]` — `robots.txt` — **crawlers IA explicitement autorisés** (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended) ; retrait des Disallow inutiles (/dist, /node_modules non servis) — statut : fait
- `[2026-07-11]` — `BaseLayout.astro` — **`theme-color`** `#367984` (turquoise) → `#4364e8` (violet marque) — statut : fait

### i18n
- `[2026-07-11]` — **Commentaires du code FR → EN** sur 21 fichiers source (composants, pages, config, tokens, .md frontmatter). Commentaires uniquement, aucun code/contenu touché. Docs narratives (whitepaper, ce log) laissées en FR volontairement — statut : voir vérification build + diff

## 2026-07-11 (suite 3) — Tier 1 (nettoyage faible risque)

### FAIT
- `[2026-07-11]` — `src/styles/global.css` — **règle `html,body` morte supprimée** (variables CSS `--color-bg`/`--color-text` jamais définies + `font-family: system-ui` en dur redondant/concurrent). Le body est piloté par les classes tokens de BaseLayout (bg-background-page, text-text-body-primary, font-sans) — statut : fait
- `[2026-07-11]` — `package.json` — **métadonnées** : name `astro` → `portfolio-yassine-el-idrissi`, version 0.0.1 → 1.0.0, ajout description/homepage/author/license/`private: true` — statut : fait
- `[2026-07-11]` — `repomix-output.xml` — **untracké** (`git rm --cached`) + ajouté au `.gitignore` (régénérable). Fichier conservé sur disque pour usage local — statut : fait
- `[2026-07-11]` — `validate-frontmatter.cjs` — **supprimé** (cassé : dépend de gray-matter absent ; redondant avec le schéma Zod de config.ts) — statut : fait

### DETTE / À SURVEILLER
- `[2026-07-11]` — **SEO/AI à traiter (nouveau)** : pas de `<link rel="canonical">`, pas d'Open Graph / Twitter Card, pas de JSON-LD (schema.org), pas de `llms.txt`. `theme-color` dans BaseLayout encore turquoise `#367984` (marque = violet). Descriptions meta par page à vérifier.
- `[2026-07-11]` — **Branches** : prod déployée depuis `deploy/test` (nom « test » trompeur pour de la prod) ; code sur `feature/fixes`. Recommandation : basculer la prod sur `main`.
- `[2026-07-11]` — **i18n commentaires** : annotations/commentaires du code en français → à traduire en anglais (demandé, scope à confirmer : code oui ; docs FR whitepaper/log = à décider).

## 2026-07-11 (suite 2) — Audit round 2 : contenu + consolidation (Tier 2)

### FAIT
- `[2026-07-11]` — `src/content/projects/caissedesdepots.md` — **checkCdc.webp intégrée au carrousel CDC en 7e position** (avant editCdc.webp). L'image n'était pas orpheline : elle manquait juste dans le MDX. Vérifié : rendue dans dist/work/depostetconsignations.html — statut : fait
- `[2026-07-11]` — `src/content/projects/biomimicry.txt` → **`biomimicry.md` avec `isDraft: true`** — brouillon préservé, non listé et **aucune page générée** (donc n'alourdit pas le site). Frontmatter validé par Zod. Images `/images/biomimicry/*` encore absentes (à fournir avant publication) — statut : fait
- `[2026-07-11]` — `src/pages/work/[slug].astro` — **`getStaticPaths` filtre désormais les brouillons** (`data.isDraft !== true`). Corrige une incohérence latente : l'accueil filtrait les drafts mais la route détail générait quand même leurs pages — statut : fait
- `[2026-07-11]` — **Sitemap automatisé** — `@astrojs/sitemap` ajouté aux integrations d'`astro.config.mjs` ; `public/sitemap.xml` manuel **supprimé** ; `robots.txt` pointe vers `/sitemap-index.xml`. Vérifié : sitemap généré, brouillon biomimicry exclu, redirections exclues — statut : fait
- `[2026-07-11]` — **Redirections consolidées en source unique** — `public/.htaccess` **supprimé**. Le site tourne sur GitHub Pages qui ignore .htaccess ; les redirections sont générées par `astro.config.mjs` (build émet aboutme/logos/photography/projects/work.html). Vérifié : /work → /#projects intact. NB : si migration Apache un jour, restaurer .htaccess via git — statut : fait
- `[2026-07-11]` — **Polices auto-hébergées** — Google Fonts remplacé par 3 woff2 variables (sous-ensemble latin) dans `public/fonts/` : manrope-latin-var (24,8 Ko), lora-latin-var (37,8 Ko), lora-italic-latin-var (40,8 Ko) ; `@font-face` dans global.css ; preconnect/link Google retirés de BaseLayout, remplacés par 2 `preload`. Supprime la dépendance tierce render-blocking (perf + RGPD). Vérifié : 0 référence googleapis/gstatic dans dist. Sous-ensemble latin = couvre EN + FR ; ajouter latin-ext si texte d'Europe centrale — statut : fait

### DETTE / À SURVEILLER
- `[2026-07-11]` — ~~Sitemap manuel~~ → **RÉSOLU**. ~~Redirections dupliquées~~ → **RÉSOLU** (source unique astro.config.mjs). ~~Polices tierces render-blocking~~ → **RÉSOLU**. ~~biomimicry.txt inerte~~ → **RÉSOLU** (brouillon .md).
- `[2026-07-11]` — **Reste (non demandé ce jour, cf. audit round 2 Tier 1/3)** : `validate-frontmatter.cjs` (à supprimer), `repomix-output.xml` (à .gitignore), règle morte de `global.css` (var --color-bg/--color-text), `package.json` name/version, image orpheline `checkCdc` → désormais utilisée. Refactors scalabilité : `projectImages` clé/valeur, extraction de `[slug].astro`, `astro:assets`.

## 2026-07-11 (suite) — Consolidation du Design System

Consigne « ne pas toucher » **levée** par le propriétaire. Décisions validées :
BUG 1 → `text-body-primary`, BUG 2 → nouveau token `stroke-secondary` = gray-200,
architecture → **SSOT** (tokens.js pilote tailwind). Build vérifié + CSS compilé contrôlé.

### FAIT
- `[2026-07-11]` — `src/styles/tokens.js` — **restructuré en source unique de vérité** — `primitives` + couche `semantic` complète qui **référence les valeurs réelles** (plus de placeholders `"{...}"`). L'ancien bloc `semantic.colors` obsolète/divergent (turquoise) est remplacé par la carte sémantique OPÉRATIONNELLE (violet `accent-action`). Valeurs conservées à l'identique → 0 changement visuel — statut : fait
- `[2026-07-11]` — `tailwind.config.mjs` — **consomme `...tokens.semantic.colors`** au lieu du mapping écrit à la main — élimine la double source / divergence définitivement — statut : fait
- `[2026-07-11]` — `src/styles/tokens.js` — **palettes mortes supprimées** : `blue-chill` (0 usage) et `accent-deco` (identique à `accent-action`) — statut : fait
- `[2026-07-11]` — `src/components/Cloud.astro` — `tokens.primitives.color["accent-deco"][shade]` → `["accent-action"][shade]` (dédup ; valeurs identiques, 0 changement visuel). NB : Cloud consomme le token en **JS direct**, pas via classe Tailwind — d'où l'invisibilité au scan de classes — statut : fait
- `[2026-07-11]` — tokens morts retirés du mapping : `accent-deco-*`, `decoration-brand` (0 usage) — statut : fait
- `[2026-07-11]` — **BUG 1 corrigé** — `src/pages/work/[slug].astro` : classe `text-text-body` (token inexistant, corps de texte des études de cas rendu en couleur héritée) → `text-text-body-primary` (11 occurrences) — statut : fait
- `[2026-07-11]` — **BUG 2 corrigé** — token `stroke-secondary` (gray-200 #e5e7eb) créé ; les séparateurs de `Footer.astro` + `about.astro` (`border-stroke-secondary`, 5 usages) rendaient en `currentColor` (foncé) → désormais gris clair — statut : fait

Vérification CSS compilé : `border-stroke-secondary` = rgb(229 231 235) ✓ · `text-text-body-primary` = rgb(3 7 18) ✓ · brand toujours violet #4364e8, 0 occurrence turquoise ✓.

- `[2026-07-11]` — `Whitepaper d'architecture — …txt` — **ACTION LOG interne + changelog navbar supprimés** (75 lignes) au profit de ce fichier `MAINTENANCE_LOG.md` séparé ; pointeur ajouté en fin de whitepaper — statut : fait
- `[2026-07-11]` — `Whitepaper d'architecture — …txt` — **contenu réconcilié avec l'état réel** (devient source de vérité vivante) : en-tête (repo `yeldrs/portfolio_2026`, statut « document vivant »), §2.1 (11 composants, tokens.js SSOT, .htaccess dormant), §3.1 (retrait Welcome/ContactFormSection, ajout Cloud), §3.4 (items traités retirés, pending réel listé), §4.1-4.3 (chaîne SSOT, brand violet accent-action, avertissement « double source » remplacé par la règle source unique), §6.5 (hébergement clarifié : GitHub Pages + Hostinger registrar/email), §7 renuméroté 7.1→7.8 (items résolus retirés, cross-refs corrigés), Annexe (pièges résiduels + points résolus) — statut : fait

### DETTE / À SURVEILLER (constaté, non corrigé)
- `[2026-07-11]` — ~~Design System double source / palettes dupliquées~~ → **RÉSOLU** (voir ci-dessus).
- `[2026-07-11]` — **`src/styles/global.css`** — la règle `html,body { background-color: var(--color-bg); color: var(--color-text); }` référence des variables CSS **jamais définies** → règle inopérante (le fond réel vient de `bg-background-page` dans BaseLayout). De plus `font-family: system-ui` y est posé en dur (peut concurrencer la police Manrope). À nettoyer/aligner sur les tokens. Non touché ce jour (hors périmètre couleurs).
- `[2026-07-11]` — **Ambiguïté de déploiement.** `.htaccess`/`CNAME` (Apache) coexistent avec `deploy.yml` (GitHub Pages, branche `deploy/test`). Redirections dupliquées dans `astro.config.mjs` ET `.htaccess`. → Trancher définitivement l'hébergeur, puis retirer la config de l'autre.
- `[2026-07-11]` — **Sitemap manuel.** `@astrojs/sitemap` est installé (devDeps) mais absent des `integrations` d'`astro.config.mjs`. `public/sitemap.xml` est écrit à la main → à mettre à jour à chaque projet. Activer l'intégration automatiserait.
- `[2026-07-11]` — **`validate-frontmatter.cjs`** — non branché à npm, dépend de `gray-matter` (absent de `package.json`) → actuellement non fonctionnel. Le schéma Zod de `config.ts` couvre déjà la validation au build. Candidat suppression ou documentation comme outil manuel (reporté).
- `[2026-07-11]` — **`src/content/projects/biomimicry.txt`** — brouillon de projet en `.txt` (non chargé par la Content Collection, qui ne lit que `.md`/`.mdx`) ; référence une image inexistante `coverProject-biomimicry.webp`. Conservé (contenu potentiel du propriétaire) → à convertir en `.md` avec `isDraft: true` ou supprimer.
- `[2026-07-11]` — **`repomix-output.xml`** (126 Ko) + `repomix.config.json` versionnés — snapshot régénérable pour contexte IA. Alourdit le repo. Envisager `.gitignore` (régénérable via repomix).
- `[2026-07-11]` — **Mapping d'images positionnel** (`projectImages` index 0/2/4/6/8+) dans les `.md` — fragile, un décalage casse la mise en page sans erreur de build. Conserver les positions vides `""`. Refactor clé/valeur souhaitable à terme.
- `[2026-07-11]` — **`src/pages/work/[slug].astro`** — gabarit dense. Si les études de cas se complexifient, extraire les sections répétées (Diagnosis/Conception/Results) en sous-composants.
