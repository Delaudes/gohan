Nom de l'app : Gohan

Ce fichier documente le design visuel de l'app (couleurs, composants, typographie, layout) pour que les composants restent cohérents entre eux — pas une documentation générale du projet (architecture, features, routing : voir le code et `CLAUDE.md`).

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

Boutons icône seule sur un item de liste : **nus**, pas de fond ni de cercle — juste l'icône dans `h-11 w-11 flex items-center justify-center` (cible tactile 44px). Deux usages :
- Bascule à cocher (liste de courses/repas, "fait", "acheté"...) : deux glyphes distincts selon l'état plutôt qu'un seul + `is-filled` — `check_box_outline_blank` (non coché, `text-charcoal/40`) / `check_box` (coché, `text-tomato`).
- Retrait/suppression : icône `close` (croix), toujours `text-tomato hover:text-tomato/70 transition-colors`, quelle que soit la gravité (suppression définitive d'une recette/d'un ingrédient, retrait d'un ingrédient d'une recette, retrait d'un repas de la liste) — la distinction de gravité se fait dans le texte du dialog de confirmation, pas dans l'icône.

Pendant le chargement, le bouton est remplacé par un spinner de la même taille (`h-11 w-11`), sans fond non plus — même principe que le spinner en pleine largeur des dialogs, mais sans dialog.

Tout bouton icône seule porte un `aria-label` (l'icône seule ne suffit pas à décrire l'action) : statique (`aria-label="Verbe + entité"`, ex. "Supprimer la recette") pour une action fixe, `[attr.aria-label]` avec ternaire sur l'état pour une bascule (ex. "Marquer comme fait"/"Marquer comme non fait").

Exception : l'icône `add` en bout de ligne dans un panneau de résultats de recherche (ex. ajouter un ingrédient à une recette) garde le traitement tonal `bg-tomato/10 text-tomato rounded-full` — elle n'est pas un tap target autonome (toute la ligne est cliquable), le cercle sert de repère visuel dans une liste de choix, pas d'affordance de bouton indépendant.

État plein/contour (`is-filled`) : réservé à la nav du bas (icônes toujours pleines, actives ou non) — voir `CLAUDE.md` pour le détail technique de la police dupliquée à `FILL=1`. Les bascules d'état d'un item de liste n'utilisent plus ce mécanisme depuis le passage aux icônes nues ci-dessus ; elles changent de glyphe plutôt que de remplissage.

Boutons secondaires (Annuler) : `border-2 border-charcoal text-charcoal rounded-full font-semibold`, pas de fond ni d'ombre, hover = inversion complète `hover:bg-charcoal hover:text-cream`.

Séparateurs structurels (header/nav) : filet fin `border-charcoal/10`, jamais la bordure épaisse.

Structure de ligne commune à toute la liste d'items (plate ou carte) : bascule à gauche (`h-11 w-11`) — nom en `flex-1`, badge de statut imbriqué juste en dessous (`mt-1 block`, même colonne flex que le nom) — action à droite. Une seule ligne, pas de ligne séparée pour le badge/l'action.
Quand une action n'existe **structurellement** jamais pour toute une catégorie d'item (ex. impossible de retirer un ingrédient de courses lié à un repas planifié) — pas juste un état qui bascule sur un item donné —, ne pas réserver sa place : laisser le contenu profiter de la largeur libérée plutôt que de figer un espace vide à droite. Différent d'une bascule d'état sur le même item (badge, bouton) : celle-là reste toujours réservée pour ne pas décaler la ligne au changement d'état.

Liste d'items plats, sans navigation (ex. ingrédients) : pas de carte par ligne — séparateurs fins entre les lignes (`divide-y divide-charcoal/10` sur le `<ul>`), pensé pour les listes longues (évite l'empilement de blocs colorés).

Liste d'items qui mènent à une fiche détail (ex. recettes) : même structure de ligne que ci-dessus, mais dans une carte plutôt qu'un simple séparateur — `border-2 border-charcoal rounded-2xl bg-cream shadow-[3px_3px_0_0_var(--color-charcoal)]`, empilées avec `gap-3` (pas de `divide-y`, chaque carte porte déjà sa bordure). Le nom est un lien qui inclut le chevron (`chevron_right`, `text-charcoal/40`) juste après lui, à l'intérieur de la zone `flex-1` cliquable. La carte + le chevron signalent "cet objet a de la profondeur, il mène ailleurs", contrairement à un item plat qui ne fait qu'une action sur place. Le nom lui-même reste sobre (pas de fond au survol/tap) : la carte porte déjà le poids visuel.

