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
  Tuile mesurée à 32 × 32 px, rayon calculé 8 px sur les trois onglets, EN et FR.
  Même tuile : passage de 24 à 32 px et fichier servi à 96 px (3×) au lieu de 16 px
  agrandi, qui rendait flou sur écran retina.

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

Six captures du site en ligne (`yassineelidrissi.com`), faites le 2026-11-12 avec Edge
headless (CDP), `deviceScaleFactor: 2`, barres de défilement masquées, polices et images
chargées avant capture. Cadrage = la fenêtre exacte du cadre d'appareil, donc aucun recadrage
par `object-cover`.

| Écran | Appareil | Langue | Fichier | Taille |
|---|---|---|---|---|
| Accueil (bannière) | desktop 1280 × 800 | EN | `portfolio-hifi-home-desktop.webp` | 2560 × 1600 |
| Cartes d'études de cas (CDC) | desktop 1280 × 800 | FR | `portfolio-hifi-cards-desktop.webp` (nouveau) | 2560 × 1600 |
| Étude de cas 900.care | tablette 800 × 1280 | EN | `portfolio-hifi-case-tablet.webp` | 1600 × 2560 |
| La même page, sur téléphone | téléphone 360 × 800 | EN | `portfolio-hifi-case-phone.webp` (nouveau) | 720 × 1600 |
| À propos | téléphone 360 × 800 | EN | `portfolio-hifi-about-phone.webp` | 720 × 1600 |
| Contact (pied de page) | téléphone 360 × 800 | FR | `portfolio-hifi-footer-phone.webp` (nouveau) | 720 × 1600 |

- Les trois anciens fichiers sont remplacés, mêmes noms, mêmes dimensions, même appareil :
  leurs légendes et leurs `alt` existants restent justes (le cadrage a été refait à
  l'identique, sans barre de défilement visible).
- `src/content/workflow/step-3.yaml`, bloc `portfolio` / « Hi-fi and design system » : trois
  écrans ajoutés dans les deux langues (desktop cartes CDC en FR, téléphone contact en FR,
  étude de cas sur téléphone en EN). **Texte à relire par le propriétaire** : `caption`,
  `sub` et `alt` de ces trois écrans sont de ma main (« Case-study cards » / « Cartes d'études
  de cas », « Same page, on a phone » / « La même page, sur téléphone », « Contact »).
  Aucun autre texte du fichier n'est touché.
- L'étude de cas est capturée deux fois (tablette et téléphone) pour montrer la même page
  en deux colonnes puis en une colonne : c'est la démonstration du responsive.

### Hiérarchie de taille des écrans du projecteur

Retours du propriétaire : « pourquoi la tablette est plus grande que desktop ? », « la tablette
ressemble trop à un pc », puis « tous les écrans ont la même hauteur, il faut que les mobiles
soient un peu plus petits que tablette et pc, et tablette un peu plus petite que pc ».
Objectif : montrer le responsive.

- Règle : le desktop donne la hauteur de référence (la bande de scène : 384 px en desktop,
  320 px en mobile). La tablette vaut **90 %** de cette hauteur, le téléphone **80 %**.
  La largeur de chaque cadre vient ensuite de son ratio, donc la rangée descend du desktop vers
  le mobile : 614 × 384, 216 × 346, 138 × 307. Les cadres sont posés sur la même ligne de base.
- `WorkflowGallery.astro` : plus de facteur px / dp commun. `size()` ne sert plus qu'au rail,
  l'item de projecteur reçoit `--ar` (ratio dp de l'appareil) et `--k` (facteur d'appareil,
  défini en CSS : `1` par défaut, `0.9` tablette, `0.8` téléphone), puis
  `largeur = bande × --ar × --k`. Le centrage (`padding-inline` de la piste) utilise
  `--first-ar` / `--last-ar`.
- La tablette reste en **portrait** (800 × 1280 dp) : cadre de tablette reconnaissable, plus
  haute que le téléphone mais plus basse que le desktop, et deux fois et demie plus étroite.
- Garde-fou de largeur sur `.wg-item` (`max-width: calc(100cqw - spacing.2xl)`) : sous
  1024 px de viewport, le desktop de 1280 dp est plus large que la colonne ; il est plafonné
  au lieu d'être coupé par le bord du rail. Le cadre garde son ratio, donc sous 768 px le
  desktop devient plus court que la tablette : c'est le prix du non-recadrage sur un écran de
  téléphone, où la scène ne fait que 390 px de large.
