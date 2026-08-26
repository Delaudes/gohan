import { IngredientsPort } from "../core/ingredients.port";
import { IngredientDomainModel, IngredientsListDomainModel } from "../core/models/ingredients.domain.model";

let INGREDIENTS: IngredientDomainModel[] = [
    { id: '1', name: 'Tomato', inShoppingList: true },
    { id: '2', name: 'Cheese', inShoppingList: false },
    { id: '3', name: 'Basil', inShoppingList: true },
    { id: '4', name: 'Olive Oil', inShoppingList: false },
    { id: '5', name: 'Garlic', inShoppingList: false },
];

export class InMemoryIngredientsAdapter implements IngredientsPort {
    async fetchIngredientsList(): Promise<IngredientsListDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        return { ingredients: INGREDIENTS };
    }

    async createIngredient(name: string): Promise<IngredientDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (name.trim().toLowerCase() === 'error') {
            throw new Error('Failed to create ingredient');
        }

        const ingredient = { id: crypto.randomUUID(), name, inShoppingList: false };
        INGREDIENTS = [...INGREDIENTS, ingredient];
        return ingredient;
    }

    async updateIngredient(id: string, inShoppingList: boolean): Promise<IngredientDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (id === '1') {
            throw new Error('Failed to update ingredient');
        }

        INGREDIENTS = INGREDIENTS.map(ingredient => ingredient.id === id ? { ...ingredient, inShoppingList } : ingredient);
        return INGREDIENTS.find(ingredient => ingredient.id === id)!;
    }

    async deleteIngredient(id: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (id === '1') {
            throw new Error('Failed to delete ingredient');
        }

        INGREDIENTS = INGREDIENTS.filter(ingredient => ingredient.id !== id);
    }
}
