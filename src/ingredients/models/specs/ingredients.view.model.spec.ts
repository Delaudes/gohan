import { IngredientViewModel } from "../ingredient.view.model";
import { IngredientsViewModel } from "../ingredients.view.model";

describe('Ingredients list', () => {
    let viewModel: IngredientsViewModel;

    const ingredients = [
        new IngredientViewModel({
            id: '1',
            name: 'Potato',
            isLoadingDeleting: false,
            isLoadingUpdating: false,
            isErrorUpdating: false,
            inShoppingList: false,
        }),
        new IngredientViewModel({
            id: '2',
            name: 'Tomatô ',
            isLoadingDeleting: false,
            isLoadingUpdating: false,
            isErrorUpdating: false,
            inShoppingList: false,
        }),
    ];

    beforeEach(() => {
        viewModel = IngredientsViewModel.initial();
    });

    it('should have ingredients once fetched', () => {
        expect(viewModel.hasIngredients).toEqual(false);

        viewModel = viewModel.presentIngredientsFetched(ingredients);

        expect(viewModel.hasIngredients).toEqual(true);

        viewModel = viewModel.presentIngredientsFetched([]);

        expect(viewModel.hasIngredients).toEqual(false);
    });

    it('should show all ingredients when the search query is empty', () => {
        expect(viewModel.filteredIngredients).toEqual([]);

        viewModel = viewModel.presentIngredientsFetched(ingredients).presentSearchQuery(' ');

        expect(viewModel.filteredIngredients).toEqual(ingredients);
    });

    it('should show only ingredients matching a partial, diacritic-insensitive query', () => {
        expect(viewModel.filteredIngredients).toEqual([]);

        viewModel = viewModel.presentIngredientsFetched(ingredients).presentSearchQuery(' MÂT ');

        expect(viewModel.filteredIngredients).toEqual([ingredients[1]]);
    });

    it('should show no ingredients when none match the search query', () => {
        expect(viewModel.filteredIngredients).toEqual([]);

        viewModel = viewModel.presentIngredientsFetched(ingredients).presentSearchQuery('non-existing');

        expect(viewModel.filteredIngredients).toEqual([]);
    });
})
