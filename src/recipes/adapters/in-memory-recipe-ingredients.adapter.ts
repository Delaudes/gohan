import { IngredientsOptionsDomainModel, RecipeIngredientDomainModel } from "../core/models/recipes.domain.model";
import { RecipeIngredientsPort } from "../core/recipe-ingredients.port";

let INGREDIENT_OPTIONS: RecipeIngredientDomainModel[] = [
    new RecipeIngredientDomainModel('101', 'Tomate'),
    new RecipeIngredientDomainModel('102', 'Oignon'),
    new RecipeIngredientDomainModel('103', 'Ail'),
    new RecipeIngredientDomainModel('104', 'Basilic'),
    new RecipeIngredientDomainModel('105', 'Mozzarella'),
    new RecipeIngredientDomainModel('106', 'Farine'),
    new RecipeIngredientDomainModel('107', 'Sucre'),
    new RecipeIngredientDomainModel('108', 'Sel'),
    new RecipeIngredientDomainModel('109', 'Poivre'),
    new RecipeIngredientDomainModel('110', "Huile d'olive"),
];

export class InMemoryRecipeIngredientsAdapter implements RecipeIngredientsPort {
    async fetchIngredientsOptions(): Promise<IngredientsOptionsDomainModel> {
        if (Math.random() < 0.5) {
            return new IngredientsOptionsDomainModel([]);
        }

        return new IngredientsOptionsDomainModel(INGREDIENT_OPTIONS);
    }

    async createIngredientOption(name: string): Promise<RecipeIngredientDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (name.trim().toLowerCase() === 'error') {
            throw new Error('Failed to create ingredient');
        }

        const ingredient = new RecipeIngredientDomainModel(crypto.randomUUID(), name.trim());
        INGREDIENT_OPTIONS = [...INGREDIENT_OPTIONS, ingredient];
        return ingredient;
    }

    async addRecipeIngredient(recipeId: string, ingredientId: string): Promise<RecipeIngredientDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (ingredientId === '101') {
            throw new Error('Failed to add ingredient to recipe');
        }

        const ingredient = INGREDIENT_OPTIONS.find(option => option.id === ingredientId);
        return ingredient ?? new RecipeIngredientDomainModel(ingredientId, '');
    }

    async removeRecipeIngredient(recipeId: string, ingredientId: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (ingredientId === '5') {
            throw new Error('Failed to remove ingredient from recipe');
        }
    }
}
