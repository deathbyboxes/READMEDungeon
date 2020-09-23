// keith's test file

// * below tests out the equipping and unequipping of weapons and armor
// * just uncomment and run locally. view information in the console logs

// import Player from "./js/classes/player.js";
// import {enterNewRoom} from "./js/classes/enterRoom.js";
// import { itemTypes, generateItem } from "./js/classes/generateItem.js";
// import { effectTypes } from "./js/classes/generateEffect.js";
// import generateEnemy from "./js/classes/generateEnemy.js";

// new Player("Keith", {hp: 100, atk: 3, spd: 2, def: 0});
// window.dagger = generateItem({ type: itemTypes.weapon, items: [
//   {
//     name: "Basic Sword",
//     hands: 1,
//     weight: 5,
//     stats: {
//       atk: 5,
//       spd: 2,
//     },
//   },
// ] },);
// window.health = generateItem({ type: itemTypes.potion, items: [
//   {
//     name: "Minor Health Vial",
//     weight: 8,
//     effects: [
//       {
//         name: "Heal",
//         type: effectTypes.regenerate,
//         interval: 1000,
//         duration: 5000,
//         action: (subject) => {
//           subject.heal(2);
//         },
//       }
//     ],
//   },
// ] },);
// window.enemy = generateEnemy(true);

//EnterRoom(p);

// import FSM from "./js/utils/fsm.js";

// let fsm = new FSM({
//   init: 'locked',
//   transitions: [
//     { name: "unlock", from: 'locked', to: 'closed' },
//     { name: "open", from: 'closed', to: 'opened' },
//   ],
//   callbacks: {
//     onunlock: ({name, from, to, msg, num}) => {
//       console.log(`Changed state from:${from} to:${to}`)
//       console.log(msg, num)
//     }
//   }
// })

// console.log("Am I locked?",fsm.is('locked'))
// console.log("Am I opened?", fsm.is('opened'))
// console.log("Can I unlock?", fsm.can('unlock'))
// fsm.unlock({msg:"Unlocked", num: 25})
// console.log("Am I closed?", fsm.is('closed'))
// console.log("Can I unlock?", fsm.can('unlock'))

import "./js/components/action-button.js";
import "./js/components/info-panel.js";
import "./js/components/touch-icon.js";
import "./js/components/player-menu.js";
import "./js/components/health-bar.js";
import "./js/utils/ui.js";
import Player from "./js/classes/player.js";
import {enterNewRoom} from "./js/classes/enterRoom.js";

let p = Player("Sir Rad-Cool III", {hp: 100, atk: 5, spd: 80, def: 0});
enterNewRoom(p);