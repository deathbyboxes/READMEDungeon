import Character from "./character.js";
import { enemies } from "../data/enemies.js";
import Rand from "../utils/rng.js";
import buildElement from "../utils/buildElement.js";
import dec from "../utils/decimalPlace.js";
import generateStats from "../utils/generateStats.js";
import mapRange from "../utils/valueMapper.js";
import Player from "./player.js";

class Enemy extends Character {
  // TODO: discuss differences enemy class has from generic character class -kc 8/6/2020
  constructor(name, stats) {
    super(name, stats);
    this._id = dec(Rand.random(), 8);
    this.attackTimer = null;

    this._icon = "skull";
    this._type = 'enemy';

    this._isLocked = false;

    //buildIcon()
    this._elements["createIcon"] = buildElement(
      "touch-icon",
      { class: "icon" },
      this.getInfo
    );

    document.querySelector('#icon-bar').appendChild(this._elements["createIcon"]);
  }

  startAttackTimer() {
    let self = this;
    let mappedVal = mapRange(this._stats.spd, 1, 100, 15000, 1000);
    this._attackTimer = setInterval(function () {
      self.attack(Player());
    }, mappedVal);
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
      isLocked: this._isLocked,
      type: this._type
    };
  }
}

export default function generateEnemy() {
  let enemy = Object.create(Rand.weightedRandom(enemies));
  let stats = generateStats(enemy.stats);
  return new Enemy(enemy.name, stats);
}
