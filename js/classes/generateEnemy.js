import Character from "./character.js";
import { enemies } from "../data/enemies.js";
import Rand from "../utils/rng.js";
import buildElement from "../utils/buildElement.js";
import dec from "../utils/decimalPlace.js";
import generateStats from "../utils/generateStats.js";
import mapRange from "../utils/valueMapper.js";
import Player from "./player.js";
import { UI } from "../utils/ui.js";

class Enemy extends Character {
  // TODO: discuss differences enemy class has from generic character class -kc 8/6/2020
  constructor(name, stats, unlock) {
    super(name, stats);
    this._id = dec(Rand.random(), 8);
    this.attackTimer = null;

    this._icon = "skull";
    this._type = 'enemy';

    this._isLocked = stats.isLocked;
    this._unlock = unlock;

    //buildIcon()
    this._elements['createIcon'] = buildElement(
      'touch-icon',
      { class: "icon" },
      this.getInfo
    );

    //create health bar
    this._elements['health-bar'] = buildElement(
      'health-bar',
      {class: 'health-bar'},
      {stats: this._stats,
       maxHp: this._baseStats.hp}
    )

    UI.iconBar.appendChild(this._elements['createIcon']);
  }

  get isLocked() {
    return this._isLocked;
  }

  set isLocked(b) {
    this._isLocked = b; 
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
    this._unlock(this);
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
      type: this._type,
      id: this._id
    };
  }
}

export default function generateEnemy(unlock) {
  let enemy = Object.create(Rand.weightedRandom(enemies));
  let stats = generateStats(enemy.stats);
  return new Enemy(enemy.name, stats, unlock);
}
