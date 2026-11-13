# Fiche : Tenon

Page : /workflow (FR : /fr/workflow). Contenu dans `src/content/workflow/step-1..5.yaml` (un bloc par projet et par étape) et `src/data/workflow.{en,fr}.ts`.

## Présentation du projet (une ligne, affichée en haut de chaque étape)
- EN : A mobile puzzle ported from a physical wooden-peg game, public on Google Play.
- FR : Un puzzle mobile adapté d'un jeu physique à chevilles en bois, publié sur Google Play.

## Faits verrouillés (à ne pas modifier sans me demander)
- Jeu mobile Android (moteur Godot), puzzle adapté d'un jeu physique à chevilles en bois, publié sur Google Play (paquet com.slowgrain.tenon).
- Projet solo, sans CI. Aucun code applicatif écrit à la main : travail de brief, relecture et audits.
- Chiffres et dates à garder exacts : index de projet sous 900 tokens, 4 skills, 28 sauts documentés, 20 vérifications de contraste requises passées + 8 exceptions décidées, audit de 96 points (Material 3), solution de 46 coups, cibles tactiles 48 dp, plancher de texte 11 sp, écran 720 x 1280, test ouvert fin octobre 2026, version code 4 préparé pour la production le 9 novembre 2026.
- Monétisation (pub + achat) construite et testée mais désactivée pour la v1.

