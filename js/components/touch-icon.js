import {UI} from '../utils/ui.js';

import buildElement from '../utils/buildElement.js';
import '../components/action-button.js';
import '../components/display-icon.js';

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
          this.elements.playerMenu.render();
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
            ${/* health bar component goes here */''}
          </div>

          ${/* action button component goes here */''}
        `;

        
        UI.infoSection.innerHTML = info;
        //display any effects the enemy can apply to player
        for (let ef in this.onEffects) {
          console.log(this.onEffects[ef].type)
          document.querySelector('#icon-name').appendChild(buildElement(
            'display-icon',
            {class: 'effect-icon'},
            {icon: this.onEffects[ef].type}
          ))
        }
          
        //create the action button for an enemy
        UI.infoSection.appendChild(buildElement(
          'action-button',
          null,
          {text: 'attack',
           id: +this.id,
           type: this.type}
        ))

        document.querySelector('#icon-name').appendChild(this.elements['health-bar']);
      } else { //chest
        info = `
          <div class="icon-name">${this.name}</div>
          <div id="contents"></div>

          ${/* action button component goes here */''}
        `;
          
        UI.infoSection.innerHTML = info;

        //create action button for a chest
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
      <svg style="margin:10px; width: 40px; height:40px; fill:white;">
        <use xlink:href="#rmd-${this.icon}" />
      </svg>
    `
  }
}

// create element
customElements.define('touch-icon', TouchIcon);