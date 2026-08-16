import { SignalPort } from "../../infra/signal/signal.port";
import { MealsViewModel } from "./models/meals.view.model";

export class MealsView {
    constructor(public readonly mealsViewModel: SignalPort<MealsViewModel>) {
        mealsViewModel.set({
            isLoadingFetchingMeals: false,
            isErrorFetchingMeals: false,
            meals: [],
            hasMeals: false,
            mealsOptions: [],
            hasMealsOptions: false,
            isLoadingAddingMeal: false,
            isErrorAddingMeal: false,
        });
    }

    update(partial: Partial<MealsViewModel>): void {
        this.mealsViewModel.update(viewModel => ({ ...viewModel, ...partial }));
    }
}
