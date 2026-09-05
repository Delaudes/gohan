import { AppParam } from "../../infra/route/app-param";
import { RoutePort } from "../../infra/route/route.port";
import { RecipeIngredientDomainModel } from "../models/recipe.domain.model";
import { RecipeIngredientViewModel } from "../models/recipe-ingredient.view.model";
import { RecipePort } from "../recipe.port";
import { RecipeView } from "../recipe.view";

export class AddKnownRecipeIngredientUseCase {
    constructor(
        private readonly recipeView: RecipeView,
        private readonly recipePort: RecipePort,
        private readonly routePort: RoutePort,
    ) { }

    async execute(ingredientId: string): Promise<void> {
        const recipeId = this.routePort.getParam(AppParam.Id);
        this.recipeView.update(vm => vm.startLoadingAddingIngredient());
        try {
            const ingredient = await this.recipePort.addRecipeIngredient(recipeId, ingredientId);
            this.presentIngredientAdded(ingredient);
        } catch {
            this.recipeView.update(vm => vm.presentErrorAddingIngredient());
        } finally {
            this.recipeView.update(vm => vm.stopLoadingAddingIngredient());
        }
    }

    private presentIngredientAdded(ingredient: RecipeIngredientDomainModel): void {
        const ingredientViewModel = new RecipeIngredientViewModel({
            id: ingredient.id,
            name: ingredient.name,
            isLoadingRemoving: false,
            isErrorRemoving: false,
        });
        this.recipeView.update(vm => vm.presentIngredientAdded(ingredientViewModel));
    }
}
