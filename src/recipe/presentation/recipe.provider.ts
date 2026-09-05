import { inject, InjectionToken } from "@angular/core";
import { HttpRecipeAdapter } from "../adapters/http-recipe.adapter";
import { HTTP_TOKEN } from "../../infra/http/http.provider";
import { RecipePort } from "../recipe.port";
import { RecipeView } from "../recipe.view";
import { FetchRecipeUseCase } from "../usecases/fetch-recipe.usecase";
import { FetchIngredientOptionsUseCase } from "../usecases/fetch-ingredient-options.usecase";
import { SearchIngredientOptionsUseCase } from "../usecases/search-ingredient-options.usecase";
import { AddKnownRecipeIngredientUseCase } from "../usecases/add-known-recipe-ingredient.usecase";
import { AddUnknownRecipeIngredientUseCase } from "../usecases/add-unknown-recipe-ingredient.usecase";
import { RemoveRecipeIngredientUseCase } from "../usecases/remove-recipe-ingredient.usecase";
import { ToggleAddingRecipeIngredientUseCase } from "../usecases/toggle-adding-recipe-ingredient.usecase";
import { ROUTE_TOKEN } from "../../infra/route/route.provider";

export const RECIPE_TOKEN = new InjectionToken<RecipePort>('RECIPE_TOKEN', {
    providedIn: 'root',
    factory: () => new HttpRecipeAdapter(inject(HTTP_TOKEN)),
});

export const RECIPE_PROVIDERS = [
    {
        provide: RecipeView,
        useFactory: () => new RecipeView()
    },
    {
        provide: FetchRecipeUseCase,
        useFactory: () => new FetchRecipeUseCase(inject(RecipeView), inject(RECIPE_TOKEN), inject(ROUTE_TOKEN)),
    },
    {
        provide: FetchIngredientOptionsUseCase,
        useFactory: () => new FetchIngredientOptionsUseCase(inject(RecipeView), inject(RECIPE_TOKEN)),
    },
    {
        provide: SearchIngredientOptionsUseCase,
        useFactory: () => new SearchIngredientOptionsUseCase(inject(RecipeView)),
    },
    {
        provide: AddKnownRecipeIngredientUseCase,
        useFactory: () => new AddKnownRecipeIngredientUseCase(inject(RecipeView), inject(RECIPE_TOKEN), inject(ROUTE_TOKEN)),
    },
    {
        provide: AddUnknownRecipeIngredientUseCase,
        useFactory: () => new AddUnknownRecipeIngredientUseCase(inject(RecipeView), inject(RECIPE_TOKEN), inject(ROUTE_TOKEN)),
    },
    {
        provide: RemoveRecipeIngredientUseCase,
        useFactory: () => new RemoveRecipeIngredientUseCase(inject(RecipeView), inject(RECIPE_TOKEN), inject(ROUTE_TOKEN)),
    },
    {
        provide: ToggleAddingRecipeIngredientUseCase,
        useFactory: () => new ToggleAddingRecipeIngredientUseCase(inject(RecipeView)),
    },
]
