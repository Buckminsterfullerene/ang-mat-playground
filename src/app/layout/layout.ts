import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { LeftSidebar } from './left-sidebar/left-sidebar';
import { RightSidebar } from './right-sidebar/right-sidebar';
import { DrawerContainer } from '../components/drawer-container/drawer-container';
import { RightSidebarState } from './right-sidebar/right-sidebar-state';
import { LeftSidebarState } from './left-sidebar/left-sidebar-state';

/**
 * Main layout wrapper responsible for orchestrating the application shell.
 * Manages the dynamic dimensions of sidebars via CSS Custom Properties
 * injected through host bindings.
 */
@Component({
  selector: 'app-layout',
  imports: [ Header, LeftSidebar, RightSidebar, RouterOutlet, DrawerContainer ],
  templateUrl: './layout.html',
  styleUrls: [ './layout.scss' ],
  host: {
    // Manage both left and right widths dynamically
    // These bindings update CSS variables in real-time as signals change
    '[style.--left-sidebar-width.px]': 'leftSidebarWidth()',
    '[style.--right-sidebar-width.px]': 'rightSidebarWidth()',
    '[class.show-right]': 'rightSidebarState.isVisible()'
  }
})
export class Layout {
  protected readonly rightSidebarState = inject(RightSidebarState);
  protected readonly leftSidebarState = inject(LeftSidebarState);

  /**
   * Current width of the left sidebar in pixels.
   * Bound to the CSS variable `--left-sidebar-width`.
   */
  leftSidebarWidth = signal(250); // initial left width in pixels

  /**
   * Current width of the right sidebar in pixels.
   * Bound to the CSS variable `--right-sidebar-width`.
   */
  rightSidebarWidth = signal(250); // initial right width in pixels

  constructor() {
    effect(() => {
      this.leftSidebarWidth.set(this.leftSidebarState.width());
      this.rightSidebarWidth.set(this.rightSidebarState.width());
    });
  }

  /**
   * Updates the right sidebar width based on emission from the child component.
   * @param width The new width in pixels.
   */
  handleRightSidebarWidthChange(width: number): void {
    this.rightSidebarWidth.set(width);
  }
}
