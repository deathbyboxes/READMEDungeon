import {UI} from '../utils/ui.js';

import buildElement from '../utils/buildElement.js';
import '../components/action-button.js';
import '../components/display-icon.js';
import '../components/info-section.js';

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
    let props = {
      type: this.type
    };
    
    // remove current active class
    document.querySelectorAll('.icon').forEach(el => {
      el.classList.remove('active');
    })
    
    // unlocked action
    if (!this.isLocked) {
      //add active to clicked action icon
      this.classList.add('active');

      if (this.type === 'enemy') {
        props['name'] = this.name;
        props['effects'] = [];
        Object.entries(this.onEffects).forEach((effect, ndx) => {
          props.effects.push(buildElement(
            'display-icon',
            {class: 'effect-icon'},
            {icon: effect[1].type}
          ))
        })
        props['healthBar'] = this.elements['health-bar']
        props['actionButton'] = buildElement(
          'action-button',
          null,
          {text: 'attack',
           id: +this.id,
           type: this.type}
        )
      } else { //chest
        props['name'] = this.name;
        props['actionButton'] = buildElement(
          'action-button',
          null,
          {text: 'open',
           id: +this.id,
           type: this.type}
        )
      }
      console.log(props)
      document.querySelector('#footer').appendChild(buildElement(
        'info-section',
        null,
        props
      ))
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