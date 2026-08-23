import { RecipeDomainModel, RecipesListDomainModel } from "../core/models/recipes.domain.model";
import { RecipesPort } from "../core/recipes.port";

export class InMemoryRecipesAdapter implements RecipesPort {
    async fetchRecipesList(): Promise<RecipesListDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            recipes: [
                { id: '1', name: 'Pasta Carbonara', inMealsList: true },
                { id: '2', name: 'Chicken Curry', inMealsList: false },
                { id: '3', name: 'Caesar Salad', inMealsList: true },
                { id: '4', name: 'Miso Soup', inMealsList: false },
                { id: '5', name: 'Beef Stir Fry', inMealsList: false },
            ],
        };
    }

    async createRecipe(name: string): Promise<RecipeDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (name.trim().toLowerCase() === 'error') {
            throw new Error('Failed to create recipe');
        }

        return { id: crypto.randomUUID(), name, inMealsList: false };
    }

    async updateRecipe(id: string, inMealsList: boolean): Promise<RecipeDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (id === '1') {
            throw new Error('Failed to update recipe');
        }

        return { id, name: '', inMealsList };
    }

    async deleteRecipe(id: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (id === '1') {
            throw new Error('Failed to delete recipe');
        }
    }
}
