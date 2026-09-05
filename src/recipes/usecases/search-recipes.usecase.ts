import { RecipesView } from "../recipes.view";

export class SearchRecipesUseCase {
    constructor(
        private readonly recipesView: RecipesView,
    ) { }

    execute(query: string): void {
        this.recipesView.update(vm => vm.presentSearchQuery(query));
    }
}
