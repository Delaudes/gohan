import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CloseWhenDirective } from '../../../../shared/directives/close-when.directive';
import { ClearWhenDirective } from '../../../../shared/directives/clear-when.directive';
import { IngredientsView } from '../../../ingredients.view';
import { CreateIngredientUseCase } from '../../../usecases/create-ingredient.usecase';

@Component({
  selector: 'app-create-ingredient',
  imports: [CloseWhenDirective, ClearWhenDirective],
  templateUrl: './create-ingredient.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateIngredientComponent {
  protected readonly createIngredient = inject(CreateIngredientUseCase);
  protected readonly viewModel = inject(IngredientsView).ingredientsViewModel;
}
