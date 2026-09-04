import { MealsView } from "../meals.view";

export class ToggleAddingMealUseCase {
    constructor(
        private readonly mealsView: MealsView,
    ) { }

    execute(visible: boolean): void {
        this.mealsView.update(vm => vm.presentAddingMealVisible(visible).presentSearchQuery(''));
    }
}
