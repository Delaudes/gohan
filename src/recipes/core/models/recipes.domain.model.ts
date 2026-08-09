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
