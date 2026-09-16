import { IngredientOptionViewModel } from "../ingredient-option.view.model";
import { RecipeIngredientViewModel } from "../recipe-ingredient.view.model";
import { RecipeViewModel } from "../recipe.view.model";

describe('Recipe ingredients', () => {
    let viewModel: RecipeViewModel;

    const ingredients = [
        new RecipeIngredientViewModel({
            id: '1',
            name: 'Ingredient 1',
            isLoadingRemoving: false,
            isErrorRemoving: false,
        }),
    ];

    const options = [
        new IngredientOptionViewModel({ id: '1', name: 'Ingredient 1' }),
        new IngredientOptionViewModel({ id: '2', name: 'Tomato' }),
    ];

    beforeEach(() => {
        viewModel = RecipeViewModel.initial();
    });

    it('should have ingredients once fetched', () => {
        expect(viewModel.hasIngredients).toEqual(false);

        viewModel = viewModel.presentRecipeFetched({ ingredients });

        expect(viewModel.hasIngredients).toEqual(true);

        viewModel = viewModel.presentRecipeFetched({ ingredients: [] });

        expect(viewModel.hasIngredients).toEqual(false);
    });

    it('should derive available ingredient options from the ingredients already in the recipe', () => {
        expect(viewModel.availableIngredientOptions).toEqual([]);

        viewModel = viewModel.presentRecipeFetched({ ingredients }).presentIngredientOptionsFetched(options);

        expect(viewModel.availableIngredientOptions).toEqual([options[1]]);

        viewModel = viewModel.presentRecipeFetched({ ingredients: [] });

        expect(viewModel.availableIngredientOptions).toEqual(options);
    });

    it('should match an available option by a partial, diacritic-insensitive query, or nothing when the query is empty or unmatched', () => {
        expect(viewModel.matchingIngredientOption).toBeUndefined();

        viewModel = viewModel.presentIngredientOptionsFetched(options).presentIngredientsSearchQuery(' mÂT ');

        expect(viewModel.matchingIngredientOption).toEqual(options[1]);

        viewModel = viewModel.presentIngredientsSearchQuery(' ');

        expect(viewModel.matchingIngredientOption).toBeUndefined();

        viewModel = viewModel.presentIngredientsSearchQuery('non-existing');

        expect(viewModel.matchingIngredientOption).toBeUndefined();
    });
})
