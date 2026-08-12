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
}

export class RecipeIngredientDomainModel {
    constructor(
        public readonly id: string,
        public readonly name: string,
    ) { }
}

export class IngredientsOptionsDomainModel {
    constructor(public readonly ingredientsOptions: RecipeIngredientDomainModel[]) { }

    hasIngredientsOptions(): boolean {
        return this.ingredientsOptions.length > 0;
    }

    matching(query: string): IngredientsOptionsDomainModel {
        const normalizedQuery = query.trim().toLowerCase();
        if (!normalizedQuery) {
            return this;
        }
        return new IngredientsOptionsDomainModel(
            this.ingredientsOptions.filter(option => option.name.toLowerCase().includes(normalizedQuery))
        );
    }
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
