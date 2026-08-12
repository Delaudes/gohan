import { RecipeDetailDomainModel, RecipeDomainModel, RecipesListDomainModel } from "./models/recipes.domain.model";

export interface RecipesPort {
    fetchRecipesList(): Promise<RecipesListDomainModel>;
    fetchRecipe(id: string): Promise<RecipeDetailDomainModel>;
    createRecipe(name: string): Promise<RecipeDomainModel>;
    updateRecipe(id: string, inMealsList: boolean): Promise<RecipeDomainModel>;
    deleteRecipe(id: string): Promise<void>;
}
