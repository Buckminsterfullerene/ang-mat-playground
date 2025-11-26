import { Injectable, signal } from '@angular/core';
import { SidebarCollapseMode } from '../enums/sidebar-enum';

@Injectable({
  providedIn: 'root',
})
export class RightSidebarState {
  // State for whether the sidebar is open or closed
  readonly isOpen = signal(true);

  // State for the collapse mode when closed
  readonly collapseMode = signal<SidebarCollapseMode>(SidebarCollapseMode.Collapsed);

  /**
   * Toggles the open/closed state of the sidebar.
   * Updates the `isOpen` signal to its opposite boolean value.
   */
  toggleSidebar(): void {
    this.isOpen.update(open => !open);
  }

  /**
   * Sets the preferred collapse mode for the sidebar when it is closed.
   * This allows child components to influence the sidebar's behavior on close.
   */
  setCollapseMode(mode: SidebarCollapseMode): void {
    this.collapseMode.set(mode);
  }
}
