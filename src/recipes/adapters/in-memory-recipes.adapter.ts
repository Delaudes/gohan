import { RecipeDomainModel, RecipesListDomainModel } from "../core/models/recipes.domain.model";
import { RecipesPort } from "../core/recipes.port";

let RECIPES: RecipeDomainModel[] = [
    { id: '1', name: 'Pasta Carbonara', inMealsList: true },
    { id: '2', name: 'Chicken Curry', inMealsList: false },
    { id: '3', name: 'Caesar Salad', inMealsList: true },
    { id: '4', name: 'Miso Soup', inMealsList: false },
    { id: '5', name: 'Beef Stir Fry', inMealsList: false },
];

export class InMemoryRecipesAdapter implements RecipesPort {
    async fetchRecipesList(): Promise<RecipesListDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        return { recipes: RECIPES };
    }

    async createRecipe(name: string): Promise<RecipeDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (name.trim().toLowerCase() === 'error') {
            throw new Error('Failed to create recipe');
        }

        const recipe = { id: crypto.randomUUID(), name, inMealsList: false };
        RECIPES = [...RECIPES, recipe];
        return recipe;
    }

    async updateRecipe(id: string, inMealsList: boolean): Promise<RecipeDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (id === '1') {
            throw new Error('Failed to update recipe');
        }

        RECIPES = RECIPES.map(recipe => recipe.id === id ? { ...recipe, inMealsList } : recipe);
        return RECIPES.find(recipe => recipe.id === id)!;
    }

    async deleteRecipe(id: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (id === '1') {
            throw new Error('Failed to delete recipe');
        }

        RECIPES = RECIPES.filter(recipe => recipe.id !== id);
    }
}
