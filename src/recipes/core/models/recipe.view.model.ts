export type RecipeDetailViewModel = {
    isLoadingFetchingRecipe: boolean;
    isErrorFetchingRecipe: boolean;
    id: string;
    name: string;
    inMealsList: boolean;
    ingredients: RecipeIngredientViewModel[];
    hasIngredients: boolean;
    ingredientsOptions: IngredientOptionViewModel[];
    isLoadingAddingIngredient: boolean;
    isErrorAddingIngredient: boolean;
}

export type RecipeIngredientViewModel = {
    id: string;
    name: string;
    isLoadingRemoving: boolean;
    isErrorRemoving: boolean;
}

export type IngredientOptionViewModel = {
    id: string;
    name: string;
    isVisible: boolean;
}
