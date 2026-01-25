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
import { Breakpoint } from '../../services/breakpoint';

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
  protected readonly rightSidebarState = inject(RightSidebarState);
  protected readonly breakpoint = inject(Breakpoint);

  /**
   * Reference to the container where dynamic content can be injected.
   *
   * Points to ViewContainerRef for the template anchor marked with #dynamicContentHost.
   * Used to inject components into the sidebar at runtime when opened via {@link RightSidebarState.open}
   *
   * @readonly
   */
  dynamicContentHost = viewChild('dynamicContentHost', { read: ViewContainerRef });

  constructor() {
    this.#initDynamicComponentLoader();
  }

  #initDynamicComponentLoader() {
    effect(() => {
      const host = this.dynamicContentHost();
      const componentType = this.rightSidebarState.currentComponent();
      const config = this.rightSidebarState.getConfig();
      const isOpen = this.rightSidebarState.isOpen();

      if (host && componentType && isOpen) {
        host.clear();
        const componentRef: ComponentRef<any> = host.createComponent(componentType);

        if (config?.data) {
          componentRef.setInput('data', config.data);
        }
      } else if (host && !isOpen) {
          host.clear();
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
  toggleSidebar(): void {
    this.rightSidebarState.toggle();
  }
}
