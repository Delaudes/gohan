import { IngredientOptionDomainModel, IngredientOptionsDomainModel, RecipeDomainModel, RecipeIngredientDomainModel } from "../core/models/recipe.domain.model";
import { RecipePort } from "../core/recipe.port";

let INGREDIENT_OPTIONS: IngredientOptionDomainModel[] = [
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
];

const DEFAULT_RECIPE_INGREDIENTS: RecipeIngredientDomainModel[] = [
    { id: '101', name: 'Tomate' },
    { id: '102', name: 'Oignon' },
    { id: '103', name: 'Ail' },
];

let RECIPE_INGREDIENTS: Record<string, RecipeIngredientDomainModel[]> = {
    '2': [],
};

export class InMemoryRecipeAdapter implements RecipePort {
    async fetchRecipe(id: string): Promise<RecipeDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (id === '1') {
            throw new Error('Failed to fetch recipe');
        }

        if (!(id in RECIPE_INGREDIENTS)) {
            RECIPE_INGREDIENTS[id] = [...DEFAULT_RECIPE_INGREDIENTS];
        }

        if (id === '2') {
            return {
                id,
                name: 'Recette sans ingrédients',
                inMealsList: false,
                ingredients: RECIPE_INGREDIENTS[id],
            };
        }

        return {
            id,
            name: 'Recette avec ingrédients',
            inMealsList: true,
            ingredients: RECIPE_INGREDIENTS[id],
        };
    }

    async fetchIngredientOptions(): Promise<IngredientOptionsDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        return { options: INGREDIENT_OPTIONS };
    }

    async createIngredientOption(name: string): Promise<IngredientOptionDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (name.trim().toLowerCase() === 'error') {
            throw new Error('Failed to create ingredient');
        }

        const option = { id: crypto.randomUUID(), name: name.trim() };
        INGREDIENT_OPTIONS = [...INGREDIENT_OPTIONS, option];
        return option;
    }

    async addRecipeIngredient(recipeId: string, ingredientId: string): Promise<RecipeIngredientDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (ingredientId === '104') {
            throw new Error('Failed to add ingredient to recipe');
        }

        const existingIngredients = RECIPE_INGREDIENTS[recipeId] ?? [];
        const existingIngredient = existingIngredients.find(ingredient => ingredient.id === ingredientId);
        if (existingIngredient) {
            return existingIngredient;
        }

        const option = INGREDIENT_OPTIONS.find(option => option.id === ingredientId);
        const ingredient = { id: ingredientId, name: option?.name ?? '' };
        RECIPE_INGREDIENTS[recipeId] = [...existingIngredients, ingredient];
        return ingredient;
    }

    async removeRecipeIngredient(recipeId: string, ingredientId: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (ingredientId === '103') {
            throw new Error('Failed to remove ingredient from recipe');
        }

        RECIPE_INGREDIENTS[recipeId] = (RECIPE_INGREDIENTS[recipeId] ?? []).filter(ingredient => ingredient.id !== ingredientId);
    }
}
