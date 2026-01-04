import { Injectable, RendererFactory2, inject, signal, effect } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class Theme {
  private document = inject(DOCUMENT);
  private renderer = inject(RendererFactory2).createRenderer(null, null);

  // Signal to track theme state.
  // Initialize the signal based on the OS preference.
  // `matches` returns `true` if the user's OS is in dark mode.
  isDark = signal(window.matchMedia('(prefers-color-scheme: dark)').matches);

  constructor() {
    // Listen for changes in the OS theme (e.g., scheduled night mode)
    const query = window.matchMedia('(prefers-color-scheme: dark)');

    // Modern event listener for media queries
    query.addEventListener('change', (e) => {
      this.isDark.set(e.matches);
    });

    // Automatically sync the class on the `body` whenever the `signal` changes
    effect(() => {
      const themeClass = this.isDark() ? 'dark' : 'light';
      const prevClass = this.isDark() ? 'light' : 'dark';

      this.renderer.addClass(this.document.body, themeClass);
      this.renderer.removeClass(this.document.body, prevClass);
    });
  }

  toggleTheme() {
    this.isDark.update(v => !v);
  }
}
