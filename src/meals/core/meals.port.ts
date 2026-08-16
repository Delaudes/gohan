import { MealDetailDomainModel, MealDomainModel, MealIngredientDomainModel, MealsListDomainModel } from "./models/meals.domain.model";

export interface MealsPort {
    fetchMealsList(): Promise<MealsListDomainModel>;
    fetchMeal(id: string): Promise<MealDetailDomainModel>;
    updateMeal(id: string, done: boolean): Promise<MealDomainModel>;
    addMeal(recipeId: string): Promise<MealDomainModel>;
    removeMeal(id: string): Promise<void>;
    updateMealIngredient(mealId: string, ingredientId: string, bought: boolean): Promise<MealIngredientDomainModel>;
}
