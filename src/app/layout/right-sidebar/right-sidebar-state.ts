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

  toggleSidebar(): void {
    this.isOpen.update(open => !open);
  }

  // Method for child components to set the mode they prefer
  setCollapseMode(mode: SidebarCollapseMode): void {
    this.collapseMode.set(mode);
  }
}
