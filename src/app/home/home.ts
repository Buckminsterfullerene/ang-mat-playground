import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Drawer } from '../components/drawer-container/drawer';
import { TempExample, TempExampleData } from './temp-example/temp-example';
import { DrawerConfig } from '../components/drawer-container/drawer-container-interface';
import { RightSidebarState } from '../layout/right-sidebar/right-sidebar-state';
import { SidebarCollapseMode } from '../layout/enums/sidebar-enum';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  // Inject the service functionally
  #drawerService = inject(Drawer);
  #sidebarState = inject(RightSidebarState);
  #destroyRef = inject(DestroyRef);

  // Expose the signal state to the template for dynamic icon selection
  readonly isDrawerOpen = this.#drawerService.isOpen;
  readonly isSidebarOpen = this.#sidebarState.isOpen;

  ngOnInit() {
    this.#sidebarState.show();
    this.#sidebarState.setCollapseMode(SidebarCollapseMode.Hidden);
    // Modern Angular 21 cleanup pattern
    this.#destroyRef.onDestroy(() => {
      this.#sidebarState.hide();
    });
  }

  toggleSidebar(): void {
    if (!this.#sidebarState.currentComponent()) {
      const itemsList: string[] = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);
      const dataPayload: TempExampleData = { items: itemsList };
      this.#sidebarState.open(TempExample, {
        data: dataPayload,
        collapseMode: SidebarCollapseMode.Hidden,
      });
    } else {
      this.#sidebarState.toggle();
    }
  }

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
