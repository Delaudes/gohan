import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MealsView } from '../../../core/meals.view';
import { AddMealUseCase } from '../../../core/usecases/add-meal.usecase';
import { SearchMealsOptionsUseCase } from '../../../core/usecases/search-meals-options.usecase';

@Component({
  selector: 'app-add-meal',
  imports: [],
  templateUrl: './add-meal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMealComponent {
  protected readonly viewModel = inject(MealsView).mealsViewModel;
  protected readonly addMeal = inject(AddMealUseCase);
  protected readonly searchMealsOptions = inject(SearchMealsOptionsUseCase);
}
