import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AppPath } from '../../../../app/app.routes';

@Component({
  selector: 'app-nav-shopping',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-shopping.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavShoppingComponent {
  protected readonly AppPath = AppPath;
}
