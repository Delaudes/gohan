import { API_BASE_URL } from "../../infra/http/api-url";
import { HttpPort } from "../../infra/http/http.port";
import { RecipesPort } from "../core/recipes.port";
import { RecipeDeletionResult, RecipeDomainModel, RecipesListDomainModel } from "../core/models/recipes.domain.model";
import { CreateRecipeApiRequest, PatchRecipeApiRequest, RecipeApiModel, RecipeDetailApiModel, RecipesListApiModel } from "./models/recipes.api.model";

const RECIPES_URL = `${API_BASE_URL}/gohan/recipes`;

export class HttpRecipesAdapter implements RecipesPort {
    constructor(
        private readonly httpPort: HttpPort,
    ) { }

    async fetchRecipesList(): Promise<RecipesListDomainModel> {
        const response = await this.httpPort.get<RecipesListApiModel>(RECIPES_URL);
        return { recipes: response.recipes.map(recipe => this.toRecipe(recipe)) };
    }

    async createRecipe(name: string): Promise<RecipeDomainModel> {
        const request: CreateRecipeApiRequest = { name };
        const response = await this.httpPort.post<RecipeApiModel>(RECIPES_URL, request);
        return this.toRecipe(response);
    }

    async updateRecipe(id: string, inMealsList: boolean): Promise<RecipeDomainModel> {
        const request: PatchRecipeApiRequest = { inMealsList };
        const response = await this.httpPort.patch<RecipeDetailApiModel>(`${RECIPES_URL}/${id}`, request);
        return this.toRecipe(response);
    }

    async deleteRecipe(id: string): Promise<RecipeDeletionResult> {
        try {
            await this.httpPort.delete(`${RECIPES_URL}/${id}`);
            return { success: true };
        } catch (error) {
            if (this.isConflict(error)) {
                return { success: false, error: 'RecipeInMealsListError' };
            }
            return { success: false, error: 'UnknownError' };
        }
    }

    private isConflict(error: unknown): boolean {
        return typeof error === 'object' && error !== null && 'status' in error && error.status === 409;
    }

    private toRecipe(recipe: RecipeApiModel): RecipeDomainModel {
        return { id: recipe.id, name: recipe.name, inMealsList: recipe.inMealsList };
    }
}
