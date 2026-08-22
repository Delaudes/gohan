import { IngredientsPort } from "../core/ingredients.port";
import { IngredientDomainModel, IngredientsListDomainModel } from "../core/models/ingredients.domain.model";

export class InMemoryIngredientsAdapter implements IngredientsPort {
    async fetchIngredientsList(): Promise<IngredientsListDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            ingredients: [
                { id: '1', name: 'Tomato', inShoppingList: true },
                { id: '2', name: 'Cheese', inShoppingList: false },
                { id: '3', name: 'Basil', inShoppingList: true },
                { id: '4', name: 'Olive Oil', inShoppingList: false },
                { id: '5', name: 'Garlic', inShoppingList: false },
            ],
        };
    }

    async createIngredient(name: string): Promise<IngredientDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (name.trim().toLowerCase() === 'error') {
            throw new Error('Failed to create ingredient');
        }

        return { id: crypto.randomUUID(), name, inShoppingList: false };
    }

    async updateIngredient(id: string, inShoppingList: boolean): Promise<IngredientDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (id === '1') {
            throw new Error('Failed to update ingredient');
        }

        return { id, name: '', inShoppingList };
    }

    async deleteIngredient(id: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (id === '1') {
            throw new Error('Failed to delete ingredient');
        }
    }
}
