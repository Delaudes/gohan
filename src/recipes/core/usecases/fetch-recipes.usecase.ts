import { RecipesPort } from "../recipes.port";
import { RecipesView } from "../recipes.view";
import { RecipesListDomainModel } from "../models/recipes.domain.model";
import { RecipeViewModel } from "../models/recipe.view.model";

export class FetchRecipesUseCase {
    constructor(
        private readonly recipesView: RecipesView,
        private readonly recipesPort: RecipesPort,
    ) { }

    async execute(): Promise<void> {
        this.recipesView.update(vm => vm.startLoadingFetchingRecipes());
        try {
            const recipesList = await this.recipesPort.fetchRecipesList();
            this.presentRecipesFetched(recipesList);
        } catch {
            this.recipesView.update(vm => vm.presentErrorFetchingRecipes());
        } finally {
            this.recipesView.update(vm => vm.stopLoadingFetchingRecipes());
        }
    }

    private presentRecipesFetched(recipesList: RecipesListDomainModel): void {
        const recipes = recipesList.recipes.map(recipe => new RecipeViewModel({
            id: recipe.id,
            name: recipe.name,
            isLoadingDeleting: false,
            isErrorDeleting: false,
            isLoadingUpdating: false,
            isErrorUpdating: false,
            inMealsList: recipe.inMealsList,
        }));
        this.recipesView.update(vm => vm.presentRecipesFetched(recipes));
    }
}
