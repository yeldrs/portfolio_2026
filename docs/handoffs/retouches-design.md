# Passation : retouches-design

- Agent / modèle : OpenCode / DeepSeek V4.1 Flash Free
- Branche : agent/opencode-retouches-design
- Date : 2026-11-12

## Objectif

Retouches de design sur la page Workflow (`/workflow`, `/fr/workflow`), sans changer le
contenu rédigé par le propriétaire.

## Fichiers touchés

- `src/components/workflow/WorkflowBlock.astro` (ordre de lecture des blocs)
  - Nouvel ordre dans chaque bloc : titre → écrans → outils → textes (approche,
    contraintes, correction). Les écrans remontent sous le titre du bloc, avant les
    textes ; le sous-titre « Screens » disparaît (il ne servait qu'à les annoncer à
    distance).
  - Ordre HTML et ordre visuel sont identiques (aucun `order` CSS, aucun `flex-row-reverse`),
    donc l'ordre de tabulation et la lecture d'écran suivent : titre, galerie, outils,
    texte.
  - S'applique aussi aux blocs sans titre (ex. `s4-portfolio-0`, section « Delivery »), qui
    commencent donc eux aussi par leurs écrans. Voir « Décisions à prendre ».
  - Le bloc outils sort du `<dl>` et devient un `div` (un `<dt>` sans `<dd>` était invalide).
    Les items gardent `grid-cols-1 sm:grid-cols-2`.
- `src/components/workflow/WorkflowToolList.astro`
  - Le dépliant « Tools I experiment with » est plus discret : `text-xs` au lieu de
    `text-sm`, `font-medium` au lieu de `font-semibold`, icônes de 12 px (`sm-d`) et clé
    à plat en `text-body-tertiary`. Le libellé reste `text-body-secondary` (contraste
    7:1) et repasse en `text-body-primary` au survol.
