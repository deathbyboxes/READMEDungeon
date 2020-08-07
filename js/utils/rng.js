/*
  ! This class replaces the Math.random() method. 
  ! Do not use Math.random() anywhere in the app, instead import this module
  ! and run one of these functions to produce a random number or decimal
*/
class Rand {
  constructor() {
    this._rng = null;
  }

  get rng() {
    return this._rng;
  }

  set rng(seed) {
    if (this._rng)
      console.error("Cannot change random seed after initialization");
    else
      this._rng = new Math.seedrandom(seed);
    return this._rng;
  }

  /*
    * returns a random number with a min/max (inclusive, inclusive)
    * omitting a min and max results in a random float between 0 and 1
    * @param max - largest number in the range (inclusive)
    * @param min - smallest number in the range (inclusive)
  */
  random = (max, min = 0) => {
    let num = this._rng();
    num = max ? Math.floor(num * (max + 1 - min)) + min : num
    return num;
  };
}

let rand = new Rand();

export default rand;