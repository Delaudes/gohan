import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RecipeViewModel } from '../../../core/models/recipes.view.model';
import { UpdateRecipeMealsListUseCase } from '../../../core/usecases/update-recipe-meals-list.usecase';

@Component({
  selector: 'app-toggle-recipe-meals-list',
  imports: [],
  templateUrl: './toggle-recipe-meals-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleRecipeMealsListComponent {
  readonly recipe = input.required<RecipeViewModel>();

  protected readonly updateRecipeMealsList = inject(UpdateRecipeMealsListUseCase);
}
