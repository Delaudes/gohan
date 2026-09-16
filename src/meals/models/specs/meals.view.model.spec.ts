import { MealOptionViewModel } from "../meal-option.view.model";
import { MealViewModel } from "../meal.view.model";
import { MealsViewModel } from "../meals.view.model";

describe('Meals list', () => {
    let viewModel: MealsViewModel;

    const meal = (id: string, name: string, done: boolean) => new MealViewModel({
        id,
        name,
        done,
        isLoadingUpdatingDone: false,
        isErrorUpdatingDone: false,
        isLoadingRemoving: false,
        isErrorRemoving: false,
        isExpanded: false,
        isLoadingIngredients: false,
        isErrorIngredients: false,
        ingredients: [],
    });

    const meals = [
        meal('1', 'Lasagna', false),
        meal('2', 'Pizza', true),
    ];

    const options = [
        new MealOptionViewModel({ id: '1', name: 'Lasagna' }),
        new MealOptionViewModel({ id: '3', name: 'Tacos' }),
    ];

    beforeEach(() => {
        viewModel = MealsViewModel.initial();
    });

    it('should have meals once fetched', () => {
        expect(viewModel.hasMeals).toEqual(false);

        viewModel = viewModel.presentMealsFetched(meals, []);

        expect(viewModel.hasMeals).toEqual(true);

        viewModel = viewModel.presentMealsFetched([], []);

        expect(viewModel.hasMeals).toEqual(false);
    });

    it('should filter out done meals only when they are hidden', () => {
        expect(viewModel.visibleMeals).toEqual([]);

        viewModel = viewModel.presentMealsFetched(meals, []);

        expect(viewModel.visibleMeals).toEqual(meals);

        viewModel = viewModel.presentHideDoneMeals(true);

        expect(viewModel.visibleMeals).toEqual([meals[0]]);
    });

    it('should compute the done meals progress, pluralizing only when there is more than one meal', () => {
        expect(viewModel.mealsProgress).toEqual('0/0 réalisé');

        viewModel = viewModel.presentMealsFetched(meals, []);

        expect(viewModel.mealsProgress).toEqual('1/2 réalisés');

        viewModel = viewModel.presentMealsFetched([meals[0]], []);

        expect(viewModel.mealsProgress).toEqual('0/1 réalisé');
    });

    it('should derive available meal options from the current meals list', () => {
        expect(viewModel.availableMealsOptions).toEqual([]);

        viewModel = viewModel.presentMealsFetched(meals, options);

        expect(viewModel.availableMealsOptions).toEqual([options[1]]);

        viewModel = viewModel.presentMealsFetched([], options);

        expect(viewModel.availableMealsOptions).toEqual(options);
    });

    it('should match an available option by a partial, diacritic-insensitive query, or nothing when the query is empty or unmatched', () => {
        expect(viewModel.matchingMealOption).toBeUndefined();

        viewModel = viewModel.presentMealsFetched([], options).presentSearchQuery(' àCo ');

        expect(viewModel.matchingMealOption).toEqual(options[1]);

        viewModel = viewModel.presentSearchQuery(' ');

        expect(viewModel.matchingMealOption).toBeUndefined();

        viewModel = viewModel.presentSearchQuery('non-existing');

        expect(viewModel.matchingMealOption).toBeUndefined();
    });
})
