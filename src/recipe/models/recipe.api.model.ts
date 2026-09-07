export type RecipeIngredientApiModel = {
    id: string;
    name: string;
}

export type RecipeDetailApiModel = {
    id: string;
    name: string;
    inMealsList: boolean;
    ingredients: RecipeIngredientApiModel[];
}

export type IngredientOptionApiModel = {
    id: string;
    name: string;
}

export type IngredientOptionsListApiModel = {
    ingredients: IngredientOptionApiModel[];
}

export type CreateIngredientOptionApiRequest = {
    name: string;
}
