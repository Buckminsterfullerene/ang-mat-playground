import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { LeftSidebar } from './left-sidebar/left-sidebar';
import { RightSidebar } from './right-sidebar/right-sidebar';
import { DrawerContainer } from '../components/drawer-container/drawer-container';

@Component({
  selector: 'app-layout',
  imports: [ Header, LeftSidebar, RightSidebar, RouterOutlet, DrawerContainer ],
  templateUrl: './layout.html',
  styleUrls: [ './layout.scss' ],
  host: {
    // Manage both left and right widths dynamically
    '[style.--left-sidebar-width.px]': 'leftSidebarWidth()',
    '[style.--right-sidebar-width.px]': 'rightSidebarWidth()'
  }
})
export class Layout {
  // Signals for both sidebar widths
  leftSidebarWidth = signal(250); // initial left width in pixels
  rightSidebarWidth = signal(250); // initial right width in pixels

  handleLeftSidebarWidthChange(width: number): void {
    this.leftSidebarWidth.set(width);
  }

  handleRightSidebarWidthChange(width: number): void {
    this.rightSidebarWidth.set(width);
  }
}
