import { ShoppingPort } from "../shopping.port";
import { ShoppingView } from "../shopping.view";
import { ShoppingListDomainModel } from "../models/shopping.domain.model";
import { ShoppingIngredientViewModel } from "../models/shopping-ingredient.view.model";

export class FetchShoppingListUseCase {
    constructor(
        private readonly shoppingView: ShoppingView,
        private readonly shoppingPort: ShoppingPort,
    ) { }

    async execute(): Promise<void> {
        this.shoppingView.update(vm => vm.startLoadingFetchingIngredients());
        try {
            const shoppingList = await this.shoppingPort.fetchShoppingList();
            this.presentIngredientsFetched(shoppingList);
        } catch {
            this.shoppingView.update(vm => vm.presentErrorFetchingIngredients());
        } finally {
            this.shoppingView.update(vm => vm.stopLoadingFetchingIngredients());
        }
    }

    private presentIngredientsFetched(shoppingList: ShoppingListDomainModel): void {
        const ingredients = shoppingList.ingredients.map(ingredient => new ShoppingIngredientViewModel({
            id: ingredient.id,
            name: ingredient.name,
            bought: ingredient.bought,
            mealId: ingredient.mealId,
            mealName: ingredient.mealName,
            isLoadingUpdatingBought: false,
            isErrorUpdatingBought: false,
            isLoadingRemoving: false,
            isErrorRemoving: false,
        }));
        this.shoppingView.update(vm => vm.presentIngredientsFetched(ingredients));
    }
}
