import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavIngredientsComponent } from '../ingredients/presentation/components/nav-ingredients/nav-ingredients.component';
import { NavMealsComponent } from '../meals/presentation/components/nav-meals/nav-meals.component';
import { NavRecipesComponent } from '../recipes/presentation/components/nav-recipes/nav-recipes.component';
import { NavShoppingComponent } from '../shopping/presentation/components/nav-shopping/nav-shopping.component';

@Component({
  selector: 'app-navigation',
  imports: [NavMealsComponent, NavRecipesComponent, NavIngredientsComponent, NavShoppingComponent],
  templateUrl: './app.navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppNavigationComponent {
}
