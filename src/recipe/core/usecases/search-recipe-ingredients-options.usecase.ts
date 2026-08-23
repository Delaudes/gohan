import { IngredientOptionDomainModel } from "../models/recipe.domain.model";
import { RecipePort } from "../recipe.port";
import { RecipeView } from "../recipe.view";

export class SearchRecipeIngredientsOptionsUseCase {
    constructor(
        private readonly recipeView: RecipeView,
        private readonly recipePort: RecipePort,
    ) { }

    async execute(query: string): Promise<void> {
        const options = await this.recipePort.fetchIngredientsOptions();
        const firstMatch = options.getFirstMatch(query);
        this.presentOptions(options.ingredients, firstMatch);
    }

    private presentOptions(allOptions: IngredientOptionDomainModel[], firstMatch: IngredientOptionDomainModel | undefined): void {
        this.recipeView.update({
            ingredientsOptions: allOptions.map(option => ({
                id: option.id,
                name: option.name,
                isVisible: option.is(firstMatch?.id),
            })),
        });
    }
}
