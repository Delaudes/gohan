import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppPath } from '../../../../app/app.routes';
import { RecipeInputModel } from '../../models/recipe.input.model';

@Component({
  selector: 'app-recipe-link',
  imports: [RouterLink],
  templateUrl: './recipe-link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeLinkComponent {
  readonly recipe = input.required<RecipeInputModel>();

  protected readonly AppPath = AppPath;
}
