import { signal } from "@angular/core";
import { RecipeDetailViewModel } from "./models/recipe.view.model";

export class RecipeView {
    readonly recipeViewModel = signal<RecipeDetailViewModel>({
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

    update(partial: Partial<RecipeDetailViewModel>): void {
        this.recipeViewModel.update(viewModel => ({ ...viewModel, ...partial }));
    }
}
