import { Routes } from '@angular/router';
import { MealsPage } from '../meals/meals.page';
import { IngredientsPage } from '../ingredients/ingredients.page';
import { RecipesPage } from '../recipes/recipes.page';
import { ShoppingPage } from '../shopping/shopping.page';

export enum AppPath {
  Meals = 'meals',
  Ingredients = 'ingredients',
  Recipes = 'recipes',
  Shopping = 'shopping',
}

export const routes: Routes = [
  { path: '', redirectTo: AppPath.Meals, pathMatch: 'full' },
  { path: AppPath.Meals, component: MealsPage },
  { path: AppPath.Ingredients, component: IngredientsPage },
  { path: AppPath.Recipes, component: RecipesPage },
  { path: AppPath.Shopping, component: ShoppingPage },
  { path: '**', redirectTo: AppPath.Meals },
];
