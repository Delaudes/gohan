import { FakeIngredientsAdapter } from "../../adapters/fake-ingredients.adapter";
import { IngredientsView } from "../../ingredients.view";
import { IngredientsListDomainModel } from "../../models/ingredients.domain.model";
import { FetchIngredientsUseCase } from "../fetch-ingredients.usecase";

describe('Fetch ingredients', () => {
    let useCase: FetchIngredientsUseCase;
    let view: IngredientsView;
    let fakeIngredientsAdapter: FakeIngredientsAdapter;

    beforeEach(() => {
        view = new IngredientsView();
        fakeIngredientsAdapter = new FakeIngredientsAdapter();
        useCase = new FetchIngredientsUseCase(view, fakeIngredientsAdapter);
    });

    it('should present loading when fetching ingredients is successful', async () => {
        expect(view.ingredientsViewModel().isLoadingFetchingIngredients).toEqual(false);

        const promise = useCase.execute();

        expect(view.ingredientsViewModel().isLoadingFetchingIngredients).toEqual(true);

        await promise;

        expect(view.ingredientsViewModel().isLoadingFetchingIngredients).toEqual(false);
    });

    it('should reset fetching ingredients error when fetching ingredients', async () => {
        view.update(vm => (vm.presentErrorFetchingIngredients()));

        expect(view.ingredientsViewModel().isErrorFetchingIngredients).toEqual(true);

        useCase.execute();

        expect(view.ingredientsViewModel().isErrorFetchingIngredients).toEqual(false);
    })

    it('should present ingredients when fetching ingredients is successful', async () => {
        const ingredientsList: IngredientsListDomainModel = {
            ingredients: [
                { id: '1', name: 'Ingredient B', inShoppingList: false },
                { id: '2', name: 'Ingredient A', inShoppingList: true },
            ]
        };
        fakeIngredientsAdapter.ingredientsList = ingredientsList;

        expect(view.ingredientsViewModel().ingredients).toEqual([]);

        await useCase.execute();

        expect(view.ingredientsViewModel().ingredients).toEqual([
            { id: '2', name: 'Ingredient A', inShoppingList: true, isLoadingDeleting: false, isLoadingUpdating: false, isErrorUpdating: false },
            { id: '1', name: 'Ingredient B', inShoppingList: false, isLoadingDeleting: false, isLoadingUpdating: false, isErrorUpdating: false },
        ]);
    });

    it('should present error when fetching ingredients fails', async () => {
        fakeIngredientsAdapter.errorFetchingIngredients = true;

        expect(view.ingredientsViewModel().isErrorFetchingIngredients).toEqual(false);

        await useCase.execute();

        expect(view.ingredientsViewModel().isErrorFetchingIngredients).toEqual(true);
    });

    it('should present loading when fetching ingredients fails', async () => {
        fakeIngredientsAdapter.errorFetchingIngredients = true;

        expect(view.ingredientsViewModel().isLoadingFetchingIngredients).toEqual(false);

        const promise = useCase.execute();

        expect(view.ingredientsViewModel().isLoadingFetchingIngredients).toEqual(true);

        await promise;

        expect(view.ingredientsViewModel().isLoadingFetchingIngredients).toEqual(false);
    });
})
