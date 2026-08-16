import { MealsPort } from "../meals.port";
import { MealsView } from "../meals.view";
import { MealIngredientDomainModel } from "../models/meals.domain.model";
import { MealIngredientViewModel } from "../models/meals.view.model";

export class UpdateIngredientBoughtUseCase {
    constructor(
        private readonly mealsView: MealsView,
        private readonly mealsPort: MealsPort,
    ) { }

    async execute(mealId: string, ingredientId: string, bought: boolean): Promise<void> {
        this.startLoading(mealId, ingredientId);
        try {
            const ingredient = await this.mealsPort.updateMealIngredient(mealId, ingredientId, bought);
            this.presentIngredientUpdated(mealId, ingredient);
        } catch {
            this.presentError(mealId, ingredientId);
        } finally {
            this.stopLoading(mealId, ingredientId);
        }
    }

    private startLoading(mealId: string, ingredientId: string): void {
        this.updateIngredient(mealId, ingredientId, ingredient => ({ ...ingredient, isLoadingUpdatingBought: true, isErrorUpdatingBought: false }));
    }

    private stopLoading(mealId: string, ingredientId: string): void {
        this.updateIngredient(mealId, ingredientId, ingredient => ({ ...ingredient, isLoadingUpdatingBought: false }));
    }

    private presentError(mealId: string, ingredientId: string): void {
        this.updateIngredient(mealId, ingredientId, ingredient => ({ ...ingredient, isErrorUpdatingBought: true }));
    }

    private presentIngredientUpdated(mealId: string, ingredient: MealIngredientDomainModel): void {
        const meals = this.mealsView.mealsViewModel.get().meals.map(meal =>
            meal.id === mealId ? {
                ...meal,
                ingredients: meal.ingredients.map(current => ingredient.is(current.id) ? { ...current, bought: ingredient.bought } : current),
            } : meal
        );
        this.mealsView.update({ meals });
    }

    private updateIngredient(mealId: string, ingredientId: string, updateFn: (ingredient: MealIngredientViewModel) => MealIngredientViewModel): void {
        const meals = this.mealsView.mealsViewModel.get().meals.map(meal =>
            meal.id === mealId ? {
                ...meal,
                ingredients: meal.ingredients.map(ingredient => ingredient.id === ingredientId ? updateFn(ingredient) : ingredient),
            } : meal
        );
        this.mealsView.update({ meals });
    }
}
