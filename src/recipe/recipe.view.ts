import { signal } from "@angular/core";
import { RecipeViewModel } from "./models/recipe.view.model";

export class RecipeView {
    private readonly state = signal<RecipeViewModel>(RecipeViewModel.initial());
    readonly recipeViewModel = this.state.asReadonly();

    update(fn: (vm: RecipeViewModel) => RecipeViewModel): void {
        this.state.update(fn);
    }
}
