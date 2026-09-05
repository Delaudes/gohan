import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppPath } from '../../../../app/app.routes';
import { RecipeView } from '../../../recipe.view';
import { FetchRecipeUseCase } from '../../../usecases/fetch-recipe.usecase';
import { FetchIngredientOptionsUseCase } from '../../../usecases/fetch-ingredient-options.usecase';
import { RECIPE_PROVIDERS } from '../../recipe.provider';
import { AddRecipeIngredientComponent } from '../../components/add-recipe-ingredient/add-recipe-ingredient.component';
import { RemoveRecipeIngredientComponent } from '../../components/remove-recipe-ingredient/remove-recipe-ingredient.component';

@Component({
  selector: 'app-recipe',
  imports: [RouterLink, AddRecipeIngredientComponent, RemoveRecipeIngredientComponent],
  templateUrl: './recipe.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RECIPE_PROVIDERS],
})
export class RecipePage implements OnInit {
  protected readonly AppPath = AppPath;
  protected readonly viewModel = inject(RecipeView).recipeViewModel;
  protected readonly fetchRecipe = inject(FetchRecipeUseCase);
  protected readonly fetchIngredientOptions = inject(FetchIngredientOptionsUseCase);

  ngOnInit(): void {
    this.fetchRecipe.execute();
    this.fetchIngredientOptions.execute();
  }
}
