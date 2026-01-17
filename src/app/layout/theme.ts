import { Injectable, inject, signal, effect, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/** Possible accessibility modes for visual clarity. */
export type ContrastMode = 'normal' | 'high';

/**
 * Global store for application theme and accessibility states.
 * Manages the reactive synchronization of theme classes on the document body.
 */
@Injectable({ providedIn: 'root' })
export class Theme {
  /** Reference to the browser's document for direct body manipulation. */
  readonly #document = inject(DOCUMENT);

  /** Platform-safe renderer used to modify DOM elements outside Angular templates. */
  readonly #renderer = inject(RendererFactory2).createRenderer(null, null);

  /**
   * Current color scheme state.
   * Initialized from the user's OS preference (prefers-color-scheme).
   * @readonly
   */
  readonly isDark = signal(window.matchMedia('(prefers-color-scheme: dark)').matches);

  /**
   * Current contrast mode for accessibility.
   * @readonly
   */
  readonly contrastMode = signal<ContrastMode>('normal');

  constructor() {
    this.#initMediaListener();
    this.#syncBodyClasses();
  }

  /**
   * Toggles the global theme between light and dark modes.
   */
  toggleTheme() {
    this.isDark.update(v => !v);
  }

  /**
   * Sets a specific contrast mode.
   * @param mode The desired contrast level ('normal' or 'high').
   */
  setContrast(mode: ContrastMode) {
    this.contrastMode.set(mode);
  }

  /**
   * Reactive effect that keeps the document body classes in sync with service signals.
   * This is the idiomatic way to handle "out-of-template" DOM updates.
   * @private
   */
  #syncBodyClasses() {
    effect(() => {
      const root = this.#document.documentElement;
      const isDark = this.isDark();
      const contrast = this.contrastMode();

      // Sync Light/Dark
      this.#renderer.addClass(root, isDark ? 'dark' : 'light');
      this.#renderer.removeClass(root, isDark ? 'light' : 'dark');

      // Sync Contrast
      this.#renderer.addClass(root, `${contrast}-contrast`);
      this.#renderer.removeClass(root, contrast === 'high' ? 'normal-contrast' : 'high-contrast');
    });
  }

  /**
   * Listens for OS-level color scheme changes (e.g., scheduled night mode)
   * to update the theme reactively.
   * @private
   */
  #initMediaListener() {
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => this.isDark.set(e.matches));
  }
}
