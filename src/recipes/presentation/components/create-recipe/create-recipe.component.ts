import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CloseWhenDirective } from '../../../../shared/directives/close-when.directive';
import { ClearWhenDirective } from '../../../../shared/directives/clear-when.directive';
import { RecipesView } from '../../../recipes.view';
import { CreateRecipeUseCase } from '../../../usecases/create-recipe.usecase';

@Component({
  selector: 'app-create-recipe',
  imports: [CloseWhenDirective, ClearWhenDirective],
  templateUrl: './create-recipe.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateRecipeComponent {
  protected readonly createRecipe = inject(CreateRecipeUseCase);
  protected readonly viewModel = inject(RecipesView).recipesViewModel;
}
