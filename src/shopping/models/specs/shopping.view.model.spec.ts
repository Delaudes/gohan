import { IngredientOptionViewModel } from "../ingredient-option.view.model";
import { ShoppingIngredientViewModel } from "../shopping-ingredient.view.model";
import { ShoppingViewModel } from "../shopping.view.model";

describe('Shopping list', () => {
    let viewModel: ShoppingViewModel;

    const ingredient = (id: string, name: string, bought: boolean) => new ShoppingIngredientViewModel({
        id,
        name,
        bought,
        isLoadingUpdatingBought: false,
        isErrorUpdatingBought: false,
        isLoadingRemoving: false,
        isErrorRemoving: false,
    });

    const ingredients = [
        ingredient('1', 'Potato', false),
        ingredient('2', 'Tomato', true),
    ];

    const options = [
        new IngredientOptionViewModel({ id: '1', name: 'Potato' }),
        new IngredientOptionViewModel({ id: '3', name: 'Carrot' }),
    ];

    beforeEach(() => {
        viewModel = ShoppingViewModel.initial();
    });

    it('should have ingredients once fetched', () => {
        expect(viewModel.hasIngredients).toEqual(false);

        viewModel = viewModel.presentIngredientsFetched(ingredients);

        expect(viewModel.hasIngredients).toEqual(true);

        viewModel = viewModel.presentIngredientsFetched([]);

        expect(viewModel.hasIngredients).toEqual(false);
    });

    it('should filter out bought ingredients only when they are hidden', () => {
        expect(viewModel.visibleIngredients).toEqual([]);

        viewModel = viewModel.presentIngredientsFetched(ingredients);

        expect(viewModel.visibleIngredients).toEqual(ingredients);

        viewModel = viewModel.presentHideBoughtIngredients(true);

        expect(viewModel.visibleIngredients).toEqual([ingredients[0]]);
    });

    it('should compute the bought ingredients progress, pluralizing only when there is more than one ingredient', () => {
        expect(viewModel.ingredientsProgress).toEqual('0/0 acheté');

        viewModel = viewModel.presentIngredientsFetched(ingredients);

        expect(viewModel.ingredientsProgress).toEqual('1/2 achetés');

        viewModel = viewModel.presentIngredientsFetched([ingredients[0]]);

        expect(viewModel.ingredientsProgress).toEqual('0/1 acheté');
    });

    it('should derive available ingredient options from the current shopping list', () => {
        expect(viewModel.availableIngredientOptions).toEqual([]);

        viewModel = viewModel.presentIngredientsFetched(ingredients).presentIngredientOptionsFetched(options);

        expect(viewModel.availableIngredientOptions).toEqual([options[1]]);

        viewModel = viewModel.presentIngredientsFetched([]);

        expect(viewModel.availableIngredientOptions).toEqual(options);
    });

    it('should match an available option by a partial, diacritic-insensitive query, or nothing when the query is empty or unmatched', () => {
        expect(viewModel.matchingIngredientOption).toBeUndefined();

        viewModel = viewModel.presentIngredientOptionsFetched(options).presentIngredientsSearchQuery(' rRô ');

        expect(viewModel.matchingIngredientOption).toEqual(options[1]);

        viewModel = viewModel.presentIngredientsSearchQuery(' ');

        expect(viewModel.matchingIngredientOption).toBeUndefined();

        viewModel = viewModel.presentIngredientsSearchQuery('non-existing');

        expect(viewModel.matchingIngredientOption).toBeUndefined();
    });
})
