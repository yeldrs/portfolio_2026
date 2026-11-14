# BACKLOG

Open items only — what's left to do. Read this at session start.
Done → one line in `CHANGELOG.md`, removed from here. Keep this file short.
Every change here adds a line to `docs/BACKLOG_LOG.md`; never delete a task, mark it "Écarté".

Format: `- [ ] <area> — <what> — <why> (<severity>)`

## Content — owner decision needed

- [ ] `src/content/projects/caissedesdepots.yaml` — `en.methodology` / `en.delivery` are a
      plain string but `fr.methodology` / `fr.delivery` are a `string[]`, so the same project
      renders differently per locale. Pick one shape for both. (low — cosmetic)
- [ ] `src/content/projects/900care.yaml` — `keyInsights` list items are in a different order
      in `en` vs `fr`. Align if intentional parity is wanted. (low)
- [ ] `src/content/projects/batchcooking.yaml` — `credits.team[0].role` is `{ en: "…developer",
      fr: "…developper" }` — the FR is a typo carried over verbatim from the old content. Fix
      to one shared string on owner confirmation. (low)
- [ ] `src/data/about.fr.ts` — "Significant Work" section is an unverified EN→FR translation,
      never checked against the real CV (flagged in the file header). Owner to review. (low)
- [ ] `src/data/about.en.ts` vs `about.fr.ts` — intentionally out of sync (FR rebuilt from a
      newer CV, EN left older). Tracked, not drift. Revisit only if the owner asks. (info)

## Workflow page (branche feat/workflow-page)

- [ ] Logos manquants: UXtweak, class-variance-authority, axe-core (pas dans simple-icons, aucun kit presse trouvé). Placeholder carré pointillé en attendant. Claude Design utilise la marque Claude, Google Play Console la marque Google Play (à confirmer). (medium)
- [ ] Captures: Tenon fournies (4 wireframes, 10 écrans hi-fi dont UI kit). Restent en placeholder: Food Journal, portfolio, et les deux légendes sans capture du hi-fi Tenon (boutons avant/après Material 3). Étapes 1, 2, 4, 5: pas d'écran voulu (sauf captures réelles gardées en 4 et 5); idées pour 4 et 5: audit de conformité au design (design QA), commentaires Vercel, tickets de backlog, commentaires du UI kit, design handoff. (medium)
- [ ] Relire la traduction FR des 5 étapes et de `workflow.fr.ts`. Trancher les points ouverts du brief (stance IA, lien dépôt public, Food Journal, Tenon). (medium)
- [ ] Bandeau de clôture vers le contact: pas de texte fourni dans le brief, le pied de page "Let's connect !" tient lieu de clôture. (low)
- [ ] Logos équipe/projet dans les tags (carré pointillé pour l'instant). (low)
- [ ] `DeviceFrame.astro` — branché dans les galeries (`WorkflowGallery`, hi-fi Tenon en cadre sombre). À décider: UI kit Tenon sans cadre desktop (l'image a déjà sa barre de fenêtre); variante navigateur pour les web apps. (low)
- [ ] Canevas Claude Design: `Hifi-B-mobile` a encore l'ancien style d'onglets et l'ancien filtre; à resynchroniser avec le desktop et la liste d'outils non interactive. (low)

- [ ] Workflow: valider les schémas d'outils Food Journal / portfolio (flèches déduites des textes), les légendes et alt des écrans Tenon (rédigés par l'assistant, dont « Teaser »), et ajouter les bannières Food Journal et portfolio (`src/assets/workflow/banner-<id>.webp`, 1800x600; Tenon en 1024x500 à refaire en 1800x600). Différencier visuellement les étapes 2, 4 et 5. Vérifier le mobile des galeries (rail, projecteur) et le flou du UI kit au centre du projecteur. (medium)
- [ ] Workflow: le dégradé sous la barre des onglets projet (`after:` de `data-tabs-bar` dans `WorkflowProjectTabs.astro`) n'est pas beau; laissé en place pour l'instant, à retravailler. (low)

## Assets

- [ ] `/workshop` + `/fr/atelier` — page construite mais NON publiée (noindex, hors sitemap, aucun lien depuis le reste du site). Navbar déjà en mode autonome sur la page (Work = atelier, Contact, sans About; logo = atelier; événements Umami préfixés `workshop-`). À faire avant de la lier: relire `workshop.en.ts` et les noms EN de `workshop.skills.ts` (traductions non relues); réafficher les dates (retirées pour l'instant) et confirmer la durée CDC (6 mois ici, 8 mois dans l'étude de cas); fournir les photos du projet étagère puis retirer son `hidden: true`; valider les savoir-faire par projet; trancher les images CDC à légendes anglaises, le type de la pierre de Quiberon et les photos basse résolution (limonadier, Polybud); supprimer les images non affichées restées dans `public/images/workshop/<id>/`; resynchroniser le design system Claude Design (tokens ajoutés); puis retirer le filtre sitemap dans `astro.config.mjs` et la prop `noindex` des deux pages, et décider d'où on y accède (lien depuis le site, retour vers l'accueil). Option: suivre aussi les clics miniatures/zoom (aucun événement Umami aujourd'hui). (medium)

- [ ] `public/documents/` — FR CV PDF: `about.fr.ts` `cvLink` points to a file the owner has
      not supplied yet → 404 on `/fr/about` download. (medium — broken link)
- [ ] Case-study `og:image` is still the WebP `cover` (home/about now use a JPEG). Export
      1200×630 JPEG covers if link previews on X/LinkedIn matter for case-study shares. (low)
- [ ] `src/components/Hero.astro` — profile `<img>` is commented out; `profile-pic.webp` is
      only used as JSON-LD / `personLd` image. Decide: show it, or drop the asset. (low)

## Architecture

- [ ] `src/data/{home,about}.*.ts` stay plain TS (not YAML data collections like the case
      studies). Owner decision 2026-09 — do **not** re-propose migrating them.
- [ ] Layout wrapping is inconsistent: `ProjectLayout` self-wraps in `BaseLayout`, but
      `HomeLayout` / `AboutLayout` are wrapped by their page. Pick one. (low — tidy)

## Design system

- [ ] `text-md` — used in `Button.astro`, `Footer.astro`, `HomeLayout.astro`, `404.astro`.
      No such class exists (not in tokens, not a Tailwind default) → silent no-op, size is
      inherited. Needs a deliberate pass with the owner to pick the intended size. (low)
- [ ] Copy-email toast JS (~40 lines) is duplicated between `Footer.astro` and
      `AboutLayout.astro`. Extract to one shared script helper. Deferred from the 2026-09
      restructuring (behaviour-identical but the emitted inline JS changes, needs a manual
      click test). (low)

## Tooling / infra

- [ ] `.github/workflows/deploy.yml` — the `check` job is `continue-on-error: true`. Flip it
      to a hard gate once the tree stays `astro check`-clean. (low)
- [ ] `npm audit` — advisories in transitive dev deps (tailwind/postcss chain). Review after
      any dependency bump. (low)
- [ ] Optional: a `Stop` hook running `astro check` (Windows/PowerShell — verify it's robust
      before adding). (idea)

## Security — owner decision

- [ ] Git history: commit `604a7ee` (already pushed public) contains the owner's personal
      phone number in a since-deleted file. Full purge needs `git filter-repo`/BFG +
      force-push on a public branch — destructive, owner call. (medium)
