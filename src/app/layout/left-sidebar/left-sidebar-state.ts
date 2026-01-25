import { computed, inject, Injectable, signal } from '@angular/core';
import { Breakpoint } from '../../services/breakpoint';

@Injectable({
  providedIn: 'root',
})
export class LeftSidebarState {
  #breakpoint = inject(Breakpoint);

  // Base state
  readonly isOpen = signal(true);

  // Derived state: If mobile, the sidebar is effectively "closed" in the grid
  // regardless of the toggle value, as it moves to a Drawer/Overlay.
  readonly isCollapsed = computed(() => !this.isOpen() || this.#breakpoint.isMobile());

  toggle(): void {
    this.isOpen.update(v => !v);
  }

  close(): void {
    this.isOpen.set(false);
  }
}
