import { IngredientOptionDomainModel, IngredientsOptionsDomainModel, RecipeDomainModel, RecipeIngredientDomainModel } from "../core/models/recipe.domain.model";
import { RecipePort } from "../core/recipe.port";

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

export class InMemoryRecipeAdapter implements RecipePort {
    async fetchRecipe(id: string): Promise<RecipeDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (id === '2') {
            throw new Error('Failed to fetch recipe');
        }

        return new RecipeDomainModel(id, RECIPE_NAMES[id] ?? 'Recette', id === '3', RECIPE_INGREDIENTS[id] ?? []);
    }

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
