import { inject, Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Breakpoint {
  #breakpointObserver = inject(BreakpointObserver);

  // Signal that updates automatically on window resize
  readonly isMobile = toSignal(
    this.#breakpointObserver
      .observe([Breakpoints.Handset, '(max-width: 800px)'])
      .pipe(map(result => result.matches)),
    { initialValue: false }
  );
}
