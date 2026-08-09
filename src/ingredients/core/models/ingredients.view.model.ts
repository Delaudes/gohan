export type IngredientsViewModel = {
    isLoadingFetchingIngredients: boolean;
    isErrorFetchingIngredients: boolean;
    ingredients: IngredientViewModel[];
    hasIngredients: boolean;
}

export type IngredientViewModel = {
    id: string;
    name: string;
    isLoadingDeleting: boolean;
    isErrorDeleting: boolean;
}