import {UI} from '../utils/ui.js';

class PlayerMenu extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  constructor() {
    super();

    this.style.width = '40px';
    this.style.top = '0';
  }

  render() {
    if (!this.isOpen) {
      let menuIconCount = document.querySelectorAll('.menu-item').length;
      this.style.top = `-${menuIconCount * 50}px`;
    } else {
      this.style.top = '0';
    }

    //change open state
    this.isOpen = !this.isOpen;
  }
}

customElements.define('player-menu', PlayerMenu);