import { IngredientsPort } from "../ingredients.port";
import { IngredientDeletionResult, IngredientDomainModel, IngredientsListDomainModel } from "../models/ingredients.domain.model";

export class FakeIngredientsAdapter implements IngredientsPort {
    fetchIngredientsList(): Promise<IngredientsListDomainModel> {
        throw new Error("Method not implemented.");
    }
    createIngredient(name: string): Promise<IngredientDomainModel> {
        throw new Error("Method not implemented.");
    }
    updateIngredient(id: string, inShoppingList: boolean): Promise<IngredientDomainModel> {
        throw new Error("Method not implemented.");
    }
    deleteIngredient(id: string): Promise<IngredientDeletionResult> {
        throw new Error("Method not implemented.");
    }
}