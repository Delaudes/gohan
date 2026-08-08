import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './app.header.component';
import { AppNavigationComponent } from './app.navigation.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppHeaderComponent, AppNavigationComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
}
