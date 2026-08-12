import { AppParam } from "../../../infra/route/app-param";
import { RoutePort } from "../../../infra/route/route.port";
import { RecipeIngredientsPort } from "../recipe-ingredients.port";
import { RecipeView } from "../recipe.view";

export class RemoveRecipeIngredientUseCase {
    constructor(
        private readonly recipeView: RecipeView,
        private readonly recipeIngredientsPort: RecipeIngredientsPort,
        private readonly routePort: RoutePort,
    ) { }

    async execute(ingredientId: string): Promise<void> {
        const recipeId = this.routePort.getParam(AppParam.Id);
        this.startLoading(ingredientId);
        try {
            await this.recipeIngredientsPort.removeRecipeIngredient(recipeId, ingredientId);
            this.presentIngredientRemoved(ingredientId);
        } catch {
            this.presentError(ingredientId);
        } finally {
            this.stopLoading(ingredientId);
        }
    }

    private startLoading(ingredientId: string): void {
        const ingredients = this.recipeView.recipeViewModel.get().ingredients.map(ingredient =>
            ingredient.id === ingredientId ? { ...ingredient, isLoadingRemoving: true, isErrorRemoving: false } : ingredient
        );
        this.recipeView.update({ ingredients });
    }

    private stopLoading(ingredientId: string): void {
        const ingredients = this.recipeView.recipeViewModel.get().ingredients.map(ingredient =>
            ingredient.id === ingredientId ? { ...ingredient, isLoadingRemoving: false } : ingredient
        );
        this.recipeView.update({ ingredients });
    }

    private presentError(ingredientId: string): void {
        const ingredients = this.recipeView.recipeViewModel.get().ingredients.map(ingredient =>
            ingredient.id === ingredientId ? { ...ingredient, isErrorRemoving: true } : ingredient
        );
        this.recipeView.update({ ingredients });
    }

    private presentIngredientRemoved(ingredientId: string): void {
        const ingredients = this.recipeView.recipeViewModel.get().ingredients.filter(ingredient => ingredient.id !== ingredientId);
        this.recipeView.update({ ingredients, hasIngredients: ingredients.length > 0 });
    }
}
