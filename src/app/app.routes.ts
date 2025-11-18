import { Routes } from '@angular/router';
import { Login } from './css-examples/login/login';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // Home route was already lazy loaded
  {
    path: 'home',
    loadComponent: () => import('./home/home').then(m => m.Home)
  },
  // Carousel route is now lazy loaded
  {
    path: 'carousel',
    loadComponent: () => import('./css-examples/carousel/carousel').then(m => m.Carousel)
  },
  // CssGrid route is now lazy loaded
  {
    path: 'css-grid',
    loadComponent: () => import('./css-examples/css-grid/css-grid').then(m => m.CssGrid)
  },
  // CssMenuButton route is now lazy loaded
  {
    path: 'css-menu-button',
    loadComponent: () => import('./css-examples/css-menu-button/css-menu-button').then(m => m.CssMenuButton)
  },
  // ScrollAnimationsObserver route is now lazy loaded
  {
    path: 'scroll-animations-observer',
    loadComponent: () => import('./css-examples/scroll-animations-observer/scroll-animations-observer').then(m => m.ScrollAnimationsObserver)
  },
  {
    path: 'login',
    loadComponent: () => import('./css-examples/login/login').then(m => m.Login)
  }
];
