// kevin's test file

import createPlayer from './js/classes/player.js';
import buildElement from './js/utils/buildElement.js';
import './js/components/touch-icon.js';
import enterNewRoom from './js/classes/enterRoom.js';

// KEVIN TO TEST ICON CLASS
//create a player
const p = createPlayer('Chad', {hp:100, atk:5, spd:5, def:0});

//adding menu icons
let playerMenu = document.querySelector('#player-menu');
playerMenu.appendChild(buildElement('touch-icon', 
                                    {class: 'menu-item'}, 
                                    {icon: 'boxes',
                                     type: 'inv'}));
playerMenu.appendChild(buildElement('touch-icon', 
                                    {class: 'menu-item'}, 
                                    {icon: 'arrows-alt',
                                     type: 'move'}));



enterNewRoom();
