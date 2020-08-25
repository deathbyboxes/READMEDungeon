const colorCodes = {
  purple: '#C451FA',
  gold: '#E3B204'
}

class ActionButton extends HTMLElement {
  constructor() {
    super();

    this.styles = `
      width:80%;
      flex:1;
      padding:1rem;
      margin:1.5rem;
      box-sizing:border-box;
      background-color: transparent;
      border: 0;
      color: inherit;
      font-weight:700;
      letter-spacing:.2rem;
      font-size: 1.3rem;
      text-transform: uppercase
    `
    this.action = null 
    
    this.addEventListener('click', function(e) {
      this.action();
    })
  }

  connectedCallback() {
    //styles
    this.style.backgroundColor = colorCodes.gold
    //this.render();
  }


  render() {
    let html = `
      <button style="${this.styles}">${this.text}</button>
    `
    this.innerHTML = html;
  }
}

customElements.define('action-button', ActionButton);