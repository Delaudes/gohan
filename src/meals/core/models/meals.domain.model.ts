export class MealsListDomainModel {
    constructor(public readonly meals: MealDomainModel[]) { }

    hasMeals(): boolean {
        return this.meals.length > 0;
    }
}

export class MealDomainModel {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly done: boolean,
    ) { }

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
