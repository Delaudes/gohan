export type RecipeDomainModel = {
    id: string;
    name: string;
    inMealsList: boolean;
    ingredients: RecipeIngredientDomainModel[];
}

export type RecipeIngredientDomainModel = {
    id: string;
    name: string;
}

export type IngredientOptionDomainModel = {
    id: string;
    name: string;
}

export type IngredientOptionsDomainModel = {
    options: IngredientOptionDomainModel[];
}
