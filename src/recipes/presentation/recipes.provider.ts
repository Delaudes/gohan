import { inject, InjectionToken } from "@angular/core";
import { AngularSignalAdapter } from "../../infra/signal/angular-signal.adapter";
import { InMemoryRecipesAdapter } from "../adapters/in-memory-recipes.adapter";
import { InMemoryRecipeIngredientsAdapter } from "../adapters/in-memory-recipe-ingredients.adapter";
import { RecipesPort } from "../core/recipes.port";
import { RecipeIngredientsPort } from "../core/recipe-ingredients.port";
import { RecipesView } from "../core/recipes.view";
import { RecipeView } from "../core/recipe.view";
import { RecipesViewModel } from "../core/models/recipes.view.model";
import { RecipeDetailViewModel } from "../core/models/recipe.view.model";
import { CreateRecipeUseCase } from "../core/usecases/create-recipe.usecase";
import { DeleteRecipeUseCase } from "../core/usecases/delete-recipe.usecase";
import { FetchRecipesUseCase } from "../core/usecases/fetch-recipes.usecase";
import { FetchRecipeUseCase } from "../core/usecases/fetch-recipe.usecase";
import { UpdateRecipeMealsListUseCase } from "../core/usecases/update-recipe-meals-list.usecase";
import { SearchRecipeIngredientsOptionsUseCase } from "../core/usecases/search-recipe-ingredients-options.usecase";
import { AddKnownRecipeIngredientUseCase } from "../core/usecases/add-known-recipe-ingredient.usecase";
import { AddUnknownRecipeIngredientUseCase } from "../core/usecases/add-unknown-recipe-ingredient.usecase";
import { RemoveRecipeIngredientUseCase } from "../core/usecases/remove-recipe-ingredient.usecase";
import { ROUTE_TOKEN } from "../../infra/route/route.provider";

export const RECIPES_TOKEN = new InjectionToken<RecipesPort>('RECIPES_TOKEN', {
    providedIn: 'root',
    factory: () => new InMemoryRecipesAdapter(),
});

export const RECIPE_INGREDIENTS_TOKEN = new InjectionToken<RecipeIngredientsPort>('RECIPE_INGREDIENTS_TOKEN', {
    providedIn: 'root',
    factory: () => new InMemoryRecipeIngredientsAdapter(),
});

export const RECIPES_PROVIDERS = [
    {
        provide: RecipesView,
        useFactory: () => new RecipesView(new AngularSignalAdapter<RecipesViewModel>())
    },
    {
        provide: FetchRecipesUseCase,
        useFactory: () => new FetchRecipesUseCase(inject(RecipesView), inject(RECIPES_TOKEN)),
    },
    {
        provide: DeleteRecipeUseCase,
        useFactory: () => new DeleteRecipeUseCase(inject(RecipesView), inject(RECIPES_TOKEN)),
    },
    {
        provide: CreateRecipeUseCase,
        useFactory: () => new CreateRecipeUseCase(inject(RecipesView), inject(RECIPES_TOKEN)),
    },
    {
        provide: UpdateRecipeMealsListUseCase,
        useFactory: () => new UpdateRecipeMealsListUseCase(inject(RecipesView), inject(RECIPES_TOKEN)),
    },
    {
        provide: RecipeView,
        useFactory: () => new RecipeView(new AngularSignalAdapter<RecipeDetailViewModel>())
    },
    {
        provide: FetchRecipeUseCase,
        useFactory: () => new FetchRecipeUseCase(inject(RecipeView), inject(RECIPES_TOKEN), inject(ROUTE_TOKEN)),
    },
    {
        provide: SearchRecipeIngredientsOptionsUseCase,
        useFactory: () => new SearchRecipeIngredientsOptionsUseCase(inject(RecipeView), inject(RECIPE_INGREDIENTS_TOKEN)),
    },
    {
        provide: AddKnownRecipeIngredientUseCase,
        useFactory: () => new AddKnownRecipeIngredientUseCase(inject(RecipeView), inject(RECIPE_INGREDIENTS_TOKEN), inject(ROUTE_TOKEN)),
    },
    {
        provide: AddUnknownRecipeIngredientUseCase,
        useFactory: () => new AddUnknownRecipeIngredientUseCase(inject(RecipeView), inject(RECIPE_INGREDIENTS_TOKEN), inject(ROUTE_TOKEN)),
    },
    {
        provide: RemoveRecipeIngredientUseCase,
        useFactory: () => new RemoveRecipeIngredientUseCase(inject(RecipeView), inject(RECIPE_INGREDIENTS_TOKEN), inject(ROUTE_TOKEN)),
    },
]
