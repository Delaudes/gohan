import { API_BASE_URL } from "../../infra/http/api-url";
import { HttpPort } from "../../infra/http/http.port";
import { MealsPort } from "../meals.port";
import { MealDetailDomainModel, MealDomainModel, MealIngredientDomainModel, RecipesListDomainModel } from "../models/meals.domain.model";
import { MealDetailApiModel, PatchRecipeApiRequest, PatchRecipeIngredientApiRequest, RecipeApiModel, RecipesListApiModel } from "../models/meals.api.model";

const RECIPES_URL = `${API_BASE_URL}/gohan/recipes`;

export class HttpMealsAdapter implements MealsPort {
    constructor(
        private readonly httpPort: HttpPort,
    ) { }

    async fetchRecipesList(): Promise<RecipesListDomainModel> {
        const response = await this.httpPort.get<RecipesListApiModel>(RECIPES_URL);
        return {
            recipes: response.recipes.map(recipe => ({
                id: recipe.id,
                name: recipe.name,
                inMealsList: recipe.inMealsList,
                done: recipe.done,
            })),
        };
    }

    async fetchMeal(id: string): Promise<MealDetailDomainModel> {
        const response = await this.httpPort.get<MealDetailApiModel>(`${RECIPES_URL}/${id}`);
        return this.toMealDetail(response);
    }

    async updateMeal(id: string, done: boolean): Promise<MealDomainModel> {
        const request: PatchRecipeApiRequest = { done };
        const response = await this.httpPort.patch<RecipeApiModel>(`${RECIPES_URL}/${id}`, request);
        return { id: response.id, name: response.name, done: response.done };
    }

    async addMeal(id: string): Promise<MealDomainModel> {
        const request: PatchRecipeApiRequest = { inMealsList: true };
        const response = await this.httpPort.patch<RecipeApiModel>(`${RECIPES_URL}/${id}`, request);
        return { id: response.id, name: response.name, done: response.done };
    }

    async removeMeal(id: string): Promise<void> {
        const request: PatchRecipeApiRequest = { inMealsList: false };
        await this.httpPort.patch(`${RECIPES_URL}/${id}`, request);
    }

    async updateMealIngredient(mealId: string, ingredientId: string, bought: boolean): Promise<MealIngredientDomainModel> {
        const request: PatchRecipeIngredientApiRequest = { bought };
        const response = await this.httpPort.patch<MealDetailApiModel>(`${RECIPES_URL}/${mealId}/ingredients/${ingredientId}`, request);
        const ingredient = response.ingredients.find(ingredient => ingredient.id === ingredientId);
        return { id: ingredientId, name: ingredient?.name ?? '', bought };
    }

    private toMealDetail(recipe: MealDetailApiModel): MealDetailDomainModel {
        return {
            id: recipe.id,
            name: recipe.name,
            done: recipe.done,
            ingredients: recipe.ingredients.map(ingredient => ({ id: ingredient.id, name: ingredient.name, bought: ingredient.bought })),
        };
    }
}
