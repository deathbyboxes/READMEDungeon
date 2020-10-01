// An object of all the UI components for easy access over document.querySelector

import {buildElement} from "../utils/webComponent.js";

export const UI = {
  infoSection: document.querySelector('#info-section'),
  iconBar: document.querySelector('#icon-bar'),
  playerInfo: document.querySelector('#player-info'),
  playerMenu: buildElement(
    'player-menu',
    null,
    {isOpen: true} //because render flips the state
  )
}