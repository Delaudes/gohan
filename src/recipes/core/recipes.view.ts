import { SignalPort } from "../../infra/signal/signal.port";
import { RecipesViewModel } from "./models/recipes.view.model";

export class RecipesView {
    constructor(public readonly recipesViewModel: SignalPort<RecipesViewModel>) {
        recipesViewModel.set({
            isLoadingFetchingRecipes: false,
            isErrorFetchingRecipes: false,
            isLoadingCreatingRecipe: false,
            isErrorCreatingRecipe: false,
            recipes: [],
            hasRecipes: false,
        });
    }

    update(partial: Partial<RecipesViewModel>): void {
        this.recipesViewModel.update(viewModel => ({ ...viewModel, ...partial }));
    }
}
