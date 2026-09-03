import { FakeIngredientsAdapter } from "../adapters/fake-ingredients.adapter";
import { IngredientsView } from "../core/ingredients.view";
import { CreateIngredientUseCase } from "../core/usecases/create-ingredient.usecase";

describe('Create ingredient', () => {
    let useCase: CreateIngredientUseCase;
    let view: IngredientsView;
    let fakeIngredientsAdapter: FakeIngredientsAdapter;

    beforeEach(() => {
        view = new IngredientsView();
        fakeIngredientsAdapter = new FakeIngredientsAdapter();
        useCase = new CreateIngredientUseCase(view, fakeIngredientsAdapter);
    });

})