import { FakeIngredientsAdapter } from "../adapters/fake-ingredients.adapter";
import { IngredientsView } from "../ingredients.view";
import { UpdateIngredientShoppingListUseCase } from "../usecases/update-ingredient-shopping-list.usecase";

describe('Update ingredient shopping list', () => {
    let useCase: UpdateIngredientShoppingListUseCase;
    let view: IngredientsView;
    let fakeIngredientsAdapter: FakeIngredientsAdapter;

    beforeEach(() => {
        view = new IngredientsView();
        fakeIngredientsAdapter = new FakeIngredientsAdapter();
        useCase = new UpdateIngredientShoppingListUseCase(view, fakeIngredientsAdapter);
    });
})
