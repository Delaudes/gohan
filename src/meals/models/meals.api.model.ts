export type RecipeApiModel = {
    id: string;
    name: string;
    inMealsList: boolean;
    done: boolean;
}

export type RecipesListApiModel = {
    recipes: RecipeApiModel[];
}

export type MealIngredientApiModel = {
    id: string;
    name: string;
    bought: boolean;
}

export type MealDetailApiModel = {
    id: string;
    name: string;
    inMealsList: boolean;
    done: boolean;
    ingredients: MealIngredientApiModel[];
}

export type PatchRecipeApiRequest = {
    inMealsList?: boolean;
    done?: boolean;
}

export type PatchRecipeIngredientApiRequest = {
    bought: boolean;
}
