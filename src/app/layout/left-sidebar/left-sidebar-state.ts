import { computed, inject, Injectable, signal } from '@angular/core';
import { Breakpoint } from '../../services/breakpoint';

@Injectable({
  providedIn: 'root',
})
export class LeftSidebarState {
  #breakpoint = inject(Breakpoint);

  readonly #EXPANDED_WIDTH_PX = 250;
  readonly #COLLAPSED_WIDTH_PX = 60;
  readonly #HIDDEN_WIDTH_PX = 0;

  // Base state
  readonly isOpen = signal(!this.#breakpoint.isMobile());
  readonly width = signal(this.#breakpoint.isMobile() ? this.#HIDDEN_WIDTH_PX : this.#EXPANDED_WIDTH_PX); // in pixels

  toggle(): void {
    this.isOpen.update(v => {
      const newState = !v;

      if (this.#breakpoint.isMobile()) {
        // On mobile, sidebar is either fully open (250px) or fully closed (0px)
        this.width.set(newState ? this.#EXPANDED_WIDTH_PX : this.#HIDDEN_WIDTH_PX);
      } else {
        this.width.set(newState ? this.#EXPANDED_WIDTH_PX : this.#COLLAPSED_WIDTH_PX);
      }
      return newState;
    });
  }

  close(): void {
    this.isOpen.set(false);
    if (this.#breakpoint.isMobile()) {
      this.width.set(this.#HIDDEN_WIDTH_PX);
    }
  }

  open(): void {
    this.isOpen.set(true);
    this.width.set(this.#EXPANDED_WIDTH_PX);
  }
}
