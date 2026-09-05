export type RecipesListDomainModel = {
    recipes: RecipeDomainModel[];
}

export type RecipeDomainModel = {
    id: string;
    name: string;
    inMealsList: boolean;
}

export type RecipeDeletionResult =
    {
        success: true;
    } |
    {
        success: false; error: RecipeDeletionError;
    }

export type RecipeDeletionError = 'RecipeInMealsListError' | 'UnknownError';
