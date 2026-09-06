import { IngredientsPort } from "../ingredients.port";
import { IngredientDeletionResult, IngredientDomainModel, IngredientsListDomainModel } from "../models/ingredients.domain.model";

export class FakeIngredientsAdapter implements IngredientsPort {
    ingredientsList: IngredientsListDomainModel = {
        ingredients: []
    };
    errorFetchingIngredients: boolean = false;
    async fetchIngredientsList(): Promise<IngredientsListDomainModel> {
        if (this.errorFetchingIngredients) {
            throw new Error("Error fetching ingredients");
        }
        return this.ingredientsList;
    }

    ingredientsByName: Record<string, IngredientDomainModel> = {};
    errorCreatingIngredient: boolean = false;

    async createIngredient(name: string): Promise<IngredientDomainModel> {
        if (this.errorCreatingIngredient) {
            throw new Error("Error creating ingredient");
        }
        return this.ingredientsByName[name];
    }

    updatedIngredientById: Record<string, IngredientDomainModel> = {};
    errorUpdatingIngredient: boolean = false;

    async updateIngredient(id: string, inShoppingList: boolean): Promise<IngredientDomainModel> {
        if (this.errorUpdatingIngredient) {
            throw new Error("Error updating ingredient");
        }
        return this.updatedIngredientById[id];
    }

    deletionResultById: Record<string, IngredientDeletionResult> = {};
    async deleteIngredient(id: string): Promise<IngredientDeletionResult> {
        return this.deletionResultById[id] || { success: false, error: 'UnknownError' };
    }
}