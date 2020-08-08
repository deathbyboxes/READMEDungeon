import buildElement from "../utils/buildElement.js";

export default class InfoSection extends HTMLElement {
  connectedCallback() {
    //find the active touch icon
    this.render();
  }

  constructor() {
    super();
  }

  render(content) {
    if (content) this.innerHTML = content;
    else this.innerHTML = '';
      // `
      // <div class="name"></div>
      // <div class="e-health"></div>
      // <div class="stats">
      //   <div id="atk"></div>
      //   <div id="spd"></div>
      // </div>
      // <div class="action">Attack</div>`
  }
}

customElements.define('info-section', InfoSection);