- Tailles mesurées, galerie portfolio, EN et FR (6 écrans) :

| Viewport | Scène | Desktop | Tablette | Téléphone |
|---|---|---|---|---|
| 1440 px | 896 × 480 | 614 × 384 | 216 × 346 | 138 × 307 |
| 1024 px | 697 × 480 | 614 × 384 | 216 × 346 | 138 × 307 |
| 768 px | 498 × 480 | 450 × 281 (plafonné) | 216 × 346 | 138 × 307 |
| 390 px | 390 × 416 | 342 × 214 (plafonné) | 180 × 288 | 115 × 256 |

### Cadres de prévisualisation non défilants

Demande du propriétaire : les captures ne doivent plus défiler dans les cadres des galeries
hi-fi et maquette.

- `DeviceFrame.astro` : la fenêtre desktop gardait un écran défilant (`overflow-y: auto`, image
  en `height: auto`) pour les captures pleine page ; c'était le seul cadre encore défilant.
  Elle passe en `overflow: hidden`, l'image reprend la règle commune
  (`height: 100%`, `object-fit: cover`, `object-position: top center`), donc elle est cadrée
  sur le haut de la capture, comme sur téléphone et tablette.
- Effet : environ 10 % du bas d'une capture desktop n'est plus visible dans le cadre (le cadre
  réserve 9 % de sa hauteur à la barre de fenêtre). L'image entière reste à un clic, dans la
  visionneuse. Aucun autre cadre ne défilait déjà : la piste wireframe (`wg-flat`) est en
  `overflow-hidden` avec `object-cover`.
- `DeviceFrame` n'est utilisé que par `WorkflowFrame`, donc les pages projet et les galeries
  `grid` ne sont pas concernées.

### Vérifications

- [x] `npm run build` : 15 pages, aucune erreur (images optimisées par Astro)
- [x] `npm run check` : 0 erreur, 0 avertissement (9 hints préexistants)
- [x] Galerie hi-fi : 6 écrans et 6 points en EN et FR, légendes `Home / Case-study cards /
      900.care / Same page, on a phone / About / Contact` et `Accueil / Cartes / 900.care /
      La même page, sur téléphone / À propos / Contact`
- [x] Captures vérifiées avant conversion : aucun débordement horizontal (scrollWidth =
      clientWidth en 1280, 800 et 360), polices chargées, bannière de consentement absente
- [x] Rail et projecteur remesurés en 1440 px et 1024, 768 et 390 px (valeurs ci-dessus)
- [x] Tuiles d'onglets : rayon 8 px, tuile 32 px, image servie en 96 px, dans les deux langues
- [x] Projecteur : hauteurs 384 / 346 / 307 px (desktop / tablette / téléphone), tablette en
      portrait dans les deux langues, aucun débordement vertical de la piste
      (scrollHeight = clientHeight)
- [x] Cadres non défilants : `overflow-y: hidden` sur les 6 écrans du projecteur portfolio et
      sur la fenêtre desktop du UI kit Tenon, image à la hauteur de l'écran
      (scrollHeight = clientHeight = hauteur du cadre)

## Session 3 (2026-11-12) : ombre des appareils hi-fi et wireframes du portfolio

### Ombre portée derrière les appareils (galerie hi-fi)

- Cause : `WorkflowGallery.astro` écrasait l'ombre du cadre d'appareil. La règle
  `.wg-item :global(.pf) { box-shadow: theme("boxShadow.sm") }` (spécificité 0,2,0) passait
  devant le `.pf` de `DeviceFrame.astro` (0,1,0), donc l'ombre réelle
  (`0 16px 32px -4px`, 22 % de gray-950) n'était jamais rendue.
- Correction : règle supprimée. Le cadre reprend son ombre. Mesuré dans le navigateur :
  `color(srgb 0.0117647 0.027451 0.0705882 / 0.22) 0px 16px 32px -4px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px`.
- Aucun espacement changé : la piste réserve 56 px sous les écrans, l'ombre en occupe 44,
  elle n'est pas rognée. Vaut pour toutes les galeries `spotlight` (Tenon en thème sombre
  comme le portfolio).

### Wireframes du portfolio (étape 3)

- Les deux captures ajoutées par le propriétaire sont renommées à la convention du dossier
  (minuscules, tirets) :
  - `src/assets/workflow/portfolio-wire-case-desktop.png` (1512 x 3035), avant
    `ProjectPage desktop.png` ;
  - `src/assets/workflow/portfolio-wire-case-phone.png` (375 x 1818), avant
    `HomePage mobile.png`.
