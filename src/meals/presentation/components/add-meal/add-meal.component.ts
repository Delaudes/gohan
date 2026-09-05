import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ClearWhenDirective } from '../../../../shared/directives/clear-when.directive';
import { FocusWhenDirective } from '../../../../shared/directives/focus-when.directive';
import { MealsView } from '../../../meals.view';
import { AddMealUseCase } from '../../../usecases/add-meal.usecase';
import { SearchMealsOptionsUseCase } from '../../../usecases/search-meals-options.usecase';
import { ToggleAddingMealUseCase } from '../../../usecases/toggle-adding-meal.usecase';

@Component({
  selector: 'app-add-meal',
  imports: [FocusWhenDirective, ClearWhenDirective],
  templateUrl: './add-meal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMealComponent {
  protected readonly viewModel = inject(MealsView).mealsViewModel;
  protected readonly addMeal = inject(AddMealUseCase);
  protected readonly searchMealsOptions = inject(SearchMealsOptionsUseCase);
  protected readonly toggleAddingMeal = inject(ToggleAddingMealUseCase);
}
