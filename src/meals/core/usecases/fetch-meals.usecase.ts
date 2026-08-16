import { MealsPort } from "../meals.port";
import { MealsView } from "../meals.view";
import { RecipesListDomainModel } from "../models/meals.domain.model";

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

    private presentMealsList(recipesList: RecipesListDomainModel): void {
        this.mealsView.update({
            meals: recipesList.getMeals().map(meal => ({
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
            hasMeals: recipesList.hasMeals(),
            mealsOptions: recipesList.getMealsOptions().map(option => ({
                id: option.id,
                name: option.name,
                isVisible: false,
            })),
            hasMealsOptions: recipesList.hasMealsOptions(),
        });
    }
}
