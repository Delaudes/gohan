import { inject, InjectionToken } from "@angular/core";
import { AngularSignalAdapter } from "../../infra/signal/angular-signal.adapter";
import { InMemoryShoppingAdapter } from "../adapters/in-memory-shopping.adapter";
import { ShoppingPort } from "../core/shopping.port";
import { ShoppingView } from "../core/shopping.view";
import { ShoppingViewModel } from "../core/models/shopping.view.model";
import { FetchShoppingListUseCase } from "../core/usecases/fetch-shopping-list.usecase";
import { UpdateShoppingIngredientBoughtUseCase } from "../core/usecases/update-shopping-ingredient-bought.usecase";
import { RemoveShoppingIngredientUseCase } from "../core/usecases/remove-shopping-ingredient.usecase";

export const SHOPPING_TOKEN = new InjectionToken<ShoppingPort>('SHOPPING_TOKEN', {
    providedIn: 'root',
    factory: () => new InMemoryShoppingAdapter(),
});

export const SHOPPING_PROVIDERS = [
    {
        provide: ShoppingView,
        useFactory: () => new ShoppingView(new AngularSignalAdapter<ShoppingViewModel>())
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
]
