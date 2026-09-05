export type RecipeApiModel = {
    id: string;
    name: string;
    inMealsList: boolean;
    done: boolean;
}

export type RecipeDetailApiModel = RecipeApiModel & {
    ingredients: { id: string; name: string; bought: boolean }[];
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
