import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { IngredientViewModel } from '../../../models/ingredient.view.model';
import { DeleteIngredientUseCase } from '../../../usecases/delete-ingredient.usecase';

@Component({
  selector: 'app-delete-ingredient',
  imports: [],
  templateUrl: './delete-ingredient.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteIngredientComponent {
  readonly ingredient = input.required<IngredientViewModel>();

  protected readonly deleteIngredient = inject(DeleteIngredientUseCase);
}
