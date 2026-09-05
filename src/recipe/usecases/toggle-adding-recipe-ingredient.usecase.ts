import { RecipeView } from "../recipe.view";

export class ToggleAddingRecipeIngredientUseCase {
    constructor(
        private readonly recipeView: RecipeView,
    ) { }

    execute(visible: boolean): void {
        this.recipeView.update(vm => vm.presentAddingIngredientVisible(visible).presentIngredientsSearchQuery(''));
    }
}
