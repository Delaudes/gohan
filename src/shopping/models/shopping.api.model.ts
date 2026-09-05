export type ShoppingItemApiModel = {
    id: string;
    recipeId: string | null;
    recipeName: string | null;
    name: string;
    bought: boolean;
}

export type ShoppingListApiModel = {
    items: ShoppingItemApiModel[];
}

export type IngredientApiModel = {
    id: string;
    name: string;
    inShoppingList: boolean;
    bought: boolean;
}

export type IngredientOptionsListApiModel = {
    ingredients: IngredientApiModel[];
}

export type CreateIngredientApiRequest = {
    name: string;
    inShoppingList?: boolean;
}

export type PatchIngredientApiRequest = {
    inShoppingList?: boolean;
    bought?: boolean;
}

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

export type PatchRecipeIngredientApiRequest = {
    bought: boolean;
}