- `src/content/workflow/step-3.yaml`, bloc `portfolio` / « Wireframes » : le bloc passe de
  `status: not-applicable` à un vrai bloc dans les deux langues, `gallery: rail`, deux écrans
  (desktop puis téléphone) avec `caption` et `alt`.
- **Texte à relire par le propriétaire** : `approachLabel`, `approach`, `constraints`,
  `caption` et `alt` des deux langues sont de ma main. Aucun autre texte du fichier n'est
  touché. Pas de liste `tools` : je n'ai pas voulu inventer d'outil pour cette étape.

### Vérifications

- [x] `npm run build` : 15 pages, aucune erreur (les deux PNG passent par astro:assets)
- [x] `npm run check` : 0 erreur, 0 avertissement (9 hints préexistants)
- [x] `git diff --stat` limité à `WorkflowGallery.astro` et `step-3.yaml` (28 insertions,
      5 suppressions), plus les deux PNG ajoutés
- [x] Rendu headless (Edge, CDP) en 1440 px et 390 px, EN et FR : bloc wireframes visible
      dans les deux langues, ombre présente sous les appareils du projecteur
- [x] Aucun débordement horizontal de page en 390 px (`scrollWidth` = 390)
- [x] Rail mesuré : 512 x 320 (desktop) et 144 x 320 (téléphone) à l'échelle 0,4 px/dp

### Points non finis

- Les deux wireframes sont des captures pleine page : le cadre les recadre par le haut
  (`object-cover`) et coupe le texte au bas du cadre. L'image entière reste accessible au
  clic, dans la visionneuse.
