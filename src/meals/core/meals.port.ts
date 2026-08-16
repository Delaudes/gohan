import { MealDetailDomainModel, MealIngredientDomainModel, RecipeDomainModel, RecipesListDomainModel } from "./models/meals.domain.model";

export interface MealsPort {
    fetchMealsList(): Promise<RecipesListDomainModel>;
    fetchMeal(id: string): Promise<MealDetailDomainModel>;
    updateMeal(id: string, done: boolean): Promise<RecipeDomainModel>;
    addMeal(recipeId: string): Promise<RecipeDomainModel>;
    removeMeal(id: string): Promise<void>;
    updateMealIngredient(mealId: string, ingredientId: string, bought: boolean): Promise<MealIngredientDomainModel>;
}
