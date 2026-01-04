import { Component, computed, input } from '@angular/core';

export interface TempExampleData {
  items: string[];
}

@Component({
  selector: 'app-temp-example',
  imports: [],
  templateUrl: './temp-example.html',
  styleUrl: './temp-example.scss',
})
export class TempExample {
  data = input<TempExampleData | undefined>();
  listData: string[] = this.createRandomStringArray(3, 15);
  // Use a computed signal to safely extract items
  // This avoids using data()!.items multiple times in the HTML
  items = computed(() => this.data()?.items ?? []);

  /**
   * Creates an array of strings with random values.
   *
   * @param length The desired length of the array.
   * @param stringLength The length of each random string (default is 10).
   * @returns An array of random strings.
   */
  createRandomStringArray(length: number, stringLength: number = 10): string[] {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () =>
      Array.from({ length: stringLength }, () =>
        characters.charAt(Math.floor(Math.random() * characters.length))
      ).join('')
    );
  }
}
