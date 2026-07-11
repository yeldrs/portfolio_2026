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

### DETTE / À SURVEILLER (constaté, non corrigé)
- `[2026-07-11]` — **Design System — double source de vérité (aggravée).** `tokens.js` contient `semantic.colors` disant brand = `blue-chill` (turquoise), mais `tailwind.config.mjs` (source opérationnelle) mappe brand → `accent-action` (violet) et **ne lit jamais** `tokens.semantic.colors`. Les deux ont **déjà divergé**. → Se fier UNIQUEMENT à `tailwind.config.mjs`. Correction reportée (consigne : ne pas toucher).
- `[2026-07-11]` — **Palettes dupliquées.** `accent-action` et `accent-deco` dans `tokens.js` sont **identiques au hex près**. Candidat à fusion (reporté, DS gelé).
- `[2026-07-11]` — **Ambiguïté de déploiement.** `.htaccess`/`CNAME` (Apache) coexistent avec `deploy.yml` (GitHub Pages, branche `deploy/test`). Redirections dupliquées dans `astro.config.mjs` ET `.htaccess`. → Trancher définitivement l'hébergeur, puis retirer la config de l'autre.
- `[2026-07-11]` — **Sitemap manuel.** `@astrojs/sitemap` est installé (devDeps) mais absent des `integrations` d'`astro.config.mjs`. `public/sitemap.xml` est écrit à la main → à mettre à jour à chaque projet. Activer l'intégration automatiserait.
- `[2026-07-11]` — **`validate-frontmatter.cjs`** — non branché à npm, dépend de `gray-matter` (absent de `package.json`) → actuellement non fonctionnel. Le schéma Zod de `config.ts` couvre déjà la validation au build. Candidat suppression ou documentation comme outil manuel (reporté).
- `[2026-07-11]` — **`src/content/projects/biomimicry.txt`** — brouillon de projet en `.txt` (non chargé par la Content Collection, qui ne lit que `.md`/`.mdx`) ; référence une image inexistante `coverProject-biomimicry.webp`. Conservé (contenu potentiel du propriétaire) → à convertir en `.md` avec `isDraft: true` ou supprimer.
- `[2026-07-11]` — **`repomix-output.xml`** (126 Ko) + `repomix.config.json` versionnés — snapshot régénérable pour contexte IA. Alourdit le repo. Envisager `.gitignore` (régénérable via repomix).
- `[2026-07-11]` — **Mapping d'images positionnel** (`projectImages` index 0/2/4/6/8+) dans les `.md` — fragile, un décalage casse la mise en page sans erreur de build. Conserver les positions vides `""`. Refactor clé/valeur souhaitable à terme.
- `[2026-07-11]` — **`src/pages/work/[slug].astro`** — gabarit dense. Si les études de cas se complexifient, extraire les sections répétées (Diagnosis/Conception/Results) en sous-composants.
