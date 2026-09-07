import { API_BASE_URL } from "../../../infra/http/api-url";
import { FakeHttpAdapter } from "../../../infra/http/fake-http.adapter";
import { HttpRecipesAdapter } from "../http-recipes.adapter";

const RECIPES_URL = `${API_BASE_URL}/gohan/recipes`;

describe('Http recipes adapter', () => {
    let adapter: HttpRecipesAdapter;
    let fakeHttpAdapter: FakeHttpAdapter;

    beforeEach(() => {
        fakeHttpAdapter = new FakeHttpAdapter();
        adapter = new HttpRecipesAdapter(fakeHttpAdapter);
    });

    it('should fetch recipes list', async () => {
        fakeHttpAdapter.getResponseByUrl[RECIPES_URL] = {
            recipes: [
                { id: '1', name: 'Recipe 1', inMealsList: false },
                { id: '2', name: 'Recipe 2', inMealsList: true },
            ],
        };

        const recipesList = await adapter.fetchRecipesList();

        expect(recipesList).toEqual({
            recipes: [
                { id: '1', name: 'Recipe 1', inMealsList: false },
                { id: '2', name: 'Recipe 2', inMealsList: true },
            ],
        });
    })

    it('should create a recipe', async () => {
        const recipeName = 'New Recipe';
        fakeHttpAdapter.postResponseByUrlAndBody[`${RECIPES_URL}:${JSON.stringify({ name: recipeName })}`] = {
            id: '3', name: recipeName, inMealsList: false,
        };

        const createdRecipe = await adapter.createRecipe(recipeName);

        expect(createdRecipe).toEqual({ id: '3', name: recipeName, inMealsList: false });
    })

    it('should update a recipe', async () => {
        const recipeId = '1';
        const inMealsList = true;
        fakeHttpAdapter.patchResponseByUrlAndBody[`${RECIPES_URL}/${recipeId}:${JSON.stringify({ inMealsList })}`] = {
            id: recipeId, name: 'Recipe 1', inMealsList,
        };

        const updatedRecipe = await adapter.updateRecipe(recipeId, inMealsList);

        expect(updatedRecipe).toEqual({ id: recipeId, name: 'Recipe 1', inMealsList });
    })

    it('should delete a recipe successfully', async () => {
        const recipeId = '1';
        fakeHttpAdapter.deleteResponseByUrl[`${RECIPES_URL}/${recipeId}`] = undefined;

        const deletionResult = await adapter.deleteRecipe(recipeId);

        expect(deletionResult).toEqual({ success: true });
    })

    it('should handle recipe deletion conflict', async () => {
        const recipeId = '1';
        fakeHttpAdapter.deleteErrorByUrl[`${RECIPES_URL}/${recipeId}`] = { status: 409 };

        const deletionResult = await adapter.deleteRecipe(recipeId);

        expect(deletionResult).toEqual({ success: false, error: 'RecipeInMealsListError' });
    })

    it('should handle unknown error during recipe deletion', async () => {
        const recipeId = '1';
        fakeHttpAdapter.deleteErrorByUrl[`${RECIPES_URL}/${recipeId}`] = { status: 500 };

        const deletionResult = await adapter.deleteRecipe(recipeId);

        expect(deletionResult).toEqual({ success: false, error: 'UnknownError' });
    })
})
