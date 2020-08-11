import Character from "./character.js";
import { enemies } from "../data/enemies.js";
import Rand from "../utils/rng.js";
import buildElement from "../utils/buildElement.js";
import statGen from "../utils/statGen.js";
import mapRange from "../utils/valueMapper.js";
import Player from "../classes/player.js";

class Enemy extends Character {
  // TODO: discuss differences enemy class has from generic character class -kc 8/6/2020
  constructor(name, stats) {
    super(name, stats);
    this.attackTimer = null;

    this._icon = 'skull';

    this._isLocked = stats.isLocked;

    //buildIcon()
    this._elements['createIcon'] = buildElement('touch-icon', {class: 'icon'}, this.getInfo);
  }

  startAttackTimer() {
    let self = this;
    let mappedVal = mapRange(this._stats.spd, 1, 100, 15000, 1000);
    console.log(this._stats.spd, mappedVal)
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
      isLocked: this._isLocked
    };
  }
}

export default function generateEnemy () {
  let enemy = enemies[Rand.random(enemies.length - 1)]
  let stats = statGen(enemy.stats)

  return new Enemy(enemy.name, stats);
}


