export class RecipeDomainModel {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly inMealsList: boolean,
        public readonly ingredients: RecipeIngredientDomainModel[],
    ) { }

    hasIngredients(): boolean {
        return this.ingredients.length > 0;
    }
}

export class RecipeIngredientDomainModel {
    constructor(
        public readonly id: string,
        public readonly name: string,
    ) { }

    is(id: string | undefined): boolean {
        return this.id === id;
    }
}

export class IngredientsOptionsDomainModel {
    constructor(public readonly ingredients: IngredientOptionDomainModel[]) { }

    getFirstMatch(query: string): IngredientOptionDomainModel | undefined {
        const normalizedQuery = query.trim().toLowerCase();
        if (!normalizedQuery) {
            return undefined;
        }
        return this.ingredients.find(option => option.name.toLowerCase().includes(normalizedQuery));
    }
}

export class IngredientOptionDomainModel extends RecipeIngredientDomainModel {
}
