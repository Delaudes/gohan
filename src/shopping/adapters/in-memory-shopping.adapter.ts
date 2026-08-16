import { ShoppingIngredientDomainModel, ShoppingListDomainModel } from "../core/models/shopping.domain.model";
import { ShoppingPort } from "../core/shopping.port";

export class InMemoryShoppingAdapter implements ShoppingPort {
    async fetchShoppingList(): Promise<ShoppingListDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (Math.random() < 0.33) {
            throw new Error('Failed to fetch shopping list');
        }

        if (Math.random() < 0.66) {
            return new ShoppingListDomainModel([]);
        }

        const ingredients = [
            new ShoppingIngredientDomainModel('1', 'Tomate', false),
            new ShoppingIngredientDomainModel('2', 'Mozzarella', true),
            new ShoppingIngredientDomainModel('3', 'Pâtes', false, '1', 'Pasta Carbonara'),
            new ShoppingIngredientDomainModel('4', 'Parmesan', true, '1', 'Pasta Carbonara'),
            new ShoppingIngredientDomainModel('5', 'Savon', true),
        ];
        return new ShoppingListDomainModel(ingredients);
    }

    async updateIngredient(id: string, bought: boolean): Promise<ShoppingIngredientDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 800));

        if (id === '2') {
            throw new Error('Failed to update shopping ingredient');
        }

        return new ShoppingIngredientDomainModel(id, '', bought);
    }

    async updateMealIngredient(mealId: string, id: string, bought: boolean): Promise<ShoppingIngredientDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 800));

        if (id === '2') {
            throw new Error('Failed to update shopping ingredient');
        }

        return new ShoppingIngredientDomainModel(id, '', bought, mealId);
    }

    async removeIngredient(id: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (id === '1') {
            throw new Error('Failed to remove shopping ingredient');
        }
    }
}
