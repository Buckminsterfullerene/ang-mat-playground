export interface DrawerContext {
  displayMode: 'row' | 'column';
  // Add other context options here if needed, like 'isMobile': boolean
}

/**
 * Configuration for opening a drawer.
 */
export interface DrawerConfig<D = any> {
  /** The title for the drawer header. */
  title: string;

  /** Whether the title should be visually hidden (screen readers only). Defaults to false. */
  hideTitle?: boolean;

  /** Whether to show the backdrop overlay. Defaults to true. */
  showOverlay?: boolean;

  /** Width of the drawer (e.g., '300px', '50%'). */
  width?: string;

  /** Data to pass to the dynamically created component. */
  data?: D;
}

