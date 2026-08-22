import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { IngredientsView } from '../../../core/ingredients.view';
import { FetchIngredientsUseCase } from '../../../core/usecases/fetch-ingredients.usecase';
import { CreateIngredientComponent } from '../../components/create-ingredient/create-ingredient.component';
import { DeleteIngredientComponent } from '../../components/delete-ingredient/delete-ingredient.component';
import { ToggleIngredientShoppingListComponent } from '../../components/toggle-ingredient-shopping-list/toggle-ingredient-shopping-list.component';
import { INGREDIENTS_PROVIDERS } from '../../ingredients.provider';

@Component({
  selector: 'app-ingredients',
  imports: [DeleteIngredientComponent, CreateIngredientComponent, ToggleIngredientShoppingListComponent],
  templateUrl: './ingredients.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [INGREDIENTS_PROVIDERS],
})
export class IngredientsPage implements OnInit {
  protected readonly viewModel = inject(IngredientsView).ingredientsViewModel;
  protected readonly fetchIngredients = inject(FetchIngredientsUseCase)

  ngOnInit(): void {
    this.fetchIngredients.execute();
  }
}
