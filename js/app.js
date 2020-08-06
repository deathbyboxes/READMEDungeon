/*
 * Bootstrap js module
 * only place initilization functions and variables
 * within this script. utilize ES6 modules to import
 * and export dependency modules to any new scripts
 * you create.
 */

import Player from './classes/player.js';
import Enemy from './classes/enemy.js';
import TouchIcon from './touch-icon.js';

// KEVIN TO TEST ICON CLASS
const Chad = new Player('Chad',100,5,5,0);
const Delilah = new Enemy('skelton soldier',10,3,3,false);
const Marco = new Enemy('skelton soldier',10,3,3,true);

let iconBar = document.querySelector('#icon-bar');

let player = new TouchIcon();
let enemy1 = new TouchIcon();
let enemy2 = new TouchIcon();

player.setState = Chad.getInfo;
enemy1.setState = Delilah.getInfo;
enemy2.setState = Marco.getInfo;

iconBar.appendChild(player);
iconBar.appendChild(enemy1);
iconBar.appendChild(enemy2);