/*
  ! This class replaces the Math.random() method. 
  ! Do not use Math.random() anywhere in the app, instead import this module
  ! and run one of these functions to produce a random number or decimal
*/
export static class Rand {
  constructor(seed) {
    this.rng = Math.randomseed(seed);
  }

  static random = (max, min) => {
    let num = rng();
    num = max ? Math.floor(num * max) : num;
    num = min ? num + min             : num;
    return num;
  }

  static randomDecimal = (n) => {
    return this.rng().toFixed(n);
  }

}