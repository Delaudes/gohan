import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { IngredientViewModel } from '../../../core/models/ingredients.view.model';
import { UpdateIngredientShoppingListUseCase } from '../../../core/usecases/update-ingredient-shopping-list.usecase';

@Component({
  selector: 'app-toggle-shopping-list',
  imports: [],
  templateUrl: './toggle-shopping-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleShoppingListComponent {
  readonly ingredient = input.required<IngredientViewModel>();

  protected readonly updateIngredientShoppingList = inject(UpdateIngredientShoppingListUseCase);
}
