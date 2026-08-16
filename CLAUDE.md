Ce fichier est un gabarit de conventions techniques, indépendant du métier du projet : aucune référence au domaine (nom de features, entités métier, vocabulaire produit) ne doit y figurer — ces éléments varient d'un projet à l'autre et rendraient le fichier impossible à recopier tel quel ailleurs. Les exemples doivent rester génériques (`<Feature>`, `<Entity>`, `<Action>`).

## Stack & conventions générales

Angular (standalone components, pas de NgModule).
Tailwind CSS v4, config via `@theme` dans `styles.css` (pas de `tailwind.config`).
Attention `<dialog>` natif : le preflight Tailwind remet `margin: 0` sur tous les éléments, ce qui casse le centrage automatique du navigateur — ajouter `m-auto` explicitement.

Attention Material Symbols via Google Fonts (`fonts.googleapis.com/css2?family=Material+Symbols...`) : demander un point fixe (ex. `FILL@0`) livre une police **statique**, sans table `fvar` — `font-variation-settings` n'a aucun effet dessus, même si la famille est nominalement "variable". Pour un état plein/contour (icône togglée), il faut déclarer un second `@font-face` pointant vers l'instance `FILL@1` (même famille, autre URL fournie par Google), sous un nom différent, puis basculer `font-family` via une classe — pas essayer de faire varier `FILL` en CSS sur une police chargée en un seul point.

Attention `hover:` sur mobile : par défaut Tailwind applique `:hover` sans condition, donc un tap sur tactile déclenche l'état hover et le laisse collé jusqu'au tap suivant (pas de vrai `mouseleave`). Le scoper aux pointeurs qui supportent vraiment le survol via `@custom-variant` dans `styles.css` :
```css
@custom-variant hover {
  @media (hover: hover) {
    &:hover {
      @slot;
    }
  }
}
```
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
    models/<feature>.domain.model.ts      classes domaine + méthodes métier, tell don't ask (ex. hasItems(), is(id) plutôt qu'une comparaison === éparpillée dans les usecases)
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
                                           action ciblant une sous-entité de la feature (ex. un élément qui appartient à un item de la liste) → le nom inclut quand même la feature propriétaire en plus de la sous-entité (`<action>-<feature>-<sous-entité>`), pour rester symétrique avec les composants équivalents des autres features
