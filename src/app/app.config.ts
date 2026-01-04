import {
  ApplicationConfig, inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch() // Optional: Use the fetch API
    ),
    provideAppInitializer(() => {
      const iconRegistry = inject(MatIconRegistry);

      // Register an alias so fontSet="material-symbols-outlined" works if needed
      iconRegistry.registerFontClassAlias('material-symbols-outlined');

      // CRITICAL: You must include 'mat-ligature-font' along with your custom class
      // 'mat-ligature-font' is what tells Material to treat the inner text as an icon name
      iconRegistry.setDefaultFontSetClass('material-symbols-outlined', 'mat-ligature-font');
    }),
  ]
};
