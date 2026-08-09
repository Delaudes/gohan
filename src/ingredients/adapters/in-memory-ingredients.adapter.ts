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
            new IngredientDomainModel('1', 'Tomato'),
            new IngredientDomainModel('2', 'Cheese'),
            new IngredientDomainModel('3', 'Basil'),
            new IngredientDomainModel('4', 'Olive Oil'),
            new IngredientDomainModel('5', 'Garlic'),
        ];
        return new IngredientsListDomainModel(ingredients);
    }

    async deleteIngredient(id: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (id === '1') {
            throw new Error('Failed to delete ingredient');
        }
    }
}