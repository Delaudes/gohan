export type MealsViewModel = {
    isLoadingFetchingMeals: boolean;
    isErrorFetchingMeals: boolean;
    meals: MealViewModel[];
    hasMeals: boolean;
}

export type MealViewModel = {
    id: string;
    name: string;
    done: boolean;
    isLoadingUpdatingDone: boolean;
    isErrorUpdatingDone: boolean;
    isLoadingRemoving: boolean;
    isErrorRemoving: boolean;
    isExpanded: boolean;
    isLoadingIngredients: boolean;
    isErrorIngredients: boolean;
    ingredients: MealIngredientViewModel[];
    hasIngredients: boolean;
}

export type MealIngredientViewModel = {
    id: string;
    name: string;
    bought: boolean;
    isLoadingUpdatingBought: boolean;
    isErrorUpdatingBought: boolean;
}
