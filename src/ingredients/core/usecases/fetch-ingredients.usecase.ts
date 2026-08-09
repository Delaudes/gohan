import { IngredientsPort } from "../ingredients.port";
import { IngredientsView } from "../ingredients.view";
import { IngredientsListDomainModel } from "../models/ingredients.domain.model";

export class FetchIngredientsUseCase {
    constructor(
        private readonly ingredientsView: IngredientsView,
        private readonly ingredientsPort: IngredientsPort,
    ) { }

    async execute(): Promise<void> {
        this.startLoading();
        try {
            const ingredientsList = await this.ingredientsPort.fetchIngredientsList();
            this.presentIngredientsList(ingredientsList);
        } catch {
            this.presentError();
        } finally {
            this.stopLoading();
        }
    }

    private startLoading(): void {
        this.ingredientsView.update({ isLoadingFetchingIngredients: true, isErrorFetchingIngredients: false });
    }

    private stopLoading(): void {
        this.ingredientsView.update({ isLoadingFetchingIngredients: false });
    }

    private presentError(): void {
        this.ingredientsView.update({ isErrorFetchingIngredients: true });
    }

    private presentIngredientsList(ingredientsList: IngredientsListDomainModel) {
        this.ingredientsView.update({
            ingredients: ingredientsList.ingredients.map(ingredient => ({
                id: ingredient.id,
                name: ingredient.name,
                isLoadingDeleting: false,
                isErrorDeleting: false,
                isLoadingUpdating: false,
                isErrorUpdating: false,
                inShoppingList: ingredient.inShoppingList,
            })),
            hasIngredients: ingredientsList.hasIngredients(),
        });
    }
}