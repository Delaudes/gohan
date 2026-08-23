import { signal } from "@angular/core";
import { RecipeViewModel } from "./models/recipe.view.model";

export class RecipeView {
    readonly recipeViewModel = signal<RecipeViewModel>({
        isLoadingFetchingRecipe: false,
        isErrorFetchingRecipe: false,
        id: '',
        name: '',
        inMealsList: false,
        ingredients: [],
        hasIngredients: false,
        ingredientsOptions: [],
        isLoadingAddingIngredient: false,
        isErrorAddingIngredient: false,
    });

    update(partial: Partial<RecipeViewModel>): void {
        this.recipeViewModel.update(viewModel => ({ ...viewModel, ...partial }));
    }
}
