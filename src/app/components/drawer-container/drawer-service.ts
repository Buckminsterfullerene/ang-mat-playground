import { Injectable, signal, Type, untracked } from '@angular/core';
import { DrawerConfig } from './drawer-container-interface';

@Injectable({
  providedIn: 'root', // Provided in root so it's a singleton across the app
})
export class DrawerService {
  // A signal to track the drawer's open state
  #isDrawerOpen = signal(false);
  #elementBeforeDrawerOpened: HTMLElement | null = null;
  // Expose a readable signal state
  readonly isOpen = this.#isDrawerOpen.asReadonly();

  // This signal holds the *type* of component we want to display
  #componentToRender = signal<Type<unknown> | null>(null);
  readonly currentComponent = this.#componentToRender.asReadonly();

  #config = signal<DrawerConfig | null>(null); // Signal to hold config

  open(componentType: Type<unknown>, config: DrawerConfig): void {
    // Enforce a required config object
    untracked(() => {
      this.#componentToRender.set(componentType);
      this.#config.set(config); // Set the configuration
    });

    this.#elementBeforeDrawerOpened = document.activeElement as HTMLElement | null;
    this.#isDrawerOpen.set(true);
  }

  // Method to close the drawer
  close(): void {
    this.#isDrawerOpen.set(false);
    this.#elementBeforeDrawerOpened = null;
    // Optional: clear config on close
    this.#config.set(null);
    this.#componentToRender.set(null);
  }
  getConfig(): DrawerConfig | null {
    return this.#config();
  }

  // Method to toggle the state
  toggle(): void {
    if (this.isOpen()) {
      this.close();
    } else {
      // FIX: Check for the required component type and config before opening
      const existingComponent = this.currentComponent();
      const existingConfig = this.getConfig();

      if (existingComponent && existingConfig) {
        this.open(existingComponent, existingConfig);
      } else {
        // Handle case where toggle is called without an initial component ever being set
        console.warn('Cannot toggle drawer open without an initial component type and configuration.');
      }
    }
  }

  getElementBeforeDrawerOpened(): HTMLElement | null {
    return this.#elementBeforeDrawerOpened;
  }
}
