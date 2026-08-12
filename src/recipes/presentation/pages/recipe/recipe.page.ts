import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppPath } from '../../../../app/app.routes';
import { RecipeView } from '../../../core/recipe.view';
import { FetchRecipeUseCase } from '../../../core/usecases/fetch-recipe.usecase';
import { SearchIngredientsOptionsUseCase } from '../../../core/usecases/search-ingredients-options.usecase';
import { RECIPES_PROVIDERS } from '../../recipes.provider';
import { AddRecipeIngredientComponent } from '../../components/add-recipe-ingredient/add-recipe-ingredient.component';
import { RemoveRecipeIngredientComponent } from '../../components/remove-recipe-ingredient/remove-recipe-ingredient.component';

@Component({
  selector: 'app-recipe',
  imports: [RouterLink, AddRecipeIngredientComponent, RemoveRecipeIngredientComponent],
  templateUrl: './recipe.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RECIPES_PROVIDERS],
})
export class RecipePage implements OnInit {
  protected readonly AppPath = AppPath;
  protected readonly viewModel = inject(RecipeView).recipeViewModel;
  protected readonly fetchRecipeUseCase = inject(FetchRecipeUseCase);
  protected readonly searchIngredientsOptionsUseCase = inject(SearchIngredientsOptionsUseCase);

  ngOnInit(): void {
    this.fetchRecipeUseCase.execute();
    this.searchIngredientsOptionsUseCase.execute('');
  }
}
