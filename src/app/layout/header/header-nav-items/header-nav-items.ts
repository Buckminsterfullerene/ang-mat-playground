import { Component, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { DrawerContext } from '../../../components/drawer-container/drawer-container-interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'header-nav-items',
  imports: [
    MatButton,
    CommonModule
  ],
  templateUrl: './header-nav-items.html',
  styleUrl: './header-nav-items.scss',
})
export class HeaderNavItems {
  context = input<DrawerContext>();

  get modeClass(): string {
    // Check if 'context' is a function (signal context)
    if (typeof this.context === 'function') {
      // If it is a function, call it to get the value
      return this.context()?.displayMode || 'default';
    }
    // Otherwise, treat it as a standard property access (static context)
    // We cast `this.context` to the expected DrawerContext type here
    return (this.context as DrawerContext)?.displayMode || 'default';
  }
}
