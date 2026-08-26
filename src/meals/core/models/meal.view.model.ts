import { MealIngredientViewModel } from "./meal-ingredient.view.model";

type MealProps = {
    id: string;
    name: string;
    done: boolean;
    isLoadingUpdatingDone: boolean;
    isErrorUpdatingDone: boolean;
    isLoadingRemoving: boolean;
    isErrorRemoving: boolean;
    isExpanded: boolean;
    isLoadingIngredients: boolean;
    isErrorIngredients: boolean;
    ingredients: MealIngredientViewModel[];
}

export class MealViewModel {
    readonly id: string;
    readonly name: string;
    readonly done: boolean;
    readonly isLoadingUpdatingDone: boolean;
    readonly isErrorUpdatingDone: boolean;
    readonly isLoadingRemoving: boolean;
    readonly isErrorRemoving: boolean;
    readonly isExpanded: boolean;
    readonly isLoadingIngredients: boolean;
    readonly isErrorIngredients: boolean;
    readonly ingredients: MealIngredientViewModel[];

    constructor(props: MealProps) {
        this.id = props.id;
        this.name = props.name;
        this.done = props.done;
        this.isLoadingUpdatingDone = props.isLoadingUpdatingDone;
        this.isErrorUpdatingDone = props.isErrorUpdatingDone;
        this.isLoadingRemoving = props.isLoadingRemoving;
        this.isErrorRemoving = props.isErrorRemoving;
        this.isExpanded = props.isExpanded;
        this.isLoadingIngredients = props.isLoadingIngredients;
        this.isErrorIngredients = props.isErrorIngredients;
        this.ingredients = props.ingredients;
    }

    private with(partial: Partial<MealProps>): MealViewModel {
        return new MealViewModel({
            ...this,
            ...partial,
        });
    }

    private mapIngredient(fn: (ingredient: MealIngredientViewModel) => MealIngredientViewModel): MealViewModel {
        return this.with({
            ingredients: this.ingredients.map(fn),
        });
    }

    private sortIngredients(ingredients: MealIngredientViewModel[]): MealIngredientViewModel[] {
        return [...ingredients].sort((a, b) => a.name.localeCompare(b.name, 'fr'));
    }

    isNot(id: string): boolean {
        return this.id !== id;
    }

    is(id: string): boolean {
        return this.id === id;
    }

    hasIngredients(): boolean {
        return this.ingredients.length > 0;
    }

    startLoadingUpdatingDoneMeal(id: string): MealViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isLoadingUpdatingDone: true, isErrorUpdatingDone: false,
        });
    }

    stopLoadingUpdatingDoneMeal(id: string): MealViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isLoadingUpdatingDone: false,
        });
    }

    presentErrorUpdatingDoneMeal(id: string): MealViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isErrorUpdatingDone: true,
        });
    }

    presentMealUpdated(id: string, done: boolean): MealViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            done,
        });
    }

    startLoadingRemovingMeal(id: string): MealViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isLoadingRemoving: true, isErrorRemoving: false,
        });
    }

    stopLoadingRemovingMeal(id: string): MealViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isLoadingRemoving: false,
        });
    }

    presentErrorRemovingMeal(id: string): MealViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isErrorRemoving: true,
        });
    }

    startLoadingFetchingIngredients(id: string): MealViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isExpanded: true, isLoadingIngredients: true, isErrorIngredients: false,
        });
    }

    stopLoadingFetchingIngredients(id: string): MealViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isLoadingIngredients: false,
        });
    }

    presentErrorFetchingIngredients(id: string): MealViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isErrorIngredients: true,
        });
    }

    presentIngredientsFetched(id: string, ingredients: MealIngredientViewModel[]): MealViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            ingredients: this.sortIngredients(ingredients),
        });
    }

    presentCollapsed(id: string): MealViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isExpanded: false,
        });
    }

    startLoadingUpdatingBoughtIngredient(mealId: string, ingredientId: string): MealViewModel {
        if (this.isNot(mealId)) return this;
        return this.mapIngredient(ingredient => ingredient.startLoadingUpdatingBoughtIngredient(ingredientId));
    }

    stopLoadingUpdatingBoughtIngredient(mealId: string, ingredientId: string): MealViewModel {
        if (this.isNot(mealId)) return this;
        return this.mapIngredient(ingredient => ingredient.stopLoadingUpdatingBoughtIngredient(ingredientId));
    }

    presentErrorUpdatingBoughtIngredient(mealId: string, ingredientId: string): MealViewModel {
        if (this.isNot(mealId)) return this;
        return this.mapIngredient(ingredient => ingredient.presentErrorUpdatingBoughtIngredient(ingredientId));
    }

    presentIngredientUpdated(mealId: string, ingredientId: string, bought: boolean): MealViewModel {
        if (this.isNot(mealId)) return this;
        return this.mapIngredient(ingredient => ingredient.presentIngredientUpdated(ingredientId, bought));
    }
}
