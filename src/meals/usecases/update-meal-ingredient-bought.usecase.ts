import { MealsPort } from "../meals.port";
import { MealsView } from "../meals.view";

export class UpdateMealIngredientBoughtUseCase {
    constructor(
        private readonly mealsView: MealsView,
        private readonly mealsPort: MealsPort,
    ) { }

    async execute(mealId: string, ingredientId: string, bought: boolean): Promise<void> {
        this.mealsView.update(vm => vm.startLoadingUpdatingBoughtIngredient(mealId, ingredientId));
        try {
            const ingredient = await this.mealsPort.updateMealIngredient(mealId, ingredientId, bought);
            this.mealsView.update(vm => vm.presentIngredientUpdated(mealId, ingredient.id, ingredient.bought));
        } catch {
            this.mealsView.update(vm => vm.presentErrorUpdatingBoughtIngredient(mealId, ingredientId));
        } finally {
            this.mealsView.update(vm => vm.stopLoadingUpdatingBoughtIngredient(mealId, ingredientId));
        }
    }
}
