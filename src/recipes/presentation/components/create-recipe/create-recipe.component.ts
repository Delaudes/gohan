import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RecipesView } from '../../../core/recipes.view';
import { CreateRecipeUseCase } from '../../../core/usecases/create-recipe.usecase';

@Component({
  selector: 'app-create-recipe',
  imports: [],
  templateUrl: './create-recipe.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateRecipeComponent {
  protected readonly createRecipe = inject(CreateRecipeUseCase);
  protected readonly viewModel = inject(RecipesView).recipesViewModel;
}
