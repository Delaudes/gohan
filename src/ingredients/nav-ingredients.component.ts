import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AppPath } from '../app/app.routes';

@Component({
  selector: 'app-nav-ingredients',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-ingredients.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavIngredientsComponent {
  protected readonly AppPath = AppPath;
}
