import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-recipes',
  imports: [],
  templateUrl: './recipes.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesPage {
}
