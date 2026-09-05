import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MealsView } from '../../../meals.view';
import { FetchMealsUseCase } from '../../../usecases/fetch-meals.usecase';
import { FetchMealUseCase } from '../../../usecases/fetch-meal.usecase';
import { AddMealComponent } from '../../components/add-meal/add-meal.component';
import { RemoveMealComponent } from '../../components/remove-meal/remove-meal.component';
import { ToggleMealIngredientBoughtComponent } from '../../components/toggle-meal-ingredient-bought/toggle-meal-ingredient-bought.component';
import { ToggleMealDoneComponent } from '../../components/toggle-meal-done/toggle-meal-done.component';
import { ToggleHideDoneMealsUseCase } from '../../../usecases/toggle-hide-done-meals.usecase';
import { MEALS_PROVIDERS } from '../../meals.provider';

@Component({
  selector: 'app-meals',
  imports: [ToggleMealDoneComponent, RemoveMealComponent, ToggleMealIngredientBoughtComponent, AddMealComponent],
  templateUrl: './meals.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MEALS_PROVIDERS],
})
export class MealsPage implements OnInit {
  protected readonly viewModel = inject(MealsView).mealsViewModel;
  protected readonly fetchMeals = inject(FetchMealsUseCase);
  protected readonly fetchMeal = inject(FetchMealUseCase);
  protected readonly toggleHideDoneMeals = inject(ToggleHideDoneMealsUseCase);

  ngOnInit(): void {
    this.fetchMeals.execute();
  }
}
