import { Field } from "../../../presentation/field/field.port";
import { AppParam } from "../../../infra/route/app-param";
import { RoutePort } from "../../../infra/route/route.port";
import { RecipePort } from "../recipe.port";
import { RecipeView } from "../recipe.view";
import { RecipeIngredientDomainModel } from "../models/recipe.domain.model";
import { IngredientOptionViewModel, RecipeIngredientViewModel } from "../models/recipe-ingredient.view.model";

export class AddUnknownRecipeIngredientUseCase {
    constructor(
        private readonly recipeView: RecipeView,
        private readonly recipePort: RecipePort,
        private readonly routePort: RoutePort,
    ) { }

    async execute(field: Field): Promise<void> {
        const recipeId = this.routePort.getParam(AppParam.Id);
        this.recipeView.update(vm => vm.startLoadingAddingIngredient());
        try {
            const option = await this.recipePort.createIngredientOption(field.value.trim());
            const ingredient = await this.recipePort.addRecipeIngredient(recipeId, option.id);
            this.presentIngredientAdded(ingredient);
            field.value = '';
            field.focus();
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
        const optionViewModel = new IngredientOptionViewModel({
            id: ingredient.id,
            name: ingredient.name,
        });
        this.recipeView.update(vm => vm.presentIngredientAdded(ingredientViewModel).presentIngredientOptionCreated(optionViewModel));
    }
}
