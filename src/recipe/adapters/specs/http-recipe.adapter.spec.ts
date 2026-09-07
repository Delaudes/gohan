import { API_BASE_URL } from "../../../infra/http/api-url";
import { FakeHttpAdapter } from "../../../infra/http/fake-http.adapter";
import { HttpRecipeAdapter } from "../http-recipe.adapter";

const RECIPES_URL = `${API_BASE_URL}/gohan/recipes`;
const INGREDIENTS_URL = `${API_BASE_URL}/gohan/ingredients`;

describe('Http recipe adapter', () => {
    let adapter: HttpRecipeAdapter;
    let fakeHttpAdapter: FakeHttpAdapter;

    beforeEach(() => {
        fakeHttpAdapter = new FakeHttpAdapter();
        adapter = new HttpRecipeAdapter(fakeHttpAdapter);
    });

    it('should fetch a recipe', async () => {
        const recipeId = '1';
        fakeHttpAdapter.getResponseByUrl[`${RECIPES_URL}/${recipeId}`] = {
            id: recipeId,
            name: 'Recipe 1',
            inMealsList: true,
            ingredients: [
                { id: '1', name: 'Ingredient 1' },
                { id: '2', name: 'Ingredient 2' },
            ],
        };

        const recipe = await adapter.fetchRecipe(recipeId);

        expect(recipe).toEqual({
            id: recipeId,
            name: 'Recipe 1',
            inMealsList: true,
            ingredients: [
                { id: '1', name: 'Ingredient 1' },
                { id: '2', name: 'Ingredient 2' },
            ],
        });
    })

    it('should fetch ingredient options', async () => {
        fakeHttpAdapter.getResponseByUrl[INGREDIENTS_URL] = {
            ingredients: [
                { id: '1', name: 'Ingredient 1' },
                { id: '2', name: 'Ingredient 2' },
            ],
        };

        const options = await adapter.fetchIngredientOptions();

        expect(options).toEqual({
            options: [
                { id: '1', name: 'Ingredient 1' },
                { id: '2', name: 'Ingredient 2' },
            ],
        });
    })

    it('should create an ingredient option', async () => {
        const ingredientName = 'New Ingredient';
        fakeHttpAdapter.postResponseByUrlAndBody[`${INGREDIENTS_URL}:${JSON.stringify({ name: ingredientName })}`] = {
            id: '3', name: ingredientName,
        };

        const option = await adapter.createIngredientOption(ingredientName);

        expect(option).toEqual({ id: '3', name: ingredientName });
    })

    it('should add a recipe ingredient', async () => {
        const recipeId = '1';
        const ingredientId = '2';
        fakeHttpAdapter.postResponseByUrlAndBody[`${RECIPES_URL}/${recipeId}/ingredients/${ingredientId}:${JSON.stringify({})}`] = {
            ingredients: [
                { id: '1', name: 'Ingredient 1' },
                { id: ingredientId, name: 'Ingredient 2' },
            ],
        };

        const ingredient = await adapter.addRecipeIngredient(recipeId, ingredientId);

        expect(ingredient).toEqual({ id: ingredientId, name: 'Ingredient 2' });
    })

    it('should remove a recipe ingredient', async () => {
        const recipeId = '1';
        const ingredientId = '2';

        expect(fakeHttpAdapter.lastDeleteUrl).toBeUndefined();

        await adapter.removeRecipeIngredient(recipeId, ingredientId);

        expect(fakeHttpAdapter.lastDeleteUrl).toEqual(`${RECIPES_URL}/${recipeId}/ingredients/${ingredientId}`);
    })
})
