export type RecipesListDomainModel = {
    recipes: RecipeDomainModel[];
}

export type RecipeDomainModel = {
    id: string;
    name: string;
    inMealsList: boolean;
}
