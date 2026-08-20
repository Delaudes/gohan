import { signal } from "@angular/core";
import { MealsViewModel } from "./models/meals.view.model";

export class MealsView {
    readonly mealsViewModel = signal<MealsViewModel>({
        isLoadingFetchingMeals: false,
        isErrorFetchingMeals: false,
        meals: [],
        hasMeals: false,
        mealsProgress: '',
        mealsOptions: [],
        hasMealsOptions: false,
        isLoadingAddingMeal: false,
        isErrorAddingMeal: false,
    });

    update(partial: Partial<MealsViewModel>): void {
        this.mealsViewModel.update(viewModel => ({ ...viewModel, ...partial }));
    }
}
