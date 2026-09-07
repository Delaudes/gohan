Ce fichier est un gabarit de conventions de tests, indépendant du métier du projet — comme `CLAUDE.md`, aucune référence au domaine ne doit y figurer, les exemples restent génériques (`<Feature>`, `<Entity>`, `<Action>`). Il documente comment tester une feature suivant l'architecture décrite dans `CLAUDE.md`.

## Périmètre

Testé, en unitaire, sans aucun runtime Angular (pas de `TestBed`) :
- les usecases (`usecases/<action>.usecase.ts`)
- les dérivations de ViewModel exposées en `get` (`models/<feature>.view.model.ts`, `models/<entity>.view.model.ts`)
- les adapters HTTP (`adapters/http-<feature>.adapter.ts`)

Volontairement hors périmètre : les composants et leurs templates (`presentation/`). Dans cette architecture ils ne contiennent aucune logique — seulement `input()`/`inject(<Action>UseCase)` et des bindings de template lisant des ViewModels déjà testés. Les y tester reviendrait à tester le moteur de rendu d'Angular, pas le code du projet, et nécessiterait de toute façon un runtime Angular (`TestBed` ou un navigateur réel en E2E). Si un composant se met un jour à contenir une vraie condition dans son `.ts` (pas juste dans le template), la bonne réponse est d'extraire cette logique dans le ViewModel/usecase — pas d'aller chercher un moyen de tester le composant.

## Emplacement des fichiers

Un dossier `specs/` à côté de ce qui est testé :
```
usecases/specs/<action>.usecase.spec.ts
models/specs/<feature>.view.model.spec.ts
adapters/specs/http-<feature>.adapter.spec.ts
```

## Deux écoles, un seul critère de choix

**Chicago** (à travers le vrai usecase, avec un vrai `View`/ViewModel, on vérifie l'état final) — par défaut pour tous les usecases. Aucun mock : les collaborateurs (View, ViewModel) sont déjà des classes pures/immuables, gratuites à instancier réellement.

**London** (test direct, isolé) — réservé aux dérivations de ViewModel exposées en `get`. Ce n'est pas un choix de goût : déplacer une dérivation hors du ViewModel vers un usecase est une règle d'architecture interdite (`CLAUDE.md`), donc il n'y a aucun risque de fragilité au refactor à la tester directement — elle ne bougera pas d'endroit.

Une dérivation paramétrée consommée par une seule dérivation parente (ex. `<Entity>ViewModel.matches(query)` appelée uniquement par `<Feature>ViewModel.filtered<Entities>`) n'a pas besoin de son propre test : elle est déjà couverte transitivement par les cas de test de la dérivation parente.

## Convention : `get` = "à tester directement sur le ViewModel"

Toute dérivation de ViewModel sans paramètre est un `get` (jamais une méthode) — c'est le signal visuel qui indique "ceci se teste directement sur le ViewModel" par opposition à une méthode de mutation, qui elle se teste uniquement à travers un usecase.

## Specs de ViewModel

```ts
describe('<Feature list ou comportement, jamais un nom de classe/méthode>', () => {
    let viewModel: <Feature>ViewModel;

    beforeEach(() => {
        viewModel = <Feature>ViewModel.initial();
    });

    it('<comportement>', () => {
        expect(viewModel.<getter>).toEqual(<avant>);

        viewModel = viewModel.<mutation>(...);

        expect(viewModel.<getter>).toEqual(<après>);
    });
})
```

- `describe()`/`it()` ne contiennent jamais un nom de méthode ou de classe littéral (risque de dérive au renommage) — décrire le comportement, pas l'implémentation.
- Toujours un `expect` de l'état AVANT l'action, puis un `expect` de l'état APRÈS, dans le même `it()` — ça protège contre un faux positif (ex. une liste vide qui se fait passer pour "correctement filtrée à vide" alors que le fetch n'a jamais rempli quoi que ce soit).
- Corollaire : si un test ne fait QUE vérifier l'état initial sans jamais agir, il est redondant dès qu'un autre test vérifie ce même état comme son "avant" — le supprimer et plutôt garantir que ce "avant" est bien asserté là où il sert de point de départ à une vraie action.
- Les données de test doivent réellement discriminer le comportement, pas coïncidentiellement passer :
  - un test de recherche partielle doit viser une sous-chaîne qui n'est NI un préfixe NI un suffixe du nom cible, sinon il passerait aussi avec un `startsWith`/`endsWith` au lieu d'un `includes` ;
  - un test de tri doit fournir au moins deux éléments dans un ordre différent de l'ordre attendu en sortie, sinon il passerait aussi avec un simple `push` sans tri.

