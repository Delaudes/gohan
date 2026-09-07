export type IngredientApiModel = {
    id: string;
    name: string;
    inShoppingList: boolean;
}

export type IngredientsListApiModel = {
    ingredients: IngredientApiModel[];
}

export type CreateIngredientApiRequest = {
    name: string;
}

export type PatchIngredientApiRequest = {
    inShoppingList?: boolean;
}
