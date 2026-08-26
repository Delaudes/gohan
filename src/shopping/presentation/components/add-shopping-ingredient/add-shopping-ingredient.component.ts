import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ShoppingView } from '../../../core/shopping.view';
import { AddKnownShoppingIngredientUseCase } from '../../../core/usecases/add-known-shopping-ingredient.usecase';
import { AddUnknownShoppingIngredientUseCase } from '../../../core/usecases/add-unknown-shopping-ingredient.usecase';
import { SearchIngredientOptionsUseCase } from '../../../core/usecases/search-ingredient-options.usecase';

@Component({
  selector: 'app-add-shopping-ingredient',
  imports: [],
  templateUrl: './add-shopping-ingredient.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddShoppingIngredientComponent {
  protected readonly viewModel = inject(ShoppingView).shoppingViewModel;
  protected readonly addKnownShoppingIngredient = inject(AddKnownShoppingIngredientUseCase);
  protected readonly addUnknownShoppingIngredient = inject(AddUnknownShoppingIngredientUseCase);
  protected readonly searchIngredientOptions = inject(SearchIngredientOptionsUseCase);
}
