export type RecipeIngredientApiModel = {
    id: string;
    name: string;
    bought: boolean;
}

export type RecipeDetailApiModel = {
    id: string;
    name: string;
    inMealsList: boolean;
    done: boolean;
    ingredients: RecipeIngredientApiModel[];
}

export type IngredientOptionApiModel = {
    id: string;
    name: string;
    inShoppingList: boolean;
    bought: boolean;
}

export type IngredientOptionsListApiModel = {
    ingredients: IngredientOptionApiModel[];
}

export type CreateIngredientOptionApiRequest = {
    name: string;
}
