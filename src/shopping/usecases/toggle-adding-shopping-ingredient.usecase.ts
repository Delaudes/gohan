import { ShoppingView } from "../shopping.view";

export class ToggleAddingShoppingIngredientUseCase {
    constructor(
        private readonly shoppingView: ShoppingView,
    ) { }

    execute(visible: boolean): void {
        this.shoppingView.update(vm => vm.presentAddingIngredientVisible(visible).presentIngredientsSearchQuery(''));
    }
}
