export type RecipesListDomainModel = {
    recipes: RecipeDomainModel[];
}

export type RecipeDomainModel = {
    id: string;
    name: string;
    inMealsList: boolean;
    done: boolean;
}

export type MealDomainModel = {
    id: string;
    name: string;
    done: boolean;
}

export type MealDetailDomainModel = {
    id: string;
    name: string;
    done: boolean;
    ingredients: MealIngredientDomainModel[];
}

export type MealIngredientDomainModel = {
    id: string;
    name: string;
    bought: boolean;
}
