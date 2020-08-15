// kevin's test file

import Player from './js/classes/player.js';
import './js/components/touch-icon.js';
import TouchIcon from './js/components/touch-icon.js';
import enterNewRoom from './js/classes/enterRoom.js';

// KEVIN TO TEST ICON CLASS
const Chad = new Player('Chad',{hp:100, atk:5, spd:5, def:0});


let iconBar = document.querySelector('#icon-bar');
iconBar.appendChild(Chad._elements['createIcon']);

//adding menu icons
let playerMenu = document.querySelector('#player-menu');
let moveBtn = new TouchIcon();
moveBtn.setIcon = 'arrows-alt';
moveBtn.setClass = 'menu-item';
playerMenu.appendChild(moveBtn);

let invBtn = new TouchIcon();
invBtn.setIcon = 'boxes';
invBtn.setClass = 'menu-item';
playerMenu.appendChild(invBtn);

enterNewRoom();