Accordéon inline sur une carte (ex. ingrédients d'un repas planifié) : même ligne d'en-tête qu'une carte de navigation, mais le nom est un bouton (pas un lien) et le chevron est `expand_more` qui pivote (`transition-transform`, `[class.rotate-180]` selon l'état déplié) plutôt que `chevron_right` — signale "reste sur place" contrairement à "mène ailleurs". Contenu déplié en dessous dans la même carte, séparé par `border-t border-charcoal/10 mt-3 pt-3`. Chargé au premier clic seulement (pas de re-fetch à chaque ouverture/fermeture), avec son propre skeleton en dessous du header le temps du chargement. Cliquer sur l'en-tête bascule ouvert/fermé sans condition — une action de rechargement (ex. retry) est un bouton dédié séparé, jamais une variante cachée du même clic.

Badge de statut sous un nom d'item (ex. "Repas planifié"/"non planifié", "Achat planifié"/"non planifié", "Acheté"/"Non acheté") : `font-mono text-[11px]/4 font-medium` (le `/4` fixe la line-height à 16px = `h-4`/`min-h-4`, sinon la line-height héritée dérive de quelques dixièmes de pixel par rapport au skeleton). Toujours un texte pour les deux états, jamais un espace vide en creux — la construction courte `[Nom] (non) planifié` est le gabarit par défaut pour un nouveau badge. L'état négatif passe en `text-charcoal/40` plutôt que `text-tomato` (réservé à l'état positif). Toujours réserver l'espace (`min-h-4`) — pour ne pas décaler les lignes/le skeleton quand le badge change de texte.

Tag de référence (informatif, pas un état — ex. le repas d'origine d'un ingrédient de courses) : texte simple `text-charcoal/40 font-mono text-[11px]/4`, pas de fond ni de pilule ni d'icône — contrairement au badge de statut ci-dessus (qui représente un état, `text-tomato`/`text-charcoal/40` selon la valeur), ce tag n'est qu'une information de contexte. Quand il coexiste avec un badge de statut sur le même item, les deux vont sur la **même ligne**, séparés par un point médian (`·`), dans un conteneur `flex flex-wrap items-center gap-1` plutôt qu'empilés en `block` — évite qu'une ligne accumule 3 niveaux de texte (nom, statut, référence).

Compteur de progression en tête de liste (ex. "2/7 réalisés") : `text-charcoal/50 font-mono text-sm`, une ligne simple juste au-dessus de la liste — pas de barre de progression ni de badge autour. N'apparaît que dans la branche "liste non vide" (pas pendant le chargement/erreur, pas sur liste vide où il n'apporte rien) ; skeleton associé : `h-5 w-24` (matche la line-height de `text-sm`).

