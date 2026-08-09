import { IngredientDomainModel, IngredientsListDomainModel } from "./models/ingredients.domain.model";

export interface IngredientsPort {
    fetchIngredientsList(): Promise<IngredientsListDomainModel>;
    createIngredient(name: string): Promise<IngredientDomainModel>;
    updateIngredient(id: string, inShoppingList: boolean): Promise<IngredientDomainModel>;
    deleteIngredient(id: string): Promise<void>;
}