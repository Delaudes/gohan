import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FocusOnVisibleDirective } from '../../../../presentation/field/focus-on-visible.directive';
import { RecipeView } from '../../../core/recipe.view';
import { AddKnownRecipeIngredientUseCase } from '../../../core/usecases/add-known-recipe-ingredient.usecase';
import { AddUnknownRecipeIngredientUseCase } from '../../../core/usecases/add-unknown-recipe-ingredient.usecase';
import { SearchIngredientOptionsUseCase } from '../../../core/usecases/search-ingredient-options.usecase';
import { ToggleAddingRecipeIngredientUseCase } from '../../../core/usecases/toggle-adding-recipe-ingredient.usecase';

@Component({
  selector: 'app-add-recipe-ingredient',
  imports: [FocusOnVisibleDirective],
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
