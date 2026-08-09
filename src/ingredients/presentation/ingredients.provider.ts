import { inject, InjectionToken } from "@angular/core";
import { AngularSignalAdapter } from "../../infra/signal/angular-signal.adapter";
import { InMemoryIngredientsAdapter } from "../adapters/in-memory-ingredients.adapter";
import { IngredientsPort } from "../core/ingredients.port";
import { IngredientsView } from "../core/ingredients.view";
import { IngredientsViewModel } from "../core/models/ingredients.view.model";
import { CreateIngredientUseCase } from "../core/usecases/create-ingredient.usecase";
import { DeleteIngredientUseCase } from "../core/usecases/delete-ingredient.usecase";
import { FetchIngredientsUseCase } from "../core/usecases/fetch-ingredients.usecase";

export const INGREDIENTS_TOKEN = new InjectionToken<IngredientsPort>('INGREDIENTS_TOKEN', {
    providedIn: 'root',
    factory: () => new InMemoryIngredientsAdapter(),
});

export const INGREDIENTS_PROVIDERS = [
    {
        provide: IngredientsView,
        useFactory: () => new IngredientsView(new AngularSignalAdapter<IngredientsViewModel>())
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
]