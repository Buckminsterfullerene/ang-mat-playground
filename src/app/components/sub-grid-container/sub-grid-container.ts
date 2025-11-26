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

  /**
   * Update the right sidebar width signal.
   *
   * Sets the `rightSidebarWidth` signal to the provided pixel value so the host
   * binding \`--sub-grid-right-sidebar-width.px\` is updated. A value of 0 is
   * used when the sidebar is hidden.
   *
   * Side effects:
   * - Mutates signal: \`rightSidebarWidth\`.
   */
  handleRightSidebarWidthChange(width: number): void {
    // This value will be 0 when in 'Hidden' mode and closed
    this.rightSidebarWidth.set(width);
  }

  /**
   * Handle toggle events emitted by the sidebar component.
   *
   * Synchronizes the shared `RightSidebarState.isOpen` signal with the boolean
   * `newState` coming from the sidebar's internal toggle control. This updates
   * the global sidebar open state so host bindings and other consumers react.
   *
   * Side effects:
   * - Mutates signal: `sidebarService.isOpen`.
   */
  handleSidebarToggleEvent(newState: boolean): void {
    // Sync the service's state with the event from the sidebar's internal button
    this.sidebarService.isOpen.set(newState);
  }
}
