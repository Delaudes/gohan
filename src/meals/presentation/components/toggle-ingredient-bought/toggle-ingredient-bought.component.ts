import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MealIngredientViewModel } from '../../../core/models/meals.view.model';
import { UpdateIngredientBoughtUseCase } from '../../../core/usecases/update-ingredient-bought.usecase';

@Component({
  selector: 'app-toggle-ingredient-bought',
  imports: [],
  templateUrl: './toggle-ingredient-bought.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleIngredientBoughtComponent {
  readonly mealId = input.required<string>();
  readonly ingredient = input.required<MealIngredientViewModel>();

  protected readonly updateIngredientBought = inject(UpdateIngredientBoughtUseCase);
}
