import { Component } from '@angular/core';

@Component({
  selector: 'app-css-menu-button',
  imports: [],
  template: `
    <div id="css-menu-button">
      <button popovertarget="menu">Menu Button</button>
      <div id="menu" popover>
        <a href="#">Item</a>
        <a href="#">Longer Item</a>
        <a href="#">Very Long Item Name</a>
      </div>
    </div>
  `,
  styles: [`
    #css-menu-button {
      anchor-name: --menu-button;
      display: flex;
      align-items: start;
      justify-content: start;
      padding: 1em;
      min-height: 100vh;
      min-height: 100dvh;
      position: relative; /* Container for menu when position:absolute is used */
    }

  button {
    background-color: darkblue;
    padding: .7em 1.5em;
    border: none;
    border-radius: 5px;
    font: inherit;
    font-weight: 500;
    color: white;
    cursor: pointer;
  }

  #menu {
    width: max-content;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: .5em;
    background: white;
    margin: auto;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

  @supports (top: anchor(bottom)) {
    position: absolute;
    top: anchor(bottom);
    left: anchor(left);
    transform: unset;
    position-anchor: --menu-button;
    position-try-fallbacks: --below-right, --below-left;
  }

    &:popover-open {
      display: grid;
    }

    a {
      text-decoration: none;
      color: black;
      padding: .7em 1.5em;
      border-radius: .25em;
    }
  }

  @position-try --below-right {
  inset: unset;
  top: anchor(bottom);
    left: anchor(left);
  }
  @position-try --below-left {
  inset: unset;
  top: anchor(bottom);
    left: anchor(right);
  }
  `]
})
export class CssMenuButton {

}
