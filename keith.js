// keith's test file

// * below tests out the equipping and unequipping of weapons and armor
// * just uncomment and run locally. view information in the console logs

import Player from "./js/classes/player.js";
import EnterRoom from "./js/classes/enterRoom.js";

const p = new Player("Keith", {hp: 100, atk: 2, spd: 2, def: 0});
// const sword = new Item("Sword", "weapon", {atk: 10, spd: 3});
// const helmet = new Item("Helmet", "armor", {def: 5});

// e.startAttackTimer();
// setInterval(() => {
//   p.attack(e);
// }, 5000 - (p._stats.spd * 500));

EnterRoom(p);