import { API_BASE_URL } from "../../infra/http/api-url";
import { HttpPort } from "../../infra/http/http.port";
import { RecipePort } from "../core/recipe.port";
import { IngredientOptionDomainModel, IngredientOptionsDomainModel, RecipeDomainModel, RecipeIngredientDomainModel } from "../core/models/recipe.domain.model";
import { CreateIngredientOptionApiRequest, IngredientOptionApiModel, IngredientOptionsListApiModel, RecipeDetailApiModel } from "./models/recipe.api.model";

const RECIPES_URL = `${API_BASE_URL}/gohan/recipes`;
const INGREDIENTS_URL = `${API_BASE_URL}/gohan/ingredients`;

export class HttpRecipeAdapter implements RecipePort {
    constructor(
        private readonly httpPort: HttpPort,
    ) { }

    async fetchRecipe(id: string): Promise<RecipeDomainModel> {
        const response = await this.httpPort.get<RecipeDetailApiModel>(`${RECIPES_URL}/${id}`);
        return this.toRecipe(response);
    }

    async fetchIngredientOptions(): Promise<IngredientOptionsDomainModel> {
        const response = await this.httpPort.get<IngredientOptionsListApiModel>(INGREDIENTS_URL);
        return { options: response.ingredients.map(ingredient => this.toIngredientOption(ingredient)) };
    }

    async createIngredientOption(name: string): Promise<IngredientOptionDomainModel> {
        const request: CreateIngredientOptionApiRequest = { name };
        const response = await this.httpPort.post<IngredientOptionApiModel>(INGREDIENTS_URL, request);
        return this.toIngredientOption(response);
    }

    async addRecipeIngredient(recipeId: string, ingredientId: string): Promise<RecipeIngredientDomainModel> {
        const response = await this.httpPort.post<RecipeDetailApiModel>(`${RECIPES_URL}/${recipeId}/ingredients/${ingredientId}`, null);
        return this.toRecipeIngredient(response, ingredientId);
    }

    async removeRecipeIngredient(recipeId: string, ingredientId: string): Promise<void> {
        await this.httpPort.delete(`${RECIPES_URL}/${recipeId}/ingredients/${ingredientId}`);
    }

    private toRecipe(recipe: RecipeDetailApiModel): RecipeDomainModel {
        return {
            id: recipe.id,
            name: recipe.name,
            inMealsList: recipe.inMealsList,
            ingredients: recipe.ingredients.map(ingredient => ({ id: ingredient.id, name: ingredient.name })),
        };
    }

    private toIngredientOption(ingredient: IngredientOptionApiModel): IngredientOptionDomainModel {
        return { id: ingredient.id, name: ingredient.name };
    }

    private toRecipeIngredient(recipe: RecipeDetailApiModel, ingredientId: string): RecipeIngredientDomainModel {
        const ingredient = recipe.ingredients.find(ingredient => ingredient.id === ingredientId);
        return { id: ingredientId, name: ingredient?.name ?? '' };
    }
}