- En 390 px, le premier écran du rail (desktop, 512 px de large à l'échelle fixe) dépasse la
  largeur visible : il faut faire défiler la piste. Le rail n'a pas de plafond de largeur,
  contrairement au projecteur.
- Le bloc « Wireframes » du portfolio n'est plus « non applicable » : le sommaire interne du
  panneau portfolio affiche maintenant deux entrées réelles.

### Décisions à prendre (propriétaire)

- Recadrer les deux sources au ratio du cadre (comme les captures hi-fi) ou garder la page
  entière avec le recadrage actuel.
- Ordre du rail : desktop d'abord (cohérent avec la galerie hi-fi) ou téléphone d'abord, plus
  confortable sur mobile.
- Ajouter ou non des outils à ce bloc si les wireframes viennent d'un outil précis.

### Point de backlog proposé

- `BACKLOG.md`, section « Workflow page » : plafonner la largeur des items du rail
  (`wg-ritem`) sous `md`, comme le fait déjà `.wg-item` du projecteur, pour qu'un écran
  desktop ne soit jamais coupé par le bord sur téléphone.

## Session 4 (2026-11-12) : capture des variables Figma dans le bloc Hi-fi du portfolio

### Capture

- `src/assets/workflow/portfolio-hifi-tokens.png` (737 x 648, 105 Ko) : capture du panneau
  Variables de Figma fournie par le propriétaire (fichier d'origine `tokens website.png`,
  renommé à la convention du dossier). Le fichier se trouvait dans le worktree
  `opencode-workflow-mobile`, pas dans celui-ci.
- Le wireframe mobile long (`portfolio-wire-case-phone.png`) était déjà en place depuis la
  session 3 : rien à refaire de ce côté.

### Plaque à plat (nouveau)

- `src/content/config.ts` : champ optionnel `figure` sur un bloc (`src`, `alt`, `caption`,
  `sub?`), ajouté aussi à la signature de structure EN/FR. **Zone normalement interdite aux
  secondaires** : modification faite sur accord explicite du propriétaire, à relire par le
  principal.
- `src/components/workflow/WorkflowFigure.astro` (nouveau) : figure pleine colonne, ratio
  naturel (aucun recadrage, aucun cadre d'appareil), largeur plafonnée à la largeur native
  de l'image (737 px) et centrée, légende + sous-ligne, clic = visionneuse (même groupe que
  les écrans du bloc).
- `src/components/workflow/WorkflowBlock.astro` : la figure est rendue juste après la
  galerie, avant les outils. Ordre de lecture : écrans, plaque, outils, textes.
- `src/content/workflow/step-3.yaml` : `figure` ajoutée au bloc `portfolio` /
  « Hi-fi and design system » dans les deux langues.

### Texte à relire par le propriétaire

`caption`, `sub` et `alt` de la figure, dans les deux langues, sont de ma main :

- EN : « Figma variables » / « Primitive and semantic collections behind the tokens file ».
- FR : « Variables Figma » / « Collections primitive et sémantique derrière le fichier de
  tokens ».

### Vérifications

- [x] `npm run build` : 15 pages, aucune erreur ; l'image passe par astro:assets
      (PNG 105 Ko → WebP 23 Ko)
- [x] `npm run check` : 0 erreur, 0 avertissement (9 hints préexistants)
- [x] Rendu headless (Edge, CDP) en 1440 px et 390 px, onglet « This portfolio » : plaque
      735 x 646 px à 1440 (colonne de 896 px, plafond natif) et 358 x 359 px à 390 px ;
      ratio 737/648 conservé, aucun recadrage
- [x] Aucun débordement horizontal (`scrollWidth` = 390 en 390 px, 1425 en 1440 px)
- [x] Légende et sous-ligne centrées sous la plaque, 24 px avant le bloc Outils (même
      rythme que les autres blocs)
- [x] Clic : la plaque ouvre la visionneuse avec `data-zoom-group="s3-portfolio-1"`, donc les
      flèches parcourent les écrans du même bloc
- [x] FR : capture présente et légende traduite dans `dist/fr/workflow.html`

### Points non finis / à signaler

- Deux fichiers sont supprimés dans le worktree avant cette session
  (`src/assets/workflow/portfolio-build-01.webp`, `portfolio-verification-01.webp`) : les
  blocs portfolio des étapes 4 et 5 affichent donc un emplacement vide. Ce n'est pas de mon
  fait et je ne les ai pas restaurés. À trancher par le propriétaire.
- La plaque est plafonnée à 737 px : au-delà (colonne de 896 px à 1440), elle reste centrée
  et laisse environ 80 px de chaque côté. L'étirer à la colonne flouterait la capture, dont
  la source fait 737 px de large.

### Décision à prendre (propriétaire)

- Place de la plaque : après le projecteur (choix actuel) ou avant, pour ouvrir le bloc sur
  le design system.

## Session 5 (2026-11-13) : retouches des galeries du projet portfolio

Demandes du propriétaire sur `/workflow` et `/fr/workflow`, onglet « This portfolio ».
Aucun texte rédigé par le propriétaire n'est modifié : seuls des écrans et des styles
changent.

### Puces d'appareil retirées

- `WorkflowGallery.astro` : la puce « Desktop / Tablette / Téléphone » disparaît sous les
  wireframes (galerie `rail`) et sous les écrans hi-fi (projecteur, `switchable`). Le bouton
  d'agrandissement reste. Le rang du pied ne contient plus que le nom et l'icône zoom.
- Le libellé de wireframe redevient une simple ligne centrée (`span.block text-center`) au
  lieu d'une colonne, pour garder les 8 px entre le cadre et la légende.
- Nettoyage associé : import de `WorkflowDeviceChip` retiré, `data-device-label` retiré des
  items, et le script ne met plus à jour la puce (`chip`, `chipLabel`). L'attribut
  `data-device` reste : il porte encore `--k` (hauteur par appareil) en CSS.
- Le pied du projecteur garde sa hauteur : le bouton zoom reçoit `-my-xs` (il est plus haut
  que la ligne de texte), donc légende → points reste à 8 px.

### Écrans de développement du bloc portfolio (étape 4)

- `src/content/workflow/step-4.yaml` : la liste `screens` du bloc portfolio est retirée dans
  les deux langues (deux écrans : visionneuse desktop, route `/fr` mobile). Le bloc garde son
  titre, ses outils et ses textes.
- `src/assets/workflow/portfolio-build-02.webp` supprimé (il n'était plus référencé).
  `portfolio-build-01.webp` n'était déjà plus sur le disque depuis la session 4 : la
  référence cassée disparaît avec la même suppression.

### Onglet « Ce portfolio »

- `ToolLogo.astro` : nouvelle prop `bordered` (défaut `true`). La classe `border` n'est posée
  que si `bordered` ou si le logo manque (le carré pointillé garde sa bordure).
- `WorkflowProjectTabs.astro` : `bordered={id !== "portfolio"}`. Seul l'onglet portfolio perd
  son contour, les deux autres onglets sont inchangés.
- `src/assets/logos/portfolio.svg` : couleurs inversées, fond `#182d34` et Y `#f3f4f6`
  (gray-100). Le SVG dessine lui-même son carré arrondi, d'où la bordure devenue inutile.

### Alignement et surface de la galerie hi-fi

- Premier écran collé à gauche : `padding-inline-start: spacing.md` (mobile, comme le rail)
  et `0` à partir de `md` (le conteneur donne déjà la marge). `--first-ar` n'est plus
  calculé, seul `--last-ar` sert encore au centrage de fin de piste.
- Masque de piste : fondu au bord droit seulement (`#000 calc(100% - 3xl) → transparent`),
  comme le rail des wireframes. L'ancien masque elliptique centré effaçait le premier écran
  maintenant qu'il est à gauche.
- Surface : `.wg-spot-mat` reprend exactement les insets et le masque de `.wg-mat`
  (`sm 0 2xl` mobile, `sm -3xl 3xl` desktop, dégradés 4 % / 60 % / 6 % / 94 %) ; seule la
  texture change (points Canva au lieu de la grille de découpe). Mesuré à 1440 px : canevas
  368–1392 dans les deux galeries, soit la même étendue horizontale.
- Écarts mesurés à 1440 px : cadre wireframe → légende 8 px, cadre hi-fi → légende 8 px,
  légende → points 8 px. À 390 px : mêmes 8 / 8, premier écran hi-fi à `left: 16` comme le
  wireframe.

### Plaque des variables Figma

- `WorkflowFigure.astro` : largeur plafonnée à `min(largeur native, 640px)` via une constante
  `maxWidth` (737 px avant), et `sizes` aligné. La plaque mesure 640 × 606 à 1440 px au lieu
  de 735 × 646 : environ 13 % plus petite, toujours centrée, ratio conservé. C'est la seule
  figure du site qui passe par ce composant.

### Vérifications

- [x] `npm run build` : 15 pages, aucune erreur
- [x] `npm run check` : 0 erreur, 0 avertissement (9 hints préexistants)
- [x] `git diff --stat` : 7 fichiers hors fiche, 51 insertions, 92 suppressions (périmètre de
      la tâche)
- [x] Rendu headless (Edge, CDP) en 1440 px et 390 px, onglet portfolio : plus aucune puce
      d'appareil, icône zoom présente, onglet sans contour avec Y clair sur fond sombre
- [x] Mesures DOM (voir ci-dessus) pour les écarts, l'alignement à gauche et l'étendue des
      deux canevas
- [x] Aucun débordement horizontal de page en 390 px (le rail wireframe défile dans sa piste,
      comme avant)
- [x] FR : mêmes retouches (styles partagés) et bloc étape 4 sans écrans dans les deux langues

### Points non finis / à signaler

- `WorkflowDeviceChip.astro` et les clés `workflow.device.phone|tablet|desktop` (EN et FR)
  ne sont plus utilisés. Je ne les ai pas supprimés : le composant peut resservir, et les
  clés sont du texte de l'auteur. À trancher.
- En 390 px, la scène hi-fi garde sa hauteur fixe alors que l'écran desktop est plafonné en
  largeur : il reste environ 130 px de canevas pointillé au-dessus de l'écran. C'était déjà
  le cas avant (même hauteur de scène), la texture le rend seulement plus visible. Le
  wireframe, lui, n'a pas ce vide.
- La flèche « précédent » du projecteur chevauche le premier écran maintenant qu'il est à
  gauche ; elle est désactivée (opacité 30 %) tant qu'on est sur le premier écran. Inchangé.
- Pas de test Safari ni d'appareil physique (mêmes `mask-image` et `color-mix` qu'avant).
- Rien n'est commité sur `main` : travail sur `agent/opencode-retouches-design`, à relire par
  le principal.

### Décisions à prendre (propriétaire)

- Supprimer `WorkflowDeviceChip.astro` et ses trois clés i18n, ou les garder pour un autre
  usage.
- Plafond de la plaque Figma : 640 px (choix actuel), 600 px si vous la voulez plus discrète,
  ou retour à la largeur native.
- Vide de canevas au-dessus des écrans en mobile : le résorber en réduisant la hauteur de
  scène sous `md` (l'écran desktop plafonné perdrait alors le rythme commun des scènes), ou
  le laisser tel quel.

### Point de backlog proposé

- `BACKLOG.md`, section « Workflow page » : retirer le composant `WorkflowDeviceChip` et les
  clés `workflow.device.*` devenues inutilisées, ou documenter qu'elles servent de réserve.


