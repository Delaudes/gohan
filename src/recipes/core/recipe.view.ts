import { SignalPort } from "../../infra/signal/signal.port";
import { RecipeDetailViewModel } from "./models/recipe.view.model";

export class RecipeView {
    constructor(public readonly recipeViewModel: SignalPort<RecipeDetailViewModel>) {
        recipeViewModel.set({
            isLoadingFetchingRecipe: false,
            isErrorFetchingRecipe: false,
            id: '',
            name: '',
            inMealsList: false,
            ingredients: [],
            hasIngredients: false,
            ingredientsOptions: [],
            hasIngredientsOptions: false,
            isLoadingAddingIngredient: false,
            isErrorAddingIngredient: false,
        });
    }

    update(partial: Partial<RecipeDetailViewModel>): void {
        this.recipeViewModel.update(viewModel => ({ ...viewModel, ...partial }));
    }
}