```

Une feature peut avoir plusieurs ports quand un sous-domaine mérite d'être isolé (ex. `<Feature>Port` pour le CRUD principal + `<SubDomain>Port` pour un sous-domaine annexe, comme la recherche/l'attachement d'une entité liée) — chacun son adapter et son `InjectionToken`, mais un seul `<feature>.provider.ts`/`<FEATURE>_PROVIDERS` partagé. Idem pour les views : une feature avec une liste ET une fiche détail peut avoir `<Feature>View` (pluriel, état liste) et `<Item>View` (singulier, état détail plus riche avec ses propres `isLoadingX`), chacune son `<Item>ViewModel`, toutes deux instanciées dans le même `<FEATURE>_PROVIDERS`.

Un usecase peut dépendre d'un port infra en plus du port métier (ex. `RoutePort` pour lire un id de route) quand c'est lui qui doit résoudre cette donnée, plutôt que de la recevoir en paramètre depuis le composant/page.

Pas de couplage cross-feature : un usecase/port d'une feature n'importe jamais le port, le usecase ou le domain model d'une autre feature — même quand deux features modélisent conceptuellement la même entité sous un angle métier différent. Chaque feature définit alors son propre domain model local plutôt que d'importer celui de l'autre (même nom, même forme, aucun import entre les deux). Chaque feature reste ainsi modifiable/supprimable isolément.

Quand une action (ex. un panneau de recherche pour ajouter un item) a besoin d'un sous-ensemble de données déjà récupérées par un autre usecase de la même feature, dériver ce sous-ensemble via une méthode du domain model plutôt que d'ajouter un port/usecase qui refait un appel réseau — un seul fetch alimente les deux. La recherche au fil de la frappe filtre alors ces données déjà en mémoire côté vue, sans appel port — contrairement à une recherche qui doit rester à jour avec une source vivante partagée entre plusieurs contextes.

Nommage des méthodes `update*` d'un port : générique (`update<Entity>(id, champ)`) tant qu'une seule chose est mutable sur ce port pour cette entité — le paramètre suffit à documenter l'intention. Dès qu'un port expose plusieurs mises à jour distinctes pour la même entité (ex. `<Feature>Port.update<EntityA>` pour l'état principal vs `update<EntityB>` pour une sous-entité qui lui appartient — deux ressources différentes), ou la même opération conceptuelle vers deux endpoints différents selon le contexte de l'entité mise à jour, nommer chaque méthode d'après l'**entité** qu'elle touche plutôt que le champ qu'elle modifie — jamais suffixer par le nom du champ. Le usecase appelant garde lui son nom explicite (`Update<Entity><Champ>UseCase`) même quand la méthode de port qu'il appelle est générique — c'est le usecase qui porte l'intention, pas le port. La variable locale qui l'injecte reprend ce nom sans le suffixe `UseCase` (`update<Entity><Champ> = inject(Update<Entity><Champ>UseCase)`, pas `update<Entity><Champ>UseCase`).

Template : `@let vm = xViewModel.get();` (lecture trackée par Angular même via une méthode) puis `@if`/`@else if` sur les booléens d'état ; les actions rappellent directement `<action>UseCase.execute()`.

Composants de layout globaux (header, footer, navigation) : suffixe `.component`, préfixés `app.`, à plat dans `src/app/` — ex. `app.header.component.ts` → `AppHeaderComponent`.

Préoccupations transverses/techniques (pas liées à une feature métier) → `src/infra/`, même principe port/adapter, un dossier par concern (`infra/signal/`, `infra/http/`, `infra/storage/`, `infra/route/`) : `<domain>.port.ts`, `<impl>-<domain>.adapter.ts` (+ une variante `Fake<Domain>Adapter` pour les tests), `<domain>.provider.ts` exposant un `InjectionToken` (`providedIn:'root'`, factory qui instancie l'implémentation active). Les adapters récupèrent leurs dépendances via `inject()` en initialiseur de champ, pas par constructeur.
`infra/http/device-id.interceptor.ts` : identifiant de device généré (`crypto.randomUUID()`) et persisté via `StoragePort`, injecté en header `X-Device-Id` sur chaque requête HTTP — enregistré globalement dans `app.config.ts` (`provideHttpClient(withInterceptors([...]))`). C'est le mécanisme d'identification utilisé par les `http-*.adapter.ts` en l'absence d'authentification classique.
Attention `infra/route/` : si l'adapter est `providedIn:'root'` (singleton), injecter `ActivatedRoute` directement donne la route racine, pas la route effectivement matchée — passer par `.firstChild` avant de lire les paramètres (`activatedRoute.firstChild?.snapshot.paramMap`). Un seul niveau suffit tant que les routes restent plates ; si des routes imbriquées plus profondes apparaissent un jour, il faudra redescendre récursivement jusqu'à la feuille.

Préoccupations transverses côté UI, réutilisables entre features (ex. confirmation, champ de formulaire) → `src/presentation/<concern>/<concern>.port.ts` (+ `Fake<Concern>` pour les tests). Pas forcément de provider/token : l'implémentation peut être fournie directement par l'appelant (ex. un élément `<dialog>` référencé en template satisfait structurellement le port `Dialog { close(): void }`, un `<input>` satisfait `Field { value: string; focus(): void }`, sans classe wrapper).

Pas de `FormsModule`/formulaires réactifs : un input se lit via sa référence de template (`#ref`, `.value`), passée directement au usecase — pas de state Angular intermédiaire, pas de `<form>`/`(submit)`, pas de gestion d'Enter (bouton uniquement).

Attention aux références de template déclarées dans un bloc `@if`/`@else` : elles ne sont visibles que dans ce bloc, pas dans le reste du template (contrairement à une ref déclarée au niveau racine, ex. `#dialog`).

## Routing

Chemins centralisés dans un enum, jamais de string en dur dans les routes ni les `routerLink`. Même principe pour les noms de paramètres de route (`AppParam` dans `infra/route/app-param.ts`), lus via `RoutePort.getParam()` plutôt qu'en string en dur.
Pages en lazy loading (`loadComponent: () => import(...)`).
Toujours une route par défaut (`redirectTo` depuis `''`) + une route wildcard (`**`) qui redirige vers cette même page.
