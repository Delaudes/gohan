import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ShoppingView } from '../../../core/shopping.view';
import { FetchIngredientOptionsUseCase } from '../../../core/usecases/fetch-ingredient-options.usecase';
import { FetchShoppingListUseCase } from '../../../core/usecases/fetch-shopping-list.usecase';
import { AddShoppingIngredientComponent } from '../../components/add-shopping-ingredient/add-shopping-ingredient.component';
import { RemoveShoppingIngredientComponent } from '../../components/remove-shopping-ingredient/remove-shopping-ingredient.component';
import { ToggleShoppingIngredientBoughtComponent } from '../../components/toggle-shopping-ingredient-bought/toggle-shopping-ingredient-bought.component';
import { SHOPPING_PROVIDERS } from '../../shopping.provider';

@Component({
  selector: 'app-shopping',
  imports: [ToggleShoppingIngredientBoughtComponent, RemoveShoppingIngredientComponent, AddShoppingIngredientComponent],
  templateUrl: './shopping.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SHOPPING_PROVIDERS],
})
export class ShoppingPage implements OnInit {
  protected readonly viewModel = inject(ShoppingView).shoppingViewModel;
  protected readonly fetchShoppingList = inject(FetchShoppingListUseCase);
  protected readonly fetchIngredientOptions = inject(FetchIngredientOptionsUseCase);

  ngOnInit(): void {
    this.fetchShoppingList.execute();
    this.fetchIngredientOptions.execute();
  }
}
