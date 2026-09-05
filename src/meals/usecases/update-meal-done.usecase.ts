import { MealsPort } from "../meals.port";
import { MealsView } from "../meals.view";

export class UpdateMealDoneUseCase {
    constructor(
        private readonly mealsView: MealsView,
        private readonly mealsPort: MealsPort,
    ) { }

    async execute(id: string, done: boolean): Promise<void> {
        this.mealsView.update(vm => vm.startLoadingUpdatingDoneMeal(id));
        try {
            const meal = await this.mealsPort.updateMeal(id, done);
            this.mealsView.update(vm => vm.presentMealUpdated(meal.id, meal.done));
        } catch {
            this.mealsView.update(vm => vm.presentErrorUpdatingDoneMeal(id));
        } finally {
            this.mealsView.update(vm => vm.stopLoadingUpdatingDoneMeal(id));
        }
    }
}
