import buildElement from '../utils/buildElement.js';
import '../components/action-button.js';
import '../components/display-icon.js';
import '../components/info-section.js';
import {currentRoom} from '../classes/enterRoom.js';

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
        console.log('is open: ', this.isOpen());
        props['name'] = this.name;

        let text = !this.isOpen() ? 'open' : 'take all';
        
        props['actionButton'] = buildElement(
          'action-button',
          null,
          {text,
           id: this.id,
           type: this.type,
           isOpen: this.isOpen,
           open: this.open
          }
        )
      }
      console.log(props)
      document.querySelector('#footer').appendChild(buildElement(
        'info-section',
        null,
        props
      ))
      if (this.type === 'chest' && this.isOpen()) {
        //get the room
        let Room = currentRoom;
        //get the player
        let Player = Room._player;
        //get the enemy
        let Entity = null;
        for (let item of Room.getContents) {
          if (item._id === +this.id) {
            Entity = item;
          }
        }
        for (const item of Entity.getInfo.contents) {
          let div = document.createElement('div');
          div.appendChild(buildElement(
            'display-icon', //change to card element
            {class: 'item-icon'},
            {icon: item.icon}
          ))
          document.querySelector('#contents').append(div);
        }
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