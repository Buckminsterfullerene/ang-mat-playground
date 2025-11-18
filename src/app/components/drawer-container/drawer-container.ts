import {
  Component,
  effect,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  Type,
  viewChild,
  ViewContainerRef,
  AfterViewInit, untracked, ComponentRef, Renderer2,
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
  isOpen = this.#drawerService.isOpen;
  getConfig = this.#drawerService.getConfig.bind(this.#drawerService);

  dynamicContentHost = viewChild('dynamicContentHost', { read: ViewContainerRef });
  // Use signal viewChild to get a reference to the main drawer DIV
  drawerContainerElement = viewChild<ElementRef<HTMLElement>>('drawerContainerElement');

  constructor() {
    effect((onCleanup) => {
      const isOpen = this.isOpen();
      // Track the element signal here so the effect knows when it appears in the DOM
      const drawerElementRef = this.drawerContainerElement();
      const config = this.#drawerService.getConfig(); // Get current config

      if (isOpen && config) {
        // Set dynamic width using Renderer2 since we are using @if
        if (config.width && drawerElementRef) {
          this.#renderer.setStyle(drawerElementRef.nativeElement, 'width', config.width);
        }

        // ACTION 1: Load the component immediately
        // Use 'untracked' here to prevent the componentType signal from causing the effect to rerun
        untracked(() => {
          this.#loadDynamicComponent(this.#drawerService.currentComponent(), config);
        });

        // ACTION 2 & CLEANUP SETUP: Start monitoring focus & prepare teardown
        if (drawerElementRef) {
          this.#focusMonitor.monitor(drawerElementRef.nativeElement);

          onCleanup(() => {
            this.dynamicContentHost()?.clear();
            this.#restoreFocus();
            this.#focusMonitor.stopMonitoring(drawerElementRef.nativeElement);

            // Clean up the width style on close
            if (config.width) {
              this.#renderer.removeStyle(drawerElementRef.nativeElement, 'width');
            }
          });
        }
      }
      // If isOpen is false, the previous 'onCleanup' is executed automatically.
    });
  }

  ngOnInit() {
    const initialComponentType = this.#drawerService.currentComponent();
    const config = this.#drawerService.getConfig();
    if (initialComponentType && config) {
      untracked(() => this.#loadDynamicComponent(initialComponentType, config));
    }
  }

  closeDrawer(): void {
    this.#drawerService.close();
  }

  #restoreFocus(): void {
    const elementToFocus = this.#drawerService.getElementBeforeDrawerOpened();
    if (elementToFocus) {
      // Use setTimeout to ensure focus happens after the DOM updates from closing
      setTimeout(() => elementToFocus.focus(), 0);
    }
  }

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
