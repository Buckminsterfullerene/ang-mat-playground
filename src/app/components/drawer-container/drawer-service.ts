import { Injectable, signal, Type, untracked } from '@angular/core';
import { DrawerConfig } from './drawer-container-interface';

@Injectable({
  providedIn: 'root', // Provided in root so it's a singleton across the app
})
export class DrawerService {
  #isDrawerOpen = signal(false);
  #elementBeforeDrawerOpened: HTMLElement | null = null;
  readonly isOpen = this.#isDrawerOpen.asReadonly();

  // This signal holds the *type* of component we want to display. This is the "injected" component.
  #componentToRender = signal<Type<unknown> | null>(null);
  readonly currentComponent = this.#componentToRender.asReadonly();

  #config = signal<DrawerConfig | null>(null); // Signal to hold config

  /**
   * Open the drawer and prepare the provided component and configuration.
   *
   * Sets the component type and configuration inside an `untracked` block to
   * avoid emitting intermediate signal updates, records the element that had
   * focus before opening so focus can be restored later, and marks the drawer
   * as open so consumers can render and initialize the dynamic content.
   *
   * Side effects:
   * - Mutates internal signals: `#componentToRender`, `#config`, `#isDrawerOpen`.
   * - Stores `#elementBeforeDrawerOpened` from `document.activeElement`.
   */
  open(componentType: Type<unknown>, config: DrawerConfig): void {
    // Enforce a required config object
    untracked(() => {
      const finalConfig: DrawerConfig = {
        disableClose: false, // Defaulting it to false here
        ...config
      };
      this.#componentToRender.set(componentType);
      this.#config.set(finalConfig); // Set the configuration
    });

    this.#elementBeforeDrawerOpened = document.activeElement as HTMLElement | null;
    this.#isDrawerOpen.set(true);
  }

  /**
   * Close the drawer and clear any dynamic state and references.
   *
   * Marks the drawer as closed by updating the internal open signal, clears the
   * stored reference to the element that had focus before the drawer opened, and
   * resets the stored component type and configuration so dynamic content is
   * released. Intended to be a no-op from a UI perspective beyond these state
   * changes (visual transitions are handled by the container component).
   *
   * Side effects:
   * - Mutates internal signals: `#isDrawerOpen`, `#config`, `#componentToRender`.
   * - Clears `#elementBeforeDrawerOpened`.
   */
  close(): void {
    this.#isDrawerOpen.set(false);
    this.#elementBeforeDrawerOpened = null;
    // Optional: clear config on close
    this.#config.set(null);
    this.#componentToRender.set(null);
  }

  /**
   * Return the current drawer configuration without mutating internal state.
   *
   * Reads the internal `#config` signal synchronously and returns the current
   * `DrawerConfig` instance or `null` when no configuration is set. This is a
   * read-only accessor with no side effects.
   */
  getConfig(): DrawerConfig | null {
    return this.#config();
  }

  /**
   * Toggle the drawer open state.
   *
   * If the drawer is currently open, this closes it. If the drawer is closed,
   * this attempts to open it using the currently stored component type and
   * configuration. If no component or config is available when opening is
   * requested, the operation is aborted and a warning is logged.
   *
   * Side effects:
   * - May call {@link open} or {@link close}, which mutate internal signals:
   *   `#isDrawerOpen`, `#componentToRender`, and `#config`.
   * - Logs a warning when attempting to open without a previously set component
   *   type and configuration.
   */
  toggle(): void {
    if (this.isOpen()) {
      this.close();
    } else {
      // Check for the required component type and config before opening
      const existingComponent = this.currentComponent();
      const existingConfig = this.getConfig();

      if (existingComponent && existingConfig) {
        this.open(existingComponent, existingConfig);
      } else {
        // Handle case where toggle is called without an initial component ever being set
        console.warn('Cannot toggle drawer open without an initial component type and configuration.');
      }
    }
  }

  /**
   * Return the element that had focus immediately before the drawer opened.
   *
   * Read-only accessor that returns the stored `HTMLElement` (or `null` if
   * none was recorded). Intended for consumers that want to restore focus
   * after the drawer closes; calling this does not mutate internal state.
   */
  getElementBeforeDrawerOpened(): HTMLElement | null {
    return this.#elementBeforeDrawerOpened;
  }
}
