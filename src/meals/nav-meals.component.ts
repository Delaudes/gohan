import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AppPath } from '../app/app.routes';

@Component({
  selector: 'app-nav-meals',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-meals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavMealsComponent {
  protected readonly AppPath = AppPath;
}
