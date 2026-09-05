import { IngredientsPort } from "../ingredients.port";
import { IngredientsView } from "../ingredients.view";

export class UpdateIngredientShoppingListUseCase {
    constructor(
        private readonly ingredientsView: IngredientsView,
        private readonly ingredientsPort: IngredientsPort,
    ) { }

    async execute(id: string, inShoppingList: boolean): Promise<void> {
        this.ingredientsView.update(vm => vm.startLoadingUpdatingIngredient(id));
        try {
            const ingredient = await this.ingredientsPort.updateIngredient(id, inShoppingList);
            this.ingredientsView.update(vm => vm.presentIngredientUpdated(ingredient.id, ingredient.inShoppingList));
        } catch {
            this.ingredientsView.update(vm => vm.presentErrorUpdatingIngredient(id));
        } finally {
            this.ingredientsView.update(vm => vm.stopLoadingUpdatingIngredient(id));
        }
    }
}
