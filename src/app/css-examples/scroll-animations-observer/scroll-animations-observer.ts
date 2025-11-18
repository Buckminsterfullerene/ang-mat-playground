import { Component, OnInit, signal, viewChildren, ElementRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { httpResource } from '@angular/common/http';
import { TodoApiResponse } from './todos-interface';

@Component({
  selector: 'app-scroll-animations-observer',
  imports: [CommonModule, MatListModule], // Added necessary imports
  templateUrl: './scroll-animations-observer.html',
  styleUrl: './scroll-animations-observer.scss',
})
export class ScrollAnimationsObserver implements OnInit {
  todos = signal<string[]>([]);

  #observer!: IntersectionObserver;
  #nextStartId = signal(1);
  #itemsPerLoad = 10;
  #hasMoreItems = true;

  todoItems = viewChildren<ElementRef<HTMLLIElement>>('todoItem');

  #loadResource = httpResource(
    () => ({
      url: `http://localhost:3000/api/todos?start=${this.#nextStartId()}&limit=${this.#itemsPerLoad}`,
      method: 'GET'
    }),
    {
      parse: (data: any) => data as TodoApiResponse,
    }
  );

  // Expose the loading signal to the template via a public property
  readonly isLoading = this.#loadResource.isLoading;
  // Expose the error signal to the template via a public property
  readonly isError = this.#loadResource.error;

  constructor() {
    effect(() => {
      const currentItems = this.todoItems();
      const newlyAddedItems = currentItems.slice(this.todos().length - currentItems.length);

      newlyAddedItems.forEach(elRef => this.#observer.observe(elRef.nativeElement));
    });

    effect(() => {
      const value = this.#loadResource.value();
      if (value) {
        this.todos.update(currentTodos => [...currentTodos, ...value.items.map(item => item.content)]);
        this.#hasMoreItems = value.hasMore;
      }
    });
  }

  ngOnInit(): void {
    this.#observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');

          const currentDomItems = this.todoItems();
          const targetIndex = currentDomItems.findIndex(el => el.nativeElement === entry.target);

          // Accessing the private signal within the class
          if (targetIndex === currentDomItems.length - 1 && this.#hasMoreItems && !this.#loadResource.isLoading()) {
            console.log('Last element is visible. Triggering next API load...');
            this.#triggerNextLoad();
          }
        } else {
          entry.target.classList.remove('show');
        }
      });
    }, {});
  }

  #triggerNextLoad(): void {
    if (this.#hasMoreItems) {
      this.#nextStartId.update(id => id + this.#itemsPerLoad);
    }
  }
}
