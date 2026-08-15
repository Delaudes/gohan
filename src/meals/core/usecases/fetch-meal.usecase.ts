import { MealsPort } from "../meals.port";
import { MealsView } from "../meals.view";
import { MealDetailDomainModel } from "../models/meals.domain.model";

export class FetchMealUseCase {
    constructor(
        private readonly mealsView: MealsView,
        private readonly mealsPort: MealsPort,
    ) { }

    async execute(id: string): Promise<void> {
        const current = this.mealsView.mealsViewModel.get().meals.find(meal => meal.id === id);
        if (current?.isExpanded) {
            this.collapse(id);
            return;
        }

        this.startLoading(id);
        try {
            const meal = await this.mealsPort.fetchMeal(id);
            this.presentMeal(meal);
        } catch {
            this.presentError(id);
        } finally {
            this.stopLoading(id);
        }
    }

    private collapse(id: string): void {
        const meals = this.mealsView.mealsViewModel.get().meals.map(meal =>
            meal.id === id ? { ...meal, isExpanded: false } : meal
        );
        this.mealsView.update({ meals });
    }

    private startLoading(id: string): void {
        const meals = this.mealsView.mealsViewModel.get().meals.map(meal =>
            meal.id === id ? { ...meal, isExpanded: true, isLoadingIngredients: true, isErrorIngredients: false } : meal
        );
        this.mealsView.update({ meals });
    }

    private stopLoading(id: string): void {
        const meals = this.mealsView.mealsViewModel.get().meals.map(meal =>
            meal.id === id ? { ...meal, isLoadingIngredients: false } : meal
        );
        this.mealsView.update({ meals });
    }

    private presentError(id: string): void {
        const meals = this.mealsView.mealsViewModel.get().meals.map(meal =>
            meal.id === id ? { ...meal, isErrorIngredients: true } : meal
        );
        this.mealsView.update({ meals });
    }

    private presentMeal(meal: MealDetailDomainModel): void {
        const meals = this.mealsView.mealsViewModel.get().meals.map(current =>
            meal.is(current.id) ? {
                ...current,
                ingredients: meal.ingredients.map(ingredient => ({
                    id: ingredient.id,
                    name: ingredient.name,
                    bought: ingredient.bought,
                    isLoadingUpdatingBought: false,
                    isErrorUpdatingBought: false,
                })),
                hasIngredients: meal.hasIngredients(),
            } : current
        );
        this.mealsView.update({ meals });
    }
}
