import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ClearWhenDirective } from '../../../../shared/directives/clear-when.directive';
import { FocusWhenDirective } from '../../../../shared/directives/focus-when.directive';
import { RecipeView } from '../../../recipe.view';
import { AddKnownRecipeIngredientUseCase } from '../../../usecases/add-known-recipe-ingredient.usecase';
import { AddUnknownRecipeIngredientUseCase } from '../../../usecases/add-unknown-recipe-ingredient.usecase';
import { SearchIngredientOptionsUseCase } from '../../../usecases/search-ingredient-options.usecase';
import { ToggleAddingRecipeIngredientUseCase } from '../../../usecases/toggle-adding-recipe-ingredient.usecase';

@Component({
  selector: 'app-add-recipe-ingredient',
  imports: [FocusWhenDirective, ClearWhenDirective],
  templateUrl: './add-recipe-ingredient.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddRecipeIngredientComponent {
  protected readonly viewModel = inject(RecipeView).recipeViewModel;
  protected readonly addKnownRecipeIngredient = inject(AddKnownRecipeIngredientUseCase);
  protected readonly addUnknownRecipeIngredient = inject(AddUnknownRecipeIngredientUseCase);
  protected readonly searchIngredientOptions = inject(SearchIngredientOptionsUseCase);
  protected readonly toggleAddingRecipeIngredient = inject(ToggleAddingRecipeIngredientUseCase);
}
