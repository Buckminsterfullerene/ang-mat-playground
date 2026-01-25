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

  toggle(): void {
    this.isOpen.update(v => {
      const newState = !v;

      if (this.#breakpoint.isMobile()) {
        // On mobile, sidebar is either fully open (250px) or fully closed (0px)
        this.width.set(newState ? 250 : 0);
      // this.width.set(newState ? 250 : 60);
      }
      return newState;
    });
  }

  close(): void {
    this.isOpen.set(false);
    if (this.#breakpoint.isMobile()) {
      this.width.set(0);
    }
  }

  open(): void {
    this.isOpen.set(true);
    if (!this.#breakpoint.isMobile()) {
      this.width.set(250);
    }
  }
}
