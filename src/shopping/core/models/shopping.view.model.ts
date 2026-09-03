import { IngredientOptionViewModel } from "./ingredient-option.view.model";
import { ShoppingIngredientViewModel } from "./shopping-ingredient.view.model";

type ShoppingProps = {
    isLoadingFetchingIngredients: boolean;
    isErrorFetchingIngredients: boolean;
    ingredients: ShoppingIngredientViewModel[];
    ingredientOptions: IngredientOptionViewModel[];
    ingredientsSearchQuery: string;
    isLoadingAddingIngredient: boolean;
    isErrorAddingIngredient: boolean;
    hideBoughtIngredients: boolean;
}

export class ShoppingViewModel {
    readonly isLoadingFetchingIngredients: boolean;
    readonly isErrorFetchingIngredients: boolean;
    readonly ingredients: ShoppingIngredientViewModel[];
    readonly ingredientOptions: IngredientOptionViewModel[];
    readonly ingredientsSearchQuery: string;
    readonly isLoadingAddingIngredient: boolean;
    readonly isErrorAddingIngredient: boolean;
    readonly hideBoughtIngredients: boolean;

    constructor(props: ShoppingProps) {
        this.isLoadingFetchingIngredients = props.isLoadingFetchingIngredients;
        this.isErrorFetchingIngredients = props.isErrorFetchingIngredients;
        this.ingredients = props.ingredients;
        this.ingredientOptions = props.ingredientOptions;
        this.ingredientsSearchQuery = props.ingredientsSearchQuery;
        this.isLoadingAddingIngredient = props.isLoadingAddingIngredient;
        this.isErrorAddingIngredient = props.isErrorAddingIngredient;
        this.hideBoughtIngredients = props.hideBoughtIngredients;
    }

    static initial(): ShoppingViewModel {
        return new ShoppingViewModel({
            isLoadingFetchingIngredients: false,
            isErrorFetchingIngredients: false,
            ingredients: [],
            ingredientOptions: [],
            ingredientsSearchQuery: '',
            isLoadingAddingIngredient: false,
            isErrorAddingIngredient: false,
            hideBoughtIngredients: false,
        });
    }

    hasIngredients(): boolean {
        return this.ingredients.length > 0;
    }

    visibleIngredients(): ShoppingIngredientViewModel[] {
        return this.hideBoughtIngredients
            ? this.ingredients.filter(ingredient => !ingredient.bought)
            : this.ingredients;
    }

    availableIngredientOptions(): IngredientOptionViewModel[] {
        return this.ingredientOptions.filter(option => this.ingredients.every(ingredient => option.isNot(ingredient.id)));
    }

    matchingIngredientOption(): IngredientOptionViewModel | undefined {
        const normalizedQuery = this.ingredientsSearchQuery.trim().toLowerCase();
        if (!normalizedQuery) return undefined;
        return this.availableIngredientOptions().find(option => option.matches(normalizedQuery));
    }

    ingredientsProgress(): string {
        const boughtCount = this.ingredients.filter(ingredient => ingredient.bought).length;
        const count = this.ingredients.length;
        return `${boughtCount}/${count} acheté${count > 1 ? 's' : ''}`;
    }

    private with(partial: Partial<ShoppingProps>): ShoppingViewModel {
        return new ShoppingViewModel({
            ...this,
            ...partial,
        });
    }

    private sortIngredients(ingredients: ShoppingIngredientViewModel[]): ShoppingIngredientViewModel[] {
        return [...ingredients].sort((a, b) => a.name.localeCompare(b.name, 'fr'));
    }

    private mapIngredient(fn: (ingredient: ShoppingIngredientViewModel) => ShoppingIngredientViewModel): ShoppingViewModel {
        return this.with({
            ingredients: this.ingredients.map(fn),
        });
    }

    startLoadingFetchingIngredients(): ShoppingViewModel {
        return this.with({
            isLoadingFetchingIngredients: true,
            isErrorFetchingIngredients: false,
        });
    }

    stopLoadingFetchingIngredients(): ShoppingViewModel {
        return this.with({
            isLoadingFetchingIngredients: false,
        });
    }

    presentErrorFetchingIngredients(): ShoppingViewModel {
        return this.with({
            isErrorFetchingIngredients: true,
        });
    }

    presentIngredientsFetched(ingredients: ShoppingIngredientViewModel[]): ShoppingViewModel {
        return this.with({
            ingredients: this.sortIngredients(ingredients),
        });
    }

    startLoadingUpdatingBoughtIngredient(id: string, mealId?: string): ShoppingViewModel {
        return this.mapIngredient(ingredient => ingredient.startLoadingUpdatingBoughtIngredient(id, mealId));
    }

    stopLoadingUpdatingBoughtIngredient(id: string, mealId?: string): ShoppingViewModel {
        return this.mapIngredient(ingredient => ingredient.stopLoadingUpdatingBoughtIngredient(id, mealId));
    }

    presentErrorUpdatingBoughtIngredient(id: string, mealId?: string): ShoppingViewModel {
        return this.mapIngredient(ingredient => ingredient.presentErrorUpdatingBoughtIngredient(id, mealId));
    }

    presentIngredientUpdated(id: string, bought: boolean, mealId?: string): ShoppingViewModel {
        return this.mapIngredient(ingredient => ingredient.presentIngredientUpdated(id, bought, mealId));
    }

    startLoadingRemovingIngredient(id: string, mealId?: string): ShoppingViewModel {
        return this.mapIngredient(ingredient => ingredient.startLoadingRemovingIngredient(id, mealId));
    }

    stopLoadingRemovingIngredient(id: string, mealId?: string): ShoppingViewModel {
        return this.mapIngredient(ingredient => ingredient.stopLoadingRemovingIngredient(id, mealId));
    }

    presentErrorRemovingIngredient(id: string, mealId?: string): ShoppingViewModel {
        return this.mapIngredient(ingredient => ingredient.presentErrorRemovingIngredient(id, mealId));
    }

    presentIngredientRemoved(id: string, mealId?: string): ShoppingViewModel {
        const ingredients = this.ingredients.filter(ingredient => ingredient.isNot(id, mealId));
        return this.with({
            ingredients,
        });
    }

    presentIngredientOptionsFetched(options: IngredientOptionViewModel[]): ShoppingViewModel {
        return this.with({
            ingredientOptions: options,
        });
    }

    presentIngredientsSearchQuery(query: string): ShoppingViewModel {
        return this.with({
            ingredientsSearchQuery: query,
        });
    }

    presentHideBoughtIngredients(hide: boolean): ShoppingViewModel {
        return this.with({
            hideBoughtIngredients: hide,
        });
    }

    startLoadingAddingIngredient(): ShoppingViewModel {
        return this.with({
            isLoadingAddingIngredient: true,
            isErrorAddingIngredient: false,
        });
    }

    stopLoadingAddingIngredient(): ShoppingViewModel {
        return this.with({
            isLoadingAddingIngredient: false,
        });
    }

    presentErrorAddingIngredient(): ShoppingViewModel {
        return this.with({
            isErrorAddingIngredient: true,
        });
    }

    presentIngredientAdded(ingredient: ShoppingIngredientViewModel): ShoppingViewModel {
        return this.with({
            ingredients: this.sortIngredients([...this.ingredients, ingredient]),
        });
    }
}
