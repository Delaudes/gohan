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

    it('should filter ingredients by a partial, diacritic-insensitive query, or show all when the query is empty', () => {
        expect(viewModel.filteredIngredients).toEqual([]);

        viewModel = viewModel.presentIngredientsFetched(ingredients);

        expect(viewModel.filteredIngredients).toEqual(ingredients);

        viewModel = viewModel.presentSearchQuery(' mÂT ');

        expect(viewModel.filteredIngredients).toEqual([ingredients[1]]);

        viewModel = viewModel.presentSearchQuery('non-existing');

        expect(viewModel.filteredIngredients).toEqual([]);
    });
})
