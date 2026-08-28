import { API_BASE_URL } from "../../infra/http/api-url";
import { HttpPort } from "../../infra/http/http.port";
import { ShoppingPort } from "../core/shopping.port";
import { IngredientOptionsDomainModel, ShoppingIngredientDomainModel, ShoppingListDomainModel } from "../core/models/shopping.domain.model";
import { CreateIngredientApiRequest, IngredientApiModel, IngredientOptionsListApiModel, PatchIngredientApiRequest, PatchRecipeIngredientApiRequest, RecipeDetailApiModel, ShoppingItemApiModel, ShoppingListApiModel } from "./models/shopping.api.model";

const SHOPPING_URL = `${API_BASE_URL}/gohan/shopping`;
const INGREDIENTS_URL = `${API_BASE_URL}/gohan/ingredients`;
const RECIPES_URL = `${API_BASE_URL}/gohan/recipes`;

export class HttpShoppingAdapter implements ShoppingPort {
    constructor(
        private readonly httpPort: HttpPort,
    ) { }

    async fetchShoppingList(): Promise<ShoppingListDomainModel> {
        const response = await this.httpPort.get<ShoppingListApiModel>(SHOPPING_URL);
        return { ingredients: response.items.map(item => this.toShoppingIngredient(item)) };
    }

    async fetchIngredientOptions(): Promise<IngredientOptionsDomainModel> {
        const response = await this.httpPort.get<IngredientOptionsListApiModel>(INGREDIENTS_URL);
        return {
            options: response.ingredients.map(ingredient => ({
                id: ingredient.id,
                name: ingredient.name,
                inShoppingList: ingredient.inShoppingList,
            })),
        };
    }

    async createIngredient(name: string): Promise<ShoppingIngredientDomainModel> {
        const request: CreateIngredientApiRequest = { name, inShoppingList: true };
        const response = await this.httpPort.post<IngredientApiModel>(INGREDIENTS_URL, request);
        return this.toStandaloneIngredient(response);
    }

    async addIngredient(id: string): Promise<ShoppingIngredientDomainModel> {
        const request: PatchIngredientApiRequest = { inShoppingList: true };
        const response = await this.httpPort.patch<IngredientApiModel>(`${INGREDIENTS_URL}/${id}`, request);
        return this.toStandaloneIngredient(response);
    }

    async updateIngredient(id: string, bought: boolean): Promise<ShoppingIngredientDomainModel> {
        const request: PatchIngredientApiRequest = { bought };
        const response = await this.httpPort.patch<IngredientApiModel>(`${INGREDIENTS_URL}/${id}`, request);
        return this.toStandaloneIngredient(response);
    }

    async updateMealIngredient(mealId: string, id: string, bought: boolean): Promise<ShoppingIngredientDomainModel> {
        const request: PatchRecipeIngredientApiRequest = { bought };
        const response = await this.httpPort.patch<RecipeDetailApiModel>(`${RECIPES_URL}/${mealId}/ingredients/${id}`, request);
        const ingredient = response.ingredients.find(ingredient => ingredient.id === id);
        return { id, name: ingredient?.name ?? '', bought, mealId };
    }

    async removeIngredient(id: string): Promise<void> {
        const request: PatchIngredientApiRequest = { inShoppingList: false };
        await this.httpPort.patch(`${INGREDIENTS_URL}/${id}`, request);
    }

    private toShoppingIngredient(item: ShoppingItemApiModel): ShoppingIngredientDomainModel {
        return {
            id: item.id,
            name: item.name,
            bought: item.bought,
            mealId: item.recipeId ?? undefined,
            mealName: item.recipeName ?? undefined,
        };
    }

    private toStandaloneIngredient(ingredient: IngredientApiModel): ShoppingIngredientDomainModel {
        return { id: ingredient.id, name: ingredient.name, bought: ingredient.bought };
    }
}
