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
    const nextOpen = !this.isOpen();
    this.isOpen.set(nextOpen);

    if (this.#breakpoint.isMobile()) {
      this.width.set(nextOpen ? this.#EXPANDED_WIDTH_PX : this.#HIDDEN_WIDTH_PX);
      return;
    }

    this.width.set(nextOpen ? this.#EXPANDED_WIDTH_PX : this.#COLLAPSED_WIDTH_PX);
  }

  close(): void {
    this.isOpen.set(false);
    this.width.set(this.#breakpoint.isMobile() ? this.#HIDDEN_WIDTH_PX : this.#COLLAPSED_WIDTH_PX);
  }

  openExpanded(): void {
    this.isOpen.set(true);
    this.width.set(this.#EXPANDED_WIDTH_PX);
  }

  open(): void {
    this.isOpen.set(true);
    this.width.set(this.#EXPANDED_WIDTH_PX);
  }
}
