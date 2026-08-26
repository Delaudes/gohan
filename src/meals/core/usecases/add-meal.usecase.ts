import { Field } from "../../../presentation/field/field.port";
import { MealsPort } from "../meals.port";
import { MealsView } from "../meals.view";
import { MealDomainModel } from "../models/meals.domain.model";
import { MealViewModel } from "../models/meal.view.model";

export class AddMealUseCase {
    constructor(
        private readonly mealsView: MealsView,
        private readonly mealsPort: MealsPort,
    ) { }

    async execute(id: string, field: Field): Promise<void> {
        this.mealsView.update(vm => vm.startLoadingAddingMeal());
        try {
            const meal = await this.mealsPort.addMeal(id);
            this.presentMealAdded(meal);
            field.value = '';
            field.focus();
        } catch {
            this.mealsView.update(vm => vm.presentErrorAddingMeal());
        } finally {
            this.mealsView.update(vm => vm.stopLoadingAddingMeal());
        }
    }

    private presentMealAdded(meal: MealDomainModel): void {
        const mealViewModel = new MealViewModel({
            id: meal.id,
            name: meal.name,
            done: meal.done,
            isLoadingUpdatingDone: false,
            isErrorUpdatingDone: false,
            isLoadingRemoving: false,
            isErrorRemoving: false,
            isExpanded: false,
            isLoadingIngredients: false,
            isErrorIngredients: false,
            ingredients: [],
        });
        this.mealsView.update(vm => vm.presentMealAdded(mealViewModel));
    }
}
