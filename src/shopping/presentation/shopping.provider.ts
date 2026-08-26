import { inject, InjectionToken } from "@angular/core";
import { InMemoryShoppingAdapter } from "../adapters/in-memory-shopping.adapter";
import { ShoppingPort } from "../core/shopping.port";
import { ShoppingView } from "../core/shopping.view";
import { FetchShoppingListUseCase } from "../core/usecases/fetch-shopping-list.usecase";
import { UpdateShoppingIngredientBoughtUseCase } from "../core/usecases/update-shopping-ingredient-bought.usecase";
import { RemoveShoppingIngredientUseCase } from "../core/usecases/remove-shopping-ingredient.usecase";
import { FetchIngredientOptionsUseCase } from "../core/usecases/fetch-ingredient-options.usecase";
import { SearchIngredientOptionsUseCase } from "../core/usecases/search-ingredient-options.usecase";
import { AddKnownShoppingIngredientUseCase } from "../core/usecases/add-known-shopping-ingredient.usecase";
import { AddUnknownShoppingIngredientUseCase } from "../core/usecases/add-unknown-shopping-ingredient.usecase";

export const SHOPPING_TOKEN = new InjectionToken<ShoppingPort>('SHOPPING_TOKEN', {
    providedIn: 'root',
    factory: () => new InMemoryShoppingAdapter(),
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
]
