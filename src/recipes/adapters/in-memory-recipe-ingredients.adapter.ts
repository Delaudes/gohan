import { IngredientOptionDomainModel, IngredientsOptionsDomainModel, RecipeIngredientDomainModel } from "../core/models/recipes.domain.model";
import { RecipeIngredientsPort } from "../core/recipe-ingredients.port";

let INGREDIENT_OPTIONS: IngredientOptionDomainModel[] = [
    new IngredientOptionDomainModel('101', 'Tomate'),
    new IngredientOptionDomainModel('102', 'Oignon'),
    new IngredientOptionDomainModel('103', 'Ail'),
    new IngredientOptionDomainModel('104', 'Basilic'),
    new IngredientOptionDomainModel('105', 'Mozzarella'),
    new IngredientOptionDomainModel('106', 'Farine'),
    new IngredientOptionDomainModel('107', 'Sucre'),
    new IngredientOptionDomainModel('108', 'Sel'),
    new IngredientOptionDomainModel('109', 'Poivre'),
    new IngredientOptionDomainModel('110', "Huile d'olive"),
];

export class InMemoryRecipeIngredientsAdapter implements RecipeIngredientsPort {
    async fetchIngredientsOptions(): Promise<IngredientsOptionsDomainModel> {
        if (Math.random() < 0.5) {
            return new IngredientsOptionsDomainModel([]);
        }

        return new IngredientsOptionsDomainModel(INGREDIENT_OPTIONS);
    }

    async createIngredientOption(name: string): Promise<IngredientOptionDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (name.trim().toLowerCase() === 'error') {
            throw new Error('Failed to create ingredient');
        }

        const ingredient = new IngredientOptionDomainModel(crypto.randomUUID(), name.trim());
        INGREDIENT_OPTIONS = [...INGREDIENT_OPTIONS, ingredient];
        return ingredient;
    }

    async addRecipeIngredient(recipeId: string, ingredientId: string): Promise<RecipeIngredientDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (ingredientId === '101') {
            throw new Error('Failed to add ingredient to recipe');
        }

        const ingredient = INGREDIENT_OPTIONS.find(option => option.id === ingredientId);
        return new RecipeIngredientDomainModel(ingredient?.id ?? ingredientId, ingredient?.name ?? '');
    }

    async removeRecipeIngredient(recipeId: string, ingredientId: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (ingredientId === '5') {
            throw new Error('Failed to remove ingredient from recipe');
        }
    }
}
