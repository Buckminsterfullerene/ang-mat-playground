import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DrawerService } from '../components/drawer-container/drawer-service';
import { TempExample, TempExampleData } from './temp-example/temp-example';
import { DrawerConfig } from '../components/drawer-container/drawer-container-interface';

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
    const itemsList: string[] = ['Item 1', 'Item 2', 'Item 3', 'Angular v20 is great!'];
    const dataPayload: TempExampleData = { items: itemsList };
    const drawerConfig: DrawerConfig = {
      title: 'My List',
      showOverlay: false,
      width: '40%',
      glassEffect: true,
      disableClose: false,
      data: dataPayload,
    };
    // Call the service method to open/close the drawer globally
    this.#drawerService.open(TempExample, drawerConfig);
  }
}
