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
    ) { }
}