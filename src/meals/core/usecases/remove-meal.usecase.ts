import { Dialog } from "../../../presentation/dialog/dialog.port";
import { MealsPort } from "../meals.port";
import { MealsView } from "../meals.view";

export class RemoveMealUseCase {
    constructor(
        private readonly mealsView: MealsView,
        private readonly mealsPort: MealsPort,
    ) { }

    async execute(id: string, dialog: Dialog): Promise<void> {
        this.startLoading(id);
        try {
            await this.mealsPort.removeMeal(id);
            this.presentMealRemoved(id);
            dialog.close();
        } catch {
            this.presentError(id);
        } finally {
            this.stopLoading(id);
        }
    }

    private startLoading(id: string): void {
        const meals = this.mealsView.mealsViewModel.get().meals.map(meal =>
            meal.id === id ? { ...meal, isLoadingRemoving: true, isErrorRemoving: false } : meal
        );
        this.mealsView.update({ meals });
    }

    private stopLoading(id: string): void {
        const meals = this.mealsView.mealsViewModel.get().meals.map(meal =>
            meal.id === id ? { ...meal, isLoadingRemoving: false } : meal
        );
        this.mealsView.update({ meals });
    }

    private presentError(id: string): void {
        const meals = this.mealsView.mealsViewModel.get().meals.map(meal =>
            meal.id === id ? { ...meal, isErrorRemoving: true } : meal
        );
        this.mealsView.update({ meals });
    }

    private presentMealRemoved(id: string): void {
        const meals = this.mealsView.mealsViewModel.get().meals.filter(meal => meal.id !== id);
        this.mealsView.update({
            meals,
            hasMeals: meals.length > 0,
        });
    }
}
