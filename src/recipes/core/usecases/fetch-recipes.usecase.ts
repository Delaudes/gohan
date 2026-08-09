import { RecipesPort } from "../recipes.port";
import { RecipesView } from "../recipes.view";
import { RecipesListDomainModel } from "../models/recipes.domain.model";

export class FetchRecipesUseCase {
    constructor(
        private readonly recipesView: RecipesView,
        private readonly recipesPort: RecipesPort,
    ) { }

    async execute(): Promise<void> {
        this.startLoading();
        try {
            const recipesList = await this.recipesPort.fetchRecipesList();
            this.presentRecipesList(recipesList);
        } catch {
            this.presentError();
        } finally {
            this.stopLoading();
        }
    }

    private startLoading(): void {
        this.recipesView.update({ isLoadingFetchingRecipes: true, isErrorFetchingRecipes: false });
    }

    private stopLoading(): void {
        this.recipesView.update({ isLoadingFetchingRecipes: false });
    }

    private presentError(): void {
        this.recipesView.update({ isErrorFetchingRecipes: true });
    }

    private presentRecipesList(recipesList: RecipesListDomainModel) {
        this.recipesView.update({
            recipes: recipesList.recipes.map(recipe => ({
                id: recipe.id,
                name: recipe.name,
                isLoadingDeleting: false,
                isErrorDeleting: false,
                isLoadingUpdating: false,
                isErrorUpdating: false,
                inMealsList: recipe.inMealsList,
            })),
            hasRecipes: recipesList.hasRecipes(),
        });
    }
}
