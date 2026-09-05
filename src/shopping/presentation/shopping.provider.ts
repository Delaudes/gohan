import { inject, InjectionToken } from "@angular/core";
import { HTTP_TOKEN } from "../../infra/http/http.provider";
import { HttpShoppingAdapter } from "../adapters/http-shopping.adapter";
import { ShoppingPort } from "../shopping.port";
import { ShoppingView } from "../shopping.view";
import { AddKnownShoppingIngredientUseCase } from "../usecases/add-known-shopping-ingredient.usecase";
import { AddUnknownShoppingIngredientUseCase } from "../usecases/add-unknown-shopping-ingredient.usecase";
import { FetchIngredientOptionsUseCase } from "../usecases/fetch-ingredient-options.usecase";
import { FetchShoppingListUseCase } from "../usecases/fetch-shopping-list.usecase";
import { RemoveShoppingIngredientUseCase } from "../usecases/remove-shopping-ingredient.usecase";
import { SearchIngredientOptionsUseCase } from "../usecases/search-ingredient-options.usecase";
import { ToggleAddingShoppingIngredientUseCase } from "../usecases/toggle-adding-shopping-ingredient.usecase";
import { ToggleHideBoughtIngredientsUseCase } from "../usecases/toggle-hide-bought-ingredients.usecase";
import { UpdateShoppingIngredientBoughtUseCase } from "../usecases/update-shopping-ingredient-bought.usecase";

export const SHOPPING_TOKEN = new InjectionToken<ShoppingPort>('SHOPPING_TOKEN', {
    providedIn: 'root',
    factory: () => new HttpShoppingAdapter(inject(HTTP_TOKEN)),
});

export const SHOPPING_PROVIDERS = [
    {
        provide: ShoppingView,
        useFactory: () => new ShoppingView()
    },
    {
        provide: FetchShoppingListUseCase,
        useFactory: () => new FetchShoppingListUseCase(inject(ShoppingView), inject(SHOPPING_TOKEN)),
    },
    {
        provide: UpdateShoppingIngredientBoughtUseCase,
        useFactory: () => new UpdateShoppingIngredientBoughtUseCase(inject(ShoppingView), inject(SHOPPING_TOKEN)),
    },
    {
        provide: RemoveShoppingIngredientUseCase,
        useFactory: () => new RemoveShoppingIngredientUseCase(inject(ShoppingView), inject(SHOPPING_TOKEN)),
    },
    {
        provide: FetchIngredientOptionsUseCase,
        useFactory: () => new FetchIngredientOptionsUseCase(inject(ShoppingView), inject(SHOPPING_TOKEN)),
    },
    {
        provide: SearchIngredientOptionsUseCase,
        useFactory: () => new SearchIngredientOptionsUseCase(inject(ShoppingView)),
    },
    {
        provide: AddKnownShoppingIngredientUseCase,
        useFactory: () => new AddKnownShoppingIngredientUseCase(inject(ShoppingView), inject(SHOPPING_TOKEN)),
    },
    {
        provide: AddUnknownShoppingIngredientUseCase,
        useFactory: () => new AddUnknownShoppingIngredientUseCase(inject(ShoppingView), inject(SHOPPING_TOKEN)),
    },
    {
        provide: ToggleHideBoughtIngredientsUseCase,
        useFactory: () => new ToggleHideBoughtIngredientsUseCase(inject(ShoppingView)),
    },
    {
        provide: ToggleAddingShoppingIngredientUseCase,
        useFactory: () => new ToggleAddingShoppingIngredientUseCase(inject(ShoppingView)),
    },
]
