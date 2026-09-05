import { ShoppingView } from "../shopping.view";

export class ToggleHideBoughtIngredientsUseCase {
    constructor(
        private readonly shoppingView: ShoppingView,
    ) { }

    execute(hide: boolean): void {
        this.shoppingView.update(vm => vm.presentHideBoughtIngredients(hide));
    }
}
