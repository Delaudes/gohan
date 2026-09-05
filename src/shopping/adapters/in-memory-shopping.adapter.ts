import { IngredientOptionDomainModel, IngredientOptionsDomainModel, ShoppingIngredientDomainModel, ShoppingListDomainModel } from "../models/shopping.domain.model";
import { ShoppingPort } from "../shopping.port";

let INGREDIENT_OPTIONS: IngredientOptionDomainModel[] = [
    { id: '1', name: 'Tomate', inShoppingList: true },
    { id: '2', name: 'Mozzarella', inShoppingList: true },
    { id: '5', name: 'Savon', inShoppingList: true },
    { id: '6', name: 'Farine', inShoppingList: false },
    { id: '7', name: 'Sucre', inShoppingList: false },
    { id: '8', name: 'Sel', inShoppingList: false },
    { id: '9', name: 'Poivre', inShoppingList: false },
    { id: '10', name: "Huile d'olive", inShoppingList: false },
];

let SHOPPING_INGREDIENTS: ShoppingIngredientDomainModel[] = [
    { id: '1', name: 'Tomate', bought: false },
    { id: '2', name: 'Mozzarella', bought: true },
    { id: '3', name: 'Pâtes', bought: false, mealId: '1', mealName: 'Pasta Carbonara' },
    { id: '4', name: 'Parmesan', bought: true, mealId: '1', mealName: 'Pasta Carbonara' },
    { id: '5', name: 'Savon', bought: true },
];

export class InMemoryShoppingAdapter implements ShoppingPort {
    async fetchShoppingList(): Promise<ShoppingListDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        return { ingredients: SHOPPING_INGREDIENTS };
    }

    async updateIngredient(id: string, bought: boolean): Promise<ShoppingIngredientDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (id === '1') {
            throw new Error('Failed to update shopping ingredient');
        }

        SHOPPING_INGREDIENTS = SHOPPING_INGREDIENTS.map(ingredient => ingredient.id === id ? { ...ingredient, bought } : ingredient);
        return SHOPPING_INGREDIENTS.find(ingredient => ingredient.id === id)!;
    }

    async updateMealIngredient(mealId: string, id: string, bought: boolean): Promise<ShoppingIngredientDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (id === '3') {
            throw new Error('Failed to update shopping ingredient');
        }

        SHOPPING_INGREDIENTS = SHOPPING_INGREDIENTS.map(ingredient =>
            ingredient.id === id && ingredient.mealId === mealId ? { ...ingredient, bought } : ingredient
        );
        return SHOPPING_INGREDIENTS.find(ingredient => ingredient.id === id && ingredient.mealId === mealId)!;
    }

    async removeIngredient(id: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (id === '1') {
            throw new Error('Failed to remove shopping ingredient');
        }

        SHOPPING_INGREDIENTS = SHOPPING_INGREDIENTS.filter(ingredient => ingredient.id !== id);
        INGREDIENT_OPTIONS = INGREDIENT_OPTIONS.map(option => option.id === id ? { ...option, inShoppingList: false } : option);
    }

    async fetchIngredientOptions(): Promise<IngredientOptionsDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        return { options: INGREDIENT_OPTIONS };
    }

    async createIngredient(name: string): Promise<ShoppingIngredientDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (name.trim().toLowerCase() === 'error') {
            throw new Error('Failed to create shopping ingredient');
        }

        const ingredient = { id: crypto.randomUUID(), name: name.trim(), bought: false };
        SHOPPING_INGREDIENTS = [...SHOPPING_INGREDIENTS, ingredient];
        INGREDIENT_OPTIONS = [...INGREDIENT_OPTIONS, { id: ingredient.id, name: ingredient.name, inShoppingList: true }];
        return ingredient;
    }

    async addIngredient(id: string): Promise<ShoppingIngredientDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (id === '6') {
            throw new Error('Failed to add shopping ingredient');
        }

        const option = INGREDIENT_OPTIONS.find(option => option.id === id);
        const ingredient = { id, name: option?.name ?? '', bought: false };
        INGREDIENT_OPTIONS = INGREDIENT_OPTIONS.map(option => option.id === id ? { ...option, inShoppingList: true } : option);
        SHOPPING_INGREDIENTS = [...SHOPPING_INGREDIENTS, ingredient];
        return ingredient;
    }
}
