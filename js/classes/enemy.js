import Character from "./character.js";
import buildElement from "../utils/buildElement.js";

export default class Enemy extends Character {
  constructor(name, stats) {
    super(name, stats);
    this.attackTimer = null;

    this._icon = 'skull';

    this._isLocked = stats.isLocked;

    //buildIcon()
    this._elements['createIcon'] = buildElement('touch-icon', {class: 'icon'}, this.getInfo);
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

  get getInfo() {
    return {
      name: this._name,
      hp: this._stats.hp,
      atk: this._stats.atk,
      spd: this._stats.spd,
      icon: this._icon,
      isLocked: this._isLocked
    };
  }


}
