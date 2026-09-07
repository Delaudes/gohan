export type RecipeApiModel = {
    id: string;
    name: string;
    inMealsList: boolean;
}

export type RecipesListApiModel = {
    recipes: RecipeApiModel[];
}

export type CreateRecipeApiRequest = {
    name: string;
}

export type PatchRecipeApiRequest = {
    inMealsList?: boolean;
}
