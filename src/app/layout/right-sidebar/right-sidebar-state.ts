import { Injectable, signal } from '@angular/core';
import { SidebarCollapseMode } from '../enums/sidebar-enum';

/**
 * Global store managing the visibility and behavioral modes of the right sidebar.
 * Acts as the single source of truth for sidebar state across the application.
 */
@Injectable({
  providedIn: 'root',
})
export class RightSidebarState {
  /**
   * Reactive visibility state.
   * `true` indicates the sidebar is expanded; `false` indicates it is collapsed/hidden.
   */
  readonly isOpen = signal(true);

  /**
   * The visual behavior applied when the sidebar is in its closed state.
   * Defined by {@link SidebarCollapseMode}.
   */
  readonly collapseMode = signal<SidebarCollapseMode>(SidebarCollapseMode.Collapsed);

  /**
   * Toggles the sidebar visibility.
   */
  toggleSidebar(): void {
    this.isOpen.update(open => !open);
  }

  /**
   * Configures how the sidebar should appear when {@link isOpen} is false.
   * @param mode The desired {@link SidebarCollapseMode}.
   */
  setCollapseMode(mode: SidebarCollapseMode): void {
    this.collapseMode.set(mode);
  }
}
