import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AppPath } from '../../../../app/app.routes';

@Component({
  selector: 'app-nav-recipes',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-recipes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavRecipesComponent {
  protected readonly AppPath = AppPath;
}
