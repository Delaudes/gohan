import { inject, InjectionToken } from "@angular/core";
import { HttpMealsAdapter } from "../adapters/http-meals.adapter";
import { HTTP_TOKEN } from "../../infra/http/http.provider";
import { MealsPort } from "../meals.port";
import { MealsView } from "../meals.view";
import { FetchMealsUseCase } from "../usecases/fetch-meals.usecase";
import { FetchMealUseCase } from "../usecases/fetch-meal.usecase";
import { UpdateMealDoneUseCase } from "../usecases/update-meal-done.usecase";
import { UpdateMealIngredientBoughtUseCase } from "../usecases/update-meal-ingredient-bought.usecase";
import { RemoveMealUseCase } from "../usecases/remove-meal.usecase";
import { SearchMealsOptionsUseCase } from "../usecases/search-meals-options.usecase";
import { AddMealUseCase } from "../usecases/add-meal.usecase";
import { ToggleAddingMealUseCase } from "../usecases/toggle-adding-meal.usecase";
import { ToggleHideDoneMealsUseCase } from "../usecases/toggle-hide-done-meals.usecase";

export const MEALS_TOKEN = new InjectionToken<MealsPort>('MEALS_TOKEN', {
    providedIn: 'root',
    factory: () => new HttpMealsAdapter(inject(HTTP_TOKEN)),
});

export const MEALS_PROVIDERS = [
    {
        provide: MealsView,
        useFactory: () => new MealsView()
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
        provide: UpdateMealIngredientBoughtUseCase,
        useFactory: () => new UpdateMealIngredientBoughtUseCase(inject(MealsView), inject(MEALS_TOKEN)),
    },
    {
        provide: RemoveMealUseCase,
        useFactory: () => new RemoveMealUseCase(inject(MealsView), inject(MEALS_TOKEN)),
    },
    {
        provide: SearchMealsOptionsUseCase,
        useFactory: () => new SearchMealsOptionsUseCase(inject(MealsView)),
    },
    {
        provide: AddMealUseCase,
        useFactory: () => new AddMealUseCase(inject(MealsView), inject(MEALS_TOKEN)),
    },
    {
        provide: ToggleHideDoneMealsUseCase,
        useFactory: () => new ToggleHideDoneMealsUseCase(inject(MealsView)),
    },
    {
        provide: ToggleAddingMealUseCase,
        useFactory: () => new ToggleAddingMealUseCase(inject(MealsView)),
    },
]
