import { inject, InjectionToken } from "@angular/core";
import { AngularSignalAdapter } from "../../infra/signal/angular-signal.adapter";
import { InMemoryMealsAdapter } from "../adapters/in-memory-meals.adapter";
import { MealsPort } from "../core/meals.port";
import { MealsView } from "../core/meals.view";
import { MealsViewModel } from "../core/models/meals.view.model";
import { FetchMealsUseCase } from "../core/usecases/fetch-meals.usecase";
import { FetchMealUseCase } from "../core/usecases/fetch-meal.usecase";
import { UpdateMealDoneUseCase } from "../core/usecases/update-meal-done.usecase";
import { UpdateIngredientBoughtUseCase } from "../core/usecases/update-ingredient-bought.usecase";
import { RemoveMealUseCase } from "../core/usecases/remove-meal.usecase";

export const MEALS_TOKEN = new InjectionToken<MealsPort>('MEALS_TOKEN', {
    providedIn: 'root',
    factory: () => new InMemoryMealsAdapter(),
});

export const MEALS_PROVIDERS = [
    {
        provide: MealsView,
        useFactory: () => new MealsView(new AngularSignalAdapter<MealsViewModel>())
    },
    {
        provide: FetchMealsUseCase,
        useFactory: () => new FetchMealsUseCase(inject(MealsView), inject(MEALS_TOKEN)),
    },
    {
        provide: FetchMealUseCase,
        useFactory: () => new FetchMealUseCase(inject(MealsView), inject(MEALS_TOKEN)),
    },
    {
        provide: UpdateMealDoneUseCase,
        useFactory: () => new UpdateMealDoneUseCase(inject(MealsView), inject(MEALS_TOKEN)),
    },
    {
        provide: UpdateIngredientBoughtUseCase,
        useFactory: () => new UpdateIngredientBoughtUseCase(inject(MealsView), inject(MEALS_TOKEN)),
    },
    {
        provide: RemoveMealUseCase,
        useFactory: () => new RemoveMealUseCase(inject(MealsView), inject(MEALS_TOKEN)),
    },
]
