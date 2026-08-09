import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IngredientsView } from '../../../core/ingredients.view';
import { CreateIngredientUseCase } from '../../../core/usecases/create-ingredient.usecase';

@Component({
  selector: 'app-create-ingredient',
  imports: [],
  templateUrl: './create-ingredient.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateIngredientComponent {
  protected readonly createIngredient = inject(CreateIngredientUseCase);
  protected readonly viewModel = inject(IngredientsView).ingredientsViewModel;
}
