import { inject, InjectionToken } from "@angular/core";
import { HttpRecipesAdapter } from "../adapters/http-recipes.adapter";
import { HTTP_TOKEN } from "../../infra/http/http.provider";
import { RecipesPort } from "../recipes.port";
import { RecipesView } from "../recipes.view";
import { CreateRecipeUseCase } from "../usecases/create-recipe.usecase";
import { DeleteRecipeUseCase } from "../usecases/delete-recipe.usecase";
import { FetchRecipesUseCase } from "../usecases/fetch-recipes.usecase";
import { SearchRecipesUseCase } from "../usecases/search-recipes.usecase";
import { UpdateRecipeMealsListUseCase } from "../usecases/update-recipe-meals-list.usecase";

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
