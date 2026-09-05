import { ShoppingPort } from "../shopping.port";
import { ShoppingView } from "../shopping.view";

export class UpdateShoppingIngredientBoughtUseCase {
    constructor(
        private readonly shoppingView: ShoppingView,
        private readonly shoppingPort: ShoppingPort,
    ) { }

    async execute(id: string, mealId: string | undefined, bought: boolean): Promise<void> {
        this.shoppingView.update(vm => vm.startLoadingUpdatingBoughtIngredient(id, mealId));
        try {
            const ingredient = mealId
                ? await this.shoppingPort.updateMealIngredient(mealId, id, bought)
                : await this.shoppingPort.updateIngredient(id, bought);
            this.shoppingView.update(vm => vm.presentIngredientUpdated(ingredient.id, ingredient.bought, mealId));
        } catch {
            this.shoppingView.update(vm => vm.presentErrorUpdatingBoughtIngredient(id, mealId));
        } finally {
            this.shoppingView.update(vm => vm.stopLoadingUpdatingBoughtIngredient(id, mealId));
        }
    }
}
