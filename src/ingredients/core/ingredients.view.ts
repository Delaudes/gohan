import { signal } from "@angular/core";
import { IngredientsViewModel } from "./models/ingredients.view.model";

export class IngredientsView {
    private readonly state = signal<IngredientsViewModel>(IngredientsViewModel.initial());
    readonly ingredientsViewModel = this.state.asReadonly();

    update(fn: (vm: IngredientsViewModel) => IngredientsViewModel): void {
        this.state.update(fn);
    }
}
