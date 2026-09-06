import { FakeIngredientsAdapter } from "../../adapters/fake-ingredients.adapter";
import { IngredientsView } from "../../ingredients.view";
import { IngredientViewModel } from "../../models/ingredient.view.model";
import { UpdateIngredientShoppingListUseCase } from "../update-ingredient-shopping-list.usecase";

describe('Update ingredient shopping list', () => {
    let useCase: UpdateIngredientShoppingListUseCase;
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
        useCase = new UpdateIngredientShoppingListUseCase(view, fakeIngredientsAdapter);
    });

    it('should present loading when updating ingredient shopping list is successful', async () => {
        fakeIngredientsAdapter.updatedIngredientById[ingredients[0].id] = { id: '1', name: 'Ingredient A', inShoppingList: true };

        expect(view.ingredientsViewModel().ingredients[0].isLoadingUpdating).toEqual(false);

        const promise = useCase.execute(ingredients[0].id, true);

        expect(view.ingredientsViewModel().ingredients[0].isLoadingUpdating).toEqual(true);

        await promise;

        expect(view.ingredientsViewModel().ingredients[0].isLoadingUpdating).toEqual(false);
    });

    it('should present loading when updating ingredient shopping list fails', async () => {
        fakeIngredientsAdapter.errorUpdatingIngredient = true;

        expect(view.ingredientsViewModel().ingredients[0].isLoadingUpdating).toEqual(false);

        const promise = useCase.execute(ingredients[0].id, true);

        expect(view.ingredientsViewModel().ingredients[0].isLoadingUpdating).toEqual(true);

        await promise;

        expect(view.ingredientsViewModel().ingredients[0].isLoadingUpdating).toEqual(false);
    });

    it('should reset updating ingredient error when updating ingredient shopping list', async () => {
        view.update(vm => vm.presentErrorUpdatingIngredient(ingredients[0].id));

        expect(view.ingredientsViewModel().ingredients[0].isErrorUpdating).toEqual(true);

        useCase.execute(ingredients[0].id, true);

        expect(view.ingredientsViewModel().ingredients[0].isErrorUpdating).toEqual(false);
    });

    it('should update the ingredient shopping list when successful, without affecting other ingredients', async () => {
        fakeIngredientsAdapter.updatedIngredientById[ingredients[0].id] = { id: '1', name: 'Ingredient A', inShoppingList: true };

        expect(view.ingredientsViewModel().ingredients[0].inShoppingList).toEqual(false);
        expect(view.ingredientsViewModel().ingredients[1].inShoppingList).toEqual(false);

        await useCase.execute(ingredients[0].id, true);

        expect(view.ingredientsViewModel().ingredients[0].inShoppingList).toEqual(true);
        expect(view.ingredientsViewModel().ingredients[1].inShoppingList).toEqual(false);
    });

    it('should present error when updating ingredient shopping list fails', async () => {
        fakeIngredientsAdapter.errorUpdatingIngredient = true;

        expect(view.ingredientsViewModel().ingredients[0].isErrorUpdating).toEqual(false);

        await useCase.execute(ingredients[0].id, true);

        expect(view.ingredientsViewModel().ingredients[0].isErrorUpdating).toEqual(true);
    });
})
