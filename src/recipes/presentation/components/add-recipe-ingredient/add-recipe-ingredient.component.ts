import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RecipeView } from '../../../core/recipe.view';
import { AddKnownRecipeIngredientUseCase } from '../../../core/usecases/add-known-recipe-ingredient.usecase';
import { AddUnknownRecipeIngredientUseCase } from '../../../core/usecases/add-unknown-recipe-ingredient.usecase';
import { SearchRecipeIngredientsOptionsUseCase } from '../../../core/usecases/search-recipe-ingredients-options.usecase';

@Component({
  selector: 'app-add-recipe-ingredient',
  imports: [],
  templateUrl: './add-recipe-ingredient.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddRecipeIngredientComponent {
  protected readonly viewModel = inject(RecipeView).recipeViewModel;
  protected readonly addKnownRecipeIngredient = inject(AddKnownRecipeIngredientUseCase);
  protected readonly addUnknownRecipeIngredient = inject(AddUnknownRecipeIngredientUseCase);
  protected readonly searchRecipeIngredientsOptions = inject(SearchRecipeIngredientsOptionsUseCase);
}
