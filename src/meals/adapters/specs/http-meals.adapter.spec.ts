import { API_BASE_URL } from "../../../infra/http/api-url";
import { FakeHttpAdapter } from "../../../infra/http/fake-http.adapter";
import { HttpMealsAdapter } from "../http-meals.adapter";

const RECIPES_URL = `${API_BASE_URL}/gohan/recipes`;

describe('Http meals adapter', () => {
    let adapter: HttpMealsAdapter;
    let fakeHttpAdapter: FakeHttpAdapter;

    beforeEach(() => {
        fakeHttpAdapter = new FakeHttpAdapter();
        adapter = new HttpMealsAdapter(fakeHttpAdapter);
    });

    it('should fetch recipes list', async () => {
        fakeHttpAdapter.getResponseByUrl[RECIPES_URL] = {
            recipes: [
                { id: '1', name: 'Recipe 1', inMealsList: true, done: false },
                { id: '2', name: 'Recipe 2', inMealsList: false, done: true },
            ],
        };

        const recipesList = await adapter.fetchRecipesList();

        expect(recipesList).toEqual({
            recipes: [
                { id: '1', name: 'Recipe 1', inMealsList: true, done: false },
                { id: '2', name: 'Recipe 2', inMealsList: false, done: true },
            ],
        });
    })

    it('should fetch a meal', async () => {
        const mealId = '1';
        fakeHttpAdapter.getResponseByUrl[`${RECIPES_URL}/${mealId}`] = {
            id: mealId,
            name: 'Meal 1',
            done: false,
            ingredients: [
                { id: '1', name: 'Ingredient 1', bought: true },
                { id: '2', name: 'Ingredient 2', bought: false },
            ],
        };

        const meal = await adapter.fetchMeal(mealId);

        expect(meal).toEqual({
            id: mealId,
            name: 'Meal 1',
            done: false,
            ingredients: [
                { id: '1', name: 'Ingredient 1', bought: true },
                { id: '2', name: 'Ingredient 2', bought: false },
            ],
        });
    })

    it('should update a meal done status', async () => {
        const mealId = '1';
        fakeHttpAdapter.patchResponseByUrlAndBody[`${RECIPES_URL}/${mealId}:${JSON.stringify({ done: true })}`] = {
            id: mealId, name: 'Meal 1', done: true,
        };

        const updatedMeal = await adapter.updateMeal(mealId, true);

        expect(updatedMeal).toEqual({ id: mealId, name: 'Meal 1', done: true });
    })

    it('should add a meal', async () => {
        const mealId = '1';
        fakeHttpAdapter.patchResponseByUrlAndBody[`${RECIPES_URL}/${mealId}:${JSON.stringify({ inMealsList: true })}`] = {
            id: mealId, name: 'Meal 1', done: false,
        };

        const addedMeal = await adapter.addMeal(mealId);

        expect(addedMeal).toEqual({ id: mealId, name: 'Meal 1', done: false });
    })

    it('should remove a meal', async () => {
        const mealId = '1';

        expect(fakeHttpAdapter.lastPatchUrl).toBeUndefined();
        expect(fakeHttpAdapter.lastPatchBody).toBeUndefined();

        await adapter.removeMeal(mealId);

        expect(fakeHttpAdapter.lastPatchUrl).toEqual(`${RECIPES_URL}/${mealId}`);
        expect(fakeHttpAdapter.lastPatchBody).toEqual({ inMealsList: false });
    })

    it('should update a meal ingredient bought status', async () => {
        const mealId = '1';
        const ingredientId = '2';
        fakeHttpAdapter.patchResponseByUrlAndBody[`${RECIPES_URL}/${mealId}/ingredients/${ingredientId}:${JSON.stringify({ bought: true })}`] = {
            ingredients: [{ id: ingredientId, name: 'Ingredient 2', bought: true }],
        };

        const updatedIngredient = await adapter.updateMealIngredient(mealId, ingredientId, true);

        expect(updatedIngredient).toEqual({ id: ingredientId, name: 'Ingredient 2', bought: true });
    })
})
