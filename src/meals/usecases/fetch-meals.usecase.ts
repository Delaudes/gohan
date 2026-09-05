import { MealsPort } from "../meals.port";
import { MealsView } from "../meals.view";
import { RecipesListDomainModel } from "../models/meals.domain.model";
import { MealOptionViewModel } from "../models/meal-option.view.model";
import { MealViewModel } from "../models/meal.view.model";

export class FetchMealsUseCase {
    constructor(
        private readonly mealsView: MealsView,
        private readonly mealsPort: MealsPort,
    ) { }

    async execute(): Promise<void> {
        this.mealsView.update(vm => vm.startLoadingFetchingMeals());
        try {
            const recipesList = await this.mealsPort.fetchRecipesList();
            this.presentMealsFetched(recipesList);
        } catch {
            this.mealsView.update(vm => vm.presentErrorFetchingMeals());
        } finally {
            this.mealsView.update(vm => vm.stopLoadingFetchingMeals());
        }
    }

    private presentMealsFetched(recipesList: RecipesListDomainModel): void {
        const meals = recipesList.recipes
            .filter(recipe => recipe.inMealsList)
            .map(recipe => new MealViewModel({
                id: recipe.id,
                name: recipe.name,
                done: recipe.done,
                isLoadingUpdatingDone: false,
                isErrorUpdatingDone: false,
                isLoadingRemoving: false,
                isErrorRemoving: false,
                isExpanded: false,
                isLoadingIngredients: false,
                isErrorIngredients: false,
                ingredients: [],
            }));
        const mealsOptions = recipesList.recipes
            .map(recipe => new MealOptionViewModel({
                id: recipe.id,
                name: recipe.name,
            }));
        this.mealsView.update(vm => vm.presentMealsFetched(meals, mealsOptions));
    }
}
