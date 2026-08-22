import { MealsPort } from "../core/meals.port";
import { MealDetailDomainModel, MealDomainModel, MealIngredientDomainModel, RecipeDomainModel, RecipesListDomainModel } from "../core/models/meals.domain.model";

let RECIPES: RecipeDomainModel[] = [
    new RecipeDomainModel('1', 'Pasta Carbonara', true, false),
    new RecipeDomainModel('2', 'Chili Con Carne', true, false),
    new RecipeDomainModel('3', 'Caesar Salad', true, true),
    new RecipeDomainModel('4', 'Miso Soup', false, false),
    new RecipeDomainModel('5', 'Beef Stir Fry', false, false),
    new RecipeDomainModel('6', 'Ratatouille', false, false),
];

const MEAL_INGREDIENTS: Record<string, MealIngredientDomainModel[]> = {
    '1': [
        new MealIngredientDomainModel('1', 'Pâtes', true),
        new MealIngredientDomainModel('2', 'Lardons', false),
        new MealIngredientDomainModel('3', 'Œufs', false),
    ],
    '2': [],
    '3': [
        new MealIngredientDomainModel('5', 'Salade romaine', true),
        new MealIngredientDomainModel('6', 'Poulet', true),
        new MealIngredientDomainModel('7', 'Croûtons', false),
        new MealIngredientDomainModel('4', 'Parmesan', true),
    ],
};

export class InMemoryMealsAdapter implements MealsPort {
    async fetchRecipesList(): Promise<RecipesListDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (Math.random() < 0.33) {
            throw new Error('Failed to fetch meals list');
        }

        if (Math.random() < 0.66) {
            return new RecipesListDomainModel([]);
        }

        return new RecipesListDomainModel(RECIPES);
    }

    async fetchMeal(id: string): Promise<MealDetailDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (id === '3') {
            throw new Error('Failed to fetch meal');
        }

        const recipe = RECIPES.find(recipe => recipe.id === id);
        return new MealDetailDomainModel(id, recipe?.name ?? 'Repas', recipe?.done ?? true, MEAL_INGREDIENTS[id] ?? []);
    }

    async updateMeal(id: string, done: boolean): Promise<MealDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (id === '2') {
            throw new Error('Failed to update meal');
        }

        RECIPES = RECIPES.map(recipe => recipe.id === id ? new RecipeDomainModel(recipe.id, recipe.name, recipe.inMealsList, done) : recipe);
        return new MealDomainModel(id, '', done);
    }

    async addMeal(id: string): Promise<MealDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 800));

        const recipe = RECIPES.find(recipe => recipe.id === id);
        if (recipe?.id === '6') {
            throw new Error('Failed to add meal');
        }

        const meal = new RecipeDomainModel(recipe!.id, recipe!.name, true, false);
        RECIPES = RECIPES.map(recipe => recipe.id === id ? meal : recipe);
        return meal;
    }

    async removeMeal(id: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (id === '1') {
            throw new Error('Failed to remove meal');
        }

        RECIPES = RECIPES.map(recipe => recipe.id === id ? new RecipeDomainModel(recipe.id, recipe.name, false, recipe.done) : recipe);
    }

    async updateMealIngredient(mealId: string, ingredientId: string, bought: boolean): Promise<MealIngredientDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (ingredientId === '2') {
            throw new Error('Failed to update ingredient');
        }

        return new MealIngredientDomainModel(ingredientId, '', bought);
    }
}
