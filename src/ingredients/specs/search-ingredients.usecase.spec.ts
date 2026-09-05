import { IngredientsView } from "../ingredients.view";
import { IngredientViewModel } from "../models/ingredient.view.model";
import { SearchIngredientsUseCase } from "../usecases/search-ingredients.usecase";

describe('Search ingredients', () => {
    let useCase: SearchIngredientsUseCase;
    let view: IngredientsView;

    beforeEach(() => {
        view = new IngredientsView();
        useCase = new SearchIngredientsUseCase(view);
    });

    it('should apply query filter to the ingredients list', async () => {
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
                name: 'Tomato',
                isLoadingDeleting: false,
                isLoadingUpdating: false,
                isErrorUpdating: false,
                inShoppingList: false,
            }),
        ];
        view.update(vm => vm.presentIngredientsFetched(ingredients));

        expect(view.ingredientsViewModel().filteredIngredients()).toEqual(ingredients);

        useCase.execute(' tOMATO ');

        expect(view.ingredientsViewModel().filteredIngredients()).toEqual([ingredients[1]]);
    })
})
