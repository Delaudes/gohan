import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MealViewModel } from '../../../core/models/meal.view.model';
import { UpdateMealDoneUseCase } from '../../../core/usecases/update-meal-done.usecase';

@Component({
  selector: 'app-toggle-meal-done',
  imports: [],
  templateUrl: './toggle-meal-done.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleMealDoneComponent {
  readonly meal = input.required<MealViewModel>();

  protected readonly updateMealDone = inject(UpdateMealDoneUseCase);
}
