export type ShoppingListDomainModel = {
    ingredients: ShoppingIngredientDomainModel[];
}

export type ShoppingIngredientDomainModel = {
    id: string;
    name: string;
    bought: boolean;
    mealId?: string;
    mealName?: string;
}

export type IngredientOptionDomainModel = {
    id: string;
    name: string;
    inShoppingList: boolean;
}

export type IngredientOptionsDomainModel = {
    options: IngredientOptionDomainModel[];
}
