import { ShoppingIngredientDomainModel, ShoppingListDomainModel } from "./models/shopping.domain.model";

export interface ShoppingPort {
    fetchShoppingList(): Promise<ShoppingListDomainModel>;
    updateIngredient(id: string, bought: boolean): Promise<ShoppingIngredientDomainModel>;
    updateMealIngredient(mealId: string, id: string, bought: boolean): Promise<ShoppingIngredientDomainModel>;
    removeIngredient(id: string): Promise<void>;
}
