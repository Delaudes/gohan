import { Field } from "../../../presentation/field/field.port";
import { AppParam } from "../../../infra/route/app-param";
import { RoutePort } from "../../../infra/route/route.port";
import { RecipePort } from "../recipe.port";
import { RecipeView } from "../recipe.view";
import { RecipeIngredientDomainModel } from "../models/recipe.domain.model";

export class AddUnknownRecipeIngredientUseCase {
    constructor(
        private readonly recipeView: RecipeView,
        private readonly recipePort: RecipePort,
        private readonly routePort: RoutePort,
    ) { }

    async execute(field: Field): Promise<void> {
        const recipeId = this.routePort.getParam(AppParam.Id);
        this.startLoading();
        try {
            const option = await this.recipePort.createIngredientOption(field.value.trim());
            const ingredient = await this.recipePort.addRecipeIngredient(recipeId, option.id);
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
        const current = this.recipeView.recipeViewModel();
        const ingredients = [
            ...current.ingredients,
            { id: ingredient.id, name: ingredient.name, isLoadingRemoving: false, isErrorRemoving: false },
        ];
        const ingredientsOptions = [
            ...current.ingredientsOptions.map(option => ({ ...option, isVisible: false })),
            { id: ingredient.id, name: ingredient.name, isVisible: false },
        ];
        this.recipeView.update({
            ingredients,
            hasIngredients: true,
            ingredientsOptions,
        });
    }
}
