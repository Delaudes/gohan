import { RecipeDomainModel, RecipesListDomainModel } from "../core/models/recipes.domain.model";
import { RecipesPort } from "../core/recipes.port";

export class InMemoryRecipesAdapter implements RecipesPort {
    async fetchRecipesList(): Promise<RecipesListDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (Math.random() < 0.33) {
            throw new Error('Failed to fetch recipes list');
        }

        if (Math.random() < 0.66) {
            return new RecipesListDomainModel([]);
        }

        const recipes = [
            new RecipeDomainModel('1', 'Pasta Carbonara', true),
            new RecipeDomainModel('2', 'Chicken Curry', false),
            new RecipeDomainModel('3', 'Caesar Salad', true),
            new RecipeDomainModel('4', 'Miso Soup', false),
            new RecipeDomainModel('5', 'Beef Stir Fry', false),
        ];
        return new RecipesListDomainModel(recipes);
    }

    async createRecipe(name: string): Promise<RecipeDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (name.trim().toLowerCase() === 'error') {
            throw new Error('Failed to create recipe');
        }

        return new RecipeDomainModel(crypto.randomUUID(), name, false);
    }

    async updateRecipe(id: string, inMealsList: boolean): Promise<RecipeDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 800));

        if (id === '2') {
            throw new Error('Failed to update recipe');
        }

        return new RecipeDomainModel(id, '', inMealsList);
    }

    async deleteRecipe(id: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (id === '1') {
            throw new Error('Failed to delete recipe');
        }
    }
}
