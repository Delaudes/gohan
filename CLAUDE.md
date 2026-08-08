Nom de l'app : Gohan

## Design — Couleurs

Rice white #FAF6EC : Fond principal de l'application
Nori #1F2B22 : Couleur du texte, des titres, et fond des icônes sombres
Yuzu #F2B705 : Accent principal — actions, coches, éléments actifs. Attention : contraste trop faible sur fond Rice white (~1.7:1), à utiliser sur fond Nori (pastille `bg-nori text-yuzu`, ~8:1). Dans la nav, la pastille ne couvre que l'icône, pas le label texte (sinon rendu trop chargé)
Soy #8B5E3C : Accent secondaire, textes discrets, et séparateurs/bordures discrètes (ex. `border-soy/20`)

Tokens Tailwind (`src/styles.css`, bloc `@theme`) : `bg-rice-white`, `text-nori`, `text-yuzu`, `border-soy`, etc.

## Design — Typographie

Police des titres : Zen Maru Gothic — appliquée automatiquement à tous les `h1`-`h6` (règle globale dans `src/styles.css`, pas besoin d'ajouter de classe)
Police du texte courant : Inter — appliquée par défaut sur `body`
Police optionnelle : JetBrains Mono — disponible via la classe `font-mono`, pas appliquée par défaut (à utiliser au cas par cas)

Fonts chargées via Google Fonts dans `src/index.html`.

## Architecture

Angular 21, composants standalone (pas de NgModule), routing via `provideRouter` (`src/app/app.config.ts`).
Styles : Tailwind CSS v4, config via `@theme` dans `src/styles.css` (pas de fichier `tailwind.config`).
Schematics par défaut (`angular.json`) : pas de fichier de style par composant (`style: none`), `changeDetection: OnPush` partout.

## Layout

`AppComponent` (`src/app/app.component.ts`) : header en haut + contenu routé, pas de footer.
Navigation en bas d'écran (`app-navigation`) toujours visible (`position: fixed`), avec un composant par page (icônes Material Symbols).

## Routing

Routes définies dans `src/app/app.routes.ts`, chemins centralisés dans l'enum `AppPath`.
Page par défaut : `meals`. Toute route inconnue redirige aussi vers `meals`.

## Conventions de nommage

Une feature = un dossier à plat sous `src/<feature>/` (ex. `src/meals/`, `src/ingredients/`), pas sous `src/app/`.
Composant de page (route) : suffixe `.page` — ex. `meals.page.ts` → classe `MealsPage`.
Composant d'item de navigation associé à une feature : `nav-<feature>.component.ts` → ex. `nav-meals.component.ts` → classe `NavMealsComponent`, vit dans le dossier de la feature.
Composants de layout globaux de l'app (header, navigation) : suffixe `.component`, préfixés `app.`, à plat dans `src/app/` — ex. `app.header.component.ts` → classe `AppHeaderComponent`.
