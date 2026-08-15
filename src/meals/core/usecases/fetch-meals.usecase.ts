import { MealsPort } from "../meals.port";
import { MealsView } from "../meals.view";
import { MealsListDomainModel } from "../models/meals.domain.model";

export class FetchMealsUseCase {
    constructor(
        private readonly mealsView: MealsView,
        private readonly mealsPort: MealsPort,
    ) { }

    async execute(): Promise<void> {
        this.startLoading();
        try {
            const mealsList = await this.mealsPort.fetchMealsList();
            this.presentMealsList(mealsList);
        } catch {
            this.presentError();
        } finally {
            this.stopLoading();
        }
    }

    private startLoading(): void {
        this.mealsView.update({ isLoadingFetchingMeals: true, isErrorFetchingMeals: false });
    }

    private stopLoading(): void {
        this.mealsView.update({ isLoadingFetchingMeals: false });
    }

    private presentError(): void {
        this.mealsView.update({ isErrorFetchingMeals: true });
    }

    private presentMealsList(mealsList: MealsListDomainModel): void {
        this.mealsView.update({
            meals: mealsList.meals.map(meal => ({
                id: meal.id,
                name: meal.name,
                done: meal.done,
                isLoadingUpdatingDone: false,
                isErrorUpdatingDone: false,
                isLoadingRemoving: false,
                isErrorRemoving: false,
                isExpanded: false,
                isLoadingIngredients: false,
                isErrorIngredients: false,
                ingredients: [],
                hasIngredients: false,
            })),
            hasMeals: mealsList.hasMeals(),
        });
    }
}
