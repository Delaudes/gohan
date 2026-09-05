import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ClearWhenDirective } from '../../../../shared/directives/clear-when.directive';
import { FocusWhenDirective } from '../../../../shared/directives/focus-when.directive';
import { ShoppingView } from '../../../shopping.view';
import { AddKnownShoppingIngredientUseCase } from '../../../usecases/add-known-shopping-ingredient.usecase';
import { AddUnknownShoppingIngredientUseCase } from '../../../usecases/add-unknown-shopping-ingredient.usecase';
import { SearchIngredientOptionsUseCase } from '../../../usecases/search-ingredient-options.usecase';
import { ToggleAddingShoppingIngredientUseCase } from '../../../usecases/toggle-adding-shopping-ingredient.usecase';

@Component({
  selector: 'app-add-shopping-ingredient',
  imports: [FocusWhenDirective, ClearWhenDirective],
  templateUrl: './add-shopping-ingredient.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddShoppingIngredientComponent {
  protected readonly viewModel = inject(ShoppingView).shoppingViewModel;
  protected readonly addKnownShoppingIngredient = inject(AddKnownShoppingIngredientUseCase);
  protected readonly addUnknownShoppingIngredient = inject(AddUnknownShoppingIngredientUseCase);
  protected readonly searchIngredientOptions = inject(SearchIngredientOptionsUseCase);
  protected readonly toggleAddingShoppingIngredient = inject(ToggleAddingShoppingIngredientUseCase);
}
