export class IngredientsListDomainModel {
    constructor(public readonly ingredients: IngredientDomainModel[]) { }

    hasIngredients(): boolean {
        return this.ingredients.length > 0;
    }
}

export class IngredientDomainModel {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly inShoppingList: boolean,
    ) { }

    is(id: string | undefined): boolean {
        return this.id === id;
    }
}