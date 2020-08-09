/*
 * Bootstrap js module
 * only place initialization functions and variables
 * within this script. utilize ES6 modules to import
 * and export dependency modules to any new scripts
 * you create.
 */
import Rand from "./utils/rng.js";

//importing test files
import '../keith.js';
import '../kevin.js';



// * giving rng a null value will create an near unpredictable seed.
// * when you've initialized a seed, you cannot 
Rand.rng = null
 
// * test out attacking features of player and enemy by uncommenting the lines below
// const p = new Player("Keith", {hp: 100, atk: 5, spd: 7, def: 0});
// const e = new Enemy("Skeleton Soldier", {hp: 20, atk: 3, spd: 3});
// e.startAttackTimer(p);

// setInterval(() => {
//   p.attack(e);
// }, 5000 - (p._stats.spd * 500));
