import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Drawer } from '../../components/drawer-container/drawer';
import { HeaderNavItems } from './header-nav-items/header-nav-items';

@Component({
  selector: 'app-header',
  imports: [ MatButtonModule, MatIconModule, HeaderNavItems ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  #drawerService = inject(Drawer);

  /**
   * Opens the right-hand drawer and loads the HeaderNavItems component into it.
   * Configures the drawer with a title ("Navigation"), hides the built-in title display,
   * and ensures the overlay is visible.
   */
  toggleDrawer(): void {
    this.#drawerService.open(HeaderNavItems, { title: 'Navigation', hideTitle: true, showOverlay: true });
  }
}
