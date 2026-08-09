import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RecipesView } from '../../../core/recipes.view';
import { FetchRecipesUseCase } from '../../../core/usecases/fetch-recipes.usecase';
import { CreateRecipeComponent } from '../../components/create-recipe/create-recipe.component';
import { DeleteRecipeComponent } from '../../components/delete-recipe/delete-recipe.component';
import { ToggleMealsListComponent } from '../../components/toggle-meals-list/toggle-meals-list.component';
import { RECIPES_PROVIDERS } from '../../recipes.provider';

@Component({
  selector: 'app-recipes',
  imports: [DeleteRecipeComponent, CreateRecipeComponent, ToggleMealsListComponent],
  templateUrl: './recipes.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RECIPES_PROVIDERS],
})
export class RecipesPage implements OnInit {
  protected readonly viewModel = inject(RecipesView).recipesViewModel;
  protected readonly fetchRecipes = inject(FetchRecipesUseCase)

  ngOnInit(): void {
    this.fetchRecipes.execute();
  }
}
