import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DrawerService } from '../components/drawer-container/drawer-service';
import { TempExample } from './temp-example/temp-example';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  // Inject the service functionally
  #drawerService = inject(DrawerService);

  // Expose the signal state to the template for dynamic icon selection
  readonly isDrawerOpen = this.#drawerService.isOpen;

  openDrawer(): void {
    // Call the service method to open/close the drawer globally
    this.#drawerService.open(TempExample, { title: 'list', showOverlay: false, width: '40%' });
  }
}
