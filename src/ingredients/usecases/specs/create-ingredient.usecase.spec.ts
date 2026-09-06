import { FakeIngredientsAdapter } from "../../adapters/fake-ingredients.adapter";
import { IngredientsView } from "../../ingredients.view";
import { IngredientViewModel } from "../../models/ingredient.view.model";
import { CreateIngredientUseCase } from "../create-ingredient.usecase";

describe('Create ingredient', () => {
    let useCase: CreateIngredientUseCase;
    let view: IngredientsView;
    let fakeIngredientsAdapter: FakeIngredientsAdapter;

    const existingIngredient = new IngredientViewModel({ id: '2', name: 'Zucchini', isLoadingDeleting: false, isLoadingUpdating: false, isErrorUpdating: false, inShoppingList: false });

    beforeEach(() => {
        view = new IngredientsView();
        view.update(vm => vm.presentIngredientsFetched([existingIngredient]));
        fakeIngredientsAdapter = new FakeIngredientsAdapter();
        useCase = new CreateIngredientUseCase(view, fakeIngredientsAdapter);
    });

    it('should present loading when creating ingredient is successful', async () => {
        expect(view.ingredientsViewModel().isLoadingCreatingIngredient).toEqual(false);

        const promise = useCase.execute('Tomato');

        expect(view.ingredientsViewModel().isLoadingCreatingIngredient).toEqual(true);

        await promise;

        expect(view.ingredientsViewModel().isLoadingCreatingIngredient).toEqual(false);
    });

    it('should present loading when creating ingredient fails', async () => {
        fakeIngredientsAdapter.errorCreatingIngredient = true;

        expect(view.ingredientsViewModel().isLoadingCreatingIngredient).toEqual(false);

        const promise = useCase.execute('Tomato');

        expect(view.ingredientsViewModel().isLoadingCreatingIngredient).toEqual(true);

        await promise;

        expect(view.ingredientsViewModel().isLoadingCreatingIngredient).toEqual(false);
    });

    it('should reset creating ingredient error when creating ingredient', async () => {
        view.update(vm => vm.presentErrorCreatingIngredient());

        expect(view.ingredientsViewModel().isErrorCreatingIngredient).toEqual(true);

        useCase.execute('Tomato');

        expect(view.ingredientsViewModel().isErrorCreatingIngredient).toEqual(false);
    });

    it('should reset creating ingredient success when creating ingredient', async () => {
        view.update(vm => vm.presentIngredientCreated(new IngredientViewModel({ id: '1', name: 'Tomato', isLoadingDeleting: false, isLoadingUpdating: false, isErrorUpdating: false, inShoppingList: false })));

        expect(view.ingredientsViewModel().isSuccessCreatingIngredient).toEqual(true);

        useCase.execute('Tomato');

        expect(view.ingredientsViewModel().isSuccessCreatingIngredient).toEqual(false);
    });

    it('should present ingredient created, sorted, when creating ingredient is successful', async () => {
        fakeIngredientsAdapter.ingredientsByName['Tomato'] = { id: '1', name: 'Tomato', inShoppingList: false };

        expect(view.ingredientsViewModel().ingredients).toEqual([existingIngredient]);
        expect(view.ingredientsViewModel().isSuccessCreatingIngredient).toEqual(false);

        await useCase.execute('  Tomato  ');

        expect(view.ingredientsViewModel().ingredients).toEqual([
            { id: '1', name: 'Tomato', inShoppingList: false, isLoadingDeleting: false, isLoadingUpdating: false, isErrorUpdating: false },
            existingIngredient,
        ]);
        expect(view.ingredientsViewModel().isSuccessCreatingIngredient).toEqual(true);
    });

    it('should present error when creating ingredient fails', async () => {
        fakeIngredientsAdapter.errorCreatingIngredient = true;

        expect(view.ingredientsViewModel().isErrorCreatingIngredient).toEqual(false);

        await useCase.execute('Tomato');

        expect(view.ingredientsViewModel().isErrorCreatingIngredient).toEqual(true);
    });
})
