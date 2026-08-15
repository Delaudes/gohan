import { MealsPort } from "../meals.port";
import { MealsView } from "../meals.view";
import { MealDomainModel } from "../models/meals.domain.model";

export class UpdateMealDoneUseCase {
    constructor(
        private readonly mealsView: MealsView,
        private readonly mealsPort: MealsPort,
    ) { }

    async execute(id: string, done: boolean): Promise<void> {
        this.startLoading(id);
        try {
            const meal = await this.mealsPort.updateMealDone(id, done);
            this.presentMealUpdated(meal);
        } catch {
            this.presentError(id);
        } finally {
            this.stopLoading(id);
        }
    }

    private startLoading(id: string): void {
        const meals = this.mealsView.mealsViewModel.get().meals.map(meal =>
            meal.id === id ? { ...meal, isLoadingUpdatingDone: true, isErrorUpdatingDone: false } : meal
        );
        this.mealsView.update({ meals });
    }

    private stopLoading(id: string): void {
        const meals = this.mealsView.mealsViewModel.get().meals.map(meal =>
            meal.id === id ? { ...meal, isLoadingUpdatingDone: false } : meal
        );
        this.mealsView.update({ meals });
    }

    private presentError(id: string): void {
        const meals = this.mealsView.mealsViewModel.get().meals.map(meal =>
            meal.id === id ? { ...meal, isErrorUpdatingDone: true } : meal
        );
        this.mealsView.update({ meals });
    }

    private presentMealUpdated(meal: MealDomainModel): void {
        const meals = this.mealsView.mealsViewModel.get().meals.map(current =>
            meal.is(current.id) ? { ...current, done: meal.done } : current
        );
        this.mealsView.update({ meals });
    }
}
