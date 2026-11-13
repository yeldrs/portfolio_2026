# Fiche : Food Journal

Page : /workflow (FR : /fr/workflow). Contenu dans `src/content/workflow/step-1..5.yaml` (un bloc par projet et par étape) et `src/data/workflow.{en,fr}.ts`.

## Présentation du projet (une ligne, affichée en haut de chaque étape)
- EN : A privacy-first web app for tracking meals and body signals, with factual observations and no diagnosis.
- FR : Une application web respectueuse de la vie privée pour suivre ses repas et ses signaux corporels, avec des observations factuelles et sans diagnostic.

## Faits verrouillés (à ne pas modifier sans me demander)
- Application web (Next.js 16, React 19, Supabase, Vercel) de suivi des repas et des signaux corporels. Produit à données sensibles, en pré-production : pas de démo publique, pas de donnée sensible réelle en production tant qu'une question de conformité d'hébergement n'est pas réglée.
- Les données de recherche existent mais ne sont pas publiées : aucun chiffre de recherche ne doit apparaître tant qu'il n'est pas relié à sa source d'origine.
- Règles produit : pas de diagnostic, pas de causalité affichée, pas de jugement de valeur dans les textes, consentement explicite pour les données sensibles, propriété des données par l'utilisateur.
- Chiffres à garder exacts : MVP no-code utilisé 2 mois puis écarté, 10 skills, 6 pull requests pendant la refonte, audit axe-core sur 15 écrans (clair et sombre) à 0 violation, paire de contraste à 1,04:1 corrigée, WCAG 2.2 AA minimum.

