import { MealIngredientViewModel } from "./meal-ingredient.view.model";
import { MealOptionViewModel } from "./meal-option.view.model";
import { MealViewModel } from "./meal.view.model";
import { normalizeSearchText } from "../../shared/utils/normalize-search-text.utils";

type MealsProps = {
    isLoadingFetchingMeals: boolean;
    isErrorFetchingMeals: boolean;
    meals: MealViewModel[];
    mealsOptions: MealOptionViewModel[];
    mealsSearchQuery: string;
    isLoadingAddingMeal: boolean;
    isErrorAddingMeal: boolean;
    isSuccessAddingMeal: boolean;
    hideDoneMeals: boolean;
    isAddingMealVisible: boolean;
}

export class MealsViewModel {
    readonly isLoadingFetchingMeals: boolean;
    readonly isErrorFetchingMeals: boolean;
    readonly meals: MealViewModel[];
    readonly mealsOptions: MealOptionViewModel[];
    readonly mealsSearchQuery: string;
    readonly isLoadingAddingMeal: boolean;
    readonly isErrorAddingMeal: boolean;
    readonly isSuccessAddingMeal: boolean;
    readonly hideDoneMeals: boolean;
    readonly isAddingMealVisible: boolean;

    constructor(props: MealsProps) {
        this.isLoadingFetchingMeals = props.isLoadingFetchingMeals;
        this.isErrorFetchingMeals = props.isErrorFetchingMeals;
        this.meals = props.meals;
        this.mealsOptions = props.mealsOptions;
        this.mealsSearchQuery = props.mealsSearchQuery;
        this.isLoadingAddingMeal = props.isLoadingAddingMeal;
        this.isErrorAddingMeal = props.isErrorAddingMeal;
        this.isSuccessAddingMeal = props.isSuccessAddingMeal;
        this.hideDoneMeals = props.hideDoneMeals;
        this.isAddingMealVisible = props.isAddingMealVisible;
    }

    static initial(): MealsViewModel {
        return new MealsViewModel({
            isLoadingFetchingMeals: false,
            isErrorFetchingMeals: false,
            meals: [],
            mealsOptions: [],
            mealsSearchQuery: '',
            isLoadingAddingMeal: false,
            isErrorAddingMeal: false,
            isSuccessAddingMeal: false,
            hideDoneMeals: false,
            isAddingMealVisible: false,
        });
    }

    hasMeals(): boolean {
        return this.meals.length > 0;
    }

    visibleMeals(): MealViewModel[] {
        return this.hideDoneMeals
            ? this.meals.filter(meal => !meal.done)
            : this.meals;
    }

    mealsProgress(): string {
        const doneCount = this.meals.filter(meal => meal.done).length;
        const count = this.meals.length;
        return `${doneCount}/${count} réalisé${count > 1 ? 's' : ''}`;
    }

    availableMealsOptions(): MealOptionViewModel[] {
        return this.mealsOptions.filter(option => this.meals.every(meal => option.isNot(meal.id)));
    }

    matchingMealOption(): MealOptionViewModel | undefined {
        const normalizedQuery = normalizeSearchText(this.mealsSearchQuery);
        if (!normalizedQuery) return undefined;
        return this.availableMealsOptions().find(option => option.matches(normalizedQuery));
    }

    isMealExpanded(id: string): boolean {
        return this.meals.find(meal => meal.is(id))?.isExpanded ?? false;
    }

    private with(partial: Partial<MealsProps>): MealsViewModel {
        return new MealsViewModel({
            ...this,
            ...partial,
        });
    }

    private mapMeal(fn: (meal: MealViewModel) => MealViewModel): MealsViewModel {
        return this.with({
            meals: this.meals.map(fn),
        });
    }

    private sortMeals(meals: MealViewModel[]): MealViewModel[] {
        return [...meals].sort((a, b) => a.name.localeCompare(b.name, 'fr'));
    }

    startLoadingFetchingMeals(): MealsViewModel {
        return this.with({
            isLoadingFetchingMeals: true,
            isErrorFetchingMeals: false,
        });
    }

    stopLoadingFetchingMeals(): MealsViewModel {
        return this.with({
            isLoadingFetchingMeals: false,
        });
    }

    presentErrorFetchingMeals(): MealsViewModel {
        return this.with({
            isErrorFetchingMeals: true,
        });
    }

