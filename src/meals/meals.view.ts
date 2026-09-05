import { signal } from "@angular/core";
import { MealsViewModel } from "./models/meals.view.model";

export class MealsView {
    private readonly state = signal<MealsViewModel>(MealsViewModel.initial());
    readonly mealsViewModel = this.state.asReadonly();

    update(fn: (vm: MealsViewModel) => MealsViewModel): void {
        this.state.update(fn);
    }
}
