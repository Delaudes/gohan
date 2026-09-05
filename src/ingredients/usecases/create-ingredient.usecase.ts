import { IngredientsPort } from "../ingredients.port";
import { IngredientsView } from "../ingredients.view";
import { IngredientViewModel } from "../models/ingredient.view.model";
import { IngredientDomainModel } from "../models/ingredients.domain.model";

export class CreateIngredientUseCase {
    constructor(
        private readonly ingredientsView: IngredientsView,
        private readonly ingredientsPort: IngredientsPort,
    ) { }

    async execute(name: string): Promise<void> {
        this.ingredientsView.update(vm => vm.startLoadingCreatingIngredient());
        try {
            const ingredient = await this.ingredientsPort.createIngredient(name.trim());
            this.presentIngredientCreated(ingredient);
        } catch {
            this.ingredientsView.update(vm => vm.presentErrorCreatingIngredient());
        } finally {
            this.ingredientsView.update(vm => vm.stopLoadingCreatingIngredient())
        }
    }


    private presentIngredientCreated(ingredient: IngredientDomainModel): void {
        const ingredientViewModel = new IngredientViewModel({
            id: ingredient.id,
            name: ingredient.name,
            isLoadingDeleting: false,
            isLoadingUpdating: false,
            isErrorUpdating: false,
            inShoppingList: ingredient.inShoppingList,
        });
        this.ingredientsView.update(vm => vm.presentIngredientCreated(ingredientViewModel));
    }
}
