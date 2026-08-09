Nom de l'app : Gohan

## Couleurs

Rice white #FAF6EC : Fond principal de l'application
Nori #1F2B22 : Couleur du texte, des titres, et état actif (ex. icône + label de nav sur la route active, sans fond)
Yuzu #F2B705 : Accent principal — actions, coches. Attention : contraste trop faible sur fond Rice white (~1.7:1), à utiliser sur fond Nori (bouton plein `bg-nori text-yuzu`, ~8:1)
Soy #8B5E3C : Accent secondaire, textes discrets, état par défaut (ex. icône + label de nav hors route active), séparateurs/bordures discrètes (ex. `border-soy/20`)
Danger #B3261E : Erreurs, avertissements, actions destructrices (ex. icône d'avertissement et message d'erreur d'une confirmation de suppression)
Success #3F7D45 : Confirmations de succès

Tokens Tailwind (`src/styles.css`, bloc `@theme`) : `bg-rice-white`, `text-nori`, `text-yuzu`, `border-soy`, `text-danger`, `text-success`, etc.

## Composants

Boutons pleins (`bg-nori text-yuzu`) : hover `hover:bg-nori/90`.
Boutons secondaires (`text-soy`, bordure optionnelle `border-soy/30 border`) et boutons icône seule (cercle `h-9 w-9`, sans bordure) : hover `hover:bg-soy/10` uniquement — pas de changement de couleur de texte au survol.
Toujours `transition-colors` sur les éléments avec un hover.

Confirmation destructrice (ex. suppression) : élément `<dialog>` natif ouvert via `showModal()` (pas de composant modal custom) — penser à `m-auto` (voir `CLAUDE.md`, le preflight Tailwind casse le centrage natif). Icône `warning` en `text-danger`, texte de la question en `text-nori`. Boutons Annuler (secondaire)/Confirmer (plein) dans un conteneur de hauteur fixe (`h-11`) pour que le spinner de chargement — même hauteur, remplace les deux boutons — ne fasse pas bouger la modale.

Création (ex. ajout d'ingrédient) : même principe de `<dialog>`, ouvert depuis un bouton d'action flottant (FAB) — cercle `h-14 w-14`, `bg-nori text-yuzu`, `shadow-lg`, positionné `fixed right-4 bottom-20 z-10` (au-dessus de la nav du bas). Champ texte dans la modale : pill `border-soy/30 border rounded-full px-4 py-2 text-center`, `focus:border-nori`, `placeholder:text-soy/60`.

Skeleton de chargement : les éléments d'action (bouton icône, FAB) ont eux aussi leur pastille `bg-nori/10 animate-pulse`, à la même taille et position que l'élément réel qu'ils remplacent — pas seulement les zones de texte.

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
