// kevin's test file

import Player from './js/classes/player.js';
import Enemy from './js/classes/enemy.js';
import './js/components/touch-icon.js';

// KEVIN TO TEST ICON CLASS
const Chad = new Player('Chad',{hp:100, atk:5, spd:5, def:0});
const Delilah = new Enemy('skeleton soldier',{hp:10, atk:3, spd:3, isLocked:false});
const Marco = new Enemy('skeleton soldier',{hp:10, atk:3, spd:3, isLocked:true});

let iconBar = document.querySelector('#icon-bar');
iconBar.appendChild(Chad._elements['createIcon']);
iconBar.appendChild(Delilah._elements['createIcon']);
iconBar.appendChild(Marco._elements['createIcon']);