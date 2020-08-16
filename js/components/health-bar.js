import mapRange from '../utils/valueMapper.js';
import {UI} from '../utils/ui.js';

class HealthBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  constructor() {
    super();


  }

  render() {
    // console.log('hi from health bar')
    let maxWidth = UI.infoSection.getBoundingClientRect().width - 60;
    let elWidth = mapRange(this.stats.hp, this.maxHp, 0, maxWidth, 0);
    // this.setAttribute('width', `${elWidth}px`);
    this.style.width = `${elWidth}px`;
  }
}

customElements.define('health-bar', HealthBar);