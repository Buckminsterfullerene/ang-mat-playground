import { computed, inject, Injectable, signal } from '@angular/core';
import { Breakpoint } from '../../services/breakpoint';

@Injectable({
  providedIn: 'root',
})
export class LeftSidebarState {
  #breakpoint = inject(Breakpoint);

  // Base state
  readonly isOpen = signal(true);
  readonly width = signal(250); // in pixels

  // Derived state: If mobile, the sidebar is effectively "closed" in the grid
  // regardless of the toggle value, as it moves to a Drawer/Overlay.
  readonly isCollapsed = computed(() => !this.isOpen() || this.#breakpoint.isMobile());

  toggle(): void {
    this.isOpen.update(v => {
      const newState = !v;
      this.width.set(newState ? 250 : 60);
      return newState;
    });
  }

  close(): void {
    this.isOpen.set(false);
  }
}
