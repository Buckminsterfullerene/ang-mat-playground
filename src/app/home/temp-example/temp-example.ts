import { Component } from '@angular/core';

@Component({
  selector: 'app-temp-example',
  imports: [],
  templateUrl: './temp-example.html',
  styleUrl: './temp-example.scss',
})
export class TempExample {
  listData: string[] = this.createRandomStringArray(3, 15);
  constructor() {

  }

  /**
   * Creates an array of strings with random values.
   *
   * @param length The desired length of the array.
   * @param stringLength The length of each random string (default is 10).
   * @returns An array of random strings.
   */
  createRandomStringArray(length: number, stringLength: number = 10): string[] {
    const result: string[] = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      let randomString = '';
      for (let j = 0; j < stringLength; j++) {
        randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      result.push(randomString);
    }

    return result;
  }
}
