import { signal } from "@angular/core";
import { ShoppingViewModel } from "./models/shopping.view.model";

export class ShoppingView {
    readonly shoppingViewModel = signal<ShoppingViewModel>({
        isLoadingFetchingIngredients: false,
        isErrorFetchingIngredients: false,
        ingredients: [],
        hasIngredients: false,
        ingredientsProgress: '',
    });

    update(partial: Partial<ShoppingViewModel>): void {
        this.shoppingViewModel.update(viewModel => ({ ...viewModel, ...partial }));
    }
}
