import { MealsPort } from "../meals.port";
import { MealsView } from "../meals.view";
import { MealDetailDomainModel } from "../models/meals.domain.model";
import { MealIngredientViewModel } from "../models/meal-ingredient.view.model";

export class FetchMealUseCase {
    constructor(
        private readonly mealsView: MealsView,
        private readonly mealsPort: MealsPort,
    ) { }

    async execute(id: string): Promise<void> {
        if (this.mealsView.mealsViewModel().isMealExpanded(id)) {
            this.mealsView.update(vm => vm.presentCollapsed(id));
            return;
        }

        this.mealsView.update(vm => vm.startLoadingFetchingIngredients(id));
        try {
            const meal = await this.mealsPort.fetchMeal(id);
            this.presentIngredientsFetched(id, meal);
        } catch {
            this.mealsView.update(vm => vm.presentErrorFetchingIngredients(id));
        } finally {
            this.mealsView.update(vm => vm.stopLoadingFetchingIngredients(id));
        }
    }

    private presentIngredientsFetched(id: string, meal: MealDetailDomainModel): void {
        const ingredients = meal.ingredients.map(ingredient => new MealIngredientViewModel({
            id: ingredient.id,
            name: ingredient.name,
            bought: ingredient.bought,
            isLoadingUpdatingBought: false,
            isErrorUpdatingBought: false,
        }));
        this.mealsView.update(vm => vm.presentIngredientsFetched(id, ingredients));
    }
}
