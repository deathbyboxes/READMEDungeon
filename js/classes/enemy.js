import Character from "./character.js";

export default class Enemy extends Character {
  // TODO: discuss differences enemy class has from generic character class -kc 8/6/2020
  constructor(name, stats) {
    super(name, stats);
    this._attackTimer = null;
  }

  startAttackTimer(p) {
    let self = this;
    this._attackTimer = setInterval(function () {
      self.attack(p);
    }, 5000 - this._stats.spd * 500);
  }

  stopAttackTimer() {
    clearInterval(this._attackTimer);
  }

  destroy() {
    this.stopAttackTimer();
    super.destroy();
  }
}
