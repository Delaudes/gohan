import { RecipeDetailDomainModel, RecipeDomainModel, RecipeIngredientDomainModel, RecipesListDomainModel } from "../core/models/recipes.domain.model";
import { RecipesPort } from "../core/recipes.port";

const RECIPE_NAMES: Record<string, string> = {
    '1': 'Pasta Carbonara',
    '2': 'Chicken Curry',
    '3': 'Caesar Salad',
    '4': 'Miso Soup',
    '5': 'Beef Stir Fry',
};

const RECIPE_INGREDIENTS: Record<string, RecipeIngredientDomainModel[]> = {
    '1': [
        new RecipeIngredientDomainModel('1', 'Pâtes'),
        new RecipeIngredientDomainModel('2', 'Lardons'),
        new RecipeIngredientDomainModel('3', 'Œufs'),
        new RecipeIngredientDomainModel('4', 'Parmesan'),
    ],
    '3': [
        new RecipeIngredientDomainModel('5', 'Salade romaine'),
        new RecipeIngredientDomainModel('6', 'Poulet'),
        new RecipeIngredientDomainModel('7', 'Croûtons'),
    ],
};

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

    async fetchRecipe(id: string): Promise<RecipeDetailDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (id === '2') {
            throw new Error('Failed to fetch recipe');
        }

        return new RecipeDetailDomainModel(id, RECIPE_NAMES[id] ?? 'Recette', id === '3', RECIPE_INGREDIENTS[id] ?? []);
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
