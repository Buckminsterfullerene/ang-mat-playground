import { Component, signal } from '@angular/core';
import { Layout } from './layout/layout';
import { NavBarGlassMenu } from './css-examples/nav-bar-glass-menu/nav-bar-glass-menu';

@Component({
  selector: 'app-root',
  imports: [ Layout, NavBarGlassMenu ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ang-mat-playground');
}
