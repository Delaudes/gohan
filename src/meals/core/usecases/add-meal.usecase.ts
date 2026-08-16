import { Field } from "../../../presentation/field/field.port";
import { MealsPort } from "../meals.port";
import { MealsView } from "../meals.view";
import { RecipeDomainModel } from "../models/meals.domain.model";

export class AddMealUseCase {
    constructor(
        private readonly mealsView: MealsView,
        private readonly mealsPort: MealsPort,
    ) { }

    async execute(recipeId: string, field: Field): Promise<void> {
        this.startLoading();
        try {
            const meal = await this.mealsPort.addMeal(recipeId);
            this.presentMealAdded(meal);
            field.value = '';
            field.focus();
        } catch {
            this.presentError();
        } finally {
            this.stopLoading();
        }
    }

    private startLoading(): void {
        this.mealsView.update({ isLoadingAddingMeal: true, isErrorAddingMeal: false });
    }

    private stopLoading(): void {
        this.mealsView.update({ isLoadingAddingMeal: false });
    }

    private presentError(): void {
        this.mealsView.update({ isErrorAddingMeal: true });
    }

    private presentMealAdded(meal: RecipeDomainModel): void {
        const current = this.mealsView.mealsViewModel.get();
        const meals = [
            ...current.meals,
            {
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
                hasIngredients: false,
            },
        ];
        const mealsOptions = current.mealsOptions.filter(option => !meal.is(option.id));
        this.mealsView.update({ meals, hasMeals: true, mealsOptions, hasMealsOptions: mealsOptions.length > 0 });
    }
}
