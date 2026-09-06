import { API_BASE_URL } from "../../../infra/http/api-url";
import { FakeHttpAdapter } from "../../../infra/http/fake-http.adapter";
import { HttpIngredientsAdapter } from "../http-ingredients.adapter";

describe('Http ingredients adapter', () => {
    let adapter: HttpIngredientsAdapter;
    let fakeHttpAdapter: FakeHttpAdapter;

    beforeEach(() => {
        fakeHttpAdapter = new FakeHttpAdapter();
        adapter = new HttpIngredientsAdapter(fakeHttpAdapter);
    });

    it('should fetch ingredients list', async () => {
        fakeHttpAdapter.getResponseByUrl[`${API_BASE_URL}/gohan/ingredients`] = {
            ingredients: [
                { id: '1', name: 'Ingredient 1', inShoppingList: false },
                { id: '2', name: 'Ingredient 2', inShoppingList: true },
            ],
        };

        const ingredientsList = await adapter.fetchIngredientsList();

        expect(ingredientsList).toEqual({
            ingredients: [
                { id: '1', name: 'Ingredient 1', inShoppingList: false },
                { id: '2', name: 'Ingredient 2', inShoppingList: true },
            ],
        });
    })

    it('should create an ingredient', async () => {
        const ingredientName = 'New Ingredient';
        fakeHttpAdapter.postResponseByUrlAndBody[`${API_BASE_URL}/gohan/ingredients:${JSON.stringify({ name: ingredientName })}`] = {
            id: '3',
            name: ingredientName,
            inShoppingList: false,
        };

        const createdIngredient = await adapter.createIngredient(ingredientName);

        expect(createdIngredient).toEqual({
            id: '3',
            name: ingredientName,
            inShoppingList: false,
        });
    })

    it('should update an ingredient', async () => {
        const ingredientId = '1';
        const inShoppingList = true;
        fakeHttpAdapter.patchResponseByUrlAndBody[`${API_BASE_URL}/gohan/ingredients/${ingredientId}:${JSON.stringify({ inShoppingList })}`] = {
            id: ingredientId,
            name: 'Ingredient 1',
            inShoppingList,
        };

        const updatedIngredient = await adapter.updateIngredient(ingredientId, inShoppingList);

        expect(updatedIngredient).toEqual({
            id: ingredientId,
            name: 'Ingredient 1',
            inShoppingList,
        });
    })

    it('should delete an ingredient successfully', async () => {
        const ingredientId = '1';
        fakeHttpAdapter.deleteResponseByUrl[`${API_BASE_URL}/gohan/ingredients/${ingredientId}`] = undefined;

        const deletionResult = await adapter.deleteIngredient(ingredientId);

        expect(deletionResult).toEqual({ success: true });
    })

    it('should handle ingredient deletion conflict', async () => {
        const ingredientId = '1';
        fakeHttpAdapter.deleteErrorByUrl[`${API_BASE_URL}/gohan/ingredients/${ingredientId}`] = { status: 409 };

        const deletionResult = await adapter.deleteIngredient(ingredientId);

        expect(deletionResult).toEqual({ success: false, error: 'IngredientInUseError' });
    })

    it('should handle unknown error during ingredient deletion', async () => {
        const ingredientId = '1';
        fakeHttpAdapter.deleteErrorByUrl[`${API_BASE_URL}/gohan/ingredients/${ingredientId}`] = { status: 500 };

        const deletionResult = await adapter.deleteIngredient(ingredientId);

        expect(deletionResult).toEqual({ success: false, error: 'UnknownError' });
    })
})