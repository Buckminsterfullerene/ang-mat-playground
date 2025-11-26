import {
  Component,
  effect,
  ElementRef,
  inject,
  OnInit,
  Type,
  viewChild,
  ViewContainerRef,
  untracked, ComponentRef, Renderer2, signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CdkTrapFocus, FocusMonitor } from '@angular/cdk/a11y'; // Import CDK A11y
import { DrawerService } from './drawer-service';
import { DrawerConfig } from './drawer-container-interface';

@Component({
  selector: 'drawer-container',
  imports: [CommonModule, MatButtonModule, MatIconModule, CdkTrapFocus], // Add CdkTrapFocus to imports
  templateUrl: './drawer-container.html',
  styleUrls: ['./drawer-container.scss'],
})
export class DrawerContainer implements OnInit {
  #drawerService = inject(DrawerService);
  #focusMonitor = inject(FocusMonitor);
  #renderer = inject(Renderer2);
  serviceIsOpen = this.#drawerService.isOpen;

  isDomPresent = signal(false);  // Controls the @if condition (manages DOM presence timing)
  isCssOpen = signal(false);  // Controls the .open class
  getConfig = this.#drawerService.getConfig.bind(this.#drawerService);

  /*
   * ViewChild signal that yields the drawer's dynamic content host.
   *
   * Resolves to the `ViewContainerRef` attached to the template anchor named
   * `dynamicContentHost` once the component view is initialized. Call
   * `this.dynamicContentHost()` to obtain the container (it may be `null`
   * prior to initialization) and use it to `clear()` and `createComponent()`
   * when loading or replacing dynamic components inside the drawer.
   */
  dynamicContentHost = viewChild('dynamicContentHost', { read: ViewContainerRef });
  // A signal viewChild to get a reference to the main drawer DIV
  drawerContainerElement = viewChild<ElementRef<HTMLElement>>('drawerContainerElement');

  // A CSS transition time. Must match the transition duration in drawer-container.scss
  readonly #TRANSITION_DURATION_MS = 300;

  constructor() {
    // Primary effect that manages DOM presence and the CSS class timing
    effect((onCleanup) => {
      const isOpenValue = this.serviceIsOpen();

      if (isOpenValue) {
        // STEP 1 (Immediate): Insert element into DOM
        this.isDomPresent.set(true);

        // STEP 2 (Next cycle): Use setTimeout to allow the browser a tick to render
        // the element in its *initial* (closed) state before applying the 'open' class.
        setTimeout(() => {
          this.isCssOpen.set(true);
        }, 0); // 0ms delay uses the next available browser microtask

        onCleanup(() => {
          // CLOSING: Start the CSS transition by removing the 'open' class immediately
          this.isCssOpen.set(false);

          // Wait for the CSS transition to finish before removing element from DOM (isDomPresent)
          setTimeout(() => {
            this.isDomPresent.set(false);
          }, this.#TRANSITION_DURATION_MS);

          // Cleanup functions...
          this.dynamicContentHost()?.clear();
          this.#focusMonitor.stopMonitoring(this.drawerContainerElement()?.nativeElement!);
          const config = this.#drawerService.getConfig();
          if (config?.width) {
            this.#renderer.removeStyle(this.drawerContainerElement()?.nativeElement!, 'width');
          }
        });
      }
    });

    // Secondary effect to handle actions that require ViewChildren to be resolved
    effect((onCleanup) => {
      const drawerElementRef = this.drawerContainerElement();
      const host = this.dynamicContentHost();
      const isOpen = this.serviceIsOpen();

      if (drawerElementRef && host && isOpen) {
        untracked(() => {
          const config = this.#drawerService.getConfig();
          const finalWidth = config?.width || '300px';
          this.#renderer.setStyle(drawerElementRef.nativeElement, 'width', finalWidth);

          this.#loadDynamicComponent(this.#drawerService.currentComponent(), config);
          this.#focusMonitor.monitor(drawerElementRef.nativeElement);
        });
      }

      onCleanup(() => {
        if (!this.serviceIsOpen()) {
          this.#restoreFocus();
        }
      });
    });
  }

  ngOnInit() {
    const initialComponentType = this.#drawerService.currentComponent();
    const config = this.#drawerService.getConfig();
    if (initialComponentType && config) {
      untracked(() => this.#loadDynamicComponent(initialComponentType, config));
    }
  }

  /**
   * Close the drawer.
   *
   * Delegates to the injected DrawerService to initiate the drawer closing
   * sequence. The container's reactive effects handle the visual transition,
   * dynamic content cleanup and focus restoration after the service toggles
   * its `isOpen` state.
   */
  closeDrawer(): void {
    this.#drawerService.close();
  }

  /**
   * Restore focus to the element that had focus before the drawer opened.
   *
   * Retrieves the previously-focused element from the DrawerService and, if one
   * exists, focuses it on the next macrotask using `setTimeout` to ensure DOM
   * updates from the closing transition have completed. Intended to improve
   * keyboard and screen reader accessibility. No-op when no element was recorded.
   */
  #restoreFocus(): void {
    const elementToFocus = this.#drawerService.getElementBeforeDrawerOpened();
    if (elementToFocus) {
      // Use setTimeout to ensure focus happens after the DOM updates from closing
      setTimeout(() => elementToFocus.focus(), 0);
    }
  }

  /**
   * Load a dynamic component into the `dynamicContentHost` and apply configuration.
   *
   * Clears the host, creates the provided component type, and performs light
   * runtime wiring: for a component named `HeaderNavItems` it sets a `context`
   * input; if the created instance exposes a `data` property and the supplied
   * `config` contains `data` that is assigned to it. No-op when `componentType`,
   * the host, or `config` are missing.
   *
   * Side effects:
   * - Mutates the `ViewContainerRef` by clearing and creating a component.
   * - May set inputs on the created component instance.
   */
  #loadDynamicComponent(componentType: Type<unknown> | null, config: DrawerConfig | null): void {
    const host = this.dynamicContentHost();
    if (componentType && host && config) {
      host.clear();
      // Create the component instance
      const componentRef: ComponentRef<any> = host.createComponent(componentType);

      if (componentType.name === 'HeaderNavItems') {
        componentRef.setInput('context', { displayMode: 'column' });
      }

      // Pass data if available
      if (config.data && 'data' in componentRef.instance) {
        componentRef.instance.data = config.data;
      }
    }
  }
}
