import { IngredientsPort } from "../ingredients.port";
import { IngredientsView } from "../ingredients.view";
import { IngredientViewModel } from "../models/ingredient.view.model";
import { IngredientsListDomainModel } from "../models/ingredients.domain.model";

export class FetchIngredientsUseCase {
    constructor(
        private readonly ingredientsView: IngredientsView,
        private readonly ingredientsPort: IngredientsPort,
    ) { }

    async execute(): Promise<void> {
        this.ingredientsView.update(vm => vm.startLoadingFetchingIngredients());
        try {
            const ingredientsList = await this.ingredientsPort.fetchIngredientsList();
            this.presentIngredientsFetched(ingredientsList);
        } catch {
            this.ingredientsView.update(vm => vm.presentErrorFetchingIngredients());
        } finally {
            this.ingredientsView.update(vm => vm.stopLoadingFetchingIngredients());
        }
    }

    private presentIngredientsFetched(ingredientsList: IngredientsListDomainModel): void {
        const ingredients = ingredientsList.ingredients.map(ingredient => new IngredientViewModel({
            id: ingredient.id,
            name: ingredient.name,
            isLoadingDeleting: false,
            isErrorDeleting: false,
            isLoadingUpdating: false,
            isErrorUpdating: false,
            inShoppingList: ingredient.inShoppingList,
        }));
        this.ingredientsView.update(vm => vm.presentIngredientsFetched(ingredients));
    }
}
