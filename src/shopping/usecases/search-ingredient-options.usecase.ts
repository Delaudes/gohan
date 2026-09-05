import { ShoppingView } from "../shopping.view";

export class SearchIngredientOptionsUseCase {
    constructor(
        private readonly shoppingView: ShoppingView,
    ) { }

    execute(query: string): void {
        this.shoppingView.update(vm => vm.presentIngredientsSearchQuery(query));
    }
}
