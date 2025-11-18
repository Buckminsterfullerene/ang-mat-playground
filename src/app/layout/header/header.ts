import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DrawerService } from '../../components/drawer-container/drawer-service';
import { HeaderNavItems } from './header-nav-items/header-nav-items';

@Component({
  selector: 'app-header',
  imports: [ MatButtonModule, MatIconModule, HeaderNavItems ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  #drawerService = inject(DrawerService);

  toggleDrawer(): void {
    this.#drawerService.open(HeaderNavItems, { title: 'Navigation', hideTitle: true, showOverlay: true });
  }
}
