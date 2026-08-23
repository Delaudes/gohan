import { Routes } from '@angular/router';

export enum AppPath {
  Meals = 'meals',
  Ingredients = 'ingredients',
  Recipes = 'recipes',
  Shopping = 'shopping',
}

export const routes: Routes = [
  { path: '', redirectTo: AppPath.Meals, pathMatch: 'full' },
  {
    path: AppPath.Meals,
    loadComponent: () => import('../meals/presentation/pages/meals/meals.page').then((m) => m.MealsPage),
  },
  {
    path: AppPath.Ingredients,
    loadComponent: () => import('../ingredients/presentation/pages/ingredients/ingredients.page').then((m) => m.IngredientsPage),
  },
  {
    path: AppPath.Recipes,
    loadComponent: () => import('../recipes/presentation/pages/recipes/recipes.page').then((m) => m.RecipesPage),
  },
  {
    path: `${AppPath.Recipes}/:id`,
    loadComponent: () => import('../recipe/presentation/pages/recipe/recipe.page').then((m) => m.RecipePage),
  },
  {
    path: AppPath.Shopping,
    loadComponent: () => import('../shopping/presentation/pages/shopping/shopping.page').then((m) => m.ShoppingPage),
  },
  { path: '**', redirectTo: AppPath.Meals },
];
