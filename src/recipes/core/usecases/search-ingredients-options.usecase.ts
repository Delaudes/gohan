import { RecipeIngredientsPort } from "../recipe-ingredients.port";
import { RecipeView } from "../recipe.view";
import { IngredientsOptionsDomainModel, RecipeIngredientDomainModel } from "../models/recipes.domain.model";

export class SearchIngredientsOptionsUseCase {
    constructor(
        private readonly recipeView: RecipeView,
        private readonly recipeIngredientsPort: RecipeIngredientsPort,
    ) { }

    async execute(query: string): Promise<void> {
        const options = await this.recipeIngredientsPort.fetchIngredientsOptions();
        const matches = options.matching(query);
        this.presentOptions(options.ingredientsOptions, matches);
    }

    private presentOptions(allOptions: RecipeIngredientDomainModel[], matches: IngredientsOptionsDomainModel): void {
        const visibleIds = matches.ingredientsOptions.slice(0, 3).map(match => match.id);
        this.recipeView.update({
            ingredientsOptions: allOptions.map(option => ({
                id: option.id,
                name: option.name,
                isVisible: visibleIds.includes(option.id),
            })),
            hasIngredientsOptions: matches.hasIngredientsOptions(),
        });
    }
}