## Structure de chaque bloc
Champs : `heading` (sous-titre quand l'étape a plusieurs blocs), `approachLabel` (titre court), `approach` (paragraphe principal), `tools` (label + note courte), `constraints`, `correction` (ce qui a mal tourné et ce qui a changé), parfois `callToAction` ou lien. Un champ absent n'est pas affiché.

---

## Étape 1 : Framing and setup / Cadrage et réglage

### Bloc unique

**approachLabel**
- EN : Guardrails before code
- FR : Garde-fous avant le code

**approach**
- EN : Product rules written before features: no diagnosis, no displayed causality, no value judgement in copy, explicit consent for sensitive data, user ownership of their data. Agents work under a rulebook, a multi-agent contract, one isolated worktree per agent and ten task-scoped skills. Git hooks refuse direct commits and pushes to main.
- FR : Des règles produit écrites avant les fonctionnalités : pas de diagnostic, pas de causalité affichée, pas de jugement de valeur dans les textes, consentement explicite pour les données sensibles, propriété des données par l'utilisateur. Les agents travaillent sous un recueil de règles, un contrat multi-agents, un worktree isolé par agent et dix skills limités à une tâche. Des hooks git refusent les commits et les push directs sur main.

**tools** (l'id du logo ne bouge pas ; seuls label et note se rédigent)
- EN : Claude Code (rulebook, skills)
  FR : Claude Code (recueil de règles, skills)
- EN : OpenCode (rulebook, skills)
  FR : OpenCode (recueil de règles, skills)
- EN : Git hooks (no direct commits to main)
  FR : Hooks git (pas de commit direct sur main)
- EN : A worktree script (one worktree per agent)
  FR : Un script de worktree (un worktree par agent)
- EN : Notion
  FR : Notion

**constraints**
- EN : Sensitive-data product. Agents cannot push, merge, run database commands, or edit the generated database types and the work log. Reading environment files is denied.
- FR : Produit à données sensibles. Les agents ne peuvent pas push, fusionner, lancer des commandes de base de données, ni modifier les types de base de données générés et le journal de travail. La lecture des fichiers d'environnement est refusée.

**correction**
- EN : Rules existed as conventions first. I moved agent containment into git hooks and permission denies, including a ban on bypassing hooks, because conventions alone did not hold.
- FR : Les règles existaient d'abord comme conventions. J'ai déplacé le confinement des agents dans des hooks git et des refus de permissions, y compris l'interdiction de contourner les hooks, parce que les conventions seules ne tenaient pas.

---

## Étape 2 : Research / Recherche

### Bloc unique

**approachLabel**
- EN : User research, then rules
- FR : Recherche utilisateur, puis règles

**approach**
- EN : A first MVP, built in a no-code site builder, was used for two months. I then ran qualitative and quantitative research in public communities, online discussions and with practitioners, and turned it into written product constraints, enriched with retrieved literature on care design. I also ran an unmoderated tree test of the information architecture.
- FR : Un premier MVP, construit dans un créateur de site no-code, a été utilisé pendant deux mois. J'ai ensuite mené une recherche qualitative et quantitative dans des communautés publiques, des discussions en ligne et auprès de praticiens, et je l'ai transformée en contraintes produit écrites, enrichies de littérature récupérée sur la conception du soin. J'ai aussi mené un test d'arborescence non modéré de l'architecture de l'information.

**tools** (l'id du logo ne bouge pas ; seuls label et note se rédigent)
- EN : WixStudio (first MVP)
  FR : WixStudio (premier MVP)
- EN : Typeform (questionnaires)
  FR : Typeform (questionnaires)
- EN : Otter.ai (interview transcripts)
  FR : Otter.ai (transcription d'entretiens)
- EN : UXtweak (tree testing)
  FR : UXtweak (test d'arborescence)
- EN : Notion (notes)
  FR : Notion (notes)
- EN : Retrieval over literature
  FR : Recherche documentaire dans la littérature

**constraints**
- EN : The research data exists but stays unpublished. No figure appears on the page until it is traced to its original source.
- FR : Les données de recherche existent mais restent non publiées. Aucun chiffre n'apparaît sur la page tant qu'il n'est pas relié à sa source d'origine.

**correction**
- EN : I set the two-month MVP aside instead of extending it, and restarted from research.
- FR : J'ai mis de côté le MVP de deux mois au lieu de l'étendre, et je suis reparti de la recherche.

---

## Étape 3 : Design / Design

### Wireframes / Wireframes

**heading**
- EN : Wireframes
- FR : Wireframes

**approachLabel**
- EN : Wireframes, then design imports
- FR : Wireframes, puis imports de design

**approach**
- EN : Wireframes from the research phase, then screens designed in Claude Design and imported as files. Each imported screen was reconciled with the existing components one at a time. Where an imported design contradicted a product rule, the rule won and the rejection was written down.
- FR : Des wireframes issus de la phase de recherche, puis des écrans conçus dans Claude Design et importés sous forme de fichiers. Chaque écran importé a été réconcilié avec les composants existants, un à un. Quand un design importé contredisait une règle produit, la règle l'emportait et le rejet était consigné par écrit.

**tools** (l'id du logo ne bouge pas ; seuls label et note se rédigent)
- EN : Claude Design (imported screens)
  FR : Claude Design (écrans importés)
- EN : Claude Code (component reconciliation)
  FR : Claude Code (réconciliation des composants)

**constraints**
- EN : A calm interface that does not create anxiety: no value judgement in copy, no default calorie totals.
- FR : Une interface calme qui ne crée pas d'anxiété : pas de jugement de valeur dans les textes, pas de total de calories par défaut.

### Hi-fi and design system / Hi-fi et design system

**heading**
- EN : Hi-fi and design system
- FR : Hi-fi et design system

**approachLabel**
- EN : Figma tokens in Tailwind v4
- FR : Tokens Figma dans Tailwind v4

**approach**
- EN : A token export from the design file sits in the repository as a reference. The values live in one CSS file: palette primitives, a semantic layer mapped to the component library, a dark theme with the same roles, and typography tokens that bundle size, line height and weight. Components read them through utility classes, and typography is never recomposed by hand.
- FR : Un export de tokens du fichier de design se trouve dans le dépôt comme référence. Les valeurs vivent dans un seul fichier CSS : primitives de palette, une couche sémantique mappée sur la bibliothèque de composants, un thème sombre avec les mêmes rôles, et des tokens de typographie qui regroupent taille, interligne et graisse. Les composants les lisent via des classes utilitaires, et la typographie n'est jamais recomposée à la main.

**tools** (l'id du logo ne bouge pas ; seuls label et note se rédigent)
- EN : Figma (token export)
  FR : Figma (export de tokens)
- EN : Claude Design
  FR : Claude Design
- EN : Tailwind CSS v4 (tokens in CSS, utility classes)
  FR : Tailwind CSS v4 (tokens en CSS, classes utilitaires)
- EN : shadcn with Base UI (component library)
  FR : shadcn avec Base UI (bibliothèque de composants)
- EN : class-variance-authority
  FR : class-variance-authority

**constraints**
- EN : WCAG 2.2 AA as a minimum, light and dark themes, an interface that stays calm.
- FR : WCAG 2.2 AA au minimum, thèmes clair et sombre, une interface qui reste calme.

**correction**
- EN : Colors passed on paper and failed in the browser. A real contrast measurement led me to darken several neutral steps, and a missing dark override had produced a 1.04:1 pair before it was fixed. Separately, two design imports landed on the main branch instead of the redesign branch and were reverted by new commits. I then added a guardrail skill for design syncs.
- FR : Les couleurs passaient sur le papier et échouaient dans le navigateur. Une vraie mesure de contraste m'a conduit à assombrir plusieurs niveaux de neutres, et un override sombre manquant avait produit une paire à 1,04:1 avant d'être corrigé. Par ailleurs, deux imports de design ont atterri sur la branche principale au lieu de la branche de refonte et ont été annulés par de nouveaux commits. J'ai ensuite ajouté un skill de garde-fou pour les synchronisations de design.

---

## Étape 4 : Build / Construction

### Bloc unique

**approachLabel**
- EN : Server components, PRs, real browser
- FR : Composants serveur, PR, vrai navigateur

**approach**
- EN : Each agent builds in an isolated worktree on its own branch, and changes reach main through pull requests (six in the redesign phase). Pages are server components that read data and pass plain props to a few client components; writes go through server actions. Every feature is also checked in a real browser through a browser tool, not only by the type checker.
- FR : Chaque agent construit dans un worktree isolé sur sa propre branche, et les changements arrivent sur main par des pull requests (six pendant la phase de refonte). Les pages sont des composants serveur qui lisent les données et passent des props simples à quelques composants client ; les écritures passent par des actions serveur. Chaque fonctionnalité est aussi vérifiée dans un vrai navigateur via un outil de navigation, pas seulement par le vérificateur de types.

**tools** (l'id du logo ne bouge pas ; seuls label et note se rédigent)
- EN : Next.js 16 (server components, actions)
  FR : Next.js 16 (composants serveur, actions)
- EN : React 19 (client components)
  FR : React 19 (composants client)
- EN : Supabase (row-level security)
  FR : Supabase (sécurité par ligne)
- EN : Claude Code (worktrees, pull requests)
  FR : Claude Code (worktrees, pull requests)
- EN : OpenCode (worktrees, pull requests)
  FR : OpenCode (worktrees, pull requests)
- EN : A browser tool (real-browser checks)
  FR : Un outil de navigation (tests en vrai navigateur)
- EN : Vercel
  FR : Vercel

**constraints**
- EN : Row-level security from the first migration, privileged reads separated from privileged writes, and public report pages that can never write.
- FR : Sécurité au niveau des lignes dès la première migration, lectures privilégiées séparées des écritures privilégiées, et pages de rapport publiques qui ne peuvent jamais écrire.

**correction**
- EN : A class-merging helper silently dropped one of two custom text classes. I extended it so it knows the custom tokens.
- FR : Un utilitaire de fusion de classes supprimait silencieusement l'une de deux classes de texte personnalisées. Je l'ai étendu pour qu'il connaisse les tokens personnalisés.

---

## Étape 5 : Test and release / Tester et livrer

### Verification and accessibility / Vérification et accessibilité

**heading**
- EN : Verification and accessibility
- FR : Vérification et accessibilité

**approachLabel**
- EN : Type check, lint, build, axe
- FR : Types, lint, build, axe

**approach**
- EN : Every feature ends with the same checks: type check, lint and production build, then a pass in a real browser. One full axe-core audit covered 15 screens in light and dark themes and reached zero violations after fixes. The routes it did not cover are listed explicitly. Contrast values and the fixes behind them are documented in the token file.
- FR : Chaque fonctionnalité se termine par les mêmes vérifications : vérification de types, lint et build de production, puis un passage dans un vrai navigateur. Un audit axe-core complet a couvert 15 écrans dans les thèmes clair et sombre et a atteint zéro violation après corrections. Les routes qu'il n'a pas couvertes sont listées explicitement. Les valeurs de contraste et les corrections qui les sous-tendent sont documentées dans le fichier de tokens.

**tools** (l'id du logo ne bouge pas ; seuls label et note se rédigent)
- EN : TypeScript strict mode (type checking)
  FR : TypeScript en mode strict (vérification de types)
- EN : ESLint (linting)
  FR : ESLint (lint)
- EN : The Next.js build (production build)
  FR : Le build Next.js (build de production)
- EN : axe-core (15-screen audit, light and dark)
  FR : axe-core (audit de 15 écrans, clair et sombre)
- EN : A browser tool (real-browser checks)
  FR : Un outil de navigation (tests en vrai navigateur)

**constraints**
- EN : WCAG 2.2 AA as a minimum.
- FR : WCAG 2.2 AA au minimum.

**correction**
- EN : Known gaps remain: the document language is set to English on a French app, there is no skip link, the navigation does not mark the current page, and no automated accessibility check runs in a pipeline. The audit was a one-off.
- FR : Des lacunes connues subsistent : la langue du document est réglée sur l'anglais dans une application française, il n'y a pas de lien d'évitement, la navigation n'indique pas la page courante, et aucune vérification d'accessibilité automatisée ne tourne dans un pipeline. L'audit était ponctuel.

### Release / Mise en production

**heading**
- EN : Release
- FR : Mise en production

**approachLabel**
- EN : Preview deploys, no public release
- FR : Déploiements de prévisualisation, pas de publication

**approach**
- EN : Deployed on Vercel from Git, with a documented production deploy of the redesign. Reviewer comments left on preview deployments were pulled through a tool, triaged, answered and resolved. The product is pre-production by its own rules: no real sensitive data runs in production until a hosting-compliance question is settled.
- FR : Déployé sur Vercel depuis Git, avec un déploiement de production documenté de la refonte. Les commentaires de relecture laissés sur les déploiements de prévisualisation ont été récupérés par un outil, triés, traités et résolus. Le produit est en pré-production selon ses propres règles : aucune donnée sensible réelle ne tourne en production tant qu'une question de conformité d'hébergement n'est pas réglée.

**tools** (l'id du logo ne bouge pas ; seuls label et note se rédigent)
- EN : Vercel (Git deploys, previews)
  FR : Vercel (déploiements Git, prévisualisations)
- EN : GitHub pull requests
  FR : Les pull requests GitHub
- EN : A Vercel integration for review comments
  FR : Une intégration Vercel pour les commentaires de relecture

**constraints**
- EN : Privacy, data protection and security come first, with row-level security on the database.
- FR : La vie privée, la protection des données et la sécurité passent en premier, avec une sécurité au niveau des lignes sur la base de données.

**callToAction**
- EN : No public demo. If this project interests you, get in touch.
- FR : Pas de démo publique. Si ce projet vous intéresse, contactez-moi.

---

## Questions ouvertes pour moi
- (à compléter par toi avant de donner la fiche à l'agent)
