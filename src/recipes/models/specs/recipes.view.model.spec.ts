import { RecipeViewModel } from "../recipe.view.model";
import { RecipesViewModel } from "../recipes.view.model";

describe('Recipes list', () => {
    let viewModel: RecipesViewModel;

    const recipes = [
        new RecipeViewModel({
            id: '1',
            name: 'Lasagna',
            isLoadingDeleting: false,
            isLoadingUpdating: false,
            isErrorUpdating: false,
            inMealsList: false,
        }),
        new RecipeViewModel({
            id: '2',
            name: 'Tomato Soup',
            isLoadingDeleting: false,
            isLoadingUpdating: false,
            isErrorUpdating: false,
            inMealsList: true,
        }),
    ];

    beforeEach(() => {
        viewModel = RecipesViewModel.initial();
    });

    it('should have recipes once fetched', () => {
        expect(viewModel.hasRecipes).toEqual(false);

        viewModel = viewModel.presentRecipesFetched(recipes);

        expect(viewModel.hasRecipes).toEqual(true);

        viewModel = viewModel.presentRecipesFetched([]);

        expect(viewModel.hasRecipes).toEqual(false);
    });

    it('should filter recipes by a partial, diacritic-insensitive query, or show all when the query is empty', () => {
        expect(viewModel.filteredRecipes).toEqual([]);

        viewModel = viewModel.presentRecipesFetched(recipes);

        expect(viewModel.filteredRecipes).toEqual(recipes);

        viewModel = viewModel.presentSearchQuery(' mÂT ');

        expect(viewModel.filteredRecipes).toEqual([recipes[1]]);

        viewModel = viewModel.presentSearchQuery('non-existing');

        expect(viewModel.filteredRecipes).toEqual([]);
    });
})
