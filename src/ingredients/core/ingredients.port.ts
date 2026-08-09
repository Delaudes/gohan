import { IngredientDomainModel, IngredientsListDomainModel } from "./models/ingredients.domain.model";

export interface IngredientsPort {
    fetchIngredientsList(): Promise<IngredientsListDomainModel>;
    createIngredient(name: string): Promise<IngredientDomainModel>;
    deleteIngredient(id: string): Promise<void>;
}