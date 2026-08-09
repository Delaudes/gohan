## Stack & conventions générales

Angular (standalone components, pas de NgModule).
Tailwind CSS v4, config via `@theme` dans `styles.css` (pas de `tailwind.config`).
Schematics par défaut (`angular.json`) : `style: none`, `changeDetection: OnPush` partout.

Spécificités visuelles/produit : voir `DESIGN.md` (volontairement absent d'ici, pour que ce fichier reste copiable tel quel dans un autre projet).

## Architecture — hexagonale (ports & adapters)

Chaque feature métier = un dossier à plat sous `src/<feature>/` (pas sous `src/app/`) :

```
src/<feature>/
  core/
    <feature>.port.ts                     interface <Feature>Port
    <feature>.view.ts                     <Feature>View — wrapper SignalPort<ViewModel>, update(partial) merge l'état
    usecases/<action>.usecase.ts          <Action>UseCase(view, port).execute() : loading → appel port → present ou error → loading off
    models/<feature>.domain.model.ts      classes domaine + méthodes métier (ex. hasItems())
    models/<feature>.view.model.ts        état plat pour le template (isLoadingX, isErrorX, hasX, la donnée)
  adapters/
    fake-<feature>.adapter.ts             pour les tests
    in-memory-<feature>.adapter.ts        données en dur + délai/échec simulés — adapter par défaut avant la vraie API
    http-<feature>.adapter.ts             vraie implémentation
    models/<feature>.api.model.ts         forme API, mappée vers le domain model
  presentation/
    <feature>.provider.ts                 <FEATURE>_TOKEN (InjectionToken<Port>, providedIn:'root') + <FEATURE>_PROVIDERS (View + UseCase via useFactory)
    pages/<feature>/<feature>.page.ts     <Feature>Page — providers:[<FEATURE>_PROVIDERS], injecte View+UseCase, execute() dans ngOnInit
    components/nav-<feature>/nav-<feature>.component.ts   Nav<Feature>Component, item de nav associé
```

Template : `@let vm = xViewModel.get();` (lecture trackée par Angular même via une méthode) puis `@if`/`@else if` sur les booléens d'état ; les actions rappellent directement `<action>UseCase.execute()`.

Composants de layout globaux (header, footer, navigation) : suffixe `.component`, préfixés `app.`, à plat dans `src/app/` — ex. `app.header.component.ts` → `AppHeaderComponent`.

Préoccupations transverses/techniques (pas liées à une feature métier) → `src/infra/`, même principe port/adapter, un dossier par concern (`infra/signal/`, `infra/http/`, `infra/storage/`) : `<domain>.port.ts`, `<impl>-<domain>.adapter.ts` (+ une variante `Fake<Domain>Adapter` pour les tests), `<domain>.provider.ts` exposant un `InjectionToken` (`providedIn:'root'`, factory qui instancie l'implémentation active). Les adapters récupèrent leurs dépendances via `inject()` en initialiseur de champ, pas par constructeur.

## Routing

Chemins centralisés dans un enum, jamais de string en dur dans les routes ni les `routerLink`.
Pages en lazy loading (`loadComponent: () => import(...)`).
Toujours une route par défaut (`redirectTo` depuis `''`) + une route wildcard (`**`) qui redirige vers cette même page.
