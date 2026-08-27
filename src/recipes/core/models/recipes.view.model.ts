import { RecipeDeletionErrorMessage, RecipeViewModel } from "./recipe.view.model";

type RecipesProps = {
    isLoadingFetchingRecipes: boolean;
    isErrorFetchingRecipes: boolean;
    isLoadingCreatingRecipe: boolean;
    isErrorCreatingRecipe: boolean;
    recipes: RecipeViewModel[];
    searchQuery: string;
}

export class RecipesViewModel {
    readonly isLoadingFetchingRecipes: boolean;
    readonly isErrorFetchingRecipes: boolean;
    readonly isLoadingCreatingRecipe: boolean;
    readonly isErrorCreatingRecipe: boolean;
    readonly recipes: RecipeViewModel[];
    readonly searchQuery: string;

    constructor(props: RecipesProps) {
        this.isLoadingFetchingRecipes = props.isLoadingFetchingRecipes;
        this.isErrorFetchingRecipes = props.isErrorFetchingRecipes;
        this.isLoadingCreatingRecipe = props.isLoadingCreatingRecipe;
        this.isErrorCreatingRecipe = props.isErrorCreatingRecipe;
        this.recipes = props.recipes;
        this.searchQuery = props.searchQuery;
    }

    static initial(): RecipesViewModel {
        return new RecipesViewModel({
            isLoadingFetchingRecipes: false,
            isErrorFetchingRecipes: false,
            isLoadingCreatingRecipe: false,
            isErrorCreatingRecipe: false,
            recipes: [],
            searchQuery: '',
        });
    }

    hasRecipes(): boolean {
        return this.recipes.length > 0;
    }

    filteredRecipes(): RecipeViewModel[] {
        const normalizedQuery = this.searchQuery.trim().toLowerCase();
        return this.recipes.filter(recipe => recipe.matches(normalizedQuery));
    }

    presentSearchQuery(searchQuery: string): RecipesViewModel {
        return this.with({ searchQuery });
    }

    private with(partial: Partial<RecipesProps>): RecipesViewModel {
        return new RecipesViewModel({
            ...this,
            ...partial,
        });
    }

    private sortRecipes(recipes: RecipeViewModel[]): RecipeViewModel[] {
        return [...recipes].sort((a, b) => a.name.localeCompare(b.name, 'fr'));
    }

    private mapRecipe(fn: (recipe: RecipeViewModel) => RecipeViewModel): RecipesViewModel {
        return this.with({
            recipes: this.recipes.map(fn),
        });
    }

    startLoadingFetchingRecipes(): RecipesViewModel {
        return this.with({
            isLoadingFetchingRecipes: true,
            isErrorFetchingRecipes: false,
        });
    }

    stopLoadingFetchingRecipes(): RecipesViewModel {
        return this.with({
            isLoadingFetchingRecipes: false,
        });
    }

    presentErrorFetchingRecipes(): RecipesViewModel {
        return this.with({
            isErrorFetchingRecipes: true,
        });
    }

    presentRecipesFetched(recipes: RecipeViewModel[]): RecipesViewModel {
        return this.with({
            recipes: this.sortRecipes(recipes),
        });
    }

    startLoadingCreatingRecipe(): RecipesViewModel {
        return this.with({
            isLoadingCreatingRecipe: true,
            isErrorCreatingRecipe: false,
        });
    }

    stopLoadingCreatingRecipe(): RecipesViewModel {
        return this.with({
            isLoadingCreatingRecipe: false,
        });
    }

    presentErrorCreatingRecipe(): RecipesViewModel {
        return this.with({
            isErrorCreatingRecipe: true,
        });
    }

    presentRecipeCreated(recipe: RecipeViewModel): RecipesViewModel {
        return this.with({
            recipes: this.sortRecipes([...this.recipes, recipe]),
        });
    }

    startLoadingDeletingRecipe(id: string): RecipesViewModel {
        return this.mapRecipe(recipe => recipe.startLoadingDeletingRecipe(id));
    }

    stopLoadingDeletingRecipe(id: string): RecipesViewModel {
        return this.mapRecipe(recipe => recipe.stopLoadingDeletingRecipe(id));
    }

    presentErrorDeletingRecipe(id: string, errorMessage: RecipeDeletionErrorMessage): RecipesViewModel {
        return this.mapRecipe(recipe => recipe.presentErrorDeletingRecipe(id, errorMessage));
    }

    presentRecipeDeleted(id: string): RecipesViewModel {
        const recipes = this.recipes.filter(recipe => recipe.isNot(id));
        return this.with({
            recipes,
        });
    }

    startLoadingUpdatingRecipe(id: string): RecipesViewModel {
        return this.mapRecipe(recipe => recipe.startLoadingUpdatingRecipe(id));
    }

    stopLoadingUpdatingRecipe(id: string): RecipesViewModel {
        return this.mapRecipe(recipe => recipe.stopLoadingUpdatingRecipe(id));
    }

    presentErrorUpdatingRecipe(id: string): RecipesViewModel {
        return this.mapRecipe(recipe => recipe.presentErrorUpdatingRecipe(id));
    }

    presentRecipeUpdated(id: string, inMealsList: boolean): RecipesViewModel {
        return this.mapRecipe(recipe => recipe.presentRecipeUpdated(id, inMealsList));
    }
}
