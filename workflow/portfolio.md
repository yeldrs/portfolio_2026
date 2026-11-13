# Fiche : Portfolio (ce site)

Page : /workflow (FR : /fr/workflow). Contenu dans `src/content/workflow/step-1..5.yaml` (un bloc par projet et par étape) et `src/data/workflow.{en,fr}.ts`.

## Présentation du projet (une ligne, affichée en haut de chaque étape)
- EN : The site you are on: third version, first built with an agentic workflow, bilingual English and French.
- FR : Le site sur lequel vous êtes : troisième version, la première construite avec un workflow agentique, bilingue anglais et français.

## Faits verrouillés (à ne pas modifier sans me demander)
- Site Astro 5 100 % statique, EN/FR, GitHub Pages sur domaine personnalisé, Tailwind CSS 3, Zod, Umami. Troisième version du portfolio.
- Chiffres à garder exacts : recueil de règles de 121 lignes, de 4,3k à 1,6k tokens après découpage de la documentation, 3 skills, restructuration de septembre 2026 en 6 commits de phase, contraste du texte tertiaire à environ 2,4:1.
- Les dettes sont assumées et suivies (classes mortes text-md et mt-7xl, valeurs en dur, type check non bloquant en CI, pas de test d'accessibilité automatisé) : ne pas les adoucir.

## Structure de chaque bloc
Champs : `heading` (sous-titre quand l'étape a plusieurs blocs), `approachLabel` (titre court), `approach` (paragraphe principal), `tools` (label + note courte), `constraints`, `correction` (ce qui a mal tourné et ce qui a changé), parfois `callToAction` ou lien. Un champ absent n'est pas affiché.

---

## Étape 1 : Framing and setup / Cadrage et réglage

### Bloc unique

**approachLabel**
- EN : Rulebook and three skills
- FR : Recueil de règles et trois skills

**approach**
- EN : A 121-line rulebook: reading order at session start, which layer to touch first (content, tokens, layout, config), and hard rules such as never hardcode a color, never propose a backend, never edit my wording without a request. Three skills cover adding a case study, translating faithfully, and pre-deploy checks. The documentation split cut the rulebook from about 4.3k to 1.6k tokens.
- FR : Un recueil de règles de 121 lignes : ordre de lecture au début de la session, quelle couche toucher en premier (contenu, tokens, mise en page, config), et des règles strictes comme ne jamais coder une couleur en dur, ne jamais proposer de backend, ne jamais modifier mes textes sans demande. Trois skills couvrent l'ajout d'une étude de cas, la traduction fidèle et les vérifications avant déploiement. Le découpage de la documentation a fait passer le recueil d'environ 4,3k à 1,6k tokens.

**tools** (l'id du logo ne bouge pas ; seuls label et note se rédigent)
- EN : Claude Code (rulebook, three skills)
  FR : Claude Code (recueil de règles, trois skills)
- EN : OpenCode (rulebook, three skills)
  FR : OpenCode (recueil de règles, trois skills)
- EN : Claude Projects (maintenance)
  FR : Claude Projects (maintenance)
- EN : Repomix (codebase snapshots)
  FR : Repomix (instantanés du code)
- EN : A script that generates a design-system bundle from the tokens file
  FR : Un script qui génère un bundle de design system à partir du fichier de tokens

**constraints**
- EN : Contractually 100% static: no server, no database. The agent asks one question before touching redirects, deployment or the content schema.
- FR : Contractuellement 100 % statique : pas de serveur, pas de base de données. L'agent pose une question avant de toucher aux redirections, au déploiement ou au schéma de contenu.

**correction**
- EN : The first version was assembled by copy-pasting generated code and editing HTML and CSS by hand. It left dead classes (for example text-md and mt-7xl) that render nothing today.
- FR : La première version a été assemblée en copiant-collant du code généré et en modifiant le HTML et le CSS à la main. Elle a laissé des classes mortes (par exemple text-md et mt-7xl) qui ne rendent rien aujourd'hui.

---

## Étape 2 : Research / Recherche

Bloc marqué « non applicable » (affiche un état vide). Rien à rédiger, sauf si tu veux le remplacer par du contenu.

---

## Étape 3 : Design / Design

### Wireframes / Wireframes

**heading**
- EN : Wireframes
- FR : Wireframes

**approachLabel**
- EN : One page, two widths
- FR : Une page, deux largeurs

**approach**
- EN : Low-fidelity wireframes of the case-study page: the order of the sections, a two-column layout at desktop width and a single column on a phone, with placeholder blocks wherever the final image goes. The spacing annotations along the grid are the values the page will use.
- FR : Des wireframes basse fidélité de la page d'étude de cas : l'ordre des sections, une mise en page en deux colonnes en largeur desktop et une colonne unique sur téléphone, avec des blocs de remplacement partout où viendra l'image finale. Les annotations d'espacement le long de la grille sont les valeurs que la page utilisera.

**constraints**
- EN : The same sections in the same order at both widths, so the page stays readable on a phone without losing anything.
- FR : Les mêmes sections dans le même ordre aux deux largeurs, pour que la page reste lisible sur téléphone sans rien perdre.

### Hi-fi and design system / Hi-fi et design system

**heading**
- EN : Hi-fi and design system
- FR : Hi-fi et design system

**approachLabel**
- EN : Figma to one tokens file
- FR : De Figma à un seul fichier de tokens

**approach**
- EN : The design system was built by hand in Figma, exported, then consolidated into a single tokens file: primitives, semantic roles, then Tailwind. The Figma export files were deleted once the code held the values. The hard decision was which Figma variables become primitives, which become semantic roles, and what components may reference. A script now generates a design-system bundle from the same file for Claude Design.
- FR : Le design system a été construit à la main dans Figma, exporté, puis consolidé dans un seul fichier de tokens : primitives, rôles sémantiques, puis Tailwind. Les fichiers d'export Figma ont été supprimés une fois que le code contenait les valeurs. La décision difficile a été de choisir quelles variables Figma deviennent des primitives, lesquelles deviennent des rôles sémantiques, et ce que les composants ont le droit de référencer. Un script génère maintenant un bundle de design system à partir du même fichier pour Claude Design.

**tools** (l'id du logo ne bouge pas ; seuls label et note se rédigent)
- EN : Figma (hand-built design system, export)
  FR : Figma (design system fait main, export)
- EN : Figma MCP
  FR : Figma MCP
- EN : Claude Code
  FR : Claude Code
- EN : Tailwind CSS 3 (config from tokens file)
  FR : Tailwind CSS 3 (config depuis le fichier de tokens)
- EN : Claude Design (design-system bundle)
  FR : Claude Design (bundle de design system)

**constraints**
- EN : One chain only: tokens, semantic roles, Tailwind config, components. No second color map.
- FR : Une seule chaîne : tokens, rôles sémantiques, config Tailwind, composants. Pas de seconde table de couleurs.

**correction**
- EN : Some leftovers remain and are tracked, not hidden: classes that render nothing (text-md, mt-7xl, and a border class using the wrong token name) and a few hardcoded values in the image viewer and the footer.
- FR : Quelques restes subsistent, suivis et non cachés : des classes qui ne rendent rien (text-md, mt-7xl, et une classe de bordure qui utilise un mauvais nom de token) et quelques valeurs codées en dur dans la visionneuse d'images et le pied de page.

---

## Étape 4 : Build / Construction

### Bloc unique

**approachLabel**
- EN : Phased restructure
- FR : Restructuration par phases

**approach**
- EN : The September 2026 restructure was split into six phase commits, each with verification notes: build passing, type check clean, rendered text identical to the baseline. Content moved from per-locale Markdown files to one YAML file per case study, validated by a schema that fails the build on a malformed entry. Repeated blocks became components, and clickable figures gained keyboard access.
- FR : La restructuration de septembre 2026 a été découpée en six commits de phase, chacun avec des notes de vérification : build qui passe, vérification de types propre, texte rendu identique à la référence. Le contenu est passé de fichiers Markdown par langue à un fichier YAML par étude de cas, validé par un schéma qui fait échouer le build sur une entrée mal formée. Les blocs répétés sont devenus des composants, et les figures cliquables ont gagné un accès au clavier.

**tools** (l'id du logo ne bouge pas ; seuls label et note se rédigent)
- EN : Claude Code (phased restructure)
  FR : Claude Code (restructuration par phases)
- EN : OpenCode (phased restructure)
  FR : OpenCode (restructuration par phases)
- EN : Astro 5 (static output, EN/FR routes)
  FR : Astro 5 (sortie statique, routes EN/FR)
- EN : Zod (schema validation)
  FR : Zod (validation par schéma)
- EN : Tailwind CSS 3
  FR : Tailwind CSS 3

**constraints**
- EN : Fully static output, English at the root and French under /fr, and case studies that can be added without touching the template.
- FR : Sortie entièrement statique, anglais à la racine et français sous /fr, et des études de cas qu'on peut ajouter sans toucher au modèle de page.

**correction**
- EN : The fullscreen image viewer paged through empty image slots because it received the whole positional array. It now receives only the carousel images. French routing also returned 404 errors under the file build format until I added a redirect and fixed the links.
- FR : La visionneuse d'images plein écran parcourait des emplacements d'image vides parce qu'elle recevait tout le tableau positionnel. Elle ne reçoit maintenant que les images du carrousel. Le routage français renvoyait aussi des erreurs 404 avec le format de build en fichiers, jusqu'à ce que j'ajoute une redirection et corrige les liens.

---

## Étape 5 : Test and release / Tester et livrer

### Verification and accessibility / Vérification et accessibilité

**heading**
- EN : Verification and accessibility
- FR : Vérification et accessibilité

**approachLabel**
- EN : Build gate, honest audit
- FR : Contrôle au build, audit honnête

**approach**
- EN : Build and type check run in CI, and the type check is non-blocking. I audited the site by reading the code and computing contrast from the tokens, which produced a concrete fix list: no skip link, no reduced-motion handling, a mobile menu that stays hidden to assistive technology when open, a footer email control that does not respond to the keyboard, and tertiary text at about 2.4:1 contrast. No automated accessibility check exists yet.
- FR : Le build et la vérification de types tournent en CI, et la vérification de types est non bloquante. J'ai audité le site en lisant le code et en calculant le contraste à partir des tokens, ce qui a produit une liste de corrections concrète : pas de lien d'évitement, pas de prise en compte de la réduction des animations, un menu mobile qui reste caché aux technologies d'assistance quand il est ouvert, un contrôle d'e-mail dans le pied de page qui ne répond pas au clavier, et un texte tertiaire à environ 2,4:1 de contraste. Aucune vérification d'accessibilité automatisée n'existe encore.

**tools** (l'id du logo ne bouge pas ; seuls label et note se rédigent)
- EN : Astro build (CI build)
  FR : Build Astro (build CI)
- EN : astro check (type check, non-blocking)
  FR : astro check (vérification de types, non bloquante)
- EN : GitHub Actions (CI build, type check)
  FR : GitHub Actions (build CI, vérification de types)
- EN : Contrast calculation from the tokens
  FR : Calcul du contraste à partir des tokens

**constraints**
- EN : A static site with custom components (carousel, modal, mobile menu), so keyboard behavior is built by hand.
- FR : Un site statique avec des composants sur mesure (carrousel, modale, menu mobile), donc le comportement au clavier est construit à la main.

**correction**
- EN : Clickable case-study figures were bare elements with a click handler. They now expose a button role, a label, focus, and Enter and Space handling.
- FR : Les figures cliquables des études de cas étaient des éléments nus avec un gestionnaire de clic. Elles exposent maintenant un rôle de bouton, un libellé, le focus, et la gestion des touches Entrée et Espace.

### Release / Mise en production

**heading**
- EN : Release
- FR : Mise en production

**approachLabel**
- EN : Push to main, GitHub Pages
- FR : Push sur main, GitHub Pages

**approach**
- EN : Every push to main builds and deploys to GitHub Pages through GitHub Actions, on a custom domain. The sitemap is generated at build, and the site ships canonical URLs, language alternates, Open Graph data, structured data and a machine-readable summary file. Analytics is a privacy-respecting script restricted to the production domain, with custom events that detect rage clicks and dead clicks.
- FR : Chaque push sur main construit et déploie sur GitHub Pages via GitHub Actions, sur un domaine personnalisé. Le sitemap est généré au build, et le site fournit des URL canoniques, des alternatives de langue, des données Open Graph, des données structurées et un fichier de résumé lisible par machine. L'analytique est un script respectueux de la vie privée, limité au domaine de production, avec des événements personnalisés qui détectent les clics répétés et les clics sans effet.

**tools** (l'id du logo ne bouge pas ; seuls label et note se rédigent)
- EN : GitHub Actions (build, deploy on push)
  FR : GitHub Actions (build, déploiement au push)
- EN : GitHub Pages (hosting, custom domain)
  FR : GitHub Pages (hébergement, domaine personnalisé)
- EN : Umami (privacy analytics, click events)
  FR : Umami (analytique privée, événements de clics)

**constraints**
- EN : No server, no database, no cookie banner. The registrar handles DNS and email only.
- FR : Pas de serveur, pas de base de données, pas de bandeau de cookies. Le registraire gère uniquement le DNS et l'e-mail.

**correction**
- EN : The type check in CI is non-blocking, so a type error would not stop a deploy. It is open debt.
- FR : La vérification de types en CI est non bloquante, donc une erreur de types n'empêcherait pas un déploiement. C'est une dette ouverte.

---

## Questions ouvertes pour moi
- (à compléter par toi avant de donner la fiche à l'agent)
