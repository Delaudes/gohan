import { MealDetailDomainModel, MealDomainModel, MealIngredientDomainModel, RecipesListDomainModel } from "./models/meals.domain.model";

export interface MealsPort {
    fetchRecipesList(): Promise<RecipesListDomainModel>;
    fetchMeal(id: string): Promise<MealDetailDomainModel>;
    updateMeal(id: string, done: boolean): Promise<MealDomainModel>;
    addMeal(id: string): Promise<MealDomainModel>;
    removeMeal(id: string): Promise<void>;
    updateMealIngredient(mealId: string, ingredientId: string, bought: boolean): Promise<MealIngredientDomainModel>;
}
