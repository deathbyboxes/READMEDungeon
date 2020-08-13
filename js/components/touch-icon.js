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
      //grab info section
      let infoSection = document.querySelector('#info-section');

      //player icon clicked
      if (this.icon === 'user') {
        //display user action options
      //action icon clicked
      } else {
        //remove all active classes
        document.querySelectorAll('.icon').forEach(el => {
          el.classList.remove('active');
        })
        //if icon is unlocked
        if (!this.isLocked) {
          //add active to clicked action icon
          this.classList.add('active');
          //display the clicked icon's stats
          let content = `
            <div class="icon-name">${this.name}</div>
            <div class="e-hp">
              <div>HP:</div>
              <div class="e-health-bar"></div>
            </div>
            <div class="e-atk">ATK: ${this.atk}</div>
            <div class="action-button">Attack</div>`;
         
          //render to info section
          infoSection.innerHTML = content;
        //if icon is locked
        } else {
          //remove blink
          this.classList.remove('blink');

          //reflow to trigger animation reset
          void this.offsetWidth;

          //apply blink class
          this.classList.add('blink');

          //display locked message
          let content = `
            <div class="locked-content">
              <div class="locked-title"><i class="fas fa-lock"></i></div>
              <div class="title">LOCKED</div>
              <div class="sub-title">Complete tasks to unlock</div>
            </div>`;

          //render to info section
          infoSection.innerHTML = content;
        }
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