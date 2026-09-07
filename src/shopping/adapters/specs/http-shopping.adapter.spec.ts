import { API_BASE_URL } from "../../../infra/http/api-url";
import { FakeHttpAdapter } from "../../../infra/http/fake-http.adapter";
import { HttpShoppingAdapter } from "../http-shopping.adapter";

const SHOPPING_URL = `${API_BASE_URL}/gohan/shopping`;
const INGREDIENTS_URL = `${API_BASE_URL}/gohan/ingredients`;
const RECIPES_URL = `${API_BASE_URL}/gohan/recipes`;

describe('Http shopping adapter', () => {
    let adapter: HttpShoppingAdapter;
    let fakeHttpAdapter: FakeHttpAdapter;

    beforeEach(() => {
        fakeHttpAdapter = new FakeHttpAdapter();
        adapter = new HttpShoppingAdapter(fakeHttpAdapter);
    });

    it('should fetch the shopping list', async () => {
        fakeHttpAdapter.getResponseByUrl[SHOPPING_URL] = {
            items: [
                { id: '1', recipeId: null, recipeName: null, name: 'Ingredient 1', bought: false },
                { id: '2', recipeId: 'm1', recipeName: 'Meal 1', name: 'Ingredient 2', bought: true },
            ],
        };

        const shoppingList = await adapter.fetchShoppingList();

        expect(shoppingList).toEqual({
            ingredients: [
                { id: '1', name: 'Ingredient 1', bought: false, mealId: undefined, mealName: undefined },
                { id: '2', name: 'Ingredient 2', bought: true, mealId: 'm1', mealName: 'Meal 1' },
            ],
        });
    })

    it('should fetch ingredient options', async () => {
        fakeHttpAdapter.getResponseByUrl[INGREDIENTS_URL] = {
            ingredients: [
                { id: '1', name: 'Ingredient 1', inShoppingList: false },
                { id: '2', name: 'Ingredient 2', inShoppingList: true },
            ],
        };

        const options = await adapter.fetchIngredientOptions();

        expect(options).toEqual({
            options: [
                { id: '1', name: 'Ingredient 1', inShoppingList: false },
                { id: '2', name: 'Ingredient 2', inShoppingList: true },
            ],
        });
    })

    it('should create an ingredient', async () => {
        const ingredientName = 'New Ingredient';
        fakeHttpAdapter.postResponseByUrlAndBody[`${INGREDIENTS_URL}:${JSON.stringify({ name: ingredientName, inShoppingList: true })}`] = {
            id: '3', name: ingredientName, bought: false,
        };

        const createdIngredient = await adapter.createIngredient(ingredientName);

        expect(createdIngredient).toEqual({ id: '3', name: ingredientName, bought: false });
    })

    it('should add an existing ingredient to the shopping list', async () => {
        const ingredientId = '1';
        fakeHttpAdapter.patchResponseByUrlAndBody[`${INGREDIENTS_URL}/${ingredientId}:${JSON.stringify({ inShoppingList: true })}`] = {
            id: ingredientId, name: 'Ingredient 1', bought: false,
        };

        const addedIngredient = await adapter.addIngredient(ingredientId);

        expect(addedIngredient).toEqual({ id: ingredientId, name: 'Ingredient 1', bought: false });
    })

    it('should update an ingredient bought status', async () => {
        const ingredientId = '1';
        fakeHttpAdapter.patchResponseByUrlAndBody[`${INGREDIENTS_URL}/${ingredientId}:${JSON.stringify({ bought: true })}`] = {
            id: ingredientId, name: 'Ingredient 1', bought: true,
        };

        const updatedIngredient = await adapter.updateIngredient(ingredientId, true);

        expect(updatedIngredient).toEqual({ id: ingredientId, name: 'Ingredient 1', bought: true });
    })

    it('should update a meal ingredient bought status', async () => {
        const mealId = 'm1';
        const ingredientId = '1';
        fakeHttpAdapter.patchResponseByUrlAndBody[`${RECIPES_URL}/${mealId}/ingredients/${ingredientId}:${JSON.stringify({ bought: true })}`] = {
            ingredients: [{ id: ingredientId, name: 'Ingredient 1', bought: true }],
        };

        const updatedIngredient = await adapter.updateMealIngredient(mealId, ingredientId, true);

        expect(updatedIngredient).toEqual({ id: ingredientId, name: 'Ingredient 1', bought: true, mealId });
    })

    it('should remove an ingredient from the shopping list', async () => {
        const ingredientId = '1';

        expect(fakeHttpAdapter.lastPatchUrl).toBeUndefined();
        expect(fakeHttpAdapter.lastPatchBody).toBeUndefined();

        await adapter.removeIngredient(ingredientId);

        expect(fakeHttpAdapter.lastPatchUrl).toEqual(`${INGREDIENTS_URL}/${ingredientId}`);
        expect(fakeHttpAdapter.lastPatchBody).toEqual({ inShoppingList: false });
    })
})
