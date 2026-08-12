import { AppParam } from "../../../infra/route/app-param";
import { RoutePort } from "../../../infra/route/route.port";
import { Field } from "../../../presentation/field/field.port";
import { RecipeIngredientDomainModel } from "../models/recipes.domain.model";
import { RecipeIngredientsPort } from "../recipe-ingredients.port";
import { RecipeView } from "../recipe.view";

export class AddKnownRecipeIngredientUseCase {
    constructor(
        private readonly recipeView: RecipeView,
        private readonly recipeIngredientsPort: RecipeIngredientsPort,
        private readonly routePort: RoutePort,
    ) { }

    async execute(ingredientId: string, field: Field): Promise<void> {
        const recipeId = this.routePort.getParam(AppParam.Id);
        this.startLoading();
        try {
            const ingredient = await this.recipeIngredientsPort.addRecipeIngredient(recipeId, ingredientId);
            this.presentIngredientAdded(ingredient);
            field.value = '';
            field.focus();
        } catch {
            this.presentError();
        } finally {
            this.stopLoading();
        }
    }

    private startLoading(): void {
        this.recipeView.update({ isLoadingAddingIngredient: true, isErrorAddingIngredient: false });
    }

    private stopLoading(): void {
        this.recipeView.update({ isLoadingAddingIngredient: false });
    }

    private presentError(): void {
        this.recipeView.update({ isErrorAddingIngredient: true });
    }

    private presentIngredientAdded(ingredient: RecipeIngredientDomainModel): void {
        const current = this.recipeView.recipeViewModel.get();
        const ingredients = [
            ...current.ingredients,
            { id: ingredient.id, name: ingredient.name, isLoadingRemoving: false, isErrorRemoving: false },
        ];
        const ingredientsOptions = current.ingredientsOptions.map(option => ({
            ...option,
            isVisible: false,
        }));
        this.recipeView.update({
            ingredients,
            hasIngredients: true,
            ingredientsOptions,
        });
    }
}
