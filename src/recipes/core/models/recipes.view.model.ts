export type RecipesViewModel = {
    isLoadingFetchingRecipes: boolean;
    isErrorFetchingRecipes: boolean;
    isLoadingCreatingRecipe: boolean;
    isErrorCreatingRecipe: boolean;
    recipes: RecipeViewModel[];
    hasRecipes: boolean;
}

export type RecipeViewModel = {
    id: string;
    name: string;
    isLoadingDeleting: boolean;
    isErrorDeleting: boolean;
    isLoadingUpdating: boolean;
    isErrorUpdating: boolean;
    inMealsList: boolean;
}
