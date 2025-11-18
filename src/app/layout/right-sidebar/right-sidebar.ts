import { Component, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NavItem } from '../interfaces/nav-item-interface';
// Assuming the interface path is correct

@Component({
  selector: 'app-right-sidebar',
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './right-sidebar.html',
  styleUrls: ['./right-sidebar.scss']
})
// Class name updated to RightSidebar (no "Component" suffix)
export class RightSidebar {
  isSidebarOpen = signal(true);
  openSubMenuLabel = signal<string | null>(null);
  widthChange = output<number>();

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

  toggleSidebar(): void {
    this.isSidebarOpen.update(isOpen => {
      const newState = !isOpen;
      this.widthChange.emit(newState ? 250 : 60);
      return newState;
    });
    if (!this.isSidebarOpen()) {
      this.openSubMenuLabel.set(null);
    }
  }

  toggleSubMenu(item: NavItem): void {
    const currentLabel = this.openSubMenuLabel();
    if (currentLabel === item.label) {
      this.openSubMenuLabel.set(null);
    } else {
      this.openSubMenuLabel.set(item.label);
    }

    if (!this.isSidebarOpen()) {
      this.isSidebarOpen.set(true);
      this.widthChange.emit(250);
    }
  }

  isSubMenuOpen(itemLabel: string): boolean {
    return this.openSubMenuLabel() === itemLabel;
  }
}
