// kevin's test file

import createPlayer from './js/classes/player.js';
import buildElement from './js/utils/buildElement.js';
import './js/components/touch-icon.js';
import {enterNewRoom} from './js/classes/enterRoom.js';
import './js/components/health-bar.js';

// KEVIN TO TEST ICON CLASS
//create a player
const p = createPlayer('Chad', {hp:100, atk:5, spd:1, def:0});
enterNewRoom(p);

document.querySelector('#player-info').appendChild(Player._elements['health-bar']);
