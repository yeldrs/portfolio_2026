# Passation : wireframes-pleine-largeur

- Agent / modèle : OpenCode / DeepSeek V4.1 Flash Free
- Branche : agent/opencode-wireframes-pleine-largeur
- Date : 2026-11-11

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
  - Spotlight : le cadre gris `rounded-card` devient un canevas de points qui déborde de
    la scène et se fond sur les quatre côtés. Les écrans et les contrôles restent inchangés.
- `src/components/workflow/WorkflowScreen.astro`
  - Légende et liste de repères : `px-md` sur mobile pour rester alignées avec le texte
    quand l'image de la galerie grid est en pleine largeur.
- `src/layouts/WorkflowLayout.astro`
  - `overflow-x: clip` sur `#workflow-page` : les fonds peuvent sortir de la colonne sans
    créer de défilement horizontal ; `clip` ne crée pas de conteneur de défilement, donc
    la navigation d'étapes et les onglets restent collants (vérifié).

## Vérifications faites

- [x] `npm run build` — 15 pages, aucune erreur
- [x] `npm run check` — 0 erreur, 0 avertissement (9 hints préexistants)
- [x] `git diff --stat` limité aux 3 composants ci-dessus
- [x] Rendu headless (Edge, 390 px et 1440 px) : rail et spotlight en EN, onglet Tenon
      et onglet Portfolio (galerie grid)
- [x] Mobile : largeur de la galerie = 390 px (x = 0), pas de débordement horizontal du
      document, premier écran du rail à x = 16 (padding conservé)
- [x] Desktop : pas de débordement horizontal du document, le fond dépasse bien la colonne

## Points non finis

- Pas de test sur appareil physique ni sur Safari : les deux fonds utilisent le même
  couple `mask-image` / `-webkit-mask-composite: source-in` que l'ancien rail.
- Les interactions du projecteur (flèches, clic sur un voisin, zoom) n'ont pas été
  rejouées après le retrait de `overflow-hidden` sur `.wg-spot` ; le DOM et le script
  n'ont pas changé, seul le fond a bougé.
- La page FR n'a pas été ouverte : elle utilise les mêmes composants et les mêmes classes.

## Décisions à prendre (propriétaire)

- Le projecteur n'a plus de carte grise : c'est un champ de points sur le fond de page.
  Garder ce rendu, ou remettre une surface (plus discrète) derrière les écrans ?
- La galerie grid (étapes 4 et 5, écrans de portfolio) passe aussi en pleine largeur sur
  mobile, avec les légendes rentrées de 16 px. La laisser ainsi ou réserver le plein
  écran au rail et au projecteur ?
- Proposition de backlog : la ligne « Vérifier le mobile des galeries (rail, projecteur) »
  peut passer en revue après cette branche. Aucun autre point de `BACKLOG.md` n'est
  modifié par ce travail.
