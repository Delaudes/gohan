import { MealsPort } from "../meals.port";
import { MealsView } from "../meals.view";

export class RemoveMealUseCase {
    constructor(
        private readonly mealsView: MealsView,
        private readonly mealsPort: MealsPort,
    ) { }

    async execute(id: string): Promise<void> {
        this.mealsView.update(vm => vm.startLoadingRemovingMeal(id));
        try {
            await this.mealsPort.removeMeal(id);
            this.mealsView.update(vm => vm.presentMealRemoved(id));
        } catch {
            this.mealsView.update(vm => vm.presentErrorRemovingMeal(id));
        } finally {
            this.mealsView.update(vm => vm.stopLoadingRemovingMeal(id));
        }
    }
}
