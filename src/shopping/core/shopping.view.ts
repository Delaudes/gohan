import { SignalPort } from "../../infra/signal/signal.port";
import { ShoppingViewModel } from "./models/shopping.view.model";

export class ShoppingView {
    constructor(public readonly shoppingViewModel: SignalPort<ShoppingViewModel>) {
        shoppingViewModel.set({
            isLoadingFetchingIngredients: false,
            isErrorFetchingIngredients: false,
            ingredients: [],
            hasIngredients: false,
            ingredientsProgress: '',
        });
    }

    update(partial: Partial<ShoppingViewModel>): void {
        this.shoppingViewModel.update(viewModel => ({ ...viewModel, ...partial }));
    }
}
