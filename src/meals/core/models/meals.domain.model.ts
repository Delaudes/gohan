

export class RecipesListDomainModel {
    constructor(public readonly recipes: RecipeDomainModel[]) { }

    getMeals(): RecipeDomainModel[] {
        return this.recipes.filter(recipe => recipe.inMealsList);
    }

    hasMeals(): boolean {
        return this.getMeals().length > 0;
    }

    getMealsOptions(): RecipeDomainModel[] {
        return this.recipes.filter(recipe => !recipe.inMealsList);
    }

    hasMealsOptions(): boolean {
        return this.getMealsOptions().length > 0;
    }
}

export class RecipeDomainModel {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly inMealsList: boolean,
        public readonly done: boolean,
    ) {
    }

    is(id: string | undefined): boolean {
        return this.id === id;
    }
}

export class MealIngredientDomainModel {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly bought: boolean,
    ) { }

    is(id: string | undefined): boolean {
        return this.id === id;
    }
}

export class MealDetailDomainModel extends RecipeDomainModel {
    constructor(
        id: string,
        name: string,
        inMealsList: boolean,
        done: boolean,
        public readonly ingredients: MealIngredientDomainModel[],
    ) {
        super(id, name, inMealsList, done);
    }

    hasIngredients(): boolean {
        return this.ingredients.length > 0;
    }
}
