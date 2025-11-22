import { Component, inject } from '@angular/core';
import { RightSidebarState } from '../layout/right-sidebar/right-sidebar-state';
import { SidebarCollapseMode } from '../layout/enums/sidebar-enum';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-example-child-sub-route',
  imports: [MatButtonModule],
  templateUrl: './example-child-sub-route.html',
  styleUrl: './example-child-sub-route.scss',
})
export class ExampleChildSubRoute {
// Inject the service provided by SubGridContainer
  private sidebarService = inject(RightSidebarState);
  repeatCount: number = 5;
  items: undefined[] = new Array(this.repeatCount);

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

  setModeHidden(): void {
    this.sidebarService.setCollapseMode(SidebarCollapseMode.Hidden);
  }

  setModeCollapsed(): void {
    this.sidebarService.setCollapseMode(SidebarCollapseMode.Collapsed);
  }
}
