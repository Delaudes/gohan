Nom de l'app : Gohan

## Couleurs

Cream #FFF6E9 : Fond principal de l'application
Charcoal #1B1512 : Texte, titres, bordures — quasi-noir
Tomato #E8432C : Accent principal — boutons pleins, badge de nav actif, icônes d'état vide
Danger #B3261E : Erreurs, avertissements, actions destructrices (icône `warning`/`error`, messages d'erreur)
Success #3F7D45 : Confirmations de succès (défini, pas encore utilisé dans l'UI)

Tokens Tailwind (`src/styles.css`, bloc `@theme`) : `bg-cream`, `text-charcoal`, `bg-tomato`, `text-danger`, `text-success`, etc.

Palette volontairement réduite à 3 couleurs d'identité + 2 sémantiques : pas de 4ᵉ teinte "secondaire", le discret se fait via l'opacité de charcoal (`text-charcoal/50`, `bg-charcoal/5`, etc.), pas via une nouvelle couleur.

## Composants

Style graphique "sticker" réservé aux éléments **interactifs** (boutons, cartes qui mènent à une fiche détail — voir plus bas) — la structure purement statique (header, nav, lignes de liste plates, messages d'état) reste sobre, pas de bordure épaisse ni d'ombre dessus.

Recette des boutons pleins avec texte (Réessayer, Ajouter, Supprimer) et du FAB : `bg-tomato text-cream border-2 border-charcoal font-semibold rounded-full`, ombre décalée qui se réduit et le bouton qui "s'enfonce" au survol :
`shadow-[3px_3px_0_0_var(--color-charcoal)] hover:shadow-[1px_1px_0_0_var(--color-charcoal)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all` (le FAB, plus grand, prend `4px`/`2px` au lieu de `3px`/`1px`).

Boutons icône seule sur un item de liste : traitement "tonal" commun, pas de bordure ni d'ombre dure — la bordure épaisse écrase un petit cercle. Fond teinté pâle de la couleur, icône dans la couleur pleine : `bg-tomato/10 text-tomato hover:bg-tomato/20 rounded-full transition-colors`. Trois usages : action pure sans état (supprimer une ligne — une seule icône, fixe), bascule d'état (liste de courses/repas — la **même** icône dans les deux cas, ex. `shopping_cart`, `skillet`, remplie ou non via la classe `is-filled` selon l'état ; jamais deux icônes différentes pour action vs état, ça introduit une ambiguïté), ou ajout depuis une liste de résultats (icône `add`, en bout de ligne — le pendant du chevron ci-dessous, mais pour "ajouter" plutôt que "naviguer"). Pendant le chargement, le bouton est remplacé par un spinner de la même taille (`h-11 w-11` — cible tactile 44px) directement dans la ligne — même principe que le spinner en pleine largeur des dialogs, mais sans dialog.

État plein/contour (`is-filled`) : voir `CLAUDE.md` pour le détail technique (la police Material Symbols livrée par Google n'est pas variable, il faut une deuxième police statique dupliquée à `FILL=1`).

Boutons secondaires (Annuler) : `border-2 border-charcoal text-charcoal rounded-full font-semibold`, pas de fond ni d'ombre, hover = inversion complète `hover:bg-charcoal hover:text-cream`.

Séparateurs structurels (header/nav) : filet fin `border-charcoal/10`, jamais la bordure épaisse.

Liste d'items plats, sans navigation (ex. ingrédients) : pas de carte par ligne — séparateurs fins entre les lignes (`divide-y divide-charcoal/10` sur le `<ul>`), pensé pour les listes longues (évite l'empilement de blocs colorés). Ordre des boutons dans une ligne : bouton de bascule d'état avant le nom (à gauche), bouton de suppression après (à droite).

Liste d'items qui mènent à une fiche détail (ex. recettes) : traitement carte par ligne — `border-2 border-charcoal rounded-2xl bg-cream shadow-[3px_3px_0_0_var(--color-charcoal)]`, empilées avec `gap-3` (pas de `divide-y`, chaque carte porte déjà sa bordure) — plus le chevron (`chevron_right`, `text-charcoal/40`) en bout de la zone cliquable du nom. La carte + le chevron signalent "cet objet a de la profondeur, il mène ailleurs", contrairement à un item plat qui ne fait qu'une action sur place. Le nom lui-même reste sobre (pas de fond au survol/tap) : la carte porte déjà le poids visuel.

Badge de statut sous un nom d'item (ex. "Dans la liste de repas/de courses") : `font-mono text-tomato text-xs font-medium`. Deux façons de l'aligner sous le nom selon la structure de la ligne : soit imbriqué dans la même colonne flex que le nom (le décalage vient naturellement du bouton de bascule placé avant), soit — si le badge est sur une ligne séparée en dessous (ex. carte recette) — un retrait explicite (`pl-12`) pour compenser la largeur du bouton à gauche. Toujours réserver l'espace — hauteur minimale ou élément vide rendu plutôt qu'un `@if` sans `@else` — pour ne pas décaler les lignes/le skeleton quand le badge n'est pas affiché.

États vide/erreur (fetch) : icône seule `text-3xl`, pas de badge ni de cercle autour. Erreur : icône `warning` en `text-danger` (la même que dans la modale de confirmation) + message unique "Une erreur est survenue, réessayez." (identique partout dans l'app, pas de variante par contexte). Vide : icône dédiée en `text-tomato`.

Confirmation destructrice (ex. suppression) : élément `<dialog>` natif ouvert via `showModal()` (pas de composant modal custom) — penser à `m-auto` (voir `CLAUDE.md`, le preflight Tailwind casse le centrage natif), bordure épaisse + grosse ombre décalée (`rounded-3xl border-2 border-charcoal shadow-[6px_6px_0_0_var(--color-charcoal)]`). Icône `warning` en `text-danger`, question en `text-charcoal` — pas de sous-texte type "action irréversible", le contexte suffit. Boutons Annuler/Confirmer dans un conteneur de hauteur fixe (`h-11`) pour que le spinner de chargement — même hauteur, remplace les deux boutons — ne fasse pas bouger la modale.

Création (ex. ajout d'ingrédient/recette depuis la liste) : même `<dialog>`, ouvert depuis un bouton d'action flottant (FAB, recette bouton plein ci-dessus) — cercle `h-14 w-14`, positionné `fixed right-4 bottom-24 z-10` (au-dessus de la nav du bas). Titre en `<h2 class="font-header">` (pas un `<p>`). Champ texte : soulignement (`border-b-2 border-charcoal`, fond transparent, texte aligné à gauche), pas de boîte pleine ni de pill — `focus:border-tomato`.

Exception au dialog de création : quand la confirmation visuelle immédiate compte plus que la légèreté d'un FAB (ex. ajouter un ingrédient à une recette, où on veut voir la ligne apparaître dans la liste juste au-dessus), pas de `<dialog>` — une carte (même traitement que les cartes de liste ci-dessus) toujours visible en bas de la liste concernée, avec les résultats/actions **au-dessus** du champ de recherche, jamais en dessous : sur mobile le clavier masquerait sinon les résultats.

Champ de recherche live (ex. rechercher un ingrédient à ajouter) : même style de champ souligné que la création, mais avec une icône loupe (`search`, `text-tomato`) en absolute à gauche (`pl-8` sur l'input pour compenser) — signale que la saisie filtre du contenu en direct, contrairement au champ de création simple ci-dessus (pas d'icône, confirmé par un bouton).

Nav : icône dans un badge `bg-tomato text-cream rounded-full px-3 py-1` quand la route est active (label en plus en `font-semibold`), `text-charcoal/50` sinon (icône + label) — pas de fond hors route active. Icônes toujours en version pleine (`is-filled`), que la route soit active ou non. Ordre des items : Repas, Courses, Recettes, Ingrédients.

Skeleton de chargement : `bg-charcoal/10 animate-pulse`, calé sur la structure réelle de la ligne (bouton de bascule, texte, bouton de suppression — même ordre, mêmes séparateurs `divide-y`), y compris pour les éléments d'action (boutons icône, FAB) à la même taille et position que l'élément réel qu'ils remplacent — pas seulement les zones de texte.
Les hauteurs doivent correspondre exactement au rendu réel, pas juste à l'œil : une barre à hauteur fixe doit matcher le `line-height` réel du texte qu'elle remplace (ex. `text-lg` → line-height 1.75rem → `h-7`, pas une valeur choisie au hasard), et compenser les bordures (`border-b-2` sur un champ ajoute 2px à sa hauteur réelle). Un élément conditionnel (badge, message d'erreur) doit réserver son espace en permanence — dans le skeleton et dans le vrai contenu — sinon le passage skeleton → contenu réel saute visuellement.

## Typographie

Police des titres : Zen Maru Gothic — appliquée automatiquement à tous les `h1`-`h6` (règle globale dans `src/styles.css`, pas besoin d'ajouter de classe)
Police du texte courant : Inter — appliquée par défaut sur `body`
Police optionnelle : JetBrains Mono — disponible via la classe `font-mono`, pas appliquée par défaut (à utiliser au cas par cas)

Fonts chargées via Google Fonts dans `src/index.html`.

## Layout

`AppComponent` (`src/app/app.component.ts`) : header en haut + contenu routé, pas de footer.
Header : logo (`public/logo.png`, servi tel quel par Angular CLI) à côté du titre, groupe centré (`flex items-center justify-center gap-2`). Le logo (`h-14 w-14`) dépasse volontairement du padding vertical du header via une marge négative (`-my-4`, qui compense exactement le `py-4` du header) plutôt que d'en être contraint.
Navigation en bas d'écran (`app-navigation`) toujours visible (`position: fixed`), avec un composant par page (icônes Material Symbols).

## Features & routes

Features : `meals`, `recipes`, `ingredients`, `shopping` (chacune suit le pattern décrit dans `CLAUDE.md`).
Page par défaut : `meals`. Toute route inconnue redirige aussi vers `meals`.