- `src/components/workflow/WorkflowStepNav.astro` (sommaire de la colonne de gauche)
  - Icônes au repos plus discrètes : anneau `stroke-neutral-primary` (gray-300) au lieu
    du `gray-500` codé en dur, glyphe `text-body-tertiary` (gray-400).
  - Noms d'étapes au repos en `text-body-secondary` au lieu de `text-body-primary`.
    L'accent (`text-body-accent` + gras) reste réservé à l'étape affichée, seule marque
    active du sommaire. Même traitement dans le menu mobile (composant partagé).
  - Titres centrés sur leur icône : le libellé devient une boîte de 32 px
    (`min-h-xl` + `items-center`) et le lien passe en `items-start`, au lieu du
    `pt-xs` qui posait le texte 4 px au-dessus du centre du badge (mesuré : texte
    456–475, badge 450–482, centrés tous les deux à 466).
  - Barres de progression réparées : la barre partait de `top-xl` dans chaque `<li>`,
    d'où un trou de 32 px entre deux étapes et un décrochage de 4 px avant chaque badge.
    Elle est maintenant un rail `.wf-step-rail` ancré sur la géométrie du badge
    (`top: xs + xl`, `bottom: -sm`) : elle part du bas d'un badge, passe sous le badge
    suivant et se fait recouvrir par lui. Vérifié : rail 482–518, badges 450–482 et
    514–546, aucun trou. Couleur `stroke-neutral-primary` (la barre était dans
    l'accent clair, trop présente).
  - Sommaire descendu de 16 px sous la barre de navigation (`spacing.md`, en plus de
    `--site-nav-h`) au lieu d'être collé au header quand il est sticky.
    Vérifié : nav sticky à `top = 71` pour un header de 54,5 px + 16 px.
- `src/components/workflow/WorkflowGallery.astro` (section « Screens hi-fi », projecteur)
  - Le nom de l'écran, le type d'appareil et le bouton d'agrandissement quittent la
    bande du haut (en surimpression sur le canevas) et passent sous les écrans, dans un
    pied `.wg-spot-foot` (colonne centrée) comme la galerie de wireframes. La pagination
    (points + compteur) descend avec eux, sous le nom. Ordre : écrans → nom · appareil ·
    agrandir → points · compteur.
  - Le pied occupe la bande basse que la piste réservait déjà (padding bas inchangé) :
    écrans 544–928, pied 936–984, scène 488–1000 en 1440 px ; en 390 px, écrans
    452–772, pied 780–828. 8 px entre les écrans et le nom, 16 px sous le pied.
  - Canevas de points plus visible et plus étendu : gray-400 à 58 % (42 % avant),
    marge latérale portée à 80 px au-delà du conteneur sur desktop (64 px avant),
    haut du canevas à 8 px du bord de la scène (16 px avant) et vignette élargie
    (pleine valeur jusqu'à 34 %, paliers 56 % / 78 %). Aucun défilement horizontal
    ajouté (`overflow-x: clip` sur `#workflow-page` l'absorbe).
  - `px-2xl` du rang nom/appareil passé à `px-md` : à 360 px, le rang tient sur une
    ligne et ne peut pas recouvrir le bas des écrans.
  - Voile de fin de piste resserré : le fondu commençait à 74 % et couvrait donc presque
    un tiers de la largeur, il mordait sur l'écran voisin. Il démarre maintenant à 80 %
    (paliers 86 / 91 / 96, dernière valeur à 30 % d'opacité) et ne touche plus que la
    sortie de piste.
  - Bug corrigé, écran effacé au changement d'écran : le script cherchait
    `root.querySelector("[data-device-label]")`, or chaque écran porte lui aussi cet
    attribut. Il récupérait l'étiquette du premier écran au lieu de celle du badge et
    réécrivait son texte (« Desktop ») à l'intérieur de l'écran, ce qui vidait le premier
    écran (le « UI kit » du bloc Tenon, invisible en `startAt: 2` dès qu'on reculait d'un
    cran). La recherche est maintenant limitée au badge
    (`chip?.querySelector("[data-device-label]")`). Vérifié : après un clic sur « précédent »,
    l'écran « UI kit » affiche bien son image et le badge lit « Desktop ».
- `src/i18n/ui.ts`
  - Clé `workflow.screens` supprimée dans les deux langues (« Screens » / « Écrans ») :
    plus aucun composant ne l'utilise après la suppression du sous-titre. Aucune autre
    chaîne touchée, aucune formulation modifiée.

Aucun token nouveau : tout passe par les jetons existants (`stroke-neutral-primary`,
`text-body-secondary`, `text-body-tertiary`, `spacing.*`, `theme()` dans les styles
scopés). Le `gray-500` en dur du badge et le `pt-xs` de travers disparaissent.
Aucun contenu de `src/content/` ou `src/data/` modifié, et dans `src/i18n/ui.ts` seule une
clé devenue inutilisée est retirée.

## Vérifications faites

- [x] `npm run build` — 15 pages, aucune erreur
- [x] `npm run check` — 0 erreur, 0 avertissement (9 hints préexistants)
- [x] `git diff --stat` limité aux quatre composants et `ui.ts` (130 insertions,
      100 suppressions)
- [x] Rendu headless (Edge, CDP) en 1440 px et 390 px, EN et FR : sommaire, rail des
      étapes, dépliant des outils, galerie wireframes et projecteur hi-fi
- [x] Sommaire : libellé et icône centrés (466 px pour les deux), rail continu (482–518
      entre deux badges 450–482 et 514–546), sticky à 71 px sous un header de 54,5 px
- [x] Rail des étapes en FR à 800 px (libellé sur deux lignes) : le rail reste continu
- [x] Projecteur : nom, appareil et agrandissement sous les écrans en 1440 px et 390 px,
      pas de recouvrement des écrans, pas de débordement horizontal (`scrollWidth` = 390)
- [x] Le script du projecteur retrouve bien les contrôles déplacés (titre « Game screen »,
      puce `phone`, bouton d'agrandissement actif, 14 points, « 2 / 11 »)
- [x] Écran « UI kit » intact après un changement d'écran (cause du bug `data-device-label`
      ci-dessus), badge toujours lisible
- [x] Ordre des blocs vérifié en 1440 px et 390 px : enfants `[titre, écrans, outils,
      textes]`, libellés résiduels « Tools, Approach, Constraints, Correction » (plus de
      « Screens »), écarts de 24 px entre titre / écrans / outils
- [x] Tous les blocs mesurés : 14 blocs avec galerie, dont 5 sans titre (`s1-*`, `s2-*`,
      `s4-*`) qui commencent désormais par les écrans
- [x] Check visuel du propriétaire — validé le 2026-11-12

## Points non finis

- Le sommaire mobile (barre plaquée sous la navbar en dessous de `md`) garde son
  alignement à ras : c'est une barre pleine largeur avec bordure basse, elle fait corps
  avec le header. Seul le sommaire de la colonne de gauche est descendu de 16 px.
- Le rang « nom · appareil · agrandir » reste sur une ligne avec les légendes actuelles
  (les plus longues : « Case study, 900.care », « Étude de cas, 900.care »). Une légende
  beaucoup plus longue passerait sur deux lignes et mordrait sur le bas des écrans : le
  pied est en `flex-wrap`, il faudrait alors augmenter le `padding-bottom` de `.wg-track`.
- Aucun test Safari / appareil physique (mêmes `mask-image` et `color-mix` qu'avant).
- Les écrans arrivent avant le texte dans tous les blocs, y compris ceux sans titre
  (« Delivery », « Research »…). Dans ces blocs, la galerie suit directement le titre de
  section. **Arbitré par le propriétaire : on garde cet ordre partout.**
- Rien n'est commité sur `main` : le travail est commité sur
  `agent/opencode-retouches-design` pour relecture du principal.

## Décisions à prendre (propriétaire)

- Descendre le sommaire de 16 px (`spacing.md`) est un choix ; `spacing.lg` (24 px) si
  vous le voulez plus décollé de la navbar.
- Les icônes au repos sont en gray-400 sur anneau gray-300. Si c'est trop pâle, l'étape
  suivante serait gray-500 / gray-400 (`text-body-secondary` pour le glyphe).
- Le canevas de points est à 58 % de gray-400 ; 50 % ou 66 % si vous voulez un cran
  en dessous ou au-dessus.

## Point de backlog proposé

- `BACKLOG.md`, section « Workflow page » : le point « Vérifier le mobile des galeries
  (rail, projecteur) et le flou du UI kit au centre du projecteur » peut passer en revue :
  le pied du projecteur a été mesuré en 390 px, le bug qui effaçait le UI kit est corrigé,
  le reste de la galerie est inchangé.

## Session 2 (2026-11-12) : icônes d'onglets, respiration des galeries, captures du site

### Icônes des onglets projet (arrondi)

- `src/styles/tokens.js` : nouveau pas de rayon `lg: "8px"` entre `md` (6 px) et `xl` (12 px).
- `tailwind.config.mjs` : ce pas est mappé (`lg: tokens.primitives.borderRadius.lg`), donc
  `rounded-lg` devient un token. Valeur identique au défaut Tailwind déjà utilisé ailleurs
  (`Navbar.astro`, `AboutLayout.astro`) : aucun changement visuel sur ces usages.
- `src/components/workflow/ToolLogo.astro` : la tuile d'onglet projet (`fill`, utilisée
  seulement par `WorkflowProjectTabs`) passe de 6 px à 8 px (`rounded-md` → `rounded-lg`).
  Les tuiles d'outils (listes, teaser) restent à 6 px : seule la tuile projet change.
  Tuile mesurée à 24 × 24 px, rayon calculé 8 px sur les trois onglets, EN et FR.

### Respiration autour des galeries d'écrans

Le bloc garde son `gap-lg` (24 px). C'est le rembourrage interne des galeries qui créait le
vide, surtout au-dessus et en dessous des écrans.

- `WorkflowGallery.astro`, galerie `rail` (wireframes)
  - `padding-block` : 24 / 32 px (mobile) et 24 / 48 px (desktop) → **8 / 24 px** partout.
    Le pas de 24 px au-dessus venait de l'ancien sous-titre « Screens », supprimé à la
    session précédente ; l'écart sous le titre de bloc est maintenant le `gap-lg` seul.
  - Canevas (`wg-mat`) : bas ramené de 80 px (96 px desktop) à 48 px (64 px desktop), pour
    qu'il s'arrête toujours au niveau de la légende avec la hauteur réduite.
  - Mesures desktop : titre → cadre 32 px (48 avant), légende + puce → outils 56 px (80 avant).
    Mobile : mêmes valeurs.
- `WorkflowGallery.astro`, galerie `spotlight` (hi-fi)
  - Hauteur de scène : 448 → 416 px (mobile), 512 → 480 px (desktop). Le facteur d'échelle
    passe de `3xl × 2` (128 px) à `2xl × 2` (96 px), donc les écrans **gardent leur taille**
    (320 px de haut mobile, 384 px desktop) et l'espace de canevas au-dessus tombe de 56 à
    24 px. Bande sous les écrans inchangée (72 px, occupée par la légende et la pagination).
  - Mesures : titre → écran 48 px (80 avant), écran → légende 8 px, légende → outils 40 px.
- Aucun contenu de `src/content/projects/**` ni de `src/data/**` modifié.

### Captures du site pour la section « Hi-fi » du projet portfolio

Cinq captures du site en ligne (`yassineelidrissi.com`), faites le 2026-11-12 avec Edge
headless (CDP), `deviceScaleFactor: 2`, barres de défilement masquées, polices et images
chargées avant capture. Cadrage = la fenêtre exacte du cadre d'appareil, donc aucun recadrage
par `object-cover`.

| Écran | Appareil | Langue | Fichier | Taille |
|---|---|---|---|---|
| Accueil (bannière) | desktop 1280 × 800 | EN | `portfolio-hifi-home-desktop.webp` | 2560 × 1600 |
| Cartes d'études de cas (CDC) | desktop 1280 × 800 | FR | `portfolio-hifi-cards-desktop.webp` (nouveau) | 2560 × 1600 |
| Étude de cas 900.care | tablette 800 × 1280 | EN | `portfolio-hifi-case-tablet.webp` | 1600 × 2560 |
| À propos | téléphone 360 × 800 | EN | `portfolio-hifi-about-phone.webp` | 720 × 1600 |
| Contact (pied de page) | téléphone 360 × 800 | FR | `portfolio-hifi-footer-phone.webp` (nouveau) | 720 × 1600 |

- Les trois anciens fichiers sont remplacés, mêmes noms, mêmes dimensions, même appareil :
  leurs légendes et leurs `alt` existants restent justes (le cadrage a été refait à
  l'identique, sans barre de défilement visible).
- `src/content/workflow/step-3.yaml`, bloc `portfolio` / « Hi-fi and design system » : deux
  écrans ajoutés dans les deux langues (desktop cartes CDC en FR, téléphone contact en FR).
  **Texte à relire par le propriétaire** : `caption`, `sub` et `alt` des deux nouveaux écrans
  sont de ma main (« Case-study cards » / « Cartes d'études de cas », « Contact »).
  Aucun autre texte du fichier n'est touché.
- Le projecteur garde son échelle : l'écran le plus haut du jeu est la tablette portrait
  (1280 dp), donc le desktop s'affiche à 384 × 240 px et les téléphones à 108 × 240 px, comme
  avant. Passer le desktop en 1280 × 800 paysage ne change rien à cette règle.

### Vérifications

- [x] `npm run build` : 15 pages, aucune erreur (images optimisées par Astro)
- [x] `npm run check` : 0 erreur, 0 avertissement (9 hints préexistants)
- [x] Galerie hi-fi : 5 écrans et 5 points en EN et FR, légendes `Home / Case-study cards /
      900.care / About / Contact` et `Accueil / Cartes / 900.care / À propos / Contact`
- [x] Captures vérifiées avant conversion : aucun débordement horizontal (scrollWidth =
      clientWidth en 1280, 800 et 360), polices chargées, bannière de consentement absente
- [x] Rail et projecteur remesurés en 1440 px et 390 px (valeurs ci-dessus)
- [x] Tuiles d'onglets : rayon 8 px, taille 24 px, dans les deux langues

