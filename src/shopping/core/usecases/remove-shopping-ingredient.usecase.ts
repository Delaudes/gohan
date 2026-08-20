import { Dialog } from "../../../presentation/dialog/dialog.port";
import { ShoppingPort } from "../shopping.port";
import { ShoppingView } from "../shopping.view";

export class RemoveShoppingIngredientUseCase {
    constructor(
        private readonly shoppingView: ShoppingView,
        private readonly shoppingPort: ShoppingPort,
    ) { }

    async execute(id: string, dialog: Dialog): Promise<void> {
        this.startLoading(id);
        try {
            await this.shoppingPort.removeIngredient(id);
            this.presentIngredientRemoved(id);
            dialog.close();
        } catch {
            this.presentError(id);
        } finally {
            this.stopLoading(id);
        }
    }

    private startLoading(id: string): void {
        const ingredients = this.shoppingView.shoppingViewModel().ingredients.map(ingredient =>
            ingredient.id === id ? { ...ingredient, isLoadingRemoving: true, isErrorRemoving: false } : ingredient
        );
        this.shoppingView.update({ ingredients });
    }

    private stopLoading(id: string): void {
        const ingredients = this.shoppingView.shoppingViewModel().ingredients.map(ingredient =>
            ingredient.id === id ? { ...ingredient, isLoadingRemoving: false } : ingredient
        );
        this.shoppingView.update({ ingredients });
    }

    private presentError(id: string): void {
        const ingredients = this.shoppingView.shoppingViewModel().ingredients.map(ingredient =>
            ingredient.id === id ? { ...ingredient, isErrorRemoving: true } : ingredient
        );
        this.shoppingView.update({ ingredients });
    }

    private presentIngredientRemoved(id: string): void {
        const ingredients = this.shoppingView.shoppingViewModel().ingredients.filter(ingredient => ingredient.id !== id);
        this.shoppingView.update({
            ingredients,
            hasIngredients: ingredients.length > 0,
            ingredientsProgress: `${ingredients.filter(ingredient => ingredient.bought).length}/${ingredients.length} acheté${ingredients.length > 1 ? 's' : ''}`,
        });
    }
}
