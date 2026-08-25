import { inject, InjectionToken } from "@angular/core";
import { InMemoryRecipeAdapter } from "../adapters/in-memory-recipe.adapter";
import { RecipePort } from "../core/recipe.port";
import { RecipeView } from "../core/recipe.view";
import { FetchRecipeUseCase } from "../core/usecases/fetch-recipe.usecase";
import { FetchIngredientOptionsUseCase } from "../core/usecases/fetch-ingredient-options.usecase";
import { SearchIngredientOptionsUseCase } from "../core/usecases/search-ingredient-options.usecase";
import { AddKnownRecipeIngredientUseCase } from "../core/usecases/add-known-recipe-ingredient.usecase";
import { AddUnknownRecipeIngredientUseCase } from "../core/usecases/add-unknown-recipe-ingredient.usecase";
import { RemoveRecipeIngredientUseCase } from "../core/usecases/remove-recipe-ingredient.usecase";
import { ROUTE_TOKEN } from "../../infra/route/route.provider";

export const RECIPE_TOKEN = new InjectionToken<RecipePort>('RECIPE_TOKEN', {
    providedIn: 'root',
    factory: () => new InMemoryRecipeAdapter(),
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
]
