import { ShoppingIngredientDomainModel } from "../models/shopping.domain.model";
import { ShoppingIngredientViewModel } from "../models/shopping-ingredient.view.model";
import { ShoppingPort } from "../shopping.port";
import { ShoppingView } from "../shopping.view";

export class AddKnownShoppingIngredientUseCase {
    constructor(
        private readonly shoppingView: ShoppingView,
        private readonly shoppingPort: ShoppingPort,
    ) { }

    async execute(ingredientId: string): Promise<void> {
        this.shoppingView.update(vm => vm.startLoadingAddingIngredient());
        try {
            const ingredient = await this.shoppingPort.addIngredient(ingredientId);
            this.presentIngredientAdded(ingredient);
        } catch {
            this.shoppingView.update(vm => vm.presentErrorAddingIngredient());
        } finally {
            this.shoppingView.update(vm => vm.stopLoadingAddingIngredient());
        }
    }

    private presentIngredientAdded(ingredient: ShoppingIngredientDomainModel): void {
        const ingredientViewModel = new ShoppingIngredientViewModel({
            id: ingredient.id,
            name: ingredient.name,
            bought: ingredient.bought,
            mealId: ingredient.mealId,
            mealName: ingredient.mealName,
            isLoadingUpdatingBought: false,
            isErrorUpdatingBought: false,
            isLoadingRemoving: false,
            isErrorRemoving: false,
        });
        this.shoppingView.update(vm => vm.presentIngredientAdded(ingredientViewModel));
    }
}
