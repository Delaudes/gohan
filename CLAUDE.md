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

## Architecture générale

Angular 21, composants standalone (pas de NgModule), routing via `provideRouter` (`src/app/app.config.ts`).
Styles : Tailwind CSS v4, config via `@theme` dans `src/styles.css` (pas de fichier `tailwind.config`).
Schematics par défaut (`angular.json`) : pas de fichier de style par composant (`style: none`), `changeDetection: OnPush` partout.

## Architecture — hexagonale (ports & adapters)

Chaque feature (`meals`, `recipes`, `ingredients`, `shopping`) est organisée en 3 couches :
- `core/` : le domaine.
  - `<feature>.port.ts` : interface consommée par les use cases (ex. `IngredientsPort { fetchIngredientsList(): Promise<IngredientsListDomainModel> }`).
  - `<feature>.view.ts` : classe `<Feature>View`, wrapper autour d'un `SignalPort<ViewModel>` — initialise l'état par défaut dans le constructeur, expose `update(partial)` qui merge dans l'état courant (`{ ...current, ...partial }`).
  - `core/uecases/<action>.usecase.ts` : classe `<Action>UseCase(view, port)` avec une méthode `execute()` — pattern : `view.update({ isLoading: true })`, `try { const result = await port.xxx(); presenter(result) } catch { view.update({ isError: true }) } finally { view.update({ isLoading: false }) }`.
  - `core/models/<feature>.domain.model.ts` : classes du domaine (ex. `IngredientDomainModel`, `IngredientsListDomainModel` avec ses propres méthodes comme `hasIngredients()`).
  - `core/models/<feature>.view.model.ts` : types plats pour le template (`isLoadingX`, `isErrorX`, la liste, un booléen dérivé genre `hasX`).
- `adapters/` : les implémentations du port — `fake-<feature>.adapter.ts` (tests), `in-memory-<feature>.adapter.ts` (données en dur + délai + échec aléatoire simulé, utilisé par défaut tant que l'API n'existe pas), `http-<feature>.adapter.ts`, `adapters/models/<feature>.api.model.ts` (forme des données côté API, mappée vers le domain model).
- `presentation/` : l'UI.
  - `presentation/<feature>.provider.ts` : exporte `<FEATURE>_TOKEN` (InjectionToken<Port>, `providedIn: 'root'`, factory qui instancie l'adapter actif — ex. `InMemoryIngredientsAdapter`) et `<FEATURE>_PROVIDERS` (tableau de providers de composant : `View` via `useFactory` qui construit un `AngularSignalAdapter<ViewModel>`, `<Action>UseCase` via `useFactory` qui injecte `View` + le token du port).
  - `presentation/pages/<feature>/<feature>.page.ts` : composant de route, déclare `providers: [<FEATURE>_PROVIDERS]`, injecte `<Feature>View` (dont on récupère `.xViewModel`, le `SignalPort` brut) et le(s) `<Action>UseCase`, appelle `.execute()` dans `ngOnInit`.
  - `presentation/components/nav-<feature>/nav-<feature>.component.ts` : item de nav associé.
  - Dans le template, lire le view model avec `@let vm = xViewModel.get();` (lecture synchrone trackée par Angular, réactive malgré le passage par une méthode) puis `@if`/`@else if` sur les booléens `isLoadingX` / `isErrorX` / `hasX`. Le bouton "réessayer" rappelle directement `<action>UseCase.execute()`.

Les préoccupations transverses et techniques (pas liées à une feature métier) vivent dans `src/infra/` — même principe port/adapter, un dossier par concern technique :
- `infra/signal/` : `SignalPort<T>` + `AngularSignalAdapter<T>` (vrai signal Angular) + `FakeSignalAdapter<T>` (tests).
- `infra/http/` : `HttpPort` + `AngularHttpAdapter` (vrai `HttpClient`) + `FakeHttpAdapter` (tests) ; `device-id.interceptor.ts` (voir plus bas).
- `infra/storage/` : `StoragePort` (générique par méthode, pas par classe — un seul adapter partagé pour toutes les clés) + `LocalStorageAdapter` (`JSON.parse`/`stringify` en interne, `try/catch` sur parse invalide, retourne `undefined`) + `FakeStorageAdapter`.

Chaque port a un fichier `<domaine>.provider.ts` qui l'expose à l'injection Angular via un `InjectionToken` :
```ts
export const STORAGE_TOKEN = new InjectionToken<StoragePort>('STORAGE_TOKEN', {
    providedIn: 'root',
    factory: () => new LocalStorageAdapter()
});
```
Les adapters récupèrent leurs dépendances avec `inject()` en initialiseur de champ (pas d'injection par constructeur).

**Principe appliqué** : ne pas créer de port/adapter dédié pour une logique triviale (2-3 branches, pas de règle métier) dont l'échec serait de toute façon immédiat et visible en testant l'app à la main, et qui n'a pas de second point de consommation. Exemple : la génération/persistance du device-id n'a pas de `IdentityPort` séparé — elle est directement dans `infra/http/device-id.interceptor.ts`, qui compose `StoragePort`. Un port dédié n'aurait de sens que si l'id devient utilisé ailleurs qu'en header HTTP, ou si la logique se complexifie (rotation, migration de format...).

## Layout

`AppComponent` (`src/app/app.component.ts`) : header en haut + contenu routé, pas de footer.
Navigation en bas d'écran (`app-navigation`) toujours visible (`position: fixed`), avec un composant par page (icônes Material Symbols).

## Routing

Routes définies dans `src/app/app.routes.ts`, chemins centralisés dans l'enum `AppPath`.
Chaque page est chargée en lazy loading (`loadComponent: () => import(...)`), pas d'import statique des pages dans `app.routes.ts`.
Page par défaut : `meals`. Toute route inconnue redirige aussi vers `meals`.

## Conventions de nommage

Une feature = un dossier à plat sous `src/<feature>/` (ex. `src/meals/`, `src/ingredients/`), pas sous `src/app/`. À l'intérieur, structure hexagonale `core/` / `adapters/` / `presentation/` (voir section Architecture ci-dessus).
Composant de page (route) : suffixe `.page` — ex. `meals.page.ts` → classe `MealsPage`, dans `presentation/pages/meals/`.
Composant d'item de navigation associé à une feature : `nav-<feature>.component.ts` → ex. `nav-meals.component.ts` → classe `NavMealsComponent`, dans `presentation/components/nav-meals/`.
Composants de layout globaux de l'app (header, navigation) : suffixe `.component`, préfixés `app.`, à plat dans `src/app/` — ex. `app.header.component.ts` → classe `AppHeaderComponent`.
Ports/adapters d'infra : `<domaine>.port.ts` → `<Domain>Port` ; `<impl>-<domaine>.adapter.ts` → `<Impl><Domain>Adapter` ; `<domaine>.provider.ts` → `<DOMAINE>_TOKEN`.
Dans une feature : `<feature>.view.ts` → classe `<Feature>View` ; `core/uecases/<action>.usecase.ts` → classe `<Action>UseCase` (ex. `fetch-ingredients.usecase.ts` → `FetchIngredientsUseCase`) ; `presentation/<feature>.provider.ts` → `<FEATURE>_TOKEN` + `<FEATURE>_PROVIDERS`.
