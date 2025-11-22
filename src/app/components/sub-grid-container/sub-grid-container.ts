import { Component, inject, signal } from '@angular/core';
import { RightSidebar } from '../../layout/right-sidebar/right-sidebar';
import { RightSidebarState } from '../../layout/right-sidebar/right-sidebar-state';
import { RouterOutlet } from '@angular/router';
import { SidebarCollapseMode } from '../../layout/enums/sidebar-enum';

@Component({
  selector: 'app-sub-grid-container',
  imports: [
    RouterOutlet,
    RightSidebar
  ],
  templateUrl: './sub-grid-container.html',
  styleUrl: './sub-grid-container.scss',
  // Bind the right sidebar width signal to a CSS custom property
  host: {
    '[style.--sub-grid-right-sidebar-width.px]': 'rightSidebarWidth()',
  },
})
export class SubGridContainer {
  sidebarService = inject(RightSidebarState);
  // Expose enum to template/host bindings if needed
  protected SidebarCollapseMode = SidebarCollapseMode;

  rightSidebarWidth = signal(300);

  // Expose service signals for binding in the template
  protected isRightSidebarOpen = this.sidebarService.isOpen;
  protected currentCollapseMode = this.sidebarService.collapseMode;

  handleRightSidebarWidthChange(width: number): void {
    // This value will be 0 when in 'Hidden' mode and closed
    this.rightSidebarWidth.set(width);
  }

  // Handle toggles that originate from *within* the sidebar component itself
  handleSidebarToggleEvent(newState: boolean): void {
    // Sync the service's state with the event from the sidebar's internal button
    this.sidebarService.isOpen.set(newState);
  }
}
