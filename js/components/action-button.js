import { currentRoom } from '../classes/enterRoom.js';

const colorCodes = {
  purple: '#C451FA',
  gold: '#E3B204'
}

class ActionButton extends HTMLElement {
  connectedCallback() {
    //styles
    this.style.backgroundColor = this.setBackgroundColor();
    this.render();
  }

  constructor() {
    super();

    this.addEventListener('click', function(e) {
      let btnTxt = e.target.innerHTML.toLowerCase();

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

      switch (btnTxt) {
        case 'open':
          for (const item of Entity.getInfo.contents) {
            let div = document.createElement('div');
            div.textContent = item.name;
            document.querySelector('#contents').append(div);
          }
          break;
        case 'attack':
          
          
          Entity.startAttackTimer();
          Player.startAttackTimer(Entity);
          Player.attack(Entity);
          break;
        default:
          console.log(`No action for ${btnTxt}`);
      }
    })
  }

  setBackgroundColor() {
    switch (this.type) {
      case 'enemy':
        return colorCodes.purple;
      case 'chest':
        return colorCodes.gold;
    }
  }

  render() {
    this.innerHTML = this.text;
  }
}

customElements.define('action-button', ActionButton);