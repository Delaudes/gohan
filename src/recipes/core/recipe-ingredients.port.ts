import { IngredientOptionDomainModel, IngredientsOptionsDomainModel, RecipeIngredientDomainModel } from "./models/recipes.domain.model";

export interface RecipeIngredientsPort {
    fetchIngredientsOptions(): Promise<IngredientsOptionsDomainModel>;
    createIngredientOption(name: string): Promise<IngredientOptionDomainModel>;
    addRecipeIngredient(recipeId: string, ingredientId: string): Promise<RecipeIngredientDomainModel>;
    removeRecipeIngredient(recipeId: string, ingredientId: string): Promise<void>;
}
