import { currentRoom } from '../classes/enterRoom.js';

class ActionButton extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  constructor() {
    super();

    this.addEventListener('click', function(e) {
      console.log(e)
      let btnTxt = e.target.innerHTML.toLowerCase();
      switch (btnTxt) {
        case 'open':
          for (const item of this.contents) {
            let div = document.createElement('div');
            div.textContent = item.name;
            document.querySelector('#contents').append(div);
          }

        
          break;
        case 'attack':
          //get the room
          let Room = currentRoom;
          console.log(Room)
          //get the player
          let Player = Room._player;
          //get the enemy
          let Entity = null;
          for (let item of Room.getContents) {
            if (item._id === +this.id) {
              Entity = item;
            }
          }
          
          Entity.startAttackTimer();
          Player.startAttackTimer(Entity);
          Player.attack(Entity);
          break;
        default:
          console.log(`No action for ${btnTxt}`);
      }
    })
  }

  render() {
    this.innerHTML = this.text;
  }
}

customElements.define('action-button', ActionButton);