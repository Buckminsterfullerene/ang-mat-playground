import { Component, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NavItem } from '../interfaces/nav-item-interface';

@Component({
  selector: 'app-left-sidebar',
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './left-sidebar.html',
  styleUrls: ['./left-sidebar.scss']
})
export class LeftSidebar {
  isSidebarOpen = signal(true);
  openSubMenuLabel = signal<string | null>(null);

  // Use the new output() function for signal-based outputs
  widthChange = output<number>();

  navItems: NavItem[] = [
    { label: 'Home', icon: 'home', link: '/' },
    { label: 'Dashboard', icon: 'dashboard', link: '/' },
    {
      label: 'CSS',
      icon: 'css',
      subItems: [
        { label: 'Carousel', icon: 'view_carousel', link: '/carousel', external: true },
        { label: 'CSS Grid', icon: 'auto_awesome_mosaic', link: '/css-grid' },
        { label: 'CSS Menu Button this is a very long label', icon: 'lightbulb', link: '/css-menu-button' },
        { label: 'Scroll Observer', icon: 'unfold_more_double', link: '/scroll-animations-observer' },
        { label: 'Sign in', icon: 'login', link: '/login' },
        { label: 'Nav Bar Glass Menu', icon: 'menu', link: '/nav-bar-glass-menu' },
        { label: 'Gradient Examples', icon: 'gradient', link: '/gradient-examples' },
        { label: 'Form Examples', icon: 'dynamic_form', link: '/form-examples' },
        { label: 'Video Examples', icon: 'video_camera_back', link: '/video-examples' },
        { label: 'Glass Examples', icon: 'glass_cup', link: '/glass-examples' },
        { label: 'Dialogs Examples', icon: 'dialogs', link: '/dialogs-examples' },
      ]
    },
    {
      label: 'Sub Grid Example',
      icon: 'grid_view',
      subItems: [
        { label: 'Child Route One', icon: 'filter_1', link: '/sub-grid/child-route-one' },
        { label: 'Chat', icon: 'chat', link: '/sub-grid/chat' },
      ]
    },
    {
      label: 'Todo-Lists',
      icon: 'list_alt',
      subItems: [
        { label: 'Work', icon: 'work', link: '/' },
        { label: 'Private', icon: 'lock', link: '/' },
        { label: 'Coding', icon: 'code', link: '/' },
        { label: 'Gardening', icon: 'grass', link: '/' },
        { label: 'School', icon: 'school', link: '/' },
      ]
    },
    { label: 'Calendar', icon: 'calendar_month', link: '/' },
    { label: 'Profile', icon: 'person', link: '/' }
  ];

  toggleSidebar(): void {
    this.isSidebarOpen.update(isOpen => {
      const newState = !isOpen;
      // Emit the new width using the output's .emit() method
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
      this.widthChange.emit(250); // Emit open width
    }
  }

  isSubMenuOpen(itemLabel: string): boolean {
    return this.openSubMenuLabel() === itemLabel;
  }
}
