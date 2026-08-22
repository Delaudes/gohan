

export class RecipesListDomainModel {
    constructor(public readonly recipes: RecipeDomainModel[]) { }

    getMeals(): MealDomainModel[] {
        return this.recipes.filter(recipe => recipe.inMealsList);
    }

    hasMeals(): boolean {
        return this.getMeals().length > 0;
    }

    doneMealsCount(): number {
        return this.getMeals().filter(meal => meal.done).length;
    }

    mealsCount(): number {
        return this.getMeals().length;
    }

    getMealsOptions(): MealOptionDomainModel[] {
        return this.recipes.filter(recipe => !recipe.inMealsList);
    }

    hasMealsOptions(): boolean {
        return this.getMealsOptions().length > 0;
    }
}

export class MealOptionDomainModel {
    constructor(
        public readonly id: string,
        public readonly name: string,
    ) { }

    is(id: string | undefined): boolean {
        return this.id === id;
    }
}

export class MealDomainModel extends MealOptionDomainModel {
    constructor(
        id: string,
        name: string,
        public readonly done: boolean,
    ) {
        super(id, name);
    }
}

export class RecipeDomainModel extends MealDomainModel {
    constructor(
        id: string,
        name: string,
        public readonly inMealsList: boolean,
        done: boolean,
    ) {
        super(id, name, done);
    }
}

export class MealDetailDomainModel extends MealDomainModel {
    constructor(
        id: string,
        name: string,
        done: boolean,
        public readonly ingredients: MealIngredientDomainModel[],
    ) {
        super(id, name, done);
    }

    hasIngredients(): boolean {
        return this.ingredients.length > 0;
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

