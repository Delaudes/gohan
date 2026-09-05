import { MealsView } from "../meals.view";

export class ToggleHideDoneMealsUseCase {
    constructor(
        private readonly mealsView: MealsView,
    ) { }

    execute(hide: boolean): void {
        this.mealsView.update(vm => vm.presentHideDoneMeals(hide));
    }
}
