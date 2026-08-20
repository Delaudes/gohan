import { ShoppingPort } from "../shopping.port";
import { ShoppingView } from "../shopping.view";
import { ShoppingListDomainModel } from "../models/shopping.domain.model";

export class FetchShoppingListUseCase {
    constructor(
        private readonly shoppingView: ShoppingView,
        private readonly shoppingPort: ShoppingPort,
    ) { }

    async execute(): Promise<void> {
        this.startLoading();
        try {
            const shoppingList = await this.shoppingPort.fetchShoppingList();
            this.presentShoppingList(shoppingList);
        } catch {
            this.presentError();
        } finally {
            this.stopLoading();
        }
    }

    private startLoading(): void {
        this.shoppingView.update({ isLoadingFetchingIngredients: true, isErrorFetchingIngredients: false });
    }

    private stopLoading(): void {
        this.shoppingView.update({ isLoadingFetchingIngredients: false });
    }

    private presentError(): void {
        this.shoppingView.update({ isErrorFetchingIngredients: true });
    }

    private presentShoppingList(shoppingList: ShoppingListDomainModel): void {
        const ingredients = shoppingList.ingredients;
        const ingredientsCount = shoppingList.ingredientsCount();
        this.shoppingView.update({
            ingredients: ingredients.map(ingredient => ({
                id: ingredient.id,
                name: ingredient.name,
                bought: ingredient.bought,
                mealId: ingredient.mealId,
                mealName: ingredient.mealName,
                isLoadingUpdatingBought: false,
                isErrorUpdatingBought: false,
                isLoadingRemoving: false,
                isErrorRemoving: false,
            })),
            hasIngredients: shoppingList.hasIngredients(),
            ingredientsProgress: `${shoppingList.boughtIngredientsCount()}/${ingredientsCount} acheté${ingredientsCount > 1 ? 's' : ''}`,
        });
    }
}
