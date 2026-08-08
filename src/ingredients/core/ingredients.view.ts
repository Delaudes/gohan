import { SignalPort } from "../../infra/signal/signal.port";
import { IngredientsViewModel } from "./models/ingredients.view.model";

export class IngredientsView {
    constructor(public readonly ingredientsViewModel: SignalPort<IngredientsViewModel>) {
        ingredientsViewModel.set({
            isLoadingFetchingIngredients: false,
            isErrorFetchingIngredients: false,
            ingredients: [],
            hasIngredients: false,
        });
    }

    update(partial: Partial<IngredientsViewModel>): void {
        this.ingredientsViewModel.update(viewModel => ({ ...viewModel, ...partial }));
    }
}