## Structure de chaque bloc
Champs : `heading` (sous-titre quand l'étape a plusieurs blocs), `approachLabel` (titre court), `approach` (paragraphe principal), `tools` (label + note courte), `constraints`, `correction` (ce qui a mal tourné et ce qui a changé), parfois `callToAction` ou lien. Un champ absent n'est pas affiché.

---

## Étape 1 : Framing and setup / Cadrage et réglage

### Bloc unique

**approachLabel**
- EN : Rulebook, hooks, two agents
- FR : Recueil de règles, hooks, deux agents

**approach**
- EN : A project index loaded each session, kept under 900 tokens. Its main architecture rule: pure game rules are separate from display, and display never judges a move. Four skills cover end-of-task checks, token audit, design pulls and textures. A second agent tool with write scopes handles QA, docs and research. Agents never commit. Independent tasks run in parallel agent worktrees.
- FR : Un index de projet chargé à chaque session, maintenu sous 900 tokens. Sa règle d'architecture principale : les règles pures du jeu sont séparées de l'affichage, et l'affichage ne juge jamais un coup. Quatre skills couvrent les vérifications de fin de tâche, l'audit de tokens, les imports de design et les textures. Un second outil d'agent, avec des périmètres d'écriture, gère la QA, la documentation et la recherche. Les agents ne committent jamais. Les tâches indépendantes tournent en parallèle dans des worktrees d'agent.

**tools** (l'id du logo ne bouge pas ; seuls label et note se rédigent)
- EN : Claude Code (rulebook, skills, worktrees)
  FR : Claude Code (recueil de règles, skills, worktrees)
- EN : A second agent tool (QA, docs, research)
  FR : Un second outil d'agent (QA, docs, recherche)
- EN : Git hooks (blocking secrets, export presets, change logs)
  FR : Hooks git (secrets bloqués, presets d'export, journal)
- EN : Notion (backlog, prompt playbook)
  FR : Notion (backlog, playbook de prompts)

**constraints**
- EN : Solo project with no CI, so rules had to be enforced by git itself: hooks check export presets for secrets and require a change-log entry in every commit. Permissions deny force push, bypassing hooks and reading signing keys.
- FR : Projet solo sans CI, donc les règles devaient être appliquées par git lui-même : des hooks vérifient l'absence de secrets dans les presets d'export et exigent une entrée de journal des modifications dans chaque commit. Les permissions interdisent le force push, le contournement des hooks et la lecture des clés de signature.

**correction**
- EN : Too many round trips with an agent slowed design work. I moved to an autonomous mode with three mandatory stops and one final report.
- FR : Trop d'allers-retours avec un agent ralentissaient le travail de design. Je suis passé à un mode autonome avec trois arrêts obligatoires et un rapport final.

---

## Étape 2 : Research / Recherche

### Bloc unique

**approachLabel**
- EN : Moodboard to constraints file
- FR : Du moodboard au fichier de contraintes

**approach**
- EN : Each moodboard image was analysed on its own, with no color stated as certain and contradictions between references named. The result is a constraints file readable by any AI without seeing the moodboard, with estimated values marked and open decisions flagged as pending. Generated ambiance images set the mood only, never a specification.
- FR : Chaque image du moodboard a été analysée seule, sans couleur présentée comme certaine et avec les contradictions entre références nommées. Le résultat est un fichier de contraintes lisible par n'importe quelle IA sans voir le moodboard, avec les valeurs estimées marquées et les décisions ouvertes signalées comme en attente. Les images d'ambiance générées fixent l'atmosphère seulement, jamais une spécification.

**tools** (l'id du logo ne bouge pas ; seuls label et note se rédigent)
- EN : Gemini (ambiance images)
  FR : Gemini (images d'ambiance)
- EN : Notion (prompt playbook)
  FR : Notion (playbook de prompts)

**constraints**
- EN : A semi-realistic, simplified wood look that the agents could not infer from references alone.
- FR : Un rendu bois semi-réaliste et simplifié que les agents ne pouvaient pas déduire des seules références.

**correction**
- EN : The image generator does not count and adds plausible elements nobody asked for. I now describe exactly the number, relations and allowed elements, check each image against a checklist, and treat the result as an ambiance target, never a specification.
- FR : Le générateur d'images ne compte pas et ajoute des éléments plausibles que personne n'a demandés. Je décris maintenant exactement le nombre, les relations et les éléments autorisés, je vérifie chaque image avec une checklist, et je traite le résultat comme une cible d'ambiance, jamais comme une spécification.

---

## Étape 3 : Design / Design

### Wireframes / Wireframes

**heading**
- EN : Wireframes
- FR : Wireframes

**approachLabel**
- EN : All screens in Claude Design
- FR : Tous les écrans dans Claude Design

**approach**
- EN : Proof-of-concept mockups from Gemini generated ideas first. Then low-fidelity wireframes for every screen, mini-boards for the tutorial, three visual directions and one high-fidelity test. Import into the engine happens in two phases: a read-only reading of the wireframes first, then one screen per session.
- FR : Des maquettes de preuve de concept générées par Gemini ont d'abord fourni des idées. Puis des wireframes basse fidélité pour chaque écran, des mini-boards pour le tutoriel, trois directions visuelles et un test haute fidélité. L'import dans le moteur se fait en deux phases : d'abord une lecture seule des wireframes, puis un écran par session.

**tools** (l'id du logo ne bouge pas ; seuls label et note se rédigent)
- EN : Claude Design (wireframes, mini-boards, visual directions)
  FR : Claude Design (wireframes, mini-boards, directions visuelles)
- EN : Gemini (proof-of-concept mockups)
  FR : Gemini (maquettes de preuve de concept)
- EN : Claude Code (read-only wireframe skill)
  FR : Claude Code (skill de lecture seule)

**constraints**
- EN : Portrait phone screen at 720 by 1280, system bars and gesture areas, touch targets of at least 48 dp.
- FR : Écran de téléphone en portrait de 720 par 1280, barres système et zones de gestes, cibles tactiles d'au moins 48 dp.

**correction**
- EN : The mockups left out the Android system bars, so interactive elements ended up underneath them. System margins are now planned from the wireframe stage.
- FR : Les maquettes oubliaient les barres système Android, donc des éléments interactifs se retrouvaient dessous. Les marges système sont maintenant prévues dès l'étape des wireframes.

### Hi-fi and design system / Hi-fi et design system

**heading**
- EN : Hi-fi and design system
- FR : Hi-fi et design system

**approachLabel**
- EN : Layered tokens, generated code
- FR : Tokens en couches, code généré

**approach**
- EN : Tokens live in layered JSON files (primitive, semantic, material, platform) and generate the engine constants, with a check mode that fails when they drift. A living design system page instantiates the real components, so a gap between that page and the game counts as a bug. The wood look is encoded as a material layer: wood species per button variant and state, grooves, engraving, elevation. Components were aligned to Material 3 dimensions with a wood skin, after an audit of 96 points.
- FR : Les tokens vivent dans des fichiers JSON en couches (primitive, sémantique, matière, plateforme) et génèrent les constantes du moteur, avec un mode de vérification qui échoue en cas de dérive. Une page de design system vivante instancie les vrais composants, donc un écart entre cette page et le jeu compte comme un bug. Le rendu bois est encodé comme une couche matière : essence de bois par variante et état de bouton, rainures, gravure, élévation. Les composants ont été alignés sur les dimensions de Material 3 avec une peau bois, après un audit de 96 points.

**tools** (l'id du logo ne bouge pas ; seuls label et note se rédigent)
- EN : Claude Design
  FR : Claude Design
- EN : Claude Code
  FR : Claude Code
- EN : A Node token generator (engine constants from tokens)
  FR : Un générateur de tokens Node (constantes du moteur depuis les tokens)
- EN : Godot
  FR : Godot
- EN : A contrast script (contrast audit)
  FR : Un script de contraste (audit de contraste)

**constraints**
- EN : Touch targets of at least 48 dp, a text floor of 11 sp, Material 3 shapes and sizes for Google Play, and a wood style that stays readable.
- FR : Cibles tactiles d'au moins 48 dp, un plancher de texte de 11 sp, formes et tailles Material 3 pour Google Play, et un style bois qui reste lisible.

**correction**
- EN : Contrast measured on the palette failed once rendered. The audit now reads the tokens the 2D render actually uses.
- FR : Le contraste mesuré sur la palette échouait une fois rendu. L'audit lit maintenant les tokens que le rendu 2D utilise réellement.

---

## Étape 4 : Build / Construction

### Bloc unique

**approachLabel**
- EN : One screen at a time
- FR : Un écran à la fois

**approach**
- EN : A visual layer is iterated on a single screen with mandatory stops and before and after captures, and the other screens stay untouched until it is validated. I validate on a real device. Product decisions stayed with me: removing the 3D version, a first release without ads, the name, the thread-drag rules for a thrown peg. I wrote no application code by hand; my technical work was review and audits.
- FR : Une couche visuelle est itérée sur un seul écran avec des arrêts obligatoires et des captures avant et après, et les autres écrans restent intacts jusqu'à validation. Je valide sur un vrai appareil. Les décisions produit sont restées à moi : retirer la version 3D, une première version sans publicité, le nom, les règles de glissement au fil pour un pion lancé. Je n'ai écrit aucun code applicatif à la main ; mon travail technique a été la relecture et les audits.

**tools** (l'id du logo ne bouge pas ; seuls label et note se rédigent)
- EN : Claude Code (one screen at a time, stops)
  FR : Claude Code (un écran à la fois, arrêts)
- EN : Gemini
  FR : Gemini
- EN : Godot
  FR : Godot
- EN : A second agent tool
  FR : Un second outil d'agent

**constraints**
- EN : A phone screen, physics for a peg held by a thread (drag, throw, gravity, bounce), Material 3 sizes.
- FR : Un écran de téléphone, une physique pour un pion tenu par un fil (glisser, lancer, gravité, rebond), des tailles Material 3.

**correction**
- EN : I built two renders, 3D and 2D, before testing on a device, and the 3D version was removed. The rule since: test on a device before duplicating a pipeline. A shader edit applied by text replacement also failed silently; I now re-read every replacement before tuning values.
- FR : J'ai construit deux rendus, 3D et 2D, avant de tester sur un appareil, et la version 3D a été retirée. La règle depuis : tester sur un appareil avant de dupliquer un pipeline. Une modification de shader appliquée par remplacement de texte a aussi échoué silencieusement ; je relis maintenant chaque remplacement avant d'ajuster les valeurs.

---

## Étape 5 : Test and release / Tester et livrer

### Verification and accessibility / Vérification et accessibilité

**heading**
- EN : Verification and accessibility
- FR : Vérification et accessibilité

**approachLabel**
- EN : Contrast audit, device checks
- FR : Audit de contraste, tests sur appareil

**approach**
- EN : One test script runs the rules tests (28 documented jumps), layout and margin checks, font-size and spacing-grid checks, and a scene smoke test. Contrast is computed from the tokens: all 20 required checks pass, and 8 exceptions are decided and written down with reasons. A color-blind simulation (three types) runs on real captures, and pegs also differ by shape, shadow and engraved mark. A test enforces touch targets of at least 48 dp.
- FR : Un script de test lance les tests de règles (28 sauts documentés), des contrôles de mise en page et de marges, des contrôles de taille de police et de grille d'espacement, et un test de fumée de scène. Le contraste est calculé à partir des tokens : les 20 vérifications requises passent, et 8 exceptions sont décidées et consignées avec leurs raisons. Une simulation de daltonisme (trois types) tourne sur de vraies captures, et les pions se distinguent aussi par la forme, l'ombre et une marque gravée. Un test impose des cibles tactiles d'au moins 48 dp.

**tools** (l'id du logo ne bouge pas ; seuls label et note se rédigent)
- EN : Godot test scripts (rules tests, layout, smoke test)
  FR : Scripts de test Godot (tests de règles, mise en page, fumée)
- EN : A contrast script (token contrast)
  FR : Un script de contraste (contraste des tokens)
- EN : A color-blind simulation (3 types, real captures)
  FR : Une simulation de daltonisme (3 types, vraies captures)
- EN : The Google Play pre-launch report
  FR : Le rapport de pré-lancement de Google Play

**constraints**
- EN : A mobile game, so WCAG applies to color and size; keyboard criteria do not map directly.
- FR : Un jeu mobile, donc les WCAG s'appliquent à la couleur et à la taille ; les critères clavier ne s'appliquent pas directement.

**correction**
- EN : Screen reader support is not tested on a device. Icon buttons have accessible names in two languages, but dragging a peg is not reachable with a screen reader. Accessibility work is in progress and I do not claim full support.
- FR : La prise en charge des lecteurs d'écran n'est pas testée sur un appareil. Les boutons d'icônes ont des noms accessibles en deux langues, mais le glissement d'un pion n'est pas accessible avec un lecteur d'écran. Le travail d'accessibilité est en cours et je ne revendique pas une prise en charge complète.

### Release / Mise en production

**heading**
- EN : Release
- FR : Mise en production

**approachLabel**
- EN : Google Play release
- FR : Publication sur Google Play

**approach**
- EN : A signed Android App Bundle went to open testing in late October 2026, then version code 4 was prepared for the production step on 9 November. The store listing was prepared by script: screenshots generated from a real 46-move solution, tablet captures, a banner, and French and English texts. Monetization (ads and purchase) is built and tested but switched off for the first release. A script audits the bundle.
- FR : Un Android App Bundle signé est passé en test ouvert fin octobre 2026, puis le version code 4 a été préparé pour l'étape de production le 9 novembre. La fiche de store a été préparée par script : captures générées à partir d'une vraie solution en 46 coups, captures tablette, une bannière, et des textes en français et en anglais. La monétisation (publicités et achat) est construite et testée mais désactivée pour la première version. Un script audite le bundle.

**tools** (l'id du logo ne bouge pas ; seuls label et note se rédigent)
- EN : Godot export (signed app bundle)
  FR : Export Godot (app bundle signé)
- EN : Google Play Console (open testing, production)
  FR : Google Play Console (test ouvert, production)
- EN : Scripts for store assets and bundle audit
  FR : Des scripts pour les visuels de store et l'audit du bundle

**constraints**
- EN : Data Safety form, privacy policy, pre-launch checks, and no ads or purchase in version one.
- FR : Formulaire de sécurité des données, politique de confidentialité, vérifications de pré-lancement, et ni publicité ni achat dans la version un.

**correction**
- EN : The default export option produced an unsigned bundle on the first release. The lesson is recorded and a guard now checks the export presets.
- FR : L'option d'export par défaut a produit un bundle non signé à la première publication. La leçon est consignée et un garde-fou vérifie maintenant les presets d'export.

**link**
- EN : https://play.google.com/store/apps/details?id=com.slowgrain.tenon
- FR : https://play.google.com/store/apps/details?id=com.slowgrain.tenon

**linkLabel**
- EN : Google Play listing
- FR : Fiche Google Play

---

## Questions ouvertes pour moi
- (à compléter par toi avant de donner la fiche à l'agent)
