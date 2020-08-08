import buildElement from "../utils/buildElement.js";

export default class InfoSection extends HTMLElement {
  connectedCallback() {
    //find the active touch icon
    this.render();
  }

  constructor() {
    super();
  }

  render() {
    this.innerHTML = `
      <div class="name">skeleton soldier</div>
      <div class="stats">
        <div>ATK: 3</div>
        <div>SPD: 3</div>
      </div>
      <div class="action">Attack</div>`
  }
}

customElements.define('info-section', InfoSection);