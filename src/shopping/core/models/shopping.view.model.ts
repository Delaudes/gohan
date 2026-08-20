export type ShoppingViewModel = {
    isLoadingFetchingIngredients: boolean;
    isErrorFetchingIngredients: boolean;
    ingredients: ShoppingIngredientViewModel[];
    hasIngredients: boolean;
    ingredientsProgress: string;
}

export type ShoppingIngredientViewModel = {
    id: string;
    name: string;
    bought: boolean;
    mealId?: string;
    mealName?: string;
    isLoadingUpdatingBought: boolean;
    isErrorUpdatingBought: boolean;
    isLoadingRemoving: boolean;
    isErrorRemoving: boolean;
}
