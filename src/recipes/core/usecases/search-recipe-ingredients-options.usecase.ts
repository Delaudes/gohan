import { IngredientOptionDomainModel } from "../models/recipes.domain.model";
import { RecipeIngredientsPort } from "../recipe-ingredients.port";
import { RecipeView } from "../recipe.view";

export class SearchRecipeIngredientsOptionsUseCase {
    constructor(
        private readonly recipeView: RecipeView,
        private readonly recipeIngredientsPort: RecipeIngredientsPort,
    ) { }

    async execute(query: string): Promise<void> {
        const options = await this.recipeIngredientsPort.fetchIngredientsOptions();
        const firstMatch = options.getFirstMatch(query);
        this.presentOptions(options.ingredientsOptions, firstMatch);
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
