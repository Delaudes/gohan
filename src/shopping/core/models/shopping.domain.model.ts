export class ShoppingListDomainModel {
    public readonly ingredients: ShoppingIngredientDomainModel[];

    constructor(ingredients: ShoppingIngredientDomainModel[]) {
        this.ingredients = [...ingredients].sort((a, b) => a.name.localeCompare(b.name, 'fr'));
    }

    hasIngredients(): boolean {
        return this.ingredients.length > 0;
    }

    boughtIngredientsCount(): number {
        return this.ingredients.filter(ingredient => ingredient.bought).length;
    }

    ingredientsCount(): number {
        return this.ingredients.length;
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
