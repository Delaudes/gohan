import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { IngredientViewModel } from '../../../models/ingredient.view.model';
import { UpdateIngredientShoppingListUseCase } from '../../../usecases/update-ingredient-shopping-list.usecase';

@Component({
  selector: 'app-toggle-ingredient-shopping-list',
  imports: [],
  templateUrl: './toggle-ingredient-shopping-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleIngredientShoppingListComponent {
  readonly ingredient = input.required<IngredientViewModel>();

  protected readonly updateIngredientShoppingList = inject(UpdateIngredientShoppingListUseCase);
}
