import { IngredientsListDomainModel } from "./models/ingredients.domain.model";

export interface IngredientsPort {
    fetchIngredientsList(): Promise<IngredientsListDomainModel>;
    deleteIngredient(id: string): Promise<void>;
}