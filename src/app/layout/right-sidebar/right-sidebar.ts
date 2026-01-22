import {
  Component,
  output,
  effect,
  input,
  viewChild,
  ViewContainerRef,
  inject,
  ComponentRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SidebarCollapseMode } from '../enums/sidebar-enum';
import { MatButtonModule } from '@angular/material/button';
import { RightSidebarState } from './right-sidebar-state';

@Component({
  selector: 'app-right-sidebar',
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './right-sidebar.html',
  styleUrls: ['./right-sidebar.scss']
})
export class RightSidebar {
  /** Reactive input determining if the sidebar is expanded. */
  isSidebarOpen = input.required<boolean>();

  /** Behavior of the sidebar when closed (e.g., hidden vs icon-only). */
  collapseMode = input<SidebarCollapseMode>(SidebarCollapseMode.Collapsed);

  /** Emits the calculated pixel width whenever visibility or mode changes. */
  widthChange = output<number>();

  /** Requests a visibility toggle from the parent state manager. */
  toggleSidebarEvent = output<boolean>();

  /**
   * Reference to the container where dynamic content can be injected.
   *
   * Points to ViewContainerRef for the template anchor marked with #dynamicContentHost.
   * Used to inject components into the sidebar at runtime when opened via {@link RightSidebarState.open}
   *
   * @readonly
   */
  dynamicContentHost = viewChild('dynamicContentHost', { read: ViewContainerRef });
  #sidebarState = inject(RightSidebarState);

  constructor() {
    this.#initWidthSynchronization();
    this.#initDynamicComponentLoader();
  }

  /**
   * Synchronizes internal layout state with external parent dimensions.
   * Automatically calculates and emits the sidebar width based on reactive inputs.
   * Effect to handle state changes when the input updates (e.g., from parent button click)
   * Ensures the width change event is emitted regardless of where the toggle originated
   * @private
   */
  #initWidthSynchronization() {
    effect(() => {
      const isOpen = this.isSidebarOpen();
      const mode = this.collapseMode();

      // Calculate width based on state and mode constants
      const width = isOpen ? 300 : (mode === SidebarCollapseMode.Hidden ? 0 : 60);

      this.widthChange.emit(width);
    });
  }

  #initDynamicComponentLoader() {
    effect(() => {
      const host = this.dynamicContentHost();
      const componentType = this.#sidebarState.currentComponent();
      const config = this.#sidebarState.getConfig();
      const isOpen = this.isSidebarOpen();

      if (host && componentType && isOpen) {
        host.clear();
        const componentRef: ComponentRef<any> = host.createComponent(componentType);

        if (config?.data) {
          componentRef.setInput('data', config.data);
        } else if (host && !isOpen) {
          host.clear();
        }
      }
    });
  }

  /**
   * Emit a toggle request with the inverse of the current open state.
   *
   * Called by the sidebar's internal toggle control to request the parent to
   * update the actual `isSidebarOpen` state. This method does not mutate the
   * input signal directly; it emits the boolean inverse so the parent can handle
   * the update.
   *
   * Side effects:
   * - Emits via: `toggleSidebarEvent.emit(...)`.
   */
  toggleSidebarInternal(): void {
    // Emit the opposite of the current state to the parent, who will manage the actual state
    this.toggleSidebarEvent.emit(!this.isSidebarOpen());
    this.#sidebarState.toggle();
  }
}
