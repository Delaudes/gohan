type IngredientProps = {
    id: string;
    name: string;
    isLoadingDeleting: boolean;
    errorDeletingMessage?: IngredientDeletionErrorMessage;
    isLoadingUpdating: boolean;
    isErrorUpdating: boolean;
    inShoppingList: boolean;
}

export type IngredientDeletionErrorMessage = 'Ingrédient non supprimable : il est dans une recette ou dans la liste de courses' | 'Une erreur est survenue, réessayez.';

export class IngredientViewModel {
    readonly id: string;
    readonly name: string;
    readonly isLoadingDeleting: boolean;
    readonly errorDeletingMessage?: IngredientDeletionErrorMessage;
    readonly isLoadingUpdating: boolean;
    readonly isErrorUpdating: boolean;
    readonly inShoppingList: boolean;

    constructor(props: IngredientProps) {
        this.id = props.id;
        this.name = props.name;
        this.isLoadingDeleting = props.isLoadingDeleting;
        this.errorDeletingMessage = props.errorDeletingMessage;
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
            isLoadingDeleting: true, errorDeletingMessage: undefined,
        });
    }

    stopLoadingDeletingIngredient(id: string): IngredientViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isLoadingDeleting: false,
        });
    }

    presentErrorDeletingIngredient(id: string, errorMessage: IngredientDeletionErrorMessage): IngredientViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            errorDeletingMessage: errorMessage,
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
