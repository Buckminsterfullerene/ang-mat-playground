import { Component, signal, output, effect, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NavItem } from '../interfaces/nav-item-interface';
import { SidebarCollapseMode } from '../enums/sidebar-enum';

@Component({
  selector: 'app-right-sidebar',
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './right-sidebar.html',
  styleUrls: ['./right-sidebar.scss']
})
// Class name updated to RightSidebar (no "Component" suffix)
export class RightSidebar {
  isSidebarOpen = input.required<boolean>();
  collapseMode = input<SidebarCollapseMode>(SidebarCollapseMode.Collapsed);
  widthChange = output<number>();
  // Emit event when the internal toggle button is clicked (optional, but good practice)
  toggleSidebarEvent = output<boolean>();

  openSubMenuLabel = signal<string | null>(null);
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
      ]
    },
    { label: 'Profile', icon: 'person', link: '/' }
  ];

  // Effect to handle state changes when the input updates (e.g., from parent button click)
  // Ensures the width change event is emitted regardless of where the toggle originated
  constructor() {
    effect(() => {
      // Use the input signal to determine the width to emit
      const isOpen = this.isSidebarOpen();
      const mode = this.collapseMode();
      let width: number;

      if (isOpen) {
        width = 300; // Full width when open
      } else {
        // Use 0px if hidden, 60px if collapsed
        width = mode === SidebarCollapseMode.Hidden ? 0 : 60;
      }

      this.widthChange.emit(width);

      if (!isOpen) {
        this.openSubMenuLabel.set(null);
      }
    });
  }

  // Method called from the sidebar's internal button
  toggleSidebarInternal(): void {
    // Emit the opposite of the current state to the parent, who will manage the actual state
    this.toggleSidebarEvent.emit(!this.isSidebarOpen());
  }

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

  isSubMenuOpen(itemLabel: string): boolean {
    return this.openSubMenuLabel() === itemLabel;
  }
}
