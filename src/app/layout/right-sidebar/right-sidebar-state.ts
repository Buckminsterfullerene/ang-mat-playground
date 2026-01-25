import { inject, Injectable, signal, Type } from '@angular/core';
import { SidebarCollapseMode } from '../enums/sidebar-enum';
import { Breakpoint } from '../../services/breakpoint';

export interface RightSidebarConfig<D = any> {
  data?: D;
  collapseMode?: SidebarCollapseMode;
}

/**
 * Global store managing the visibility and behavioral modes of the right sidebar.
 * Acts as the single source of truth for sidebar state across the application.
 */
@Injectable({
  providedIn: 'root',
})
export class RightSidebarState {
  #breakpoint = inject(Breakpoint);

  readonly #EXPANDED_WIDTH_PX = 250;
  readonly #COLLAPSED_WIDTH_PX = 60;
  readonly #HIDDEN_WIDTH_PX = 0;

  // Controls if the sidebar container is rendered in the layout
  readonly isVisible = signal(false);

  /**
   * Reactive visibility state.
   * `true` indicates the sidebar is expanded; `false` indicates it is collapsed/hidden.
   */
  readonly isOpen = signal(false);
  readonly width = signal<number>(this.#HIDDEN_WIDTH_PX);

  /**
   * The visual behavior applied when the sidebar is in its closed state.
   * Defined by {@link SidebarCollapseMode}.
   */
  readonly collapseMode = signal<SidebarCollapseMode>(SidebarCollapseMode.Collapsed);

  /**
   * Internal signal storing the component type to be dynamically rendered within the sidebar.
   *
   * Holds the Angular component class that will be injected into the sidebar when opened.
   * Set to `null` when the sidebar is hidden or no component has been configured.
   *
   * @private
   */
  #componentToRender = signal<Type<unknown> | null>(null);

  /**
   * Readonly accessor for the currently rendered component type.
   *
   * Provides external access to he component type without allowing direct modification. Returns `null` if no component
   * has been set via {@link open}.
   *
   * @readonly
   */
  readonly currentComponent = this.#componentToRender.asReadonly();

  #config = signal<RightSidebarConfig | null>(null);

  /**
   * Makes the sidebar container visible in the layout.
   *
   * Renders the sidebar in the DOM without expanding it. The expansion state is controlled separately via {@link isOpen}.
   *
   * Side effects:
   * - Sets {@link isVisible} to `true`.
   */
  show(): void {
    this.isVisible.set(true);
  }

  /**
   * Completely hides the sidebar from the layout.
   *
   * Hides the sidebar from the DOM and clears all associated state including the rendered component and configuration.
   * This is a destructive operation that requires calling {@link open} to restore functionality.
   *
   * Side effects:
   * - Sets {@link isVisible} to `false`.
   * - Clears the rendered component
   * - Clears the stored configuration
   */
  hide(): void {
    this.isVisible.set(false);
    this.isOpen.set(false);
    this.width.set(this.#HIDDEN_WIDTH_PX);
    this.#componentToRender.set(null);
    this.#config.set(null);
  }

  /**
   * Opens the sidebar with a dynamically injected component and optional configuration.
   *
   * Sets the component to render, applies the provided configuration, and makes the sidebar visible and expanded.
   * If a collapse mode is specified in the configuration, it updates the sidebar's collapse behavior accordingly.
   *
   * @param componentType The Angular component type to render in the sidebar.
   * @param config Optional configuration object containing data and display settings.
   *                Defaults to an empty object if not provided.
   * Side effects:
   * - Sets the component to render
   * - Sets the configuration
   * - Updates collapse mode if specified
   * - Sets both {@link isVisible} and {@link isOpen} to `true`
   */
  open(componentType: Type<unknown>, config: RightSidebarConfig = {}): void {
    if (componentType) {
      this.#componentToRender.set(componentType);
      this.#config.set(config);

      if (config.collapseMode !== undefined) {
        this.collapseMode.set(config.collapseMode);
      }
      this.isVisible.set(true);
    }

    this.isOpen.set(true);
    this.width.set(this.#EXPANDED_WIDTH_PX);
  }

  /**
   * Closes the sidebar without removing the rendered component.
   *
   * Collapses the sidebar to its closed state while preserving the currently loaded component and configuration.
   * This allows the sidebar to be reopened with the same content via {@link toggle}.
   *
   * Side effects:
   * - Sets {@link isOpen} to `false`.
   * - Does not affect {@link isVisible} or clear component/configuration.
   */
  close(): void {
    this.isOpen.set(false);
    if (this.#breakpoint.isMobile()) {
      this.width.set(this.#HIDDEN_WIDTH_PX);
    } else {
      // Use collapseMode to determine width when closing
      const mode = this.collapseMode();
      this.width.set(
        mode === SidebarCollapseMode.Hidden
          ? this.#HIDDEN_WIDTH_PX
          : this.#COLLAPSED_WIDTH_PX
      );
    }
  }

  /**
   * Toggles the sidebar open state.
   *
   * If the sidebar is currently open, it will be closed. If it is closed, this attempts to open it using the currently
   * stored component type and configuration. If no component or configuration is available when opening is requested,
   * the operation is aborted and a warning is logged.
   *
   * Side effects:
   * - May call open or close, which mutate internal signals.
   * - Logs a warning when attempting to toggle open without a previously set component.
   */
  toggle(): void {
    this.isOpen.update(v => {
      const newState = !v;

      if (this.#breakpoint.isMobile()) {
        this.width.set(newState ? this.#EXPANDED_WIDTH_PX : this.#HIDDEN_WIDTH_PX);
      } else {
        // Use collapseMode to determine width when toggling
        const mode = this.collapseMode();
        const closedWidth = mode === SidebarCollapseMode.Hidden
          ? this.#HIDDEN_WIDTH_PX
          : this.#COLLAPSED_WIDTH_PX;
        this.width.set(newState ? this.#EXPANDED_WIDTH_PX : closedWidth);
      }
      return newState;
    });
  }

  /**
   * Configures how the sidebar should appear when {@link isOpen} is false.
   * @param mode The desired {@link SidebarCollapseMode}.
   */
  setCollapseMode(mode: SidebarCollapseMode): void {
    this.collapseMode.set(mode);
  }

  /**
   * Retrieves the current configuration object for the sidebar.
   *
   * @returns The current {@link RightSidebarConfig} if a component has been opened, or `null` if no configuration
   *          has been set.
   */
  getConfig(): RightSidebarConfig | null {
    return this.#config();
  }
}
