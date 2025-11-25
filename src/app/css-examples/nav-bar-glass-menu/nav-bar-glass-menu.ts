import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-nav-bar-glass-menu',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './nav-bar-glass-menu.html',
  styleUrl: './nav-bar-glass-menu.scss',
  host: {
    '[class.menu-active]': 'menuOpen()', // Binds the signal value directly to the class
  },
})
export class NavBarGlassMenu {
  // Use a signal to manage the menu open state
  menuOpen = signal(false);

  // Method to toggle the menu state
  toggleMenu(): void {
    this.menuOpen.update(isOpen => !isOpen);
  }
}
