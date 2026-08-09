import { IngredientsPort } from "../ingredients.port";
import { IngredientsView } from "../ingredients.view";
import { IngredientDomainModel } from "../models/ingredients.domain.model";

export class UpdateIngredientShoppingListUseCase {
    constructor(
        private readonly ingredientsView: IngredientsView,
        private readonly ingredientsPort: IngredientsPort,
    ) { }

    async execute(id: string, inShoppingList: boolean): Promise<void> {
        this.startLoading(id);
        try {
            const ingredient = await this.ingredientsPort.updateIngredient(id, inShoppingList);
            this.presentIngredientUpdated(ingredient);
        } catch {
            this.presentError(id);
        } finally {
            this.stopLoading(id);
        }
    }

    private startLoading(id: string): void {
        const ingredients = this.ingredientsView.ingredientsViewModel.get().ingredients.map(ingredient =>
            ingredient.id === id ? { ...ingredient, isLoadingUpdating: true, isErrorUpdating: false } : ingredient
        );
        this.ingredientsView.update({ ingredients });
    }

    private stopLoading(id: string): void {
        const ingredients = this.ingredientsView.ingredientsViewModel.get().ingredients.map(ingredient =>
            ingredient.id === id ? { ...ingredient, isLoadingUpdating: false } : ingredient
        );
        this.ingredientsView.update({ ingredients });
    }

    private presentError(id: string): void {
        const ingredients = this.ingredientsView.ingredientsViewModel.get().ingredients.map(ingredient =>
            ingredient.id === id ? { ...ingredient, isErrorUpdating: true } : ingredient
        );
        this.ingredientsView.update({ ingredients });
    }

    private presentIngredientUpdated(ingredient: IngredientDomainModel): void {
        const ingredients = this.ingredientsView.ingredientsViewModel.get().ingredients.map(current =>
            current.id === ingredient.id ? { ...current, inShoppingList: ingredient.inShoppingList } : current
        );
        this.ingredientsView.update({ ingredients });
    }
}
