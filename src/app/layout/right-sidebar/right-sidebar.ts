import {
  Component,
  signal,
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
import { NavItem } from '../interfaces/nav-item-interface';
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

  /**
   * Tracks which top-level menu item's sub-navigation is currently visible.
   * @derived
   */
  openSubMenuLabel = signal<string | null>(null);

  /** Static configuration for sidebar navigation links. */
  navItems: NavItem[] = [
    { label: 'Settings', icon: 'settings', link: '/' },
    { label: 'Help', icon: 'help_center', link: '/' },
    {
      label: 'Admin',
      icon: 'admin_panel_settings',
      subItems: [
        { label: 'Users', icon: 'group', link: '/' },
        { label: 'Permissions', icon: 'verified_user', link: '/' },
        { label: 'Logs', icon: 'list_alt', link: '/' },
        { label: 'Security', icon: 'shield', link: '/' },
        { label: 'Inventory', icon: 'inventory_2', link: '/' },
        { label: 'Cloud Storage', icon: 'cloud_done', link: '/' },
        { label: 'Statistics', icon: 'bar_chart', link: '/' },
        { label: 'Support', icon: 'contact_support', link: '/' },
        { label: 'Shopping Cart', icon: 'shopping_cart', link: '/' },
        { label: 'Payments', icon: 'payments', link: '/' },
        { label: 'History', icon: 'history', link: '/' },
        { label: 'Email', icon: 'mail_outline', link: '/' },
        { label: 'Tasks', icon: 'task_alt', link: '/' },
        { label: 'Language', icon: 'language', link: '/' },
        { label: 'Dark Mode', icon: 'dark_mode', link: '/' },
        { label: 'Connected Devices', icon: 'devices', link: '/' },
        { label: 'Backup', icon: 'backup', link: '/' },
        { label: 'Flagged', icon: 'outlined_flag', link: '/' },
        { label: 'Feedback', icon: 'rate_review', link: '/' },
        { label: 'Verified', icon: 'verified_user', link: '/' },
        { label: 'Reminders', icon: 'alarm', link: '/' },
        { label: 'Public Profile', icon: 'public', link: '/' },
        { label: 'Extensions', icon: 'extension', link: '/' }
      ]
    },
    { label: 'Profile', icon: 'person', link: '/' }
  ];

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

      // Reset sub-menus when the sidebar closes for a cleaner UX
      if (!isOpen) {
        this.openSubMenuLabel.set(null);
      }
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

  /**
   * Toggle the submenu for a given nav item.
   *
   * If the provided item is already the open submenu, this closes it by clearing
   * `openSubMenuLabel`. Otherwise, it sets `openSubMenuLabel` to the item's label.
   * If the sidebar is currently closed, opening the submenu requests the parent
   * to open the sidebar by emitting `toggleSidebarEvent(true)`.
   *
   * Side effects:
   * - Mutates signal: `openSubMenuLabel`.
   * - Emits via: `toggleSidebarEvent.emit(true)` when opening a closed sidebar.
   */
  toggleSubMenu(item: NavItem): void {
    const currentLabel = this.openSubMenuLabel();
    if (currentLabel === item.label) {
      this.openSubMenuLabel.set(null);
    } else {
      this.openSubMenuLabel.set(item.label);
    }

    if (!this.isSidebarOpen()) {
      this.toggleSidebarEvent.emit(true);
    }
  }

  /**
   * Return whether the submenu for the given label is currently open.
   *
   * Read-only accessor that compares the stored `openSubMenuLabel` signal to the
   * provided `itemLabel`.
   */
  isSubMenuOpen(itemLabel: string): boolean {
    return this.openSubMenuLabel() === itemLabel;
  }
}
