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

Style graphique "sticker" réservé aux éléments **interactifs** (boutons) — la structure statique (header, nav, cartes de liste, messages d'état) reste sobre, pas de bordure épaisse ni d'ombre dessus.

Recette des boutons pleins avec texte (Réessayer, Ajouter, Supprimer) et du FAB : `bg-tomato text-cream border-2 border-charcoal font-semibold rounded-full`, ombre décalée qui se réduit et le bouton qui "s'enfonce" au survol :
`shadow-[3px_3px_0_0_var(--color-charcoal)] hover:shadow-[1px_1px_0_0_var(--color-charcoal)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all` (le FAB, plus grand, prend `4px`/`2px` au lieu de `3px`/`1px`).

Boutons icône seule sur un item de liste (ex. supprimer une ligne) : traitement "tonal", pas de bordure ni d'ombre dure — la bordure épaisse écrase un petit cercle. Fond teinté pâle de la couleur, icône dans la couleur pleine : `bg-tomato/10 text-tomato hover:bg-tomato/20 rounded-full transition-colors`.

Boutons secondaires (Annuler) : `border-2 border-charcoal text-charcoal rounded-full font-semibold`, pas de fond ni d'ombre, hover = inversion complète `hover:bg-charcoal hover:text-cream`.

Séparateurs structurels (header/nav) : filet fin `border-charcoal/10`, jamais la bordure épaisse.

Liste d'ingrédients : pas de carte par ligne — séparateurs fins entre les lignes (`divide-y divide-charcoal/10` sur le `<ul>`), pensé pour les listes longues (évite l'empilement de blocs colorés). Pas d'icône devant le nom : un badge tonal à cet endroit se confond visuellement avec un bouton (affordance cliquable trompeuse).

États vide/erreur (fetch) : icône seule `text-3xl`, pas de badge ni de cercle autour. Erreur : icône `warning` en `text-danger` (la même que dans la modale de confirmation) + message unique "Une erreur est survenue, réessayez." (identique partout dans l'app, pas de variante par contexte). Vide : icône dédiée en `text-tomato`.

Confirmation destructrice (ex. suppression) : élément `<dialog>` natif ouvert via `showModal()` (pas de composant modal custom) — penser à `m-auto` (voir `CLAUDE.md`, le preflight Tailwind casse le centrage natif), bordure épaisse + grosse ombre décalée (`rounded-3xl border-2 border-charcoal shadow-[6px_6px_0_0_var(--color-charcoal)]`). Icône `warning` en `text-danger`, question en `text-charcoal` — pas de sous-texte type "action irréversible", le contexte suffit. Boutons Annuler/Confirmer dans un conteneur de hauteur fixe (`h-11`) pour que le spinner de chargement — même hauteur, remplace les deux boutons — ne fasse pas bouger la modale.

Création (ex. ajout d'ingrédient) : même `<dialog>`, ouvert depuis un bouton d'action flottant (FAB, recette bouton plein ci-dessus) — cercle `h-14 w-14`, positionné `fixed right-4 bottom-20 z-10` (au-dessus de la nav du bas). Titre en `<h2 class="font-header">` (pas un `<p>`). Champ texte : soulignement (`border-b-2 border-charcoal`, fond transparent, texte aligné à gauche), pas de boîte pleine ni de pill — `focus:border-tomato`.

Nav : icône dans un badge `bg-tomato text-cream rounded-full px-3 py-1` quand la route est active (label en plus en `font-semibold`), `text-charcoal/50` sinon (icône + label) — pas de fond.

Skeleton de chargement : `bg-charcoal/10 animate-pulse`, calé sur la structure réelle de la ligne (icône + texte à gauche, bouton d'action à droite, mêmes séparateurs `divide-y`), y compris pour les éléments d'action (bouton icône, FAB) à la même taille et position que l'élément réel qu'ils remplacent — pas seulement les zones de texte.

## Typographie

Police des titres : Zen Maru Gothic — appliquée automatiquement à tous les `h1`-`h6` (règle globale dans `src/styles.css`, pas besoin d'ajouter de classe)
Police du texte courant : Inter — appliquée par défaut sur `body`
Police optionnelle : JetBrains Mono — disponible via la classe `font-mono`, pas appliquée par défaut (à utiliser au cas par cas)

Fonts chargées via Google Fonts dans `src/index.html`.

## Layout

`AppComponent` (`src/app/app.component.ts`) : header en haut + contenu routé, pas de footer.
Navigation en bas d'écran (`app-navigation`) toujours visible (`position: fixed`), avec un composant par page (icônes Material Symbols).

## Features & routes

Features : `meals`, `recipes`, `ingredients`, `shopping` (chacune suit le pattern décrit dans `CLAUDE.md`).
Page par défaut : `meals`. Toute route inconnue redirige aussi vers `meals`.
