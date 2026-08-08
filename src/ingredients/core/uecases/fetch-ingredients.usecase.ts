import { IngredientsPort } from "../ingredients.port";
import { IngredientsView } from "../ingredients.view";
import { IngredientsListDomainModel } from "../models/ingredients.domain.model";

export class FetchIngredientsUseCase {
    constructor(
        private readonly ingredientsView: IngredientsView,
        private readonly ingredientsPort: IngredientsPort,
    ) { }

    async execute(): Promise<void> {
        this.ingredientsView.update({ isLoadingFetchingIngredients: true });
        try {
            const ingredientsList = await this.ingredientsPort.fetchIngredientsList();
            this.presentIngredientsList(ingredientsList);
        } catch {
            this.ingredientsView.update({ isErrorFetchingIngredients: true });
        } finally {
            this.ingredientsView.update({ isLoadingFetchingIngredients: false });
        }
    }

    private presentIngredientsList(ingredientsList: IngredientsListDomainModel) {
        this.ingredientsView.update({
            isErrorFetchingIngredients: false,
            ingredients: ingredientsList.ingredients.map(ingredient => ({
                id: ingredient.id,
                name: ingredient.name,
            })),
            hasIngredients: ingredientsList.hasIngredients(),
        });
    }
}