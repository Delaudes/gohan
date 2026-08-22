export type IngredientsListDomainModel = {
    ingredients: IngredientDomainModel[];
}

export type IngredientDomainModel = {
    id: string;
    name: string;
    inShoppingList: boolean;
}
