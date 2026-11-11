# Passation : wireframes-pleine-largeur

- Agent / modèle : OpenCode / DeepSeek V4.1 Flash Free
- Branche : agent/opencode-wireframes-pleine-largeur
- Date : 2026-11-11, affiné le 2026-11-12

## Objectif

Donner toute la largeur de la page aux galeries d'écrans sur mobile, et faire commencer
le fond « plan de travail » (grille) et « canevas à points » avant les maquettes, y
compris quand le fond dépasse le conteneur sur desktop.

## Fichiers touchés

- `src/components/workflow/WorkflowBlock.astro`
  - La galerie d'écrans (grid, rail, spotlight) est en pleine largeur sur mobile
    (`-mx-md`), dans le conteneur à partir de `md`.
  - Le libellé « Screens » reste dans la colonne de texte.
- `src/components/workflow/WorkflowGallery.astro`
  - Rail : le fond quadrillé (`.wg-mat`) cadre les maquettes, pas les légendes : il commence
    8 px sous le haut du rail (16 px au-dessus des écrans, 16 px sous le libellé « Screens »)
    et s'arrête 14 px sous les écrans, avant la ligne légende + type d'appareil. Il déborde
    à gauche et à droite de la colonne sur desktop.
  - Rail : le voile de fin de défilement à droite est devenu un masque CSS sur la piste,
    pour ne plus recouvrir le fond.
  - Rail : `scroll-padding-inline-start` aligné sur le padding gauche, pour que le
    scroll-snap ne coupe plus le premier écran.
  - Rail, échelle : `--wg-u: 0.4px` par dp (au lieu d'un ratio lié à la largeur du
    conteneur). Les tailles d'appareil étant des multiples de 40 dp, chaque écran fait
    144 x 320 (téléphone), 320 x 512 (tablette) ou 512 x 320 (desktop) et tombe donc
    exactement sur les lignes de 16 px. L'ancien ratio donnait des largeurs fractionnaires
    (115,47 px) qui ne pouvaient pas s'aligner.
  - Rail, grille : couleur neutre (`stroke-neutral-primary`, 30 % / 60 %), mailles de
    16 px et repères majeurs tous les 64 px. Le padding haut de la piste est retiré et le
    padding gauche desktop passe à 0.
  - Rail, espacement : 32 px entre les écrans, soit deux mailles de 16 px ; le rythme de la
    grille continue d'un écran à l'autre.
  - Rail, grille : ombre portée `boxShadow.md` sur `.wg-flat` (l'ancien `sm` était
    invisible), sous chaque écran.
  - Spotlight : le cadre gris `rounded-card` devient un canevas de points qui déborde de
    la scène et se fond sur les quatre côtés. Les écrans et les contrôles restent inchangés.
  - Spotlight, étendue : le canevas suit la logique du rail, 40 px de points au-dessus et
    en dessous des écrans (au lieu de 64 px au-dessus de la scène), 64 px de débord latéral
    sur desktop. Les contrôles (type d'appareil, loupe, pagination) sortent du champ.
  - Spotlight, points : maille à 14 px, point de 1 px à 42 % de gray-400.
    Le canevas porte une vignette radiale `closest-side` avec paliers adoucis
    (26 % / 52 % / 76 %) : le dégradé atteint zéro pile sur les bords, sans arête visible,
    et tourne avec les coins.
  - Spotlight, masque des écrans : masque CSS fixe sur la piste, en ellipse (50 % x 175 %)
    et non plus en bande droite ; paliers 74 % / 82 % / 89 % / 95 % pour un fondu plus
    plumeux. 0 % d'opacité au bord du conteneur, ~70 % à l'entrée de la bande, pleine
    valeur ensuite. Les écrans passent dans ce masque : ce sont eux qui défilent, pas le
    dégradé. Aucun voile blanc, aucune désaturation.
- `src/components/workflow/ToolLogo.astro`
  - Nouvelle prop `fill` : le logo occupe tout l'emplacement bordé (pas de marge interne),
    avec `overflow-hidden` sur la tuile.
- `src/components/workflow/WorkflowProjectTabs.astro`
  - Les icônes d'onglet passent `fill` : l'image Tenon remplit la tuile comme les autres.
    Les listes d'outils gardent leurs icônes de 16 px.
- `src/assets/workflow/portfolio-hifi-{home-desktop,case-tablet,about-phone}.webp`
  - Captures du portfolio lui-même (accueil en 1280 x 800, étude de cas 900.care en
    800 x 1280, à propos en 360 x 800), sans barre de défilement du navigateur.
- `src/content/workflow/step-3.yaml`
  - Bloc « Hi-fi » du projet portfolio : `gallery: spotlight` et trois écrans réels
    (desktop, tablette, téléphone) à la place des deux légendes sans image, en `en:`
    et en `fr:`. Même nombre d'écrans dans les deux langues.
- `src/components/workflow/WorkflowScreen.astro`
  - Légende et liste de repères : `px-md` sur mobile pour rester alignées avec le texte
    quand l'image de la galerie grid est en pleine largeur.
- `src/layouts/WorkflowLayout.astro`
  - `overflow-x: clip` sur `#workflow-page` : les fonds peuvent sortir de la colonne sans
    créer de défilement horizontal ; `clip` ne crée pas de conteneur de défilement, donc
    la navigation d'étapes et les onglets restent collants (vérifié).

## Vérifications faites

- [x] `npm run build` — 15 pages, aucune erreur (relancé après les captations)
- [x] `npm run check` — 0 erreur, 0 avertissement (9 hints préexistants)
- [x] `git diff --stat` limité aux composants, au YAML de l'étape 3 et aux trois captures
- [x] Rendu headless (Edge, 390 px et 1440 px) : rail et spotlight en EN, onglet Tenon
      et onglet Portfolio (spotlight avec captures)
- [x] Mobile : largeur de la galerie = 390 px (x = 0), pas de débordement horizontal du
      document, premier écran du rail à x = 16 (padding conservé)
- [x] Desktop : pas de débordement horizontal du document, le fond dépasse bien la colonne
- [x] Rail : marges mesurées — 16 px de fond au-dessus des écrans, 14 px en dessous, arrêt
      2 px avant la ligne de légende ; 32 px de gap entre écrans
- [x] Rail, alignement : les quatre bords de chaque écran mesurés à 0 modulo 16 px par
      rapport à l'origine de la grille, en 1440 px et en 390 px
- [x] Hi-fi : canevas mesuré à 40 px au-dessus et en dessous des écrans ; un seul masque
      radial `closest-side` sur le canevas ; masque elliptique fixe sur la piste ;
      rendu vérifié en 390 px et 1440 px, aucun bord droit, aucun voile blanc
- [x] Portfolio, onglet « This portfolio » : les trois captures s'affichent dans les cadres
      desktop, tablette et téléphone, avec les légendes et le type d'appareil

## Points non finis

- Pas de test sur appareil physique ni sur Safari : le rail utilise encore le couple
  `mask-image` / `-webkit-mask-composite: source-in` pour son fondu à droite, et la piste
  du projecteur un `mask-image` radial (supporté depuis Safari 15.4).
- Les interactions du projecteur (flèches, clic sur un voisin, zoom) n'ont pas été
  rejouées après le changement de fond ; le DOM et le script n'ont pas changé.
- La page FR n'a pas été ouverte : elle utilise les mêmes composants et les mêmes classes,
  et le build valide la parité des écrans entre `en:` et `fr:`.

## Décisions prises (propriétaire)

- Le projecteur garde le champ de points sans carte grise : rendu validé, seules l'échelle
  des points et l'étendue du fondu ont été revues.
- Le fondu des écrans ne doit pas être un voile blanc ni une bande droite : le masque est
  fixe sur le conteneur, elliptique et plumeux, et les écrans passent dedans.
- La galerie grid garde le plein écran mobile, légendes rentrées de 16 px.
- La grille du rail garde une couleur neutre et discrète, alignée sur les écrans, avec une
  ombre légère sous les maquettes.
- Les emplacements d'onglet de projet sont remplis par l'icône, sans marge interne.
- La section Hi-fi du portfolio utilise les captures du site lui-même, en projecteur
  (cadres d'appareil), plutôt que les deux légendes sans image.

## Point de backlog proposé

- La ligne « Vérifier le mobile des galeries (rail, projecteur) » peut passer en revue après
  cette branche. Aucun autre point de `BACKLOG.md` n'est modifié par ce travail.
