import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ShoppingIngredientViewModel } from '../../../models/shopping-ingredient.view.model';
import { UpdateShoppingIngredientBoughtUseCase } from '../../../usecases/update-shopping-ingredient-bought.usecase';

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
