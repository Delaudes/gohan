import { IngredientOptionsDomainModel, ShoppingIngredientDomainModel, ShoppingListDomainModel } from "./models/shopping.domain.model";

export interface ShoppingPort {
    fetchShoppingList(): Promise<ShoppingListDomainModel>;
    fetchIngredientOptions(): Promise<IngredientOptionsDomainModel>;
    createIngredient(name: string): Promise<ShoppingIngredientDomainModel>;
    addIngredient(id: string): Promise<ShoppingIngredientDomainModel>;
    updateIngredient(id: string, bought: boolean): Promise<ShoppingIngredientDomainModel>;
    updateMealIngredient(mealId: string, id: string, bought: boolean): Promise<ShoppingIngredientDomainModel>;
    removeIngredient(id: string): Promise<void>;
}
