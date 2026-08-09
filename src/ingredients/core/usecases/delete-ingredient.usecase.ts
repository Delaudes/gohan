import { Dialog } from "../../../presentation/dialog/dialog.port";
import { IngredientsPort } from "../ingredients.port";
import { IngredientsView } from "../ingredients.view";

export class DeleteIngredientUseCase {
    constructor(
        private readonly ingredientsView: IngredientsView,
        private readonly ingredientsPort: IngredientsPort,
    ) { }

    async execute(id: string, dialog: Dialog): Promise<void> {
        this.startLoading(id);
        try {
            await this.ingredientsPort.deleteIngredient(id);
            this.presentIngredientDeleted(id);
            dialog.close();
        } catch {
            this.presentError(id);
        } finally {
            this.stopLoading(id);
        }
    }

    private startLoading(id: string): void {
        const ingredients = this.ingredientsView.ingredientsViewModel.get().ingredients.map(ingredient =>
            ingredient.id === id ? { ...ingredient, isLoadingDeleting: true } : ingredient
        );
        this.ingredientsView.update({ ingredients });
    }

    private stopLoading(id: string): void {
        const ingredients = this.ingredientsView.ingredientsViewModel.get().ingredients.map(ingredient =>
            ingredient.id === id ? { ...ingredient, isLoadingDeleting: false } : ingredient
        );
        this.ingredientsView.update({ ingredients });
    }

    private presentError(id: string): void {
        const ingredients = this.ingredientsView.ingredientsViewModel.get().ingredients.map(ingredient =>
            ingredient.id === id ? { ...ingredient, isErrorDeleting: true } : ingredient
        );
        this.ingredientsView.update({ ingredients });
    }

    private presentIngredientDeleted(id: string): void {
        const ingredients = this.ingredientsView.ingredientsViewModel.get().ingredients.filter(ingredient => ingredient.id !== id);
        this.ingredientsView.update({
            ingredients,
            hasIngredients: ingredients.length > 0,
        });
    }
}
