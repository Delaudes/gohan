## Stack & conventions générales

Angular (standalone components, pas de NgModule).
Tailwind CSS v4, config via `@theme` dans `styles.css` (pas de `tailwind.config`).
Attention `<dialog>` natif : le preflight Tailwind remet `margin: 0` sur tous les éléments, ce qui casse le centrage automatique du navigateur — ajouter `m-auto` explicitement.

Attention Material Symbols via Google Fonts (`fonts.googleapis.com/css2?family=Material+Symbols...`) : demander un point fixe (ex. `FILL@0`) livre une police **statique**, sans table `fvar` — `font-variation-settings` n'a aucun effet dessus, même si la famille est nominalement "variable". Pour un état plein/contour (icône togglée), il faut déclarer un second `@font-face` pointant vers l'instance `FILL@1` (même famille, autre URL fournie par Google), sous un nom différent, puis basculer `font-family` via une classe — pas essayer de faire varier `FILL` en CSS sur une police chargée en un seul point.
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
                                           collaborateur propre à l'appel (ex. Dialog à fermer sur succès) → paramètre d'execute(), pas du constructeur
    models/<feature>.domain.model.ts      classes domaine + méthodes métier (ex. hasItems())
    models/<feature>.view.model.ts        état plat pour le template (isLoadingX, isErrorX, hasX, la donnée)
                                           action ciblant un item d'une liste → isLoadingX/isErrorX vivent sur l'item lui-même, pas sur le view model racine (sinon fuite d'état entre lignes)
  adapters/
    fake-<feature>.adapter.ts             pour les tests
    in-memory-<feature>.adapter.ts        données en dur + délai/échec simulés — adapter par défaut avant la vraie API
    http-<feature>.adapter.ts             vraie implémentation
    models/<feature>.api.model.ts         forme API, mappée vers le domain model
  presentation/
    <feature>.provider.ts                 <FEATURE>_TOKEN (InjectionToken<Port>, providedIn:'root') + <FEATURE>_PROVIDERS (View + UseCase via useFactory)
    pages/<feature>/<feature>.page.ts     <Feature>Page — providers:[<FEATURE>_PROVIDERS], injecte View+UseCase, execute() dans ngOnInit
    components/nav-<feature>/nav-<feature>.component.ts   Nav<Feature>Component, item de nav associé
    components/<action>-<feature>/<action>-<feature>.component.ts   composant autonome pour une action ciblant un item (bouton + sa propre UI, ex. confirmation) : reçoit l'item en input(), injecte le <Action>UseCase associé
```

Template : `@let vm = xViewModel.get();` (lecture trackée par Angular même via une méthode) puis `@if`/`@else if` sur les booléens d'état ; les actions rappellent directement `<action>UseCase.execute()`.

Composants de layout globaux (header, footer, navigation) : suffixe `.component`, préfixés `app.`, à plat dans `src/app/` — ex. `app.header.component.ts` → `AppHeaderComponent`.

Préoccupations transverses/techniques (pas liées à une feature métier) → `src/infra/`, même principe port/adapter, un dossier par concern (`infra/signal/`, `infra/http/`, `infra/storage/`) : `<domain>.port.ts`, `<impl>-<domain>.adapter.ts` (+ une variante `Fake<Domain>Adapter` pour les tests), `<domain>.provider.ts` exposant un `InjectionToken` (`providedIn:'root'`, factory qui instancie l'implémentation active). Les adapters récupèrent leurs dépendances via `inject()` en initialiseur de champ, pas par constructeur.

Préoccupations transverses côté UI, réutilisables entre features (ex. confirmation, champ de formulaire) → `src/presentation/<concern>/<concern>.port.ts` (+ `Fake<Concern>` pour les tests). Pas forcément de provider/token : l'implémentation peut être fournie directement par l'appelant (ex. un élément `<dialog>` référencé en template satisfait structurellement le port `Dialog { close(): void }`, un `<input>` satisfait `Field { value: string }`, sans classe wrapper).

Pas de `FormsModule`/formulaires réactifs : un input se lit via sa référence de template (`#ref`, `.value`), passée directement au usecase — pas de state Angular intermédiaire, pas de `<form>`/`(submit)`, pas de gestion d'Enter (bouton uniquement).

Attention aux références de template déclarées dans un bloc `@if`/`@else` : elles ne sont visibles que dans ce bloc, pas dans le reste du template (contrairement à une ref déclarée au niveau racine, ex. `#dialog`).

## Routing

Chemins centralisés dans un enum, jamais de string en dur dans les routes ni les `routerLink`.
Pages en lazy loading (`loadComponent: () => import(...)`).
Toujours une route par défaut (`redirectTo` depuis `''`) + une route wildcard (`**`) qui redirige vers cette même page.
