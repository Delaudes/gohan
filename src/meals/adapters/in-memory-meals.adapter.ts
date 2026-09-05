import { MealsPort } from "../meals.port";
import { MealDetailDomainModel, MealDomainModel, MealIngredientDomainModel, RecipeDomainModel, RecipesListDomainModel } from "../models/meals.domain.model";

let RECIPES: RecipeDomainModel[] = [
    { id: '1', name: 'Pasta Carbonara', inMealsList: true, done: false },
    { id: '2', name: 'Chili Con Carne', inMealsList: true, done: false },
    { id: '3', name: 'Caesar Salad', inMealsList: true, done: true },
    { id: '4', name: 'Miso Soup', inMealsList: false, done: false },
    { id: '5', name: 'Beef Stir Fry', inMealsList: false, done: false },
    { id: '6', name: 'Ratatouille', inMealsList: false, done: false },
];

const MEAL_INGREDIENTS: Record<string, MealIngredientDomainModel[]> = {
    '2': [],
    '3': [
        { id: '1', name: 'Salade romaine', bought: true },
        { id: '2', name: 'Poulet', bought: true },
        { id: '3', name: 'Croûtons', bought: false },
    ],
};

export class InMemoryMealsAdapter implements MealsPort {
    async fetchRecipesList(): Promise<RecipesListDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        return { recipes: RECIPES };
    }

    async fetchMeal(id: string): Promise<MealDetailDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (id === '1') {
            throw new Error('Failed to fetch meal');
        }

        const recipe = RECIPES.find(recipe => recipe.id === id);
        return {
            id,
            name: recipe?.name ?? 'Repas',
            done: recipe?.done ?? true,
            ingredients: MEAL_INGREDIENTS[id] ?? [],
        };
    }

    async updateMeal(id: string, done: boolean): Promise<MealDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (id === '1') {
            throw new Error('Failed to update meal');
        }

        RECIPES = RECIPES.map(recipe => recipe.id === id ? { ...recipe, done } : recipe);
        return { id, name: '', done };
    }

    async addMeal(id: string): Promise<MealDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const recipe = RECIPES.find(recipe => recipe.id === id);
        if (recipe?.id === '4') {
            throw new Error('Failed to add meal');
        }

        const meal = { id: recipe!.id, name: recipe!.name, inMealsList: true, done: false };
        RECIPES = RECIPES.map(recipe => recipe.id === id ? meal : recipe);
        return meal;
    }

    async removeMeal(id: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (id === '1') {
            throw new Error('Failed to remove meal');
        }

        RECIPES = RECIPES.map(recipe => recipe.id === id ? { ...recipe, inMealsList: false } : recipe);
    }

    async updateMealIngredient(mealId: string, ingredientId: string, bought: boolean): Promise<MealIngredientDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (ingredientId === '1') {
            throw new Error('Failed to update ingredient');
        }

        return { id: ingredientId, name: '', bought };
    }
}