États vide/erreur (fetch) : icône seule `text-3xl`, pas de badge ni de cercle autour. Erreur : icône `warning` en `text-danger` (la même que dans la modale de confirmation) + message unique "Une erreur est survenue, réessayez." (identique partout dans l'app, pas de variante par contexte). Vide : icône dédiée en `text-tomato`.
Dans un contexte imbriqué/compact (accordéon, panneau de résultats de recherche) : même principe à échelle réduite — icône `text-2xl` (au lieu de `text-3xl`) dans un conteneur `py-4` (au lieu de `py-16`), message en `text-sm`.

Confirmation destructrice (ex. suppression) : élément `<dialog>` natif ouvert via `showModal()` (pas de composant modal custom) — penser à `m-auto` (voir `CLAUDE.md`, le preflight Tailwind casse le centrage natif), bordure épaisse + grosse ombre décalée (`rounded-3xl border-2 border-charcoal shadow-[6px_6px_0_0_var(--color-charcoal)]`). Icône `warning` en `text-danger`, question en `text-charcoal` — pas de sous-texte type "action irréversible", le contexte suffit. Boutons Annuler/Confirmer dans un conteneur de hauteur fixe (`h-11`) pour que le spinner de chargement — même hauteur, remplace les deux boutons — ne fasse pas bouger la modale.

Création (ex. ajout d'ingrédient/recette depuis la liste) : même `<dialog>`, ouvert depuis un bouton d'action flottant (FAB, recette bouton plein ci-dessus) — cercle `h-14 w-14`, positionné `fixed right-4 z-10`, `bottom-[calc(6rem+env(safe-area-inset-bottom))]` (au-dessus de la nav du bas, en tenant compte de l'encoche/home indicator). Titre en `<h2 class="font-header">` (pas un `<p>`). Champ texte : soulignement (`border-b-2 border-charcoal`, fond transparent, texte aligné à gauche), pas de boîte pleine ni de pill — `focus:border-tomato`.
Le FAB étant fixe, la page qui le porte doit réserver un padding bas généreux sur sa liste (`pb-32` en plus du `p-4` habituel) pour que le dernier item de la liste ne se retrouve jamais visuellement sous le bouton, y compris quand la liste est trop courte pour scroller.

Exception au dialog de création : quand la confirmation visuelle immédiate compte plus que la légèreté d'un FAB (ex. ajouter un ingrédient à une recette, où on veut voir la ligne apparaître dans la liste juste au-dessus), pas de `<dialog>` — une carte (même traitement que les cartes de liste ci-dessus) toujours visible en bas de la liste concernée, à **taille fixe** (titre + champ de recherche seulement). Les résultats/actions ne poussent jamais le champ : ils s'affichent dans un panneau flottant (`absolute right-0 bottom-full left-0`, ancré sur le wrapper `relative` du champ) qui recouvre le contenu au-dessus **au-dessus** du champ, jamais en dessous — sur mobile le clavier masquerait sinon les résultats, et un panneau qui pousse le champ plutôt que de flotter par-dessus finit par le faire sortir de l'écran visible pendant la frappe.

Champ de recherche live (ex. rechercher un ingrédient à ajouter) : même style de champ souligné que la création, mais avec une icône loupe (`search`, `text-tomato`) en absolute à gauche (`pl-8` sur l'input pour compenser) — signale que la saisie filtre du contenu en direct, contrairement au champ de création simple ci-dessus (pas d'icône, confirmé par un bouton).

Nav : icône dans un badge `bg-tomato text-cream rounded-full px-3 py-1` quand la route est active (label en plus en `font-semibold`), `text-charcoal/50` sinon (icône + label) — pas de fond hors route active. Icônes toujours en version pleine (`is-filled`), que la route soit active ou non. Ordre des items : Repas, Courses, Recettes, Ingrédients.

Skeleton de chargement : `bg-charcoal/10 animate-pulse`, calé sur la structure réelle de la ligne (bouton de bascule, texte, bouton de suppression — même ordre, mêmes séparateurs `divide-y`), y compris pour les éléments d'action (boutons icône, FAB) à la même taille et position que l'élément réel qu'ils remplacent — pas seulement les zones de texte.
Un bouton icône nu (pas de fond, voir plus haut) se remplace par un petit point `h-5 w-5 rounded-full` centré dans une boîte invisible `h-11 w-11 flex items-center justify-center` — pas par un gros cercle plein `h-11 w-11` : ce dernier correspondait à l'ancien traitement tonal avec fond, il ferait paraître le skeleton plus "lourd" que le vrai bouton une fois chargé. Un chevron (`chevron_right` de navigation ou `expand_more` d'accordéon) garde aussi sa place dans le skeleton — un simple point `h-5 w-5 shrink-0` sans boîte (il n'a pas de tap target dédié en vrai contenu) — pour que l'élément qui le suit dans la ligne ne se décale pas au passage skeleton → contenu réel.
Les hauteurs doivent correspondre exactement au rendu réel, pas juste à l'œil : une barre à hauteur fixe doit matcher le `line-height` réel du texte qu'elle remplace (ex. `text-lg` → line-height 1.75rem → `h-7`, pas une valeur choisie au hasard, et un badge en `text-[11px]` doit fixer sa line-height à `/4` pour matcher `h-4`, sinon la line-height héritée dérive de quelques dixièmes de pixel), et compenser les bordures (`border-b-2` sur un champ ajoute 2px à sa hauteur réelle). Un élément conditionnel (badge, message d'erreur) doit réserver son espace en permanence — dans le skeleton et dans le vrai contenu — sinon le passage skeleton → contenu réel saute visuellement. Un conteneur flex qui peut déborder sur mobile (icônes fixes + texte large) doit donner `shrink-0` à ses éléments de taille fixe et `min-w-0` à l'élément flexible, sinon le navigateur écrase en premier les petits éléments sans `shrink-0` — y compris dans le skeleton.

## Typographie

Police des titres : Zen Maru Gothic — appliquée automatiquement à tous les `h1`-`h6` (règle globale dans `src/styles.css`, pas besoin d'ajouter de classe)
Police du texte courant : Inter — appliquée par défaut sur `body`
Police optionnelle : JetBrains Mono — disponible via la classe `font-mono`, pas appliquée par défaut (à utiliser au cas par cas)

Fonts chargées via Google Fonts dans `src/index.html`.

## Layout

`AppComponent` (`src/app/app.component.ts`) : header en haut + contenu routé, pas de footer.
Header : logo (`public/logo.png`, servi tel quel par Angular CLI) à côté du titre, groupe centré (`flex items-center justify-center gap-2`). Le logo (`h-14 w-14`) dépasse volontairement du padding vertical du header via une marge négative (`-my-4`, qui compense exactement le `py-4` du header) plutôt que d'en être contraint.
Navigation en bas d'écran (`app-navigation`) toujours visible (`position: fixed`), avec un composant par page (icônes Material Symbols).
