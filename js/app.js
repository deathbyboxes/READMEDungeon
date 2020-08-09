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
