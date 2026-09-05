import { API_BASE_URL } from "../../infra/http/api-url";
import { HttpPort } from "../../infra/http/http.port";
import { IngredientsPort } from "../ingredients.port";
import { IngredientDeletionResult, IngredientDomainModel, IngredientsListDomainModel } from "../models/ingredients.domain.model";
import { CreateIngredientApiRequest, IngredientApiModel, IngredientsListApiModel, PatchIngredientApiRequest } from "../models/ingredients.api.model";

const INGREDIENTS_URL = `${API_BASE_URL}/gohan/ingredients`;

export class HttpIngredientsAdapter implements IngredientsPort {
    constructor(
        private readonly httpPort: HttpPort,
    ) { }

    async fetchIngredientsList(): Promise<IngredientsListDomainModel> {
        const response = await this.httpPort.get<IngredientsListApiModel>(INGREDIENTS_URL);
        return { ingredients: response.ingredients.map(ingredient => this.toIngredient(ingredient)) };
    }

    async createIngredient(name: string): Promise<IngredientDomainModel> {
        const request: CreateIngredientApiRequest = { name };
        const response = await this.httpPort.post<IngredientApiModel>(INGREDIENTS_URL, request);
        return this.toIngredient(response);
    }

    async updateIngredient(id: string, inShoppingList: boolean): Promise<IngredientDomainModel> {
        const request: PatchIngredientApiRequest = { inShoppingList };
        const response = await this.httpPort.patch<IngredientApiModel>(`${INGREDIENTS_URL}/${id}`, request);
        return this.toIngredient(response);
    }

    async deleteIngredient(id: string): Promise<IngredientDeletionResult> {
        try {
            await this.httpPort.delete(`${INGREDIENTS_URL}/${id}`);
            return { success: true };
        } catch (error) {
            if (this.isConflict(error)) {
                return { success: false, error: 'IngredientInUseError' };
            }
            return { success: false, error: 'UnknownError' };
        }
    }

    private isConflict(error: unknown): boolean {
        return typeof error === 'object' && error !== null && 'status' in error && error.status === 409;
    }

    private toIngredient(ingredient: IngredientApiModel): IngredientDomainModel {
        return { id: ingredient.id, name: ingredient.name, inShoppingList: ingredient.inShoppingList };
    }
}
