import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RecipesView } from '../../../recipes.view';
import { FetchRecipesUseCase } from '../../../usecases/fetch-recipes.usecase';
import { SearchRecipesUseCase } from '../../../usecases/search-recipes.usecase';
import { CreateRecipeComponent } from '../../components/create-recipe/create-recipe.component';
import { DeleteRecipeComponent } from '../../components/delete-recipe/delete-recipe.component';
import { RecipeLinkComponent } from '../../../../recipe/presentation/components/recipe-link/recipe-link.component';
import { ToggleRecipeMealsListComponent } from '../../components/toggle-recipe-meals-list/toggle-recipe-meals-list.component';
import { RECIPES_PROVIDERS } from '../../recipes.provider';

@Component({
  selector: 'app-recipes',
  imports: [DeleteRecipeComponent, CreateRecipeComponent, ToggleRecipeMealsListComponent, RecipeLinkComponent],
  templateUrl: './recipes.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RECIPES_PROVIDERS],
})
export class RecipesPage implements OnInit {
  protected readonly viewModel = inject(RecipesView).recipesViewModel;
  protected readonly fetchRecipes = inject(FetchRecipesUseCase)
  protected readonly searchRecipes = inject(SearchRecipesUseCase);

  ngOnInit(): void {
    this.fetchRecipes.execute();
  }
}
