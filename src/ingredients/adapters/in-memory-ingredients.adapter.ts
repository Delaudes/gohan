import { IngredientsPort } from "../core/ingredients.port";
import { IngredientDomainModel, IngredientsListDomainModel } from "../core/models/ingredients.domain.model";

export class InMemoryIngredientsAdapter implements IngredientsPort {
    async fetchIngredientsList(): Promise<IngredientsListDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (Math.random() < 0.33) {
            throw new Error('Failed to fetch ingredients list');
        }

        if (Math.random() < 0.66) {
            return new IngredientsListDomainModel([]);
        }

        const ingredients = [
            new IngredientDomainModel('1', 'Tomato', true),
            new IngredientDomainModel('2', 'Cheese', false),
            new IngredientDomainModel('3', 'Basil', true),
            new IngredientDomainModel('4', 'Olive Oil', false),
            new IngredientDomainModel('5', 'Garlic', false),
        ];
        return new IngredientsListDomainModel(ingredients);
    }

    async createIngredient(name: string): Promise<IngredientDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (name.trim().toLowerCase() === 'error') {
            throw new Error('Failed to create ingredient');
        }

        return new IngredientDomainModel(crypto.randomUUID(), name, false);
    }

    async updateIngredient(id: string, inShoppingList: boolean): Promise<IngredientDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 800));

        if (id === '2') {
            throw new Error('Failed to update ingredient');
        }

        return new IngredientDomainModel(id, '', inShoppingList);
    }

    async deleteIngredient(id: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (id === '1') {
            throw new Error('Failed to delete ingredient');
        }
    }
}