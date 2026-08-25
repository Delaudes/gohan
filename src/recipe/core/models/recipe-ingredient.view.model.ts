type RecipeIngredientProps = {
    id: string;
    name: string;
    isLoadingRemoving: boolean;
    isErrorRemoving: boolean;
}

export class RecipeIngredientViewModel {
    readonly id: string;
    readonly name: string;
    readonly isLoadingRemoving: boolean;
    readonly isErrorRemoving: boolean;

    constructor(props: RecipeIngredientProps) {
        this.id = props.id;
        this.name = props.name;
        this.isLoadingRemoving = props.isLoadingRemoving;
        this.isErrorRemoving = props.isErrorRemoving;
    }

    private with(partial: Partial<RecipeIngredientProps>): RecipeIngredientViewModel {
        return new RecipeIngredientViewModel({
            ...this,
            ...partial,
        });
    }

    isNot(id: string): boolean {
        return this.id !== id;
    }

    startLoadingRemovingIngredient(id: string): RecipeIngredientViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isLoadingRemoving: true, isErrorRemoving: false,
        });
    }

    stopLoadingRemovingIngredient(id: string): RecipeIngredientViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isLoadingRemoving: false,
        });
    }

    presentErrorRemovingIngredient(id: string): RecipeIngredientViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isErrorRemoving: true,
        });
    }
}

type IngredientOptionProps = {
    id: string;
    name: string;
}

export class IngredientOptionViewModel {
    readonly id: string;
    readonly name: string;

    constructor(props: IngredientOptionProps) {
        this.id = props.id;
        this.name = props.name;
    }

    matches(normalizedQuery: string): boolean {
        return this.name.toLowerCase().includes(normalizedQuery);
    }
}
