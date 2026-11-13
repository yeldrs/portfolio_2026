# Fiches rédactionnelles de la page Workflow

Une fiche par projet de la page /workflow, plus une fiche pour les textes communs. Chaque fiche regroupe, étape par étape, tous les textes à retravailler, en EN et FR côte à côte.

| Fiche | Contenu |
|---|---|
| `page-workflow.md` | titre, intro, teaser, les 5 étapes (titre + texte commun) |
| `tenon.md` | puzzle mobile Godot, Google Play |
| `food-journal.md` | application web Next.js à données sensibles |
| `portfolio.md` | ce site (Astro) |

Générées depuis `src/content/workflow/step-*.yaml` et `src/data/workflow.*.ts`. Les fichiers sources restent la référence.

## Brief commun à donner à l'agent

Tu m'aides à retravailler la copy de la page « Workflow » de mon portfolio (designer produit qui construit avec des agents de code). Je te donne une fiche : tu réécris les champs, en EN et en FR.

Règles :
- Ne jamais inventer un chiffre, un outil, une date ou un résultat. Les « Faits verrouillés » de la fiche restent exacts. Si une information manque, pose-moi la question.
- Garder le ton honnête de la page : ce qui a marché et ce qui n'a pas marché, les limites assumées (champs `correction`, dettes, ce qui n'est pas testé). Ne pas l'embellir.
- Le FR n'est pas une traduction littérale : il doit se lire comme un texte écrit en français. EN et FR disent la même chose.
- Pas de tiret cadratin, pas de caractères invisibles ni d'espaces insécables.
- Les paragraphes `approach` sont lus en diagonale : une idée par phrase, concret avant abstrait.
- `tools` : seuls `label` et `note` se réécrivent (notes très courtes). L'identifiant du logo ne bouge pas. Ne pas ajouter ni retirer d'outil sans me le dire.
- Hors périmètre : légendes d'images, textes alternatifs, libellés des schémas. Si un changement les rend faux, signale-le.

Format de retour (par étape et par projet, prêt à intégrer) :

```yaml
en:
  blocks:
    - project: tenon
      heading:           # seulement si présent dans la fiche
      approachLabel:
      approach:
      tools:
        - { id: ..., label: ..., note: ... }
      constraints:
      correction:
fr:
  blocks:
    # même structure
```

À signaler en fin de réponse : tout changement de sens, toute question restée ouverte.
