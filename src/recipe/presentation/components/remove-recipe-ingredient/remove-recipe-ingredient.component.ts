import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RecipeIngredientViewModel } from '../../../core/models/recipe-ingredient.view.model';
import { RemoveRecipeIngredientUseCase } from '../../../core/usecases/remove-recipe-ingredient.usecase';

@Component({
  selector: 'app-remove-recipe-ingredient',
  imports: [],
  templateUrl: './remove-recipe-ingredient.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveRecipeIngredientComponent {
  readonly ingredient = input.required<RecipeIngredientViewModel>();

  protected readonly removeRecipeIngredient = inject(RemoveRecipeIngredientUseCase);
}
