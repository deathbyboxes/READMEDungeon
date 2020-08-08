import InfoSection from './info-section.js';

export default class TouchIcon extends HTMLElement {
  connectedCallback() {
    if (this.icon === 'user')
      this.classList.add('player');
    else
      this.setAttribute('locked',this.isLocked);
    
    this.render();
  }

  constructor() {
    super();

    //click listener
    this.addEventListener('click', e => {
      let footer = document.querySelector('#footer');
      //player icon clicked
      if (this.icon === 'user') {
        //display user action options
      //action icon clicked
      } else {
        //remove all active classes
        document.querySelector('.icon').classList.remove('active');
        //if icon is unlocked
        if (!this.isLocked)
          //add active to clicked action icon
          this.classList.add('active');
          //display the clicked icon's stats
          let content = `
            <div class="icon-name">${this.name}</div>
            <div class="e-hp">HP: ${this.hp}</div>
            <div class="e-atk">ATK: ${this.atk}</div>
            <div class="action-button">Attack</div>`
         
          let oldInfo = document.querySelector('info-section');
          footer.removeChild(oldInfo);
          let infoSection = new InfoSection();
          footer.appendChild(infoSection);
          infoSection.render(content);
          
      }
      console.log(this.name);
    });
  }

  render() {
    this.innerHTML = `
      <i class='fas fa-${this.icon}'></i>
    `
  }
}

// create element
customElements.define('touch-icon', TouchIcon);