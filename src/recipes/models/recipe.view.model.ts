import { normalizeSearchText } from "../../shared/utils/normalize-search-text.utils";

type RecipeProps = {
    id: string;
    name: string;
    isLoadingDeleting: boolean;
    errorDeletingMessage?: RecipeDeletionErrorMessage;
    isLoadingUpdating: boolean;
    isErrorUpdating: boolean;
    inMealsList: boolean;
}

export type RecipeDeletionErrorMessage = 'Recette non supprimable : elle est dans la liste de repas' | 'Une erreur est survenue, réessayez.';

export class RecipeViewModel {
    readonly id: string;
    readonly name: string;
    readonly isLoadingDeleting: boolean;
    readonly errorDeletingMessage?: RecipeDeletionErrorMessage;
    readonly isLoadingUpdating: boolean;
    readonly isErrorUpdating: boolean;
    readonly inMealsList: boolean;

    constructor(props: RecipeProps) {
        this.id = props.id;
        this.name = props.name;
        this.isLoadingDeleting = props.isLoadingDeleting;
        this.errorDeletingMessage = props.errorDeletingMessage;
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
        return normalizeSearchText(this.name).includes(normalizedQuery);
    }

    startLoadingDeletingRecipe(id: string): RecipeViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isLoadingDeleting: true, errorDeletingMessage: undefined,
        });
    }

    stopLoadingDeletingRecipe(id: string): RecipeViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isLoadingDeleting: false,
        });
    }

    presentErrorDeletingRecipe(id: string, errorMessage: RecipeDeletionErrorMessage): RecipeViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            errorDeletingMessage: errorMessage,
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
