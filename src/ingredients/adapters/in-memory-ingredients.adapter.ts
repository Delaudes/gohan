import { IngredientsPort } from "../core/ingredients.port";
import { IngredientDomainModel, IngredientsListDomainModel } from "../core/models/ingredients.domain.model";

export class InMemoryIngredientsAdapter implements IngredientsPort {
    async fetchIngredientsList(): Promise<IngredientsListDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (Math.random() < 0.2) {
            throw new Error('Failed to fetch ingredients list');
        }

        const ingredients = [
            new IngredientDomainModel('1', 'Tomato'),
            new IngredientDomainModel('2', 'Cheese'),
            new IngredientDomainModel('3', 'Basil'),
        ];
        return new IngredientsListDomainModel(ingredients);
    }
}