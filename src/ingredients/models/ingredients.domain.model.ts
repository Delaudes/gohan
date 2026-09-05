export type IngredientsListDomainModel = {
    ingredients: IngredientDomainModel[];
}

export type IngredientDomainModel = {
    id: string;
    name: string;
    inShoppingList: boolean;
}

export type IngredientDeletionResult =
    {
        success: true;
    } |
    {
        success: false; error: IngredientDeletionError;
    }

export type IngredientDeletionError = 'IngredientInUseError' | 'UnknownError';