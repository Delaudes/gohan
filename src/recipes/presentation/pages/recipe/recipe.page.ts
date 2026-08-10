import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppPath } from '../../../../app/app.routes';

@Component({
  selector: 'app-recipe',
  imports: [RouterLink],
  templateUrl: './recipe.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipePage {
  protected readonly AppPath = AppPath;
}
