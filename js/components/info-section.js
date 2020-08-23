class InfoSection extends HTMLElement {
  connectedCallback() {
    let x = document.querySelectorAll('info-section');
    //check for more than 1 info section, remove next to last, keep most recent
    if (x.length > 1) document.querySelector('#footer').removeChild(x[x.length - 2])
    this.render();
  }

  constructor() {
    super();
  }

  render() {
    //check to avoid undefined in empty info-section
    if (this.type === 'enemy') {
      this.innerHTML = `
        <div id="entity-name"> 
          ${this.name} 
        </div>
        <div id="e-statuses"></div>
      `;
      this.effects.forEach(ef => {
        document.querySelector('#entity-name').appendChild(ef);
      });
      document.querySelector('#entity-name').appendChild(this.healthBar);
      this.appendChild(this.actionButton);
    } else if (this.type === 'chest') {
      this.innerHTML = `
        <div id="entity-name">
          ${this.name}
        </div>
        <div id="contents"></div>
      `;
      this.appendChild(this.actionButton);
    }
    
    
  }

}

customElements.define('info-section', InfoSection);