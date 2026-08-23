import { signal } from "@angular/core";
import { RecipesViewModel } from "./models/recipes.view.model";

export class RecipesView {
    private readonly state = signal<RecipesViewModel>(RecipesViewModel.initial());
    readonly recipesViewModel = this.state.asReadonly();

    update(fn: (vm: RecipesViewModel) => RecipesViewModel): void {
        this.state.update(fn);
    }
}
