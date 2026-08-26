import { IngredientOptionDomainModel, IngredientOptionsDomainModel, RecipeDomainModel, RecipeIngredientDomainModel } from "../core/models/recipe.domain.model";
import { RecipePort } from "../core/recipe.port";

export class InMemoryRecipeAdapter implements RecipePort {
    async fetchRecipe(id: string): Promise<RecipeDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (id === '1') {
            throw new Error('Failed to fetch recipe');
        }

        if (id === '2') {
            return {
                id,
                name: 'Recette sans ingrédients',
                inMealsList: false,
                ingredients: [],
            };
        }

        return {
            id,
            name: 'Recette avec ingrédients',
            inMealsList: true,
            ingredients: [
                { id: '101', name: 'Tomate' },
                { id: '102', name: 'Oignon' },
                { id: '103', name: 'Ail' },
            ],
        };
    }

    async fetchIngredientOptions(): Promise<IngredientOptionsDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            options: [
                { id: '101', name: 'Tomate' },
                { id: '102', name: 'Oignon' },
                { id: '103', name: 'Ail' },
                { id: '104', name: 'Basilic' },
                { id: '105', name: 'Mozzarella' },
                { id: '106', name: 'Farine' },
                { id: '107', name: 'Sucre' },
                { id: '108', name: 'Sel' },
                { id: '109', name: 'Poivre' },
                { id: '110', name: "Huile d'olive" },
            ],
        };
    }

    async createIngredientOption(name: string): Promise<IngredientOptionDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (name.trim().toLowerCase() === 'error') {
            throw new Error('Failed to create ingredient');
        }

        return { id: crypto.randomUUID(), name: name.trim() };
    }

    async addRecipeIngredient(recipeId: string, ingredientId: string): Promise<RecipeIngredientDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (ingredientId === '101') {
            throw new Error('Failed to add ingredient to recipe');
        }

        return { id: ingredientId, name: 'Ingredient ' + ingredientId };
    }

    async removeRecipeIngredient(recipeId: string, ingredientId: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (ingredientId === '101') {
            throw new Error('Failed to remove ingredient from recipe');
        }
    }
}
