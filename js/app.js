/*
 * Bootstrap js module
 * only place initilization functions and variables
 * within this script. utilize ES6 modules to import
 * and export dependency modules to any new scripts
 * you create.
 */

import Player from './classes/player.js';
import Enemy from './classes/enemy.js';
import './components/touch-icon.js';
import InfoSection from './components/info-section.js';

// KEVIN TO TEST ICON CLASS
const Chad = new Player('Chad',100,5,5,0);
const Delilah = new Enemy('skelton soldier',10,3,3,false);
const Marco = new Enemy('skelton soldier',10,3,3,true);

let iconBar = document.querySelector('#icon-bar');
iconBar.appendChild(Chad._createIcon);
iconBar.appendChild(Delilah._createIcon);
iconBar.appendChild(Marco._createIcon);

let footer = document.querySelector('#footer');
let infoSection = new InfoSection();
footer.appendChild(infoSection);