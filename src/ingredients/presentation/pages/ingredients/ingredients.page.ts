import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { IngredientsView } from '../../../core/ingredients.view';
import { FetchIngredientsUseCase } from '../../../core/uecases/fetch-ingredients.usecase';
import { INGREDIENTS_PROVIDERS } from '../../ingredients.provider';

@Component({
  selector: 'app-ingredients',
  imports: [],
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
