import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ShoppingIngredientViewModel } from '../../../core/models/shopping-ingredient.view.model';
import { UpdateShoppingIngredientBoughtUseCase } from '../../../core/usecases/update-shopping-ingredient-bought.usecase';

@Component({
  selector: 'app-toggle-shopping-ingredient-bought',
  imports: [],
  templateUrl: './toggle-shopping-ingredient-bought.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleShoppingIngredientBoughtComponent {
  readonly ingredient = input.required<ShoppingIngredientViewModel>();

  protected readonly updateShoppingIngredientBought = inject(UpdateShoppingIngredientBoughtUseCase);
}
