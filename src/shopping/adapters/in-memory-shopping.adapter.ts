import { ShoppingIngredientDomainModel, ShoppingListDomainModel } from "../core/models/shopping.domain.model";
import { ShoppingPort } from "../core/shopping.port";

export class InMemoryShoppingAdapter implements ShoppingPort {
    async fetchShoppingList(): Promise<ShoppingListDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            ingredients: [
                { id: '1', name: 'Tomate', bought: false },
                { id: '2', name: 'Mozzarella', bought: true },
                { id: '3', name: 'Pâtes', bought: false, mealId: '1', mealName: 'Pasta Carbonara' },
                { id: '4', name: 'Parmesan', bought: true, mealId: '1', mealName: 'Pasta Carbonara' },
                { id: '5', name: 'Savon', bought: true },
            ],
        };
    }

    async updateIngredient(id: string, bought: boolean): Promise<ShoppingIngredientDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (id === '1') {
            throw new Error('Failed to update shopping ingredient');
        }

        return { id, name: '', bought };
    }

    async updateMealIngredient(mealId: string, id: string, bought: boolean): Promise<ShoppingIngredientDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (id === '3') {
            throw new Error('Failed to update shopping ingredient');
        }

        return { id, name: '', bought, mealId };
    }

    async removeIngredient(id: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (id === '1') {
            throw new Error('Failed to remove shopping ingredient');
        }
    }
}
