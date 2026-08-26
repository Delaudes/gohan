import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MealViewModel } from '../../../core/models/meal.view.model';
import { RemoveMealUseCase } from '../../../core/usecases/remove-meal.usecase';

@Component({
  selector: 'app-remove-meal',
  imports: [],
  templateUrl: './remove-meal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveMealComponent {
  readonly meal = input.required<MealViewModel>();

  protected readonly removeMeal = inject(RemoveMealUseCase);
}
