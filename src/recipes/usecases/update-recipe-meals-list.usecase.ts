import { RecipesPort } from "../recipes.port";
import { RecipesView } from "../recipes.view";

export class UpdateRecipeMealsListUseCase {
    constructor(
        private readonly recipesView: RecipesView,
        private readonly recipesPort: RecipesPort,
    ) { }

    async execute(id: string, inMealsList: boolean): Promise<void> {
        this.recipesView.update(vm => vm.startLoadingUpdatingRecipe(id));
        try {
            const recipe = await this.recipesPort.updateRecipe(id, inMealsList);
            this.recipesView.update(vm => vm.presentRecipeUpdated(recipe.id, recipe.inMealsList));
        } catch {
            this.recipesView.update(vm => vm.presentErrorUpdatingRecipe(id));
        } finally {
            this.recipesView.update(vm => vm.stopLoadingUpdatingRecipe(id));
        }
    }
}
