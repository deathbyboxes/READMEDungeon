// import {UI} from '../utils/ui.js';

// import buildElement from '../utils/buildElement.js';
// import '../components/action-button.js';

class TouchIcon extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  constructor() {
    super();

    //click listener
    this.addEventListener('click', e => {
      if(!this.isPlayer){
        document.querySelectorAll('.icon').forEach(el => {
          el.classList.remove('active');
        })
        if (!this.fsm.is('locked')) {
          //add active to clicked action icon
          this.classList.add('active');
        } else {
          this.classList.remove('blink');
          void this.offsetWidth;
          this.classList.add('blink');
        }
      }
      this.action()
    });
  }

  // displayInfo() {
  //   //generated info
  //   let info = '';
    
  //   // remove current active class
  //   document.querySelectorAll('.icon').forEach(el => {
  //     el.classList.remove('active');
  //   })
    
  //   // unlocked action
  //   if (!this.isLocked) {
  //     //add active to clicked action icon
  //     this.classList.add('active');
  //     if (this.type === 'enemy') {
  //       //set the content
  //       info = `
  //         <div id="icon-name">
  //           ${this.name}
  //           ${/* health bar component goes here */''}
  //         </div>

  //         ${/* action button component goes here */''}
  //       `;

  //       UI.infoSection.innerHTML = info;
  //       UI.infoSection.appendChild(buildElement(
  //         'action-button',
  //         null,
  //         {text: 'attack',
  //          id: +this.id,
  //          type: this.type}
  //       ))

  //       document.querySelector('#icon-name').appendChild(this.elements['health-bar']);
  //     } else {
  //       info = `
  //         <div class="icon-name">${this.name}</div>
  //         <div id="contents"></div>

  //         ${/* action button component goes here */''}
  //       `;
          
  //       // UI.infoSection.innerHTML = info;
  //       // UI.infoSection.appendChild(buildElement(
  //       //   'action-button',
  //       //   null,
  //       //   {text: 'open',
  //       //    id: +this.id,
  //       //    type: this.type}
  //       // ))  
  //     }
  //   // locked action
  //   } else {
  //     // blink animation on icon
  //     this.classList.remove('blink');
  //     void this.offsetWidth;
  //     this.classList.add('blink');

  //     // set the content
  //     info = `
  //     <div class="locked-content">
  //       <div class="locked-title"><i class="fas fa-lock"></i></div>
  //       <div class="title">LOCKED</div>
  //       <div class="sub-title">Complete tasks to unlock</div>
  //     </div>`;
  //   }
  // }

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