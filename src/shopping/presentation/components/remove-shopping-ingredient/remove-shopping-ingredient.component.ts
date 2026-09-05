import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ShoppingIngredientViewModel } from '../../../models/shopping-ingredient.view.model';
import { RemoveShoppingIngredientUseCase } from '../../../usecases/remove-shopping-ingredient.usecase';

@Component({
  selector: 'app-remove-shopping-ingredient',
  imports: [],
  templateUrl: './remove-shopping-ingredient.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveShoppingIngredientComponent {
  readonly ingredient = input.required<ShoppingIngredientViewModel>();

  protected readonly removeShoppingIngredient = inject(RemoveShoppingIngredientUseCase);
}
