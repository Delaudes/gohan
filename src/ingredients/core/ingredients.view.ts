import { signal } from "@angular/core";
import { IngredientsViewModel } from "./models/ingredients.view.model";

export class IngredientsView {
    readonly ingredientsViewModel = signal<IngredientsViewModel>({
        isLoadingFetchingIngredients: false,
        isErrorFetchingIngredients: false,
        isLoadingCreatingIngredient: false,
        isErrorCreatingIngredient: false,
        ingredients: [],
        hasIngredients: false,
    });

    update(partial: Partial<IngredientsViewModel>): void {
        this.ingredientsViewModel.update(viewModel => ({ ...viewModel, ...partial }));
    }
}
