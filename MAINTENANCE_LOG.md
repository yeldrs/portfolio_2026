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
