import { Component, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { DrawerContext } from '../../../components/drawer-container/drawer-container-interface';
import { CommonModule } from '@angular/common';

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
    MatButton,
    CommonModule
  ],
  templateUrl: './header-nav-items.html',
  styleUrl: './header-nav-items.scss',
})
export class HeaderNavItems {
  /**
   * An input property (signal-based) that receives configuration data
   * for how the navigation items should be displayed (e.g., 'column' or 'default').
   * @type {Input<DrawerContext | undefined>}
   */
  context = input<DrawerContext>();

  /**
   * Determines the CSS class dynamically based on the display mode specified in the context input.
   * Handles both signal-based inputs (by calling the input function) and standard property inputs.
   *
   * @returns {string} The CSS class name corresponding to the current display mode, or 'default' if none is set.
   */
  get modeClass(): string {
    // Check if 'context' is a function (signal context)
    if (typeof this.context === 'function') {
      // If it is a function, call it to get the value
      return this.context()?.displayMode || 'default';
    }
    // Otherwise, treat it as a standard property access (static context)
    // We cast `this.context` to the expected DrawerContext type here
    return (this.context as DrawerContext)?.displayMode || 'default';
  }
}
