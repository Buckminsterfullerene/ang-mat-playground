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
  },
  {
    path: 'nav-bar-glass-menu',
    loadComponent: () => import('./css-examples/nav-bar-glass-menu/nav-bar-glass-menu').then(m => m.NavBarGlassMenu)
  },
  {
    path: 'gradient-examples',
    loadComponent: () => import('./css-examples/gradients/gradients').then(m => m.Gradients)
  },
  {
    path: 'form-examples',
    loadComponent: () => import('./css-examples/form-styling/form-styling').then(m => m.FormStyling)
  },
  {
    path: 'video-examples',
    loadComponent: () => import('./css-examples/videos/videos').then(m => m.Videos)
  },
  {
    path: 'glass-examples',
    loadComponent: () => import('./css-examples/glass-effect/glass-effect').then(m => m.GlassEffect)
  },
  {
    path: 'dialogs-examples',
    loadComponent: () => import('./css-examples/dialogs/dialogs').then(m => m.Dialogs)
  },
  {
    path: '3d-slider',
    loadComponent: () => import('./css-examples/three-d-slider/three-d-slider').then(m => m.ThreeDSlider)
  },
  {
    path: '3d-rotate',
    loadComponent: () => import('./css-examples/three-d-rotate/three-d-rotate').then(m => m.ThreeDRotate)
  },
  {
    path: 'sub-grid',
    // Use loadComponent for lazy loading the layout container
    loadComponent: () => import('./components/sub-grid-container/sub-grid-container').then(m => m.SubGridContainer),
    children: [
      {
        path: '',
        redirectTo: 'child-route-one', // Redirect to a default child route
        pathMatch: 'full'
      },
      {
        path: 'child-route-one',
        loadComponent: () => import('./example-child-sub-route/example-child-sub-route').then(m => m.ExampleChildSubRoute)
      },
      {
        path: 'chat',
        loadComponent: () => import('./stream-example/stream-example').then(m => m.StreamExample)
      }
    ]
  }
];
