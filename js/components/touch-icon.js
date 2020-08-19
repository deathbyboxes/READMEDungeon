import {UI} from '../utils/ui.js';

import buildElement from '../utils/buildElement.js';
import '../components/action-button.js';

class TouchIcon extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  constructor() {
    super();

    //click listener
    this.addEventListener('click', e => {
      switch (this.type) {
        case 'player':
          UI.playerMenu.render();
          break;
        //TODO: create function that handles duplicate code for toolbox and skull
        case 'chest':
        case 'enemy':
          /*MIGHT NEED TO MAKE INFO SECTION A WEB COMPONENT THAT TAKES 'info' AS ARGUMENT*/
          this.displayInfo();
          break;
        case 'move': //move
          console.log('The move button was clicked');
          break;
        case 'inv':
          console.log('The inventory will show up. Make a good display in Figma before trying.');
          break;
        default:
          console.log(`no action for ${this.icon}`);
      }
    });
  }

  displayInfo() {
    //generated info
    let info = '';
    
    // remove current active class
    document.querySelectorAll('.icon').forEach(el => {
      el.classList.remove('active');
    })
    
    // unlocked action
    if (!this.isLocked) {
      //add active to clicked action icon
      this.classList.add('active');
      if (this.type === 'enemy') {
        //set the content
        info = `
          <div id="icon-name">
            ${this.name}
          </div>
          
          ${/* some stat display for [atk, def, spd] */''}
          <div>
            ATK: ${this.atk}
            SPD: ${this.spd}
            HP: ${this.hp}
          </div>

          <div id="effects">
          EFFECTS
          </div>

          ${/* action button component goes here */''}
        `;

        UI.infoSection.innerHTML = info;
        UI.infoSection.appendChild(buildElement(
          'action-button',
          null,
          {text: 'attack',
           id: +this.id,
           type: this.type}
        ))

        document.querySelector('#icon-name').appendChild(this.elements['health-bar']);
        //display effects if any
        document.querySelector('#effects').append(this.effects)
      } else {
        info = `
          <div class="icon-name">${this.name}</div>
          <div id="contents"></div>
        `;
          
        UI.infoSection.innerHTML = info;
        UI.infoSection.appendChild(buildElement(
          'action-button',
          null,
          {text: 'open',
           id: +this.id,
           type: this.type}
        ))  
      }
    // locked action
    } else {
      // blink animation on icon
      this.classList.remove('blink');
      void this.offsetWidth;
      this.classList.add('blink');

      // set the content
      info = `
      <div class="locked-content">
        <div class="locked-title"><i class="fas fa-lock"></i></div>
        <div class="title">LOCKED</div>
        <div class="sub-title">Complete tasks to unlock</div>
      </div>`;
    }
  }

  render() {
    this.innerHTML = `
      <svg style="margin: 10px; width:55px; height:55px; fill:white;">
        <use xlink:href="#rmd-${this.icon}" />
      </svg>
    `
  }
}

// create element
customElements.define('touch-icon', TouchIcon);