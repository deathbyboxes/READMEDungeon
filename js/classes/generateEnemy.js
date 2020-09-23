import Character from "./character.js";
import { enemies } from "../data/enemies.js";
import Rand from "../utils/rng.js";
import {buildElement} from "../utils/webComponent.js";
import dec from "../utils/decimalPlace.js";
import generateStats from "../utils/generateStats.js";
import mapRange from "../utils/valueMapper.js";
import Player from "./player.js";
import { generateEffect } from "./generateEffect.js";
import { UI } from "../utils/ui.js";
import FSM from "../utils/fsm.js";

class Enemy extends Character {
  constructor(name, stats, onEffects, unlock) {
    super(name, stats);
    this._id = dec(Rand.random(), 8);
    this.attackTimer = null;

    this._icon = "enemy";
    this._type = 'enemy';

    this._isLocked = null;
    this._unlock = unlock;
    this._onEffects = onEffects;

    //create health bar
    this._elements.healthBar = buildElement(
      'health-bar',
      {class: 'health-bar'},
      {
        ...this._stats,
        maxHp: this._baseStats.hp
      }
    )

    this._elements.actionBtn = buildElement("action-button");

    this._elements.infoPanel = buildElement(
      'info-panel',
      null,
      {header: [this._name]}
    )

    //buildIcon()
    this._elements.createIcon = buildElement(
      'touch-icon',
      { class: "icon" },
      {icon: this._icon, action: () => this._elements.infoPanel.render()}
    );
    UI.iconBar.appendChild(this._elements.createIcon);

    this.fsm = new FSM({
      init: "locked",
      transitions: [
        { name: "unlock", from: "locked", to: "idling" },
        { name: "attack", from: "locked", to: "attacking" },
        { name: "idle", from: "attacking", to: "idling" },
        { name: "die", from: ["idling", "attacking"], to: "dead" },
      ],
      callbacks: {
        onunlock: () => {
          this.startAttackTimer();
          this._elements.infoPanel.isLocked = false;
          this._elements.actionBtn.text = "attack";
          this._elements.actionBtn.action = () => Player().startAttackTimer(this);
          this._elements.actionBtn.render();
          this._elements.healthBar.render();
          this._elements.infoPanel.header = [this._name, this._elements.healthBar]
          this._elements.infoPanel.footer = [this._elements.actionBtn];
        },
        ondie: () => {
          this._elements.infoPanel.body = `${this._name} has perished!`;
          this._elements.infoPanel.footer = null;
          this._elements.infoPanel.render();
          this.destroy()
          this._unlock();
        },
      },
    });

    this._elements.createIcon.fsm = this.fsm
  }

  get onEffects() {
    return this._onEffects;
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
    if  (!this._attackTimer)
      this._attackTimer = setInterval(function () {
        self.attack(Player());
      }, mappedVal);
  }

  stopAttackTimer() {
    clearInterval(this._attackTimer);
  }

  destroy() {
    if(this._onEffects?.onDestroy) {
      generateEffect(this._onEffects.onDestroy, Player())
    }
    this.stopAttackTimer();
    //this._unlock(this);
    super.destroy();
  }

  get getInfo() {
    return {
      name: this._name,
      hp: this._stats.hp,
      atk: this._stats.atk,
      spd: this._stats.spd,
      icon: this._icon,
      type: this._type,
      id: this._id,
      elements: this._elements,
      effects: this._effects,
      onEffects: this._onEffects
    };
  }
}

export default function generateEnemy(unlock) {
  let enemy = Object.create(Rand.weightedRandom(enemies));
  let stats = generateStats(enemy.stats);
  return new Enemy(enemy.name, stats, enemy.effects, unlock);
}
