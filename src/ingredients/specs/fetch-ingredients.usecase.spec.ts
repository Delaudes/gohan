import { FakeIngredientsAdapter } from "../adapters/fake-ingredients.adapter";
import { IngredientsView } from "../ingredients.view";
import { FetchIngredientsUseCase } from "../usecases/fetch-ingredients.usecase";

describe('Fetch ingredients', () => {
    let useCase: FetchIngredientsUseCase;
    let view: IngredientsView;
    let fakeIngredientsAdapter: FakeIngredientsAdapter;

    beforeEach(() => {
        view = new IngredientsView();
        fakeIngredientsAdapter = new FakeIngredientsAdapter();
        useCase = new FetchIngredientsUseCase(view, fakeIngredientsAdapter);
    });
})
