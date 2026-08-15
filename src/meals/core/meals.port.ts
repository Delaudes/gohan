import { MealDetailDomainModel, MealDomainModel, MealIngredientDomainModel, MealsListDomainModel } from "./models/meals.domain.model";

export interface MealsPort {
    fetchMealsList(): Promise<MealsListDomainModel>;
    fetchMeal(id: string): Promise<MealDetailDomainModel>;
    updateMealDone(id: string, done: boolean): Promise<MealDomainModel>;
    removeMeal(id: string): Promise<void>;
    updateIngredientBought(mealId: string, ingredientId: string, bought: boolean): Promise<MealIngredientDomainModel>;
}
