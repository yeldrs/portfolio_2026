# Fiche : page Workflow (textes communs)

Textes qui ne dépendent pas d'un projet. Sources : `src/data/workflow.{en,fr}.ts` et le haut de chaque `src/content/workflow/step-N.yaml`.

## En-tête de page
**eyebrow**
- EN : How I work
- FR : Comment je travaille

**title**
- EN : Design, code and AI, in one workflow
- FR : Design, code et IA, dans un seul workflow

**intro**
- EN : I build side projects end to end with coding agents: I frame, design and review, the agents implement. Five steps, three builds, with what worked and what did not.
- FR : Je construis des projets personnels de bout en bout avec des agents de code : je cadre, je conçois et je relis, les agents implémentent. Cinq étapes, trois réalisations, avec ce qui a marché et ce qui n'a pas marché.

## Teaser de la page d'accueil (version courte de l'intro)
**teaserIntro**
- EN : I use agentic design to build with AI: I frame, design and review, then orchestrate agents for implementation. Want to discover my tools and environment?
- FR : J'utilise le design agentique pour construire avec l'IA : je cadre, je conçois et je relis, puis j'orchestre des agents pour l'implémentation. Envie de découvrir mes outils et mon environnement ?

## Les cinq étapes
Chaque étape a un titre court et un texte introductif commun aux trois projets (`globalText`).

### Étape 1
**title**
- EN : Framing and setup
- FR : Cadrage et réglage

**globalText**
- EN : Before any code, I write down what the product must do and what the agent must never do. That lives in the repository as a rulebook the agent reads at the start of every session, backed by permissions and checks that enforce it. I keep the rulebook short because it costs context every time it loads.
- FR : Avant tout code, je note ce que le produit doit faire et ce que l'agent ne doit jamais faire. Cela vit dans le dépôt sous la forme d'un recueil de règles que l'agent lit au début de chaque session, appuyé par des permissions et des vérifications qui le font respecter. Je garde ce recueil court parce qu'il consomme du contexte à chaque chargement.

### Étape 2
**title**
- EN : Research
- FR : Recherche

**globalText**
- EN : Research here means gathering enough ground truth to write constraints an agent can follow. Depending on the product, that is user research or a visual brief. Either way the output is a written constraints document, not a pile of references.
- FR : La recherche consiste ici à réunir assez de vérités de terrain pour écrire des contraintes qu'un agent peut suivre. Selon le produit, il s'agit de recherche utilisateur ou d'un brief visuel. Dans les deux cas, le résultat est un document de contraintes écrit, pas un tas de références.

### Étape 3
**title**
- EN : Design
- FR : Design

**globalText**
- EN : Wireframes fix structure and states, not final style. I use them to agree with the agent on what each screen contains and how it behaves, one screen per session, with texts kept as translation keys. Material quality and the final look are decided later, in the engine or the browser. A design system only helps an agent if its values live in one place the code reads, so I define tokens in layers, from primitive values to semantic roles, map or generate them into code, and forbid hardcoded values in components. Contrast is measured on what is rendered, not on the palette alone.
- FR : Les wireframes fixent la structure et les états, pas le style final. Je m'en sers pour m'accorder avec l'agent sur le contenu de chaque écran et son comportement, un écran par session, avec les textes conservés sous forme de clés de traduction. La qualité des matières et le rendu final se décident plus tard, dans le moteur ou le navigateur. Un design system n'aide un agent que si ses valeurs vivent à un seul endroit que le code lit, donc je définis les tokens en couches, des valeurs primitives aux rôles sémantiques, je les mappe ou les génère dans le code, et j'interdis les valeurs codées en dur dans les composants. Le contraste se mesure sur ce qui est rendu, pas sur la palette seule.

### Étape 4
**title**
- EN : Build
- FR : Construction

**globalText**
- EN : My part is the brief, the acceptance criteria and the review. The agent writes code in small steps, and I check each result in the product itself, not in the diff alone. When the agent gets something wrong, the lesson goes into the rulebook so it does not repeat.
- FR : Ma part est le brief, les critères d'acceptation et la relecture. L'agent écrit le code par petites étapes, et je vérifie chaque résultat dans le produit lui-même, pas seulement dans le diff. Quand l'agent se trompe, la leçon entre dans le recueil de règles pour qu'elle ne se répète pas.

### Étape 5
**title**
- EN : Test and release
- FR : Tester et livrer

**globalText**
- EN : I do not trust a change until something other than the agent that made it has checked it. That means automated gates (type check, lint, build, tests), contrast measured from real values, and a pass in the real product. I also state what has not been tested. What passes is then released. The release path, the store listing or the deploy pipeline decides what users actually see, so I decide what ships and what stays switched off, and have the agent script the repeatable parts.
- FR : Je ne fais pas confiance à un changement tant qu'autre chose que l'agent qui l'a produit ne l'a pas vérifié. Cela passe par des contrôles automatisés (vérification de types, lint, build, tests), un contraste mesuré à partir des valeurs réelles, et un passage dans le vrai produit. J'indique aussi ce qui n'a pas été testé. Ce qui passe est ensuite publié. Le chemin de mise en production, la fiche de store ou le pipeline de déploiement décide de ce que les utilisateurs voient réellement, donc je décide de ce qui part et de ce qui reste désactivé, et je fais scripter par l'agent les parties répétables.

## Questions ouvertes pour moi
- (à compléter)
