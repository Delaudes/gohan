import { ShoppingPort } from "../shopping.port";
import { ShoppingView } from "../shopping.view";
import { ShoppingIngredientDomainModel } from "../models/shopping.domain.model";

export class UpdateShoppingIngredientBoughtUseCase {
    constructor(
        private readonly shoppingView: ShoppingView,
        private readonly shoppingPort: ShoppingPort,
    ) { }

    async execute(id: string, mealId: string | undefined, bought: boolean): Promise<void> {
        this.startLoading(id);
        try {
            const ingredient = mealId
                ? await this.shoppingPort.updateMealIngredient(mealId, id, bought)
                : await this.shoppingPort.updateIngredient(id, bought);
            this.presentIngredientUpdated(ingredient);
        } catch {
            this.presentError(id);
        } finally {
            this.stopLoading(id);
        }
    }

    private startLoading(id: string): void {
        const ingredients = this.shoppingView.shoppingViewModel().ingredients.map(ingredient =>
            ingredient.id === id ? { ...ingredient, isLoadingUpdatingBought: true, isErrorUpdatingBought: false } : ingredient
        );
        this.shoppingView.update({ ingredients });
    }

    private stopLoading(id: string): void {
        const ingredients = this.shoppingView.shoppingViewModel().ingredients.map(ingredient =>
            ingredient.id === id ? { ...ingredient, isLoadingUpdatingBought: false } : ingredient
        );
        this.shoppingView.update({ ingredients });
    }

    private presentError(id: string): void {
        const ingredients = this.shoppingView.shoppingViewModel().ingredients.map(ingredient =>
            ingredient.id === id ? { ...ingredient, isErrorUpdatingBought: true } : ingredient
        );
        this.shoppingView.update({ ingredients });
    }

    private presentIngredientUpdated(ingredient: ShoppingIngredientDomainModel): void {
        const ingredients = this.shoppingView.shoppingViewModel().ingredients.map(current =>
            ingredient.is(current.id) ? { ...current, bought: ingredient.bought } : current
        );
        this.shoppingView.update({
            ingredients,
            ingredientsProgress: `${ingredients.filter(ingredient => ingredient.bought).length}/${ingredients.length} acheté${ingredients.length > 1 ? 's' : ''}`,
        });
    }
}
