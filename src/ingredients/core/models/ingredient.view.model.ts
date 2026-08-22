type IngredientProps = {
    id: string;
    name: string;
    isLoadingDeleting: boolean;
    isErrorDeleting: boolean;
    isLoadingUpdating: boolean;
    isErrorUpdating: boolean;
    inShoppingList: boolean;
}

export class IngredientViewModel {
    readonly id: string;
    readonly name: string;
    readonly isLoadingDeleting: boolean;
    readonly isErrorDeleting: boolean;
    readonly isLoadingUpdating: boolean;
    readonly isErrorUpdating: boolean;
    readonly inShoppingList: boolean;

    constructor(props: IngredientProps) {
        this.id = props.id;
        this.name = props.name;
        this.isLoadingDeleting = props.isLoadingDeleting;
        this.isErrorDeleting = props.isErrorDeleting;
        this.isLoadingUpdating = props.isLoadingUpdating;
        this.isErrorUpdating = props.isErrorUpdating;
        this.inShoppingList = props.inShoppingList;
    }

    private with(partial: Partial<IngredientProps>): IngredientViewModel {
        return new IngredientViewModel({
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

    startLoadingDeletingIngredient(id: string): IngredientViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isLoadingDeleting: true, isErrorDeleting: false,
        });
    }

    stopLoadingDeletingIngredient(id: string): IngredientViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isLoadingDeleting: false,
        });
    }

    presentErrorDeletingIngredient(id: string): IngredientViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isErrorDeleting: true,
        });
    }

    startLoadingUpdatingIngredient(id: string): IngredientViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isLoadingUpdating: true, isErrorUpdating: false,
        });
    }

    stopLoadingUpdatingIngredient(id: string): IngredientViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isLoadingUpdating: false,
        });
    }

    presentErrorUpdatingIngredient(id: string): IngredientViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isErrorUpdating: true,
        });
    }

    presentIngredientUpdated(id: string, inShoppingList: boolean): IngredientViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            inShoppingList,
        });
    }
}
