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

    //set an open/close flag for the user menu
    this._isOpen = false;

    //click listener
    this.addEventListener('click', e => {
      //grab info section
      let infoSection = document.querySelector('#info-section');

      //player icon clicked
      if (this.icon === 'user') { //display user action options
        console.log(this._isOpen);
        //player menu element
        let playerMenu = document.querySelector('#player-menu');
        if (!this._isOpen) {
          //menu item count
          let menuIconCount = document.querySelectorAll('.menu-item').length;
          //adjust top of player menu
          //number of icons x 50px (40px height + 10px margin-bottom)
          playerMenu.style.top = `-${menuIconCount * 50}px`
        } else {
          //revert menu top to 0
          playerMenu.style.top = '0';
        }
        
        //change open flag
        this._isOpen = !this._isOpen;
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

  set setIcon(icon) {
    this.icon = icon;
  }

  set setClass(className) {
    this.classList.add(className);
  }
  render() {
    this.innerHTML = `
      <i class='fas fa-${this.icon}'></i>
    `
  }
}

// create element
customElements.define('touch-icon', TouchIcon);