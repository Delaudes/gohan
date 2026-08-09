export type IngredientsViewModel = {
    isLoadingFetchingIngredients: boolean;
    isErrorFetchingIngredients: boolean;
    isLoadingCreatingIngredient: boolean;
    isErrorCreatingIngredient: boolean;
    ingredients: IngredientViewModel[];
    hasIngredients: boolean;
}

export type IngredientViewModel = {
    id: string;
    name: string;
    isLoadingDeleting: boolean;
    isErrorDeleting: boolean;
    isLoadingUpdating: boolean;
    isErrorUpdating: boolean;
    inShoppingList: boolean;
}