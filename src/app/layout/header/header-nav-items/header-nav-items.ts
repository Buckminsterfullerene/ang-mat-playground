import { Component, computed, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DrawerContext } from '../../../components/drawer-container/drawer-container-interface';
import { CommonModule } from '@angular/common';
import { Theme } from '../../theme';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

/**
 * A reusable component that renders the application's primary navigation links.
 *
 * Its main purpose is to adapt its visual layout based on the provided input `context`,
 * allowing it to be used flexibly in different UI locations—such as inline within the
 * main header (default mode) or stacked vertically within a side navigation drawer (column mode).
 *
 * It manages the required CSS classes dynamically via the `modeClass` getter to ensure
 * the correct presentation in either scenario.
 */
@Component({
  selector: 'header-nav-items',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './header-nav-items.html',
  styleUrl: './header-nav-items.scss',
})
export class HeaderNavItems {
  /**
   * Access to the global application theme state and class management.
   * @protected
   */
  protected readonly theme = inject(Theme);

  /**
   * An input property (signal-based) that receives configuration data
   * for how the navigation items should be displayed (e.g., 'column' or 'default').
   * @type {Input<DrawerContext | undefined>}
   */
  context = input<DrawerContext>();


  /**
   * The Material icon name to display based on the current dark mode state.
   * @derived
   */
  protected readonly themeIcon = computed(() => this.theme.isDark() ? 'light_mode' : 'dark_mode');

  /**
   * Human-readable label for the high-contrast toggle button.
   * @derived
   */
  protected readonly contrastText = computed(() => this.theme.contrastMode() === 'high' ? 'High Contrast: Off' : 'High Contrast: On');

  protected readonly isFullscreen = signal(false);
  protected readonly fullscreenText = computed(() => this.isFullscreen() ? 'Exit Fullscreen' : 'Enter Fullscreen');
  protected readonly fullscreenIcon = computed(() => this.isFullscreen() ? 'fullscreen_exit' : 'fullscreen');

  /**
   * Current CSS class to apply to the navigation container,
   * derived from the layout context.
   * @derived
   */
  protected readonly modeClass = computed(() => this.context()?.displayMode ?? 'default');

  /** Toggles the global theme between light and dark modes. */
  protected toggleTheme() {
    this.theme.toggleTheme();
  }

  /** Switches the application contrast mode between high and normal. */
  protected toggleHighContrast() {
    const nextMode = this.theme.contrastMode() === 'high' ? 'normal' : 'high';
    this.theme.setContrast(nextMode);
  }

  /**
   * Toggles the fullscreen mode state using the browser's Fullscreen API.
   * @protected
   */
  protected async toggleFullscreen() {
    if (!document.fullscreenElement) {
      try {
        await document.documentElement.requestFullscreen();
        this.isFullscreen.set(true);
      } catch (err) {
        console.error(`Error attempting to enable fullscreen mode: `, err);
      }
    } else {
      try {
        await document.exitFullscreen();
        this.isFullscreen.set(false);
      } catch (err) {
        console.error(`Error attempting to exit fullscreen mode: `, err);
      }
    }
  }
}
