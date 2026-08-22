import { IngredientViewModel } from "./ingredient.view.model";

type IngredientsProps = {
    isLoadingFetchingIngredients: boolean;
    isErrorFetchingIngredients: boolean;
    isLoadingCreatingIngredient: boolean;
    isErrorCreatingIngredient: boolean;
    ingredients: IngredientViewModel[];
    searchQuery: string;
}

export class IngredientsViewModel {
    readonly isLoadingFetchingIngredients: boolean;
    readonly isErrorFetchingIngredients: boolean;
    readonly isLoadingCreatingIngredient: boolean;
    readonly isErrorCreatingIngredient: boolean;
    readonly ingredients: IngredientViewModel[];
    readonly searchQuery: string;

    constructor(props: IngredientsProps) {
        this.isLoadingFetchingIngredients = props.isLoadingFetchingIngredients;
        this.isErrorFetchingIngredients = props.isErrorFetchingIngredients;
        this.isLoadingCreatingIngredient = props.isLoadingCreatingIngredient;
        this.isErrorCreatingIngredient = props.isErrorCreatingIngredient;
        this.ingredients = props.ingredients;
        this.searchQuery = props.searchQuery;
    }

    static initial(): IngredientsViewModel {
        return new IngredientsViewModel({
            isLoadingFetchingIngredients: false,
            isErrorFetchingIngredients: false,
            isLoadingCreatingIngredient: false,
            isErrorCreatingIngredient: false,
            ingredients: [],
            searchQuery: '',
        });
    }

    hasIngredients(): boolean {
        return this.ingredients.length > 0;
    }

    filteredIngredients(): IngredientViewModel[] {
        const normalizedQuery = this.searchQuery.trim().toLowerCase();
        return this.ingredients.filter(ingredient => ingredient.matches(normalizedQuery));
    }

    presentSearchQuery(searchQuery: string): IngredientsViewModel {
        return this.with({ searchQuery });
    }

    private with(partial: Partial<IngredientsProps>): IngredientsViewModel {
        return new IngredientsViewModel({
            ...this,
            ...partial,
        });
    }

    private sortIngredients(ingredients: IngredientViewModel[]): IngredientViewModel[] {
        return [...ingredients].sort((a, b) => a.name.localeCompare(b.name, 'fr'));
    }

    private mapIngredient(fn: (ingredient: IngredientViewModel) => IngredientViewModel): IngredientsViewModel {
        return this.with({
            ingredients: this.ingredients.map(fn),
        });
    }

    startLoadingFetchingIngredients(): IngredientsViewModel {
        return this.with({
            isLoadingFetchingIngredients: true,
            isErrorFetchingIngredients: false,
        });
    }

    stopLoadingFetchingIngredients(): IngredientsViewModel {
        return this.with({
            isLoadingFetchingIngredients: false,
        });
    }

    presentErrorFetchingIngredients(): IngredientsViewModel {
        return this.with({
            isErrorFetchingIngredients: true,
        });
    }

    presentIngredientsFetched(ingredients: IngredientViewModel[]): IngredientsViewModel {
        return this.with({
            ingredients: this.sortIngredients(ingredients),
        });
    }

    startLoadingCreatingIngredient(): IngredientsViewModel {
        return this.with({
            isLoadingCreatingIngredient: true,
            isErrorCreatingIngredient: false,
        });
    }

    stopLoadingCreatingIngredient(): IngredientsViewModel {
        return this.with({
            isLoadingCreatingIngredient: false,
        });
    }

    presentErrorCreatingIngredient(): IngredientsViewModel {
        return this.with({
            isErrorCreatingIngredient: true,
        });
    }

    presentIngredientCreated(ingredient: IngredientViewModel): IngredientsViewModel {
        return this.with({
            ingredients: this.sortIngredients([...this.ingredients, ingredient]),
        });
    }

    startLoadingDeletingIngredient(id: string): IngredientsViewModel {
        return this.mapIngredient(ingredient => ingredient.startLoadingDeletingIngredient(id));
    }

    stopLoadingDeletingIngredient(id: string): IngredientsViewModel {
        return this.mapIngredient(ingredient => ingredient.stopLoadingDeletingIngredient(id));
    }

    presentErrorDeletingIngredient(id: string): IngredientsViewModel {
        return this.mapIngredient(ingredient => ingredient.presentErrorDeletingIngredient(id));
    }

    presentIngredientDeleted(id: string): IngredientsViewModel {
        const ingredients = this.ingredients.filter(ingredient => ingredient.isNot(id));
        return this.with({
            ingredients,
        });
    }

    startLoadingUpdatingIngredient(id: string): IngredientsViewModel {
        return this.mapIngredient(ingredient => ingredient.startLoadingUpdatingIngredient(id));
    }

    stopLoadingUpdatingIngredient(id: string): IngredientsViewModel {
        return this.mapIngredient(ingredient => ingredient.stopLoadingUpdatingIngredient(id));
    }

    presentErrorUpdatingIngredient(id: string): IngredientsViewModel {
        return this.mapIngredient(ingredient => ingredient.presentErrorUpdatingIngredient(id));
    }

    presentIngredientUpdated(id: string, inShoppingList: boolean): IngredientsViewModel {
        return this.mapIngredient(ingredient => ingredient.presentIngredientUpdated(id, inShoppingList));
    }
}
