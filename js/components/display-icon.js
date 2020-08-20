class DisplayIcon extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  constructor() {
    super();


  }

  render() {
    this.innerHTML = `
      <svg style="margin:10px; fill:white;">
        <use xlink:href="#rmd-${this.icon}" />
      </svg>
    `
  }
}

customElements.define('display-icon', DisplayIcon);