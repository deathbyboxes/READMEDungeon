// kevin's test file

import createPlayer from './js/classes/player.js';
import buildElement from './js/utils/buildElement.js';
import './js/components/touch-icon.js';
import './js/components/health-bar.js';
import './js/components/player-menu.js';
import {enterNewRoom} from './js/classes/enterRoom.js';
import {UI} from './js/utils/ui.js';

// KEVIN TO TEST ICON CLASS
//create a player
const p = createPlayer('Chad', {hp:100, atk:5, spd:1, def:0});
enterNewRoom(p);

UI.playerInfo.appendChild(Player._elements['health-bar']);
