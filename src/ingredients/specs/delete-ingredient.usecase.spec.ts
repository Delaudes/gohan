import { FakeIngredientsAdapter } from "../adapters/fake-ingredients.adapter";
import { IngredientsView } from "../ingredients.view";
import { DeleteIngredientUseCase } from "../usecases/delete-ingredient.usecase";

describe('Delete ingredient', () => {
    let useCase: DeleteIngredientUseCase;
    let view: IngredientsView;
    let fakeIngredientsAdapter: FakeIngredientsAdapter;

    beforeEach(() => {
        view = new IngredientsView();
        fakeIngredientsAdapter = new FakeIngredientsAdapter();
        useCase = new DeleteIngredientUseCase(view, fakeIngredientsAdapter);
    });
})
