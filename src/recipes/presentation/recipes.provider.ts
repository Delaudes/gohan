import { inject, InjectionToken } from "@angular/core";
import { HttpRecipesAdapter } from "../adapters/http-recipes.adapter";
import { HTTP_TOKEN } from "../../infra/http/http.provider";
import { RecipesPort } from "../core/recipes.port";
import { RecipesView } from "../core/recipes.view";
import { CreateRecipeUseCase } from "../core/usecases/create-recipe.usecase";
import { DeleteRecipeUseCase } from "../core/usecases/delete-recipe.usecase";
import { FetchRecipesUseCase } from "../core/usecases/fetch-recipes.usecase";
import { SearchRecipesUseCase } from "../core/usecases/search-recipes.usecase";
import { UpdateRecipeMealsListUseCase } from "../core/usecases/update-recipe-meals-list.usecase";

export const RECIPES_TOKEN = new InjectionToken<RecipesPort>('RECIPES_TOKEN', {
    providedIn: 'root',
    factory: () => new HttpRecipesAdapter(inject(HTTP_TOKEN)),
});

export const RECIPES_PROVIDERS = [
    {
        provide: RecipesView,
        useFactory: () => new RecipesView()
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
        provide: SearchRecipesUseCase,
        useFactory: () => new SearchRecipesUseCase(inject(RecipesView)),
    },
]