## Specs de usecase

```ts
describe('<Comportement, jamais le nom de la classe>', () => {
    let useCase: <Action><Entity>UseCase;
    let view: <Feature>View;
    let fake<Feature>Adapter: Fake<Feature>Adapter;

    beforeEach(() => {
        view = new <Feature>View();
        fake<Feature>Adapter = new Fake<Feature>Adapter();
        useCase = new <Action><Entity>UseCase(view, fake<Feature>Adapter);
    });

    it('should present loading while <action> is in progress', async () => {
        expect(view.<feature>ViewModel().isLoadingX).toEqual(false);

        const promise = useCase.execute();

        expect(view.<feature>ViewModel().isLoadingX).toEqual(true);

        await promise;

        expect(view.<feature>ViewModel().isLoadingX).toEqual(false);
    });
})
```

Cas à couvrir pour un usecase qui appelle un port et présente loading/erreur/succès :
- loading true pendant l'appel, false après (succès et échec)
- reset de l'erreur précédente au lancement d'une nouvelle tentative
- reset du succès précédent au lancement d'une nouvelle tentative (miroir du reset d'erreur)
- présentation correcte du résultat en cas de succès
- présentation correcte de l'erreur en cas d'échec

Usecase sans port, purement synchrone (ex. présenter une query de recherche ou un toggle d'affichage) : un seul test d'orchestration fin suffit — vérifier l'état avant, appeler `execute(valeur)`, vérifier que le ViewModel reflète cette valeur.

Usecase dont le port distingue un échec métier attendu d'un échec technique (`Promise<<Action>Result>` plutôt que throw, cf. `CLAUDE.md`) : la Fake renvoie le `Result` construit à l'avance, aucun `try/catch` à tester côté usecase — juste vérifier que chaque variante du `Result` (succès, chaque `<Action>Error`) produit le bon état de ViewModel, avec le bon message résolu.

## Fake adapters (`adapters/fake-<feature>.adapter.ts`)

- Toutes les méthodes en `async`, `return` direct — jamais `Promise.resolve(...)`.
- État contrôlable par méthode, deux formes possibles :
  - un simple flag booléen (`errorFetching<Entities>: boolean`) pour un usecase throw/catch classique ;
  - un `Record<string, T>` keyé (`<entities>By<Clé>`, ex. `<entities>ByName`, `<action>ResultById`) quand la réponse dépend de l'entité ciblée ou quand le port renvoie un `<Action>Result`.
- Convention de nommage harmonisée `xxxBy<Clé>` pour tous les Records d'un même fake — ne pas mélanger `xxxRecord` et `xxxByClé` dans le même fichier.
- La clé du Record sert elle-même de preuve implicite que le bon paramètre a été utilisé (id, nom...) quand la réponse est effectivement consommée par l'appelant : pas besoin d'un champ `lastXxx` séparé pour vérifier "a été appelé avec le bon argument" en plus de la réponse elle-même.

## `FakeHttpAdapter` (`infra/http/fake-http.adapter.ts`)

Fake partagé, un seul pour toute l'app, implémentant `HttpPort` :
- `get`/`delete` (pas de body) : `Record<string, unknown>` keyé par url seule — `getResponseByUrl`, `deleteResponseByUrl`.
- `post`/`put`/`patch` (url + body) : `Record<string, unknown>` keyé par une clé composite `` `${url}:${JSON.stringify(body)}` `` — `postResponseByUrlAndBody`, etc. — l'url seule ne suffit pas à distinguer deux appels vers le même endpoint avec des corps différents.
- Méthode d'adapter qui renvoie `Promise<void>` (ex. un `remove<Entity>` qui ne consomme jamais la réponse) : la clé du Record ne prouve plus rien puisque rien n'en ressort côté appelant. Le Fake garde alors le dernier url/body vu **par verbe HTTP** (`lastPatchUrl`/`lastPatchBody`, `lastDeleteUrl`) — jamais nommé d'après la méthode métier (`lastRemoveMealUrl` par ex.), le Fake ne connaît que des verbes HTTP, pas le vocabulaire d'une feature. Le test suit la même convention avant/après que partout ailleurs : `expect(fakeHttpAdapter.lastPatchUrl).toBeUndefined()` avant l'appel, puis assert de l'url (et du body si pertinent) après.
- Pour simuler un rejet (ex. un usecase qui catch une erreur HTTP pour distinguer un conflit d'une erreur technique) : un Record d'erreurs dédié keyé par url (`deleteErrorByUrl`), vérifié par présence de la clé (`url in this.deleteErrorByUrl`, pas par troncature de vérité) avant de retourner la réponse normale — extensible au besoin à `get`/`post`/`put`/`patch`.

## Specs d'adapter HTTP (`adapters/specs/http-<feature>.adapter.spec.ts`)

```ts
describe('Http <feature> adapter', () => {
    let adapter: Http<Feature>Adapter;
    let fakeHttpAdapter: FakeHttpAdapter;

    beforeEach(() => {
        fakeHttpAdapter = new FakeHttpAdapter();
        adapter = new Http<Feature>Adapter(fakeHttpAdapter);
    });
})
```

- Un test par méthode du port, vérifiant le mapping API model → domain model.
- La fixture de réponse simulée ne doit contenir que les champs que CETTE méthode lit réellement (cf. `CLAUDE.md`, un `*ApiModel` ne déclare que ce qui est mappé) — pas la forme API complète recopiée par habitude d'un autre test du même fichier.
- Ne couvrir que les branches d'erreur que l'adapter discrimine réellement dans son propre code (ex. 409 vs. autre) — ne pas fabriquer une forme d'erreur inatteignable en pratique. La forme réelle des erreurs vient de l'implémentation concrète de `HttpPort` utilisée en prod (`AngularHttpAdapter`, qui relaie les erreurs `HttpClient` d'Angular) : celles-ci ont toujours un `status` numérique (0 par défaut si aucune réponse reçue), donc un test qui balance une erreur sans `status` du tout ne teste rien de réellement producible — pas la peine de l'écrire.
- Le garde-fou de type (`typeof error === 'object' && error !== null && 'status' in error`) qu'on trouve parfois dans ces adapters n'est pas une protection métier contre un cas réel : c'est du narrowing TypeScript obligatoire pour lire une propriété sur un `unknown` capturé par un `catch`. Ne pas chercher à le tester spécifiquement.
- Même famille de piège avec un `array.find(...)?.champ ?? repli` sur la réponse d'une mutation ciblée (ex. chercher l'entité qu'on vient de modifier/ajouter dans la liste renvoyée) : le `?.`/`??` n'existe que parce que `.find()` type son retour `T | undefined`, pas parce que l'entité peut réellement manquer — si la mutation a réussi, l'API renvoie forcément l'entité concernée. Pas besoin d'un test dédié au cas "introuvable dans la réponse" pour ce genre de repli.

## Particularité outillage

`npx ng test --no-watch` échoue de façon fiable au tout premier lancement juste après avoir vidé `.angular/cache` ("Vitest failed to find the runner") — relancer une fois suffit, c'est un problème d'outillage connu, pas un bug de code.

Si cette même erreur persiste sur plusieurs relances d'affilée (au-delà du flake habituel), vérifier qu'un précédent `ng test`/`npm run test` n'est pas resté bloqué en arrière-plan (process node zombie qui tient le verrou/port dont Vitest a besoin) — lister les process `node.exe` et tuer spécifiquement ceux dont la ligne de commande contient `ng.js test` ou `npm-cli.js ... run test`, sans toucher aux `ng serve` en cours.
