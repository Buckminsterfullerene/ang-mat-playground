import { Component, signal, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NavItem } from '../interfaces/nav-item-interface';
import { LeftSidebarState } from './left-sidebar-state';
import { Breakpoint } from '../../services/breakpoint';
import { MatButtonModule } from '@angular/material/button';

/**
 * Navigation sidebar located on the left side of the application layout.
 * Manages its own expansion state and orchestrates sub-menu visibility.
 * Emits width updates to allow the parent layout to adjust CSS Grid/Flex dimensions.
 */
@Component({
  selector: 'app-left-sidebar',
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './left-sidebar.html',
  styleUrls: ['./left-sidebar.scss']
})
export class LeftSidebar {
  protected readonly leftSidebarState = inject(LeftSidebarState);
  protected readonly breakpoint = inject(Breakpoint);

  /**
   * Tracks the label of the currently expanded sub-navigation menu.
   * Only one sub-menu can be open at a time.
   */
  protected readonly openSubMenuLabel = signal<string | null>(null);

  navItems: NavItem[] = [
    { label: 'Home', icon: 'home', link: '/' },
    { label: 'Dashboard', icon: 'dashboard', link: '/' },
    {
      label: 'CSS',
      icon: 'css',
      subItems: [
        { label: 'Ang Mat Components', icon: 'css', link: '/ang-mat-components' },
        { label: 'Popover API', icon: 'toast', link: '/popover-api' },
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
        { label: '3D Slider', icon: 'autorenew', link: '/3d-slider' },
        { label: '3D Rotate', icon: '3d_rotation', link: '/3d-rotate' },
        { label: ':has() Examples', icon: 'css', link: '/pseudo-class-has' },
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

  /**
   * Toggle the left sidebar open state and emit the corresponding width.
   *
   * Flips the `this.state.isOpen` signal. When opening, emits the expanded width
   * (250). When closing, emits the compact width (60) and clears any open
   * submenu label so submenus collapse with the sidebar.
   *
   * Side effects:
   * - Mutates signals: `this.state.isOpen`, `openSubMenuLabel`.
   * - Emits via: `widthChange.emit(...)`.
   */
  toggleSidebar(): void {
    this.leftSidebarState.toggle();
    if (!this.leftSidebarState.isOpen()) {
      this.openSubMenuLabel.set(null);
    }
  }

  /**
   * Close the sidebar (used on mobile when clicking overlay or links).
   */
  closeSidebar(): void {
    if (this.breakpoint.isMobile()) {
      this.leftSidebarState.close();
      this.openSubMenuLabel.set(null);
    }
  }

  /**
   * Handle link clicks within the sidebar - close the sidebar on mobile.
   */
  onLinkClick(): void {
    this.closeSidebar();
  }

  /**
   * Toggle the submenu for a given nav item.
   *
   * If the provided item is already the open submenu, this closes it by clearing
   * `openSubMenuLabel`. Otherwise, it sets `openSubMenuLabel` to the item's label.
   * If the sidebar is currently closed, opening the submenu will also open the
   * sidebar and emit the expanded width.
   *
   * Side effects:
   * - Mutates signals: `openSubMenuLabel`, possibly `this.state.isOpen`.
   * - Emits via: `widthChange.emit(250)` when opening a closed sidebar.
   */
  toggleSubMenu(item: NavItem): void {
    this.openSubMenuLabel.update(current => current === item.label ? null : item.label);

    this.leftSidebarState.openExpanded();
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
