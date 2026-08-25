import { RecipeView } from "../recipe.view";

export class SearchIngredientOptionsUseCase {
    constructor(
        private readonly recipeView: RecipeView,
    ) { }

    execute(query: string): void {
        this.recipeView.update(vm => vm.presentIngredientsSearchQuery(query));
    }
}
