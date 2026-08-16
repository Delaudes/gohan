export class ShoppingListDomainModel {
    constructor(public readonly ingredients: ShoppingIngredientDomainModel[]) { }

    hasIngredients(): boolean {
        return this.ingredients.length > 0;
    }
}

export class ShoppingIngredientDomainModel {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly bought: boolean,
        public readonly mealId?: string,
        public readonly mealName?: string,
    ) { }

    is(id: string | undefined): boolean {
        return this.id === id;
    }
}
