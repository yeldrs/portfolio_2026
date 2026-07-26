# Portfolio — Yassine El Idrissi

Portfolio personnel de designer produit / UX. Site **100 % statique** généré par Astro : aucun serveur, aucune base de données, aucune logique runtime. Tout est pré-généré au build.

- **Site en ligne :** https://yassineelidrissi.com
- **Domaine & email :** achetés chez Hostinger (registrar + MX)
- **Hébergement du site :** GitHub Pages (via `CNAME` + `.github/workflows/deploy.yml`)

## Stack

| Couche | Techno | Rôle |
|---|---|---|
| Framework | Astro `^5.14.3` | Génération statique, routing, composants |
| Contenu | Content Collections (MDX) | Études de cas = fichiers `.md` typés (schéma Zod) |
| Styles | Tailwind CSS `^3.4.18` | Utilitaires pilotés par des design tokens |
| Design tokens | `src/styles/tokens.js` | Primitives couleurs / espacements / typo |
| Build CSS | PostCSS + autoprefixer | Chaîne de compilation Tailwind |
| Typage | TypeScript strict | Validation du schéma de contenu |

## Démarrage

```bash
npm install
npm run dev       # serveur de dev (localhost:4321)
npm run build     # build de production dans dist/
npm run preview   # prévisualiser le build
```

## Structure

```
src/
├── pages/            → routing (1 fichier = 1 route)
│   └── work/[slug].astro → gabarit dynamique, 1 page par projet
├── layouts/          → BaseLayout.astro (head, SEO, fonts, Navbar, Footer)
├── components/       → composants .astro
├── content/
│   ├── config.ts     → schéma Zod des projets (validation au build)
│   └── projects/     → le contenu : 1 .md par étude de cas
└── styles/
    ├── tokens.js     → primitives du design system
    └── global.css    → styles globaux + classes .btn
public/               → servi tel quel (images, CV, favicons, .htaccess, CNAME)
```

## Ajouter un projet

1. Créer `src/content/projects/{nom}.md` (copier `900care.md` comme gabarit — le plus complet).
2. Renseigner **tous** les champs obligatoires du schéma (`title`, `client`, `role`, `roleDescription`, `context`, `problem`, `keyInsights`, `methodology`, `delivery`, `metrics`, `cardImage`, `semanticSlug`, `publishDate`).
3. Déposer les images dans `public/images/{projet}/` et les référencer **dans le bon ordre** dans `projectImages` (mapping positionnel — voir whitepaper §5).
4. `semanticSlug` en kebab-case (minuscules, tirets), sinon le schéma rejette le build.
5. `npm run build` : si le build passe, le projet apparaît automatiquement sur l'accueil et à `/work/{semanticSlug}`.

> Astuce : `isDraft: true` prépare un projet sans le publier.

## Design system

Chaîne à 3 niveaux : `tokens.js` (primitives) → `tailwind.config.mjs` (noms sémantiques) → composants (classes).
**Règle d'or : modifier les tokens, jamais de couleur en dur dans un composant.**
La source opérationnelle du nommage sémantique est **`tailwind.config.mjs`** (voir `MAINTENANCE_LOG.md` pour les points de vigilance connus du DS).

## Documentation & maintenance

- `Whitepaper d'architecture — Portfolio Yassine El Idrissi.txt` — document de référence technique complet.
- `MAINTENANCE_LOG.md` — journal des actions de maintenance et dette technique suivie.
