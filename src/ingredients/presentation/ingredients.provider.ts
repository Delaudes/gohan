import { inject, InjectionToken } from "@angular/core";
import { HTTP_TOKEN } from "../../infra/http/http.provider";
import { HttpIngredientsAdapter } from "../adapters/http-ingredients.adapter";
import { IngredientsPort } from "../core/ingredients.port";
import { IngredientsView } from "../core/ingredients.view";
import { CreateIngredientUseCase } from "../core/usecases/create-ingredient.usecase";
import { DeleteIngredientUseCase } from "../core/usecases/delete-ingredient.usecase";
import { FetchIngredientsUseCase } from "../core/usecases/fetch-ingredients.usecase";
import { SearchIngredientsUseCase } from "../core/usecases/search-ingredients.usecase";
import { UpdateIngredientShoppingListUseCase } from "../core/usecases/update-ingredient-shopping-list.usecase";

export const INGREDIENTS_TOKEN = new InjectionToken<IngredientsPort>('INGREDIENTS_TOKEN', {
    providedIn: 'root',
    factory: () => new HttpIngredientsAdapter(inject(HTTP_TOKEN)),
});

export const INGREDIENTS_PROVIDERS = [
    {
        provide: IngredientsView,
        useFactory: () => new IngredientsView()
    },
    {
        provide: FetchIngredientsUseCase,
        useFactory: () => new FetchIngredientsUseCase(inject(IngredientsView), inject(INGREDIENTS_TOKEN)),
    },
    {
        provide: DeleteIngredientUseCase,
        useFactory: () => new DeleteIngredientUseCase(inject(IngredientsView), inject(INGREDIENTS_TOKEN)),
    },
    {
        provide: CreateIngredientUseCase,
        useFactory: () => new CreateIngredientUseCase(inject(IngredientsView), inject(INGREDIENTS_TOKEN)),
    },
    {
        provide: UpdateIngredientShoppingListUseCase,
        useFactory: () => new UpdateIngredientShoppingListUseCase(inject(IngredientsView), inject(INGREDIENTS_TOKEN)),
    },
    {
        provide: SearchIngredientsUseCase,
        useFactory: () => new SearchIngredientsUseCase(inject(IngredientsView)),
    },
]