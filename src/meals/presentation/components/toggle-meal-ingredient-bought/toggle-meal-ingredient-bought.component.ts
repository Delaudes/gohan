import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MealIngredientViewModel } from '../../../models/meal-ingredient.view.model';
import { UpdateMealIngredientBoughtUseCase } from '../../../usecases/update-meal-ingredient-bought.usecase';

@Component({
  selector: 'app-toggle-meal-ingredient-bought',
  imports: [],
  templateUrl: './toggle-meal-ingredient-bought.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleMealIngredientBoughtComponent {
  readonly mealId = input.required<string>();
  readonly ingredient = input.required<MealIngredientViewModel>();

  protected readonly updateMealIngredientBought = inject(UpdateMealIngredientBoughtUseCase);
}
