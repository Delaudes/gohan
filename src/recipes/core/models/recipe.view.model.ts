type RecipeProps = {
    id: string;
    name: string;
    isLoadingDeleting: boolean;
    isErrorDeleting: boolean;
    isLoadingUpdating: boolean;
    isErrorUpdating: boolean;
    inMealsList: boolean;
}

export class RecipeViewModel {
    readonly id: string;
    readonly name: string;
    readonly isLoadingDeleting: boolean;
    readonly isErrorDeleting: boolean;
    readonly isLoadingUpdating: boolean;
    readonly isErrorUpdating: boolean;
    readonly inMealsList: boolean;

    constructor(props: RecipeProps) {
        this.id = props.id;
        this.name = props.name;
        this.isLoadingDeleting = props.isLoadingDeleting;
        this.isErrorDeleting = props.isErrorDeleting;
        this.isLoadingUpdating = props.isLoadingUpdating;
        this.isErrorUpdating = props.isErrorUpdating;
        this.inMealsList = props.inMealsList;
    }

    private with(partial: Partial<RecipeProps>): RecipeViewModel {
        return new RecipeViewModel({
            ...this,
            ...partial,
        });
    }

    isNot(id: string): boolean {
        return this.id !== id;
    }

    matches(normalizedQuery: string): boolean {
        if (!normalizedQuery) return true;
        return this.name.toLowerCase().includes(normalizedQuery);
    }

    startLoadingDeletingRecipe(id: string): RecipeViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isLoadingDeleting: true, isErrorDeleting: false,
        });
    }

    stopLoadingDeletingRecipe(id: string): RecipeViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isLoadingDeleting: false,
        });
    }

    presentErrorDeletingRecipe(id: string): RecipeViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isErrorDeleting: true,
        });
    }

    startLoadingUpdatingRecipe(id: string): RecipeViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isLoadingUpdating: true, isErrorUpdating: false,
        });
    }

    stopLoadingUpdatingRecipe(id: string): RecipeViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isLoadingUpdating: false,
        });
    }

    presentErrorUpdatingRecipe(id: string): RecipeViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isErrorUpdating: true,
        });
    }

    presentRecipeUpdated(id: string, inMealsList: boolean): RecipeViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            inMealsList,
        });
    }
}
