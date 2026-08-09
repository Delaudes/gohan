import { inject, InjectionToken } from "@angular/core";
import { AngularSignalAdapter } from "../../infra/signal/angular-signal.adapter";
import { InMemoryRecipesAdapter } from "../adapters/in-memory-recipes.adapter";
import { RecipesPort } from "../core/recipes.port";
import { RecipesView } from "../core/recipes.view";
import { RecipesViewModel } from "../core/models/recipes.view.model";
import { CreateRecipeUseCase } from "../core/usecases/create-recipe.usecase";
import { DeleteRecipeUseCase } from "../core/usecases/delete-recipe.usecase";
import { FetchRecipesUseCase } from "../core/usecases/fetch-recipes.usecase";
import { UpdateRecipeMealsListUseCase } from "../core/usecases/update-recipe-meals-list.usecase";

export const RECIPES_TOKEN = new InjectionToken<RecipesPort>('RECIPES_TOKEN', {
    providedIn: 'root',
    factory: () => new InMemoryRecipesAdapter(),
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
]
