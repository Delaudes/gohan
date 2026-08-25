import { AppParam } from "../../../infra/route/app-param";
import { RoutePort } from "../../../infra/route/route.port";
import { Dialog } from "../../../presentation/dialog/dialog.port";
import { RecipePort } from "../recipe.port";
import { RecipeView } from "../recipe.view";

export class RemoveRecipeIngredientUseCase {
    constructor(
        private readonly recipeView: RecipeView,
        private readonly recipePort: RecipePort,
        private readonly routePort: RoutePort,
    ) { }

    async execute(ingredientId: string, dialog: Dialog): Promise<void> {
        const recipeId = this.routePort.getParam(AppParam.Id);
        this.recipeView.update(vm => vm.startLoadingRemovingIngredient(ingredientId));
        try {
            await this.recipePort.removeRecipeIngredient(recipeId, ingredientId);
            this.recipeView.update(vm => vm.presentIngredientRemoved(ingredientId));
            dialog.close();
        } catch {
            this.recipeView.update(vm => vm.presentErrorRemovingIngredient(ingredientId));
        } finally {
            this.recipeView.update(vm => vm.stopLoadingRemovingIngredient(ingredientId));
        }
    }
}
