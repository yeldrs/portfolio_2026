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
  - Rail : le fond quadrillé (`.wg-mat`) est plus haut et plus bas que les écrans, et
    déborde à gauche et à droite de la colonne sur desktop. Le masque de fondu se termine
    avant le haut des maquettes.
  - Rail : le voile de fin de défilement à droite est devenu un masque CSS sur la piste,
    pour ne plus recouvrir le fond.
  - Rail : `scroll-padding-inline-start` aligné sur le padding gauche, pour que le
    scroll-snap ne coupe plus le premier écran.
  - Rail, grille : couleur neutre (`stroke-neutral-primary`, 30 % / 60 %), mailles de
    16 px et repères majeurs tous les 64 px. Le padding haut de la piste est retiré et le
    padding gauche desktop passe à 0 : le coin haut-gauche du premier écran tombe sur une
    intersection majeure de la grille.
  - Rail, grille : ombre légère (`boxShadow.sm`) sur `.wg-flat`, sous chaque écran.
  - Spotlight : le cadre gris `rounded-card` devient un canevas de points qui déborde de
    la scène et se fond sur les quatre côtés. Les écrans et les contrôles restent inchangés.
  - Spotlight, points : échelle réduite (16 px) et opacité adoucie (gray-400 à 45 %) ;
    masques de fondu resserrés (6 % / 94 % horizontal, 8 % / 92 % vertical) pour que le
    dégradé ne mange plus le champ de points.
- `src/components/workflow/WorkflowScreen.astro`
  - Légende et liste de repères : `px-md` sur mobile pour rester alignées avec le texte
    quand l'image de la galerie grid est en pleine largeur.
- `src/layouts/WorkflowLayout.astro`
  - `overflow-x: clip` sur `#workflow-page` : les fonds peuvent sortir de la colonne sans
    créer de défilement horizontal ; `clip` ne crée pas de conteneur de défilement, donc
    la navigation d'étapes et les onglets restent collants (vérifié).

## Vérifications faites

- [x] `npm run build` — 15 pages, aucune erreur (relancé après les derniers réglages)
- [x] `npm run check` — 0 erreur, 0 avertissement (9 hints préexistants)
- [x] `git diff --stat` limité aux 3 composants ci-dessus
- [x] Rendu headless (Edge, 390 px et 1440 px) : rail et spotlight en EN, onglet Tenon
      et onglet Portfolio (galerie grid)
- [x] Mobile : largeur de la galerie = 390 px (x = 0), pas de débordement horizontal du
      document, premier écran du rail à x = 16 (padding conservé)
- [x] Desktop : pas de débordement horizontal du document, le fond dépasse bien la colonne
- [x] Grille rail alignée : écart du premier écran à la grille mesuré à 64 px sur x et y,
      soit un multiple exact de la maille majeure (64 px)

## Points non finis

- Pas de test sur appareil physique ni sur Safari : les deux fonds utilisent le même
  couple `mask-image` / `-webkit-mask-composite: source-in` que l'ancien rail.
- Les interactions du projecteur (flèches, clic sur un voisin, zoom) n'ont pas été
  rejouées après le retrait de `overflow-hidden` sur `.wg-spot` ; le DOM et le script
  n'ont pas changé, seul le fond a bougé.
- La page FR n'a pas été ouverte : elle utilise les mêmes composants et les mêmes classes.

## Décisions prises (propriétaire)

- Le projecteur garde le champ de points sans carte grise : rendu validé, seules l'échelle
  des points et l'étendue du fondu ont été revues.
- La galerie grid garde le plein écran mobile, légendes rentrées de 16 px.
- La grille du rail garde une couleur neutre et discrète, alignée sur les écrans, avec une
  ombre légère sous les maquettes.

## Point de backlog proposé

- La ligne « Vérifier le mobile des galeries (rail, projecteur) » peut passer en revue après
  cette branche. Aucun autre point de `BACKLOG.md` n'est modifié par ce travail.
