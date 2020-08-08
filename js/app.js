/*
 * Bootstrap js module
 * only place initialization functions and variables
 * within this script. utilize ES6 modules to import
 * and export dependency modules to any new scripts
 * you create.
 */

import Rand from "./utils/rng.js";
import Player from "./classes/player.js";
import Enemy from "./classes/enemy.js";
import Item from "./classes/item.js";

// * giving rng a null value will create an near unpredictable seed.
// * when you've initialized a seed, you cannot 
Rand.rng = null
 
// * below tests out the equipping and unequipping of weapons and armor
// * just uncomment and run locally. view information in the console logs
// const p = new Player("Keith", {hp: 100, atk: 2, spd: 2, def: 0});
// const e = new Enemy("Skeleton Soldier", {hp: 50, atk: 6, spd: 1});
// const sword = new Item("Sword", "weapon", {atk: 10, spd: 3});
// const helmet = new Item("Helmet", "armor", {def: 5});

// e.startAttackTimer(p);
// setInterval(() => {
//   p.attack(e);
// }, 5000 - (p._stats.spd * 500));

// setTimeout(() => {
//   p.addToInv([sword,helmet])
//   p.equip(sword, "rHand");
//   setTimeout(() => {
//     p.equip(helmet, "head");
//     p.unequip(sword);
//   },10000);
// }, 10000);