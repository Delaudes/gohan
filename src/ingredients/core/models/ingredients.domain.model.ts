export class IngredientsListDomainModel {
    public readonly ingredients: IngredientDomainModel[];

    constructor(ingredients: IngredientDomainModel[]) {
        this.ingredients = [...ingredients].sort((a, b) => a.name.localeCompare(b.name, 'fr'));
    }

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