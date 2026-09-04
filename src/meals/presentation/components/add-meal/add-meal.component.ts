import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FocusOnVisibleDirective } from '../../../../presentation/field/focus-on-visible.directive';
import { MealsView } from '../../../core/meals.view';
import { AddMealUseCase } from '../../../core/usecases/add-meal.usecase';
import { SearchMealsOptionsUseCase } from '../../../core/usecases/search-meals-options.usecase';
import { ToggleAddingMealUseCase } from '../../../core/usecases/toggle-adding-meal.usecase';

@Component({
  selector: 'app-add-meal',
  imports: [FocusOnVisibleDirective],
  templateUrl: './add-meal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMealComponent {
  protected readonly viewModel = inject(MealsView).mealsViewModel;
  protected readonly addMeal = inject(AddMealUseCase);
  protected readonly searchMealsOptions = inject(SearchMealsOptionsUseCase);
  protected readonly toggleAddingMeal = inject(ToggleAddingMealUseCase);
}
