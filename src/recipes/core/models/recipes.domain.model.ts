export class RecipesListDomainModel {
    constructor(public readonly recipes: RecipeDomainModel[]) { }

    hasRecipes(): boolean {
        return this.recipes.length > 0;
    }
}

export class RecipeDomainModel {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly inMealsList: boolean,
    ) { }

    is(id: string | undefined): boolean {
        return this.id === id;
    }
}

export class IngredientOptionDomainModel {
    constructor(
        public readonly id: string,
        public readonly name: string,
    ) { }

    is(id: string | undefined): boolean {
        return this.id === id;
    }
}

export class IngredientsOptionsDomainModel {
    constructor(public readonly ingredientsOptions: IngredientOptionDomainModel[]) { }

    getFirstMatch(query: string): IngredientOptionDomainModel | undefined {
        const normalizedQuery = query.trim().toLowerCase();
        if (!normalizedQuery) {
            return undefined;
        }
        return this.ingredientsOptions.find(option => option.name.toLowerCase().includes(normalizedQuery));
    }
}

export class RecipeIngredientDomainModel extends IngredientOptionDomainModel {
}

export class RecipeDetailDomainModel extends RecipeDomainModel {
    constructor(
        id: string,
        name: string,
        inMealsList: boolean,
        public readonly ingredients: RecipeIngredientDomainModel[],
    ) {
        super(id, name, inMealsList);
    }

    hasIngredients(): boolean {
        return this.ingredients.length > 0;
    }
}
