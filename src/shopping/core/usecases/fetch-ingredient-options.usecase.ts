import { IngredientOptionViewModel } from "../models/ingredient-option.view.model";
import { ShoppingPort } from "../shopping.port";
import { ShoppingView } from "../shopping.view";

export class FetchIngredientOptionsUseCase {
    constructor(
        private readonly shoppingView: ShoppingView,
        private readonly shoppingPort: ShoppingPort,
    ) { }

    async execute(): Promise<void> {
        try {
            const result = await this.shoppingPort.fetchIngredientOptions();
            const options = result.options.map(option => new IngredientOptionViewModel({
                id: option.id,
                name: option.name,
            }));
            this.shoppingView.update(vm => vm.presentIngredientOptionsFetched(options));
        } catch {
            this.shoppingView.update(vm => vm.presentIngredientOptionsFetched([]));
        }
    }
}
