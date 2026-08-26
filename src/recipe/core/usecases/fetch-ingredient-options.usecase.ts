import { IngredientOptionViewModel } from "../models/ingredient-option.view.model";
import { RecipePort } from "../recipe.port";
import { RecipeView } from "../recipe.view";

export class FetchIngredientOptionsUseCase {
    constructor(
        private readonly recipeView: RecipeView,
        private readonly recipePort: RecipePort,
    ) { }

    async execute(): Promise<void> {
        try {
            const options = await this.recipePort.fetchIngredientOptions();
            const optionViewModels = options.options.map(option => new IngredientOptionViewModel({
                id: option.id,
                name: option.name,
            }));
            this.recipeView.update(vm => vm.presentIngredientOptionsFetched(optionViewModels));
        } catch {
            this.recipeView.update(vm => vm.presentIngredientOptionsFetched([]));
        }
    }
}
