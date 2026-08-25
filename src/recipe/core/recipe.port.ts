import { IngredientOptionDomainModel, IngredientOptionsDomainModel, RecipeDomainModel, RecipeIngredientDomainModel } from "./models/recipe.domain.model";

export interface RecipePort {
    fetchRecipe(id: string): Promise<RecipeDomainModel>;
    fetchIngredientOptions(): Promise<IngredientOptionsDomainModel>;
    createIngredientOption(name: string): Promise<IngredientOptionDomainModel>;
    addRecipeIngredient(recipeId: string, ingredientId: string): Promise<RecipeIngredientDomainModel>;
    removeRecipeIngredient(recipeId: string, ingredientId: string): Promise<void>;
}
