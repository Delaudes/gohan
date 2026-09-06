import { FakeIngredientsAdapter } from "../../adapters/fake-ingredients.adapter";
import { IngredientsView } from "../../ingredients.view";
import { IngredientViewModel } from "../../models/ingredient.view.model";
import { DeleteIngredientUseCase } from "../delete-ingredient.usecase";

describe('Delete ingredient', () => {
    let useCase: DeleteIngredientUseCase;
    let view: IngredientsView;
    let fakeIngredientsAdapter: FakeIngredientsAdapter;

    const ingredients = [
        new IngredientViewModel({ id: '1', name: 'Ingredient A', inShoppingList: false, isLoadingDeleting: false, isLoadingUpdating: false, isErrorUpdating: false }),
        new IngredientViewModel({ id: '2', name: 'Ingredient B', inShoppingList: false, isLoadingDeleting: false, isLoadingUpdating: false, isErrorUpdating: false }),
    ];

    beforeEach(() => {
        view = new IngredientsView();
        view.update(vm => vm.presentIngredientsFetched(ingredients));
        fakeIngredientsAdapter = new FakeIngredientsAdapter();
        useCase = new DeleteIngredientUseCase(view, fakeIngredientsAdapter);
    });

    it('should present loading when deleting ingredient', async () => {
        expect(view.ingredientsViewModel().ingredients[0].isLoadingDeleting).toEqual(false);

        const promise = useCase.execute(ingredients[0].id);

        expect(view.ingredientsViewModel().ingredients[0].isLoadingDeleting).toEqual(true);

        await promise;

        expect(view.ingredientsViewModel().ingredients[0].isLoadingDeleting).toEqual(false);
    })

    it('should reset deleting ingredient error when deleting ingredient', async () => {
        view.update(vm => vm.presentErrorDeletingIngredient(ingredients[0].id, 'Une erreur est survenue, réessayez.'));

        expect(view.ingredientsViewModel().ingredients[0].errorDeletingMessage).toEqual('Une erreur est survenue, réessayez.');

        useCase.execute(ingredients[0].id);

        expect(view.ingredientsViewModel().ingredients[0].errorDeletingMessage).toEqual(undefined);
    })

    it('should present ingredient deleted when deleting ingredient is successful', async () => {
        fakeIngredientsAdapter.deletionResultById[ingredients[0].id] = { success: true };

        expect(view.ingredientsViewModel().ingredients).toEqual(ingredients);

        await useCase.execute(ingredients[0].id);

        expect(view.ingredientsViewModel().ingredients).toEqual([ingredients[1]]);
    })

    it('should present ingredient in use error when deleting ingredient fails', async () => {
        fakeIngredientsAdapter.deletionResultById[ingredients[0].id] = { success: false, error: 'IngredientInUseError' };

        expect(view.ingredientsViewModel().ingredients[0].errorDeletingMessage).toEqual(undefined);

        await useCase.execute(ingredients[0].id);

        expect(view.ingredientsViewModel().ingredients[0].errorDeletingMessage).toEqual('Ingrédient non supprimable : il est dans une recette ou dans la liste de courses');
    })

    it('should present unknown error when deleting ingredient fails', async () => {
        fakeIngredientsAdapter.deletionResultById[ingredients[0].id] = { success: false, error: 'UnknownError' };

        expect(view.ingredientsViewModel().ingredients[0].errorDeletingMessage).toEqual(undefined);

        await useCase.execute(ingredients[0].id);

        expect(view.ingredientsViewModel().ingredients[0].errorDeletingMessage).toEqual('Une erreur est survenue, réessayez.');
    })
})
