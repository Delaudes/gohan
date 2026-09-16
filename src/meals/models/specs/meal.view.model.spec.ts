import { MealIngredientViewModel } from "../meal-ingredient.view.model";
import { MealViewModel } from "../meal.view.model";

describe('Meal ingredients', () => {
    let meal: MealViewModel;

    const ingredients = [
        new MealIngredientViewModel({
            id: '1',
            name: 'Ingredient 1',
            bought: false,
            isLoadingUpdatingBought: false,
            isErrorUpdatingBought: false,
        }),
    ];

    beforeEach(() => {
        meal = new MealViewModel({
            id: '1',
            name: 'Meal 1',
            done: false,
            isLoadingUpdatingDone: false,
            isErrorUpdatingDone: false,
            isLoadingRemoving: false,
            isErrorRemoving: false,
            isExpanded: false,
            isLoadingIngredients: false,
            isErrorIngredients: false,
            ingredients: [],
        });
    });

    it('should have ingredients once fetched', () => {
        expect(meal.hasIngredients).toEqual(false);

        meal = meal.presentIngredientsFetched('1', ingredients);

        expect(meal.hasIngredients).toEqual(true);

        meal = meal.presentIngredientsFetched('1', []);

        expect(meal.hasIngredients).toEqual(false);
    });
})
