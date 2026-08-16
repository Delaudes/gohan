import { MealsPort } from "../core/meals.port";
import { MealDetailDomainModel, MealDomainModel, MealIngredientDomainModel, MealsListDomainModel } from "../core/models/meals.domain.model";

const MEAL_NAMES: Record<string, string> = {
    '1': 'Pasta Carbonara',
    '2': 'Chili Con Carne',
    '3': 'Caesar Salad',
};

const MEAL_INGREDIENTS: Record<string, MealIngredientDomainModel[]> = {
    '1': [
        new MealIngredientDomainModel('1', 'Pâtes', true),
        new MealIngredientDomainModel('2', 'Lardons', false),
        new MealIngredientDomainModel('3', 'Œufs', false),
    ],
    '2': [],
    '3': [
        new MealIngredientDomainModel('5', 'Salade romaine', true),
        new MealIngredientDomainModel('6', 'Poulet', true),
        new MealIngredientDomainModel('7', 'Croûtons', false),
        new MealIngredientDomainModel('4', 'Parmesan', true),
    ],
};

export class InMemoryMealsAdapter implements MealsPort {
    async fetchMealsList(): Promise<MealsListDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (Math.random() < 0.33) {
            throw new Error('Failed to fetch meals list');
        }

        if (Math.random() < 0.66) {
            return new MealsListDomainModel([]);
        }

        const meals = [
            new MealDomainModel('1', 'Pasta Carbonara', false),
            new MealDomainModel('2', 'Chili Con Carne', false),
            new MealDomainModel('3', 'Caesar Salad', true),
        ];
        return new MealsListDomainModel(meals);
    }

    async fetchMeal(id: string): Promise<MealDetailDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (id === '3') {
            throw new Error('Failed to fetch meal');
        }

        return new MealDetailDomainModel(id, MEAL_NAMES[id] ?? 'Repas', true, MEAL_INGREDIENTS[id] ?? []);
    }

    async updateMeal(id: string, done: boolean): Promise<MealDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (id === '2') {
            throw new Error('Failed to update meal');
        }

        return new MealDomainModel(id, '', done);
    }

    async removeMeal(id: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (id === '1') {
            throw new Error('Failed to remove meal');
        }
    }

    async updateMealIngredient(mealId: string, ingredientId: string, bought: boolean): Promise<MealIngredientDomainModel> {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (ingredientId === '2') {
            throw new Error('Failed to update ingredient');
        }

        return new MealIngredientDomainModel(ingredientId, '', bought);
    }
}
