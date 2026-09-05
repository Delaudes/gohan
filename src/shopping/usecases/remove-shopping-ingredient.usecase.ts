import { ShoppingPort } from "../shopping.port";
import { ShoppingView } from "../shopping.view";

export class RemoveShoppingIngredientUseCase {
    constructor(
        private readonly shoppingView: ShoppingView,
        private readonly shoppingPort: ShoppingPort,
    ) { }

    async execute(id: string): Promise<void> {
        this.shoppingView.update(vm => vm.startLoadingRemovingIngredient(id));
        try {
            await this.shoppingPort.removeIngredient(id);
            this.shoppingView.update(vm => vm.presentIngredientRemoved(id));
        } catch {
            this.shoppingView.update(vm => vm.presentErrorRemovingIngredient(id));
        } finally {
            this.shoppingView.update(vm => vm.stopLoadingRemovingIngredient(id));
        }
    }
}
