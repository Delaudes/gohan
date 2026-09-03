import { IngredientOptionViewModel } from "./ingredient-option.view.model";
import { normalizeSearchText } from "../../../utils/normalize-search-text";
import { RecipeIngredientViewModel } from "./recipe-ingredient.view.model";

type RecipeProps = {
    isLoadingFetchingRecipe: boolean;
    isErrorFetchingRecipe: boolean;
    id: string;
    name: string;
    inMealsList: boolean;
    ingredients: RecipeIngredientViewModel[];
    ingredientOptions: IngredientOptionViewModel[];
    ingredientsSearchQuery: string;
    isLoadingAddingIngredient: boolean;
    isErrorAddingIngredient: boolean;
}

export class RecipeViewModel {
    readonly isLoadingFetchingRecipe: boolean;
    readonly isErrorFetchingRecipe: boolean;
    readonly id: string;
    readonly name: string;
    readonly inMealsList: boolean;
    readonly ingredients: RecipeIngredientViewModel[];
    readonly ingredientOptions: IngredientOptionViewModel[];
    readonly ingredientsSearchQuery: string;
    readonly isLoadingAddingIngredient: boolean;
    readonly isErrorAddingIngredient: boolean;

    constructor(props: RecipeProps) {
        this.isLoadingFetchingRecipe = props.isLoadingFetchingRecipe;
        this.isErrorFetchingRecipe = props.isErrorFetchingRecipe;
        this.id = props.id;
        this.name = props.name;
        this.inMealsList = props.inMealsList;
        this.ingredients = props.ingredients;
        this.ingredientOptions = props.ingredientOptions;
        this.ingredientsSearchQuery = props.ingredientsSearchQuery;
        this.isLoadingAddingIngredient = props.isLoadingAddingIngredient;
        this.isErrorAddingIngredient = props.isErrorAddingIngredient;
    }

    static initial(): RecipeViewModel {
        return new RecipeViewModel({
            isLoadingFetchingRecipe: false,
            isErrorFetchingRecipe: false,
            id: '',
            name: '',
            inMealsList: false,
            ingredients: [],
            ingredientOptions: [],
            ingredientsSearchQuery: '',
            isLoadingAddingIngredient: false,
            isErrorAddingIngredient: false,
        });
    }

    hasIngredients(): boolean {
        return this.ingredients.length > 0;
    }

    availableIngredientOptions(): IngredientOptionViewModel[] {
        return this.ingredientOptions.filter(option => this.ingredients.every(ingredient => option.isNot(ingredient.id)));
    }

    matchingIngredientOption(): IngredientOptionViewModel | undefined {
        const normalizedQuery = normalizeSearchText(this.ingredientsSearchQuery);
        if (!normalizedQuery) return undefined;
        return this.availableIngredientOptions().find(option => option.matches(normalizedQuery));
    }

    private with(partial: Partial<RecipeProps>): RecipeViewModel {
        return new RecipeViewModel({
            ...this,
            ...partial,
        });
    }

    private mapIngredient(fn: (ingredient: RecipeIngredientViewModel) => RecipeIngredientViewModel): RecipeViewModel {
        return this.with({
            ingredients: this.ingredients.map(fn),
        });
    }

    private sortIngredients(ingredients: RecipeIngredientViewModel[]): RecipeIngredientViewModel[] {
        return [...ingredients].sort((a, b) => a.name.localeCompare(b.name, 'fr'));
    }

    startLoadingFetchingRecipe(): RecipeViewModel {
        return this.with({
            isLoadingFetchingRecipe: true,
            isErrorFetchingRecipe: false,
        });
    }

    stopLoadingFetchingRecipe(): RecipeViewModel {
        return this.with({
            isLoadingFetchingRecipe: false,
        });
    }

    presentErrorFetchingRecipe(): RecipeViewModel {
        return this.with({
            isErrorFetchingRecipe: true,
        });
    }

    presentRecipeFetched(recipe: Partial<RecipeProps>): RecipeViewModel {
        return this.with({
            ...recipe,
            ingredients: recipe.ingredients ? this.sortIngredients(recipe.ingredients) : recipe.ingredients,
        });
    }

    startLoadingAddingIngredient(): RecipeViewModel {
        return this.with({
            isLoadingAddingIngredient: true,
            isErrorAddingIngredient: false,
        });
    }

    stopLoadingAddingIngredient(): RecipeViewModel {
        return this.with({
            isLoadingAddingIngredient: false,
        });
    }

    presentErrorAddingIngredient(): RecipeViewModel {
        return this.with({
            isErrorAddingIngredient: true,
        });
    }

    presentIngredientAdded(ingredient: RecipeIngredientViewModel): RecipeViewModel {
        return this.with({
            ingredients: this.sortIngredients([...this.ingredients, ingredient]),
        });
    }

    presentIngredientOptionCreated(option: IngredientOptionViewModel): RecipeViewModel {
        return this.with({
            ingredientOptions: [...this.ingredientOptions, option],
        });
    }

    startLoadingRemovingIngredient(id: string): RecipeViewModel {
        return this.mapIngredient(ingredient => ingredient.startLoadingRemovingIngredient(id));
    }

    stopLoadingRemovingIngredient(id: string): RecipeViewModel {
        return this.mapIngredient(ingredient => ingredient.stopLoadingRemovingIngredient(id));
    }

    presentErrorRemovingIngredient(id: string): RecipeViewModel {
        return this.mapIngredient(ingredient => ingredient.presentErrorRemovingIngredient(id));
    }

    presentIngredientRemoved(id: string): RecipeViewModel {
        const ingredients = this.ingredients.filter(ingredient => ingredient.isNot(id));
        return this.with({
            ingredients,
        });
    }

    presentIngredientOptionsFetched(options: IngredientOptionViewModel[]): RecipeViewModel {
        return this.with({
            ingredientOptions: options,
        });
    }

    presentIngredientsSearchQuery(query: string): RecipeViewModel {
        return this.with({
            ingredientsSearchQuery: query,
        });
    }
}
