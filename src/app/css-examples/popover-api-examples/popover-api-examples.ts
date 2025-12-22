import { Component, signal, viewChild, ElementRef, effect, viewChildren } from '@angular/core';

@Component({
  selector: 'app-popover-api-examples',
  standalone: true,
  templateUrl: './popover-api-examples.html',
  styleUrl: './popover-api-examples.scss',
})
export class PopoverApiExamples {
  // Query native elements using Signal-based viewChild
  private readonly toastElements = viewChildren<ElementRef<HTMLElement>>('toastEl');
  private readonly confirmDialog = viewChild<ElementRef<HTMLDialogElement>>('confirmDialog');
  private readonly loginDialog = viewChild<ElementRef<HTMLDialogElement>>('loginDialog');
  private readonly tooltip = viewChild<ElementRef<HTMLElement>>('tooltip');

  // State Management with Signals
  private readonly toastMessages = ['Message One', 'Message Two', 'Message Three', 'Message Four', 'Message Five'];
  private toastIndex = 0;
  readonly activeToasts = signal<{ id: number; message: string }[]>([]);

  constructor() {
    /**
     * Effect to handle the native Popover API.
     * Whenever a new toast is added to the signal, we find it in the DOM
     * and call showPopover() so it appears on the top layer.
     * Use a microtask or a brief timeout to ensure the browser is ready
     * for the native .showPopover() command.
     */
    effect(() => {
      const elements = this.toastElements();

      // Use a microtask or a brief timeout to ensure the browser is ready
      // for the native .showPopover() command.
      setTimeout(() => {
        elements.forEach((ref) => {
          const el = ref.nativeElement;
          // showPopover() throws an error if called on an already open popover
          if (el && !el.matches(':popover-open')) {
            try {
              el.showPopover();
            } catch (err) {
              console.error('Popover failed to open:', err);
            }
          }
        });
      }, 0);
    });
  }

  /**
   * Confirmation Dialog Logic
   */
  openConfirm() {
    this.confirmDialog()?.nativeElement.showModal();
  }

  handleConfirmAction(confirmed: boolean) {
    this.confirmDialog()?.nativeElement.close();
    if (confirmed) {
      this.showToast('Item deleted successfully.');
    }
  }

  /**
   * FIX: Added the missing showToast method used by handleConfirmAction and handleLoginSubmit
   */
  showToast(message: string) {
    const id = Date.now();
    this.activeToasts.update(prev => [...prev, { id, message }]);

    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      this.activeToasts.update(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }

  triggerNextToast() {
    const message = this.toastMessages[this.toastIndex % this.toastMessages.length];
    this.showToast(message);
    this.toastIndex++;
  }

  /**
   * Login Form Logic
   */
  openLogin() {
    this.loginDialog()?.nativeElement.showModal();
  }

  // Called via (submit) or method="dialog" handling
  handleLoginSubmit() {
    this.showToast('Login successful.');
  }

  /**
   * Tooltip Logic (Manual Trigger for Hover)
   */
  toggleTooltip(show: boolean) {
    const el = this.tooltip()?.nativeElement;
    if (!el) return;
    show ? el.showPopover() : el.hidePopover();
  }
}
