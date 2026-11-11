# AGENTS.md

Règles communes multi-agents pour `portfolio_2026`. Source unique : `CLAUDE.md` et `opencode.json` pointent ce fichier.
Les règles du projet (contenu, tokens, i18n, textes de l'auteur) restent dans `CLAUDE.md` et s'appliquent à tous les agents.

## Rôles

- **Principal : Claude Code.** Rôle fixe. Seul à fusionner, et seul à écrire l'état partagé.
- **Secondaires : OpenCode, modèles variables.** Jamais principal. Le périmètre change selon la tâche et se lit dans la demande du propriétaire.

## Démarrage d'un agent

1. Lire `git branch --show-current`.
2. Branche `agent/*` : travailler, sur cette branche seulement.
3. Autre branche (hors principal) : **s'arrêter sans rien modifier**. Déduire un nom de tâche court (minuscules, tirets), puis afficher une commande prête à copier :
   ```
   $p = @'
   <demande du propriétaire, texte brut, apostrophes libres>
   '@
   .\scripts\agent.ps1 opencode <tache> --prompt $p
   ```
   Le `'@` de fermeture doit être seul en début de ligne. Ne jamais mettre le prompt entre apostrophes simples.
4. Le principal (Claude Code) commence par lire `BACKLOG.md`, lister les branches `agent/*` et les fichiers `docs/handoffs/` non relus, puis présenter chaque travail comme « fait par X, non relu » avant toute fusion. Il signale les fichiers touchés par plusieurs branches.

## Interdits communs (tous les agents)

`git push`, `git merge`, `git rebase`, `git reset --hard`, suppression de branche ou de tag, commande `gh`, tout commit sur `main`, toute écriture hors du dépôt.
Règle écrite pour tous. Garde-fou technique : Claude Code seulement, voir `.claude/settings.json` (confirmation demandée). Aucun garde-fou technique n'est configuré pour OpenCode.

## Zones interdites aux secondaires (ni lecture, ni modification)

`.env*`, `.git/`, `.github/workflows/`, `astro.config.mjs`, `src/content/config.ts`, `public/documents/`, `repomix-output.xml`.
Le texte rédigé par le propriétaire (voir `CLAUDE.md`) ne se modifie jamais sans demande explicite.
Certains agents envoient le code qu'ils lisent à un fournisseur de modèle externe. Ne rien mettre de privé dans le dépôt.

## État partagé réservé au principal

`BACKLOG.md`, `CHANGELOG.md`, `CLAUDE.md`, `AGENTS.md`, `opencode.json`, `.claude/`, `scripts/`.
Un secondaire écrit uniquement ses fichiers de tâche et `docs/handoffs/<tache>.md`.

## Avant de déclarer « terminé »

1. `npm run build` et `npm run check` sans erreur (`npm ci` dans le worktree si `node_modules` manque).
2. `git diff --stat` limité au périmètre de la tâche.
3. Aucune clé, aucun contenu `.env`, aucun texte d'auteur modifié.
4. Fiche `docs/handoffs/<tache>.md` remplie (gabarit : `docs/handoffs/_TEMPLATE.md`).

## Backlog et journal

Toute création, modification, changement de statut ou assignation d'une tâche du backlog ajoute une ligne à `docs/BACKLOG_LOG.md`. On n'efface jamais une tâche : on la passe en « Écarté ». Seul le principal modifie `BACKLOG.md`; un secondaire propose dans sa fiche de passation.

## Attribution

Pas de signature IA dans les commits ni les PR (`.claude/settings.json`). L'auteur d'un travail se voit au nom de la branche (`agent/<outil>-<tache>`) et à la fiche de passation.
