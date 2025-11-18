import { Component, signal, WritableSignal, OnInit, OnDestroy, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar-menu',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar-menu.html',
  styleUrl: './navbar-menu.scss',
})
export class NavbarMenu implements OnInit, OnDestroy {
  // Using JavaScript private fields and signals for state management
  isSidebarShown: WritableSignal<boolean> = signal(false);
  isMobile: WritableSignal<boolean> = signal(false);
  #mediaQuery!: MediaQueryList;
  #mobileBreakpoint = '(width < 700px)';

  constructor() {
  }

  ngOnInit(): void {
    // Initialize the media query listener
    this.#mediaQuery = window.matchMedia(this.#mobileBreakpoint);
    // Use an arrow function for correct 'this' binding
    this.#mediaQuery.addEventListener('change', this.#updateNavbar);
    // Initial check
    this.#updateNavbar(this.#mediaQuery);
  }

  ngOnDestroy(): void {
    // Clean up the listener when the component is destroyed
    this.#mediaQuery.removeEventListener('change', this.#updateNavbar);
  }

  #updateNavbar = (e: MediaQueryListEvent | MediaQueryList): void => {
    this.isMobile.set(e.matches);
  };

  // Public functions for event binding in the template
  openSidebar(): void {
    this.isSidebarShown.set(true);
  }

  closeSidebar(): void {
    this.isSidebarShown.set(false);
  }

  handleNavLinkClick(): void {
    // Conditionally close sidebar only if in mobile view
    if (this.isMobile()) {
      this.closeSidebar();
    }
  }
}
