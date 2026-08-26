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
