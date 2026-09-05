import { AppParam } from "../../infra/route/app-param";
import { RoutePort } from "../../infra/route/route.port";
import { RecipePort } from "../recipe.port";
import { RecipeView } from "../recipe.view";
import { RecipeDomainModel } from "../models/recipe.domain.model";
import { RecipeIngredientViewModel } from "../models/recipe-ingredient.view.model";

export class FetchRecipeUseCase {
    constructor(
        private readonly recipeView: RecipeView,
        private readonly recipePort: RecipePort,
        private readonly routePort: RoutePort,
    ) { }

    async execute(): Promise<void> {
        const id = this.routePort.getParam(AppParam.Id);
        this.recipeView.update(vm => vm.startLoadingFetchingRecipe());
        try {
            const recipe = await this.recipePort.fetchRecipe(id);
            this.presentRecipeFetched(recipe);
        } catch {
            this.recipeView.update(vm => vm.presentErrorFetchingRecipe());
        } finally {
            this.recipeView.update(vm => vm.stopLoadingFetchingRecipe());
        }
    }

    private presentRecipeFetched(recipe: RecipeDomainModel): void {
        const ingredients = recipe.ingredients.map(ingredient => new RecipeIngredientViewModel({
            id: ingredient.id,
            name: ingredient.name,
            isLoadingRemoving: false,
            isErrorRemoving: false,
        }));
        this.recipeView.update(vm => vm.presentRecipeFetched({
            id: recipe.id,
            name: recipe.name,
            inMealsList: recipe.inMealsList,
            ingredients,
        }));
    }
}
