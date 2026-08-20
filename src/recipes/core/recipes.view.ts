import { signal } from "@angular/core";
import { RecipesViewModel } from "./models/recipes.view.model";

export class RecipesView {
    readonly recipesViewModel = signal<RecipesViewModel>({
        isLoadingFetchingRecipes: false,
        isErrorFetchingRecipes: false,
        isLoadingCreatingRecipe: false,
        isErrorCreatingRecipe: false,
        recipes: [],
        hasRecipes: false,
    });

    update(partial: Partial<RecipesViewModel>): void {
        this.recipesViewModel.update(viewModel => ({ ...viewModel, ...partial }));
    }
}
