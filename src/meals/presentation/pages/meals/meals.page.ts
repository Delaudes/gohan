import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MealsView } from '../../../core/meals.view';
import { FetchMealsUseCase } from '../../../core/usecases/fetch-meals.usecase';
import { FetchMealUseCase } from '../../../core/usecases/fetch-meal.usecase';
import { AddMealComponent } from '../../components/add-meal/add-meal.component';
import { RemoveMealComponent } from '../../components/remove-meal/remove-meal.component';
import { ToggleMealIngredientBoughtComponent } from '../../components/toggle-meal-ingredient-bought/toggle-meal-ingredient-bought.component';
import { ToggleMealDoneComponent } from '../../components/toggle-meal-done/toggle-meal-done.component';
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

  ngOnInit(): void {
    this.fetchMeals.execute();
  }
}
