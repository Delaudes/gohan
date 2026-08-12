import { AppParam } from "../../../infra/route/app-param";
import { RoutePort } from "../../../infra/route/route.port";
import { RecipesPort } from "../recipes.port";
import { RecipeView } from "../recipe.view";
import { RecipeDetailDomainModel } from "../models/recipes.domain.model";

export class FetchRecipeUseCase {
    constructor(
        private readonly recipeView: RecipeView,
        private readonly recipesPort: RecipesPort,
        private readonly routePort: RoutePort,
    ) { }

    async execute(): Promise<void> {
        const id = this.routePort.getParam(AppParam.Id);
        this.startLoading();
        try {
            const recipe = await this.recipesPort.fetchRecipe(id);
            this.presentRecipe(recipe);
        } catch {
            this.presentError();
        } finally {
            this.stopLoading();
        }
    }

    private startLoading(): void {
        this.recipeView.update({ isLoadingFetchingRecipe: true, isErrorFetchingRecipe: false });
    }

    private stopLoading(): void {
        this.recipeView.update({ isLoadingFetchingRecipe: false });
    }

    private presentError(): void {
        this.recipeView.update({ isErrorFetchingRecipe: true });
    }

    private presentRecipe(recipe: RecipeDetailDomainModel): void {
        this.recipeView.update({
            id: recipe.id,
            name: recipe.name,
            inMealsList: recipe.inMealsList,
            ingredients: recipe.ingredients.map(ingredient => ({
                id: ingredient.id,
                name: ingredient.name,
                isLoadingRemoving: false,
                isErrorRemoving: false,
            })),
            hasIngredients: recipe.hasIngredients(),
        });
    }
}