    presentMealsFetched(meals: MealViewModel[], mealsOptions: MealOptionViewModel[]): MealsViewModel {
        return this.with({
            meals: this.sortMeals(meals),
            mealsOptions,
        });
    }

    presentSearchQuery(mealsSearchQuery: string): MealsViewModel {
        return this.with({ mealsSearchQuery });
    }

    presentHideDoneMeals(hide: boolean): MealsViewModel {
        return this.with({ hideDoneMeals: hide });
    }

    presentAddingMealVisible(visible: boolean): MealsViewModel {
        return this.with({ isAddingMealVisible: visible });
    }

    startLoadingAddingMeal(): MealsViewModel {
        return this.with({
            isLoadingAddingMeal: true,
            isErrorAddingMeal: false,
            isSuccessAddingMeal: false,
        });
    }

    stopLoadingAddingMeal(): MealsViewModel {
        return this.with({
            isLoadingAddingMeal: false,
        });
    }

    presentErrorAddingMeal(): MealsViewModel {
        return this.with({
            isErrorAddingMeal: true,
        });
    }

    presentMealAdded(meal: MealViewModel): MealsViewModel {
        return this.with({
            meals: this.sortMeals([...this.meals, meal]),
            isSuccessAddingMeal: true,
        });
    }

    startLoadingRemovingMeal(id: string): MealsViewModel {
        return this.mapMeal(meal => meal.startLoadingRemovingMeal(id));
    }

    stopLoadingRemovingMeal(id: string): MealsViewModel {
        return this.mapMeal(meal => meal.stopLoadingRemovingMeal(id));
    }

    presentErrorRemovingMeal(id: string): MealsViewModel {
        return this.mapMeal(meal => meal.presentErrorRemovingMeal(id));
    }

    presentMealRemoved(id: string): MealsViewModel {
        const meals = this.meals.filter(meal => meal.isNot(id));
        return this.with({
            meals,
        });
    }

    startLoadingUpdatingDoneMeal(id: string): MealsViewModel {
        return this.mapMeal(meal => meal.startLoadingUpdatingDoneMeal(id));
    }

    stopLoadingUpdatingDoneMeal(id: string): MealsViewModel {
        return this.mapMeal(meal => meal.stopLoadingUpdatingDoneMeal(id));
    }

    presentErrorUpdatingDoneMeal(id: string): MealsViewModel {
        return this.mapMeal(meal => meal.presentErrorUpdatingDoneMeal(id));
    }

    presentMealUpdated(id: string, done: boolean): MealsViewModel {
        return this.mapMeal(meal => meal.presentMealUpdated(id, done));
    }

    startLoadingFetchingIngredients(id: string): MealsViewModel {
        return this.mapMeal(meal => meal.startLoadingFetchingIngredients(id));
    }

    stopLoadingFetchingIngredients(id: string): MealsViewModel {
        return this.mapMeal(meal => meal.stopLoadingFetchingIngredients(id));
    }

    presentErrorFetchingIngredients(id: string): MealsViewModel {
        return this.mapMeal(meal => meal.presentErrorFetchingIngredients(id));
    }

    presentIngredientsFetched(id: string, ingredients: MealIngredientViewModel[]): MealsViewModel {
        return this.mapMeal(meal => meal.presentIngredientsFetched(id, ingredients));
    }

    presentCollapsed(id: string): MealsViewModel {
        return this.mapMeal(meal => meal.presentCollapsed(id));
    }

    startLoadingUpdatingBoughtIngredient(mealId: string, ingredientId: string): MealsViewModel {
        return this.mapMeal(meal => meal.startLoadingUpdatingBoughtIngredient(mealId, ingredientId));
    }

    stopLoadingUpdatingBoughtIngredient(mealId: string, ingredientId: string): MealsViewModel {
        return this.mapMeal(meal => meal.stopLoadingUpdatingBoughtIngredient(mealId, ingredientId));
    }

    presentErrorUpdatingBoughtIngredient(mealId: string, ingredientId: string): MealsViewModel {
        return this.mapMeal(meal => meal.presentErrorUpdatingBoughtIngredient(mealId, ingredientId));
    }

    presentIngredientUpdated(mealId: string, ingredientId: string, bought: boolean): MealsViewModel {
        return this.mapMeal(meal => meal.presentIngredientUpdated(mealId, ingredientId, bought));
    }
}
