import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavMealsComponent } from '../meals/nav-meals.component';
import { NavRecipesComponent } from '../recipes/nav-recipes.component';
import { NavIngredientsComponent } from '../ingredients/nav-ingredients.component';
import { NavShoppingComponent } from '../shopping/nav-shopping.component';

@Component({
  selector: 'app-navigation',
  imports: [NavMealsComponent, NavRecipesComponent, NavIngredientsComponent, NavShoppingComponent],
  templateUrl: './app.navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppNavigationComponent {
}
