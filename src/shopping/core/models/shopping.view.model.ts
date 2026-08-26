import { ShoppingIngredientViewModel } from "./shopping-ingredient.view.model";

type ShoppingProps = {
    isLoadingFetchingIngredients: boolean;
    isErrorFetchingIngredients: boolean;
    ingredients: ShoppingIngredientViewModel[];
}

export class ShoppingViewModel {
    readonly isLoadingFetchingIngredients: boolean;
    readonly isErrorFetchingIngredients: boolean;
    readonly ingredients: ShoppingIngredientViewModel[];

    constructor(props: ShoppingProps) {
        this.isLoadingFetchingIngredients = props.isLoadingFetchingIngredients;
        this.isErrorFetchingIngredients = props.isErrorFetchingIngredients;
        this.ingredients = props.ingredients;
    }

    static initial(): ShoppingViewModel {
        return new ShoppingViewModel({
            isLoadingFetchingIngredients: false,
            isErrorFetchingIngredients: false,
            ingredients: [],
        });
    }

    hasIngredients(): boolean {
        return this.ingredients.length > 0;
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

    startLoadingUpdatingBoughtIngredient(id: string): ShoppingViewModel {
        return this.mapIngredient(ingredient => ingredient.startLoadingUpdatingBoughtIngredient(id));
    }

    stopLoadingUpdatingBoughtIngredient(id: string): ShoppingViewModel {
        return this.mapIngredient(ingredient => ingredient.stopLoadingUpdatingBoughtIngredient(id));
    }

    presentErrorUpdatingBoughtIngredient(id: string): ShoppingViewModel {
        return this.mapIngredient(ingredient => ingredient.presentErrorUpdatingBoughtIngredient(id));
    }

    presentIngredientUpdated(id: string, bought: boolean): ShoppingViewModel {
        return this.mapIngredient(ingredient => ingredient.presentIngredientUpdated(id, bought));
    }

    startLoadingRemovingIngredient(id: string): ShoppingViewModel {
        return this.mapIngredient(ingredient => ingredient.startLoadingRemovingIngredient(id));
    }

    stopLoadingRemovingIngredient(id: string): ShoppingViewModel {
        return this.mapIngredient(ingredient => ingredient.stopLoadingRemovingIngredient(id));
    }

    presentErrorRemovingIngredient(id: string): ShoppingViewModel {
        return this.mapIngredient(ingredient => ingredient.presentErrorRemovingIngredient(id));
    }

    presentIngredientRemoved(id: string): ShoppingViewModel {
        const ingredients = this.ingredients.filter(ingredient => ingredient.isNot(id));
        return this.with({
            ingredients,
        });
    }
}
