import { IngredientsView } from "../../ingredients.view";
import { SearchIngredientsUseCase } from "../search-ingredients.usecase";

describe('Search ingredients', () => {
    let useCase: SearchIngredientsUseCase;
    let view: IngredientsView;

    beforeEach(() => {
        view = new IngredientsView();
        useCase = new SearchIngredientsUseCase(view);
    });

    it('should apply query filter', async () => {
        const query = 'tomato';
        expect(view.ingredientsViewModel().searchQuery).toEqual('');

        useCase.execute(query);

        expect(view.ingredientsViewModel().searchQuery).toEqual(query);
    })
})
