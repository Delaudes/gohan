import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RecipeViewModel } from '../../../core/models/recipes.view.model';
import { DeleteRecipeUseCase } from '../../../core/usecases/delete-recipe.usecase';

@Component({
  selector: 'app-delete-recipe',
  imports: [],
  templateUrl: './delete-recipe.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteRecipeComponent {
  readonly recipe = input.required<RecipeViewModel>();

  protected readonly deleteRecipe = inject(DeleteRecipeUseCase);
}
