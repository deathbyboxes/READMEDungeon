import Character from "./character.js";
import buildElement from "../utils/buildElement.js";
import mapRange from "../utils/valueMapper.js";
import Rand from "../utils/rng.js";
import { generateEffect } from "./generateEffect.js";
import { UI } from "../utils/ui.js";

const armorSlots = {
  head: null,
  neck: null,
  torso: null,
  back: null,
  ring: null,
};

const weaponSlots = {
  lHand: null,
  rHand: null,
};

const invLimit = 5;
let player = null;

export default function createPlayer(name, stats) {
  if (!player) {
    player = new Player(name, stats);
  }

  return player;
}

class Player extends Character {
  constructor(name, stats) {
    super(name, stats);
    this._armor = armorSlots;
    this._weapon = weaponSlots;
    this._inv = [];
    this._attackTimer = null;

    this._icon = 'user';
    this._type = 'player';

    //build an icon
    this._elements['createIcon'] = buildElement('touch-icon', 
                                                {class: 'player'}, 
                                                this.getInfo);
    // this._elements['playerMenu'] = buildElement('player-menu',
    //                                             {id: 'player-menu'},
    //                                             {isOpen: false});
    
  
    //attach icon to icon-bar
    UI.iconBar.appendChild(this._elements['createIcon']);
    //attach player menu to icon-bar
    UI.iconBar.appendChild(UI.playerMenu);
    
    //append menu items
    UI.playerMenu.appendChild(buildElement('touch-icon',
                                                          {class: 'menu-item'},
                                                          {icon: 'boxes',
                                                           type: 'inv'}));
    UI.playerMenu.appendChild(buildElement('touch-icon', 
                                                          {class: 'menu-item'}, 
                                                          {icon: 'arrows-alt',
                                                           type: 'move'}));

    this._elements['health-bar'] = buildElement(
      'health-bar',
      {class: 'health-bar'},
      {stats: this._stats,
       maxHp: this._baseStats.hp}
    );

    window.Player = this;
  }

  get getInfo() {
    return {
      icon: this._icon,
      type: this._type
    };
  }

  get getStats() {
    return {...this._stats};
  }

  startAttackTimer(enemy) {
    let self = this;
    let mappedVal = mapRange(this._stats.spd, 1, 100, 15000, 1000);
    this._attackTimer = setInterval(function () {
      self.attack(enemy);
    }, mappedVal);
  }

  stopAttackTimer() {
    clearInterval(this._attackTimer);
  }

  destroy() {
    this.stopAttackTimer();
    super.destroy();
  }
  
  damage(pts) {
    // TODO: create effect class that has an enum type to avoid comparing strings. -kc 8/6/2020
    if (this._effects.find((ef) => ef.type === "impervious")) pts = 0;
    super.damage(pts);
  }

  startAttackTimer(char) {
    let self = this;
    let mappedVal = mapRange(this._stats.spd, 1, 100, 15000, 1000);
    this._attackTimer = setInterval(function () {
      self.attack(char);
    }, mappedVal);
  }

  stopAttackTimer() {
    clearInterval(this._attackTimer);
  }

  attack(char) {
    for (const w in this._weapon) {
      if (this._weapon[w]?.effects.length > 0) {
        for (const ef of this._weapon[w]?.effects) {
          let chance = ef.chance || 1;
          if (Rand.random() < chance && !char.effects.find(e => e.type)) {
            char.effects.push(generateEffect(ef, char));
          }
        }
      }
    }
    super.attack(char);
  }

  computeStats(item, isEquip) {
    let multi = isEquip ? 1 : -1;
    for (const stat of Object.keys(item.stats)) {
      if (this._stats[stat] !== undefined)
        this._stats[stat] += item.stats[stat] * multi;
    }
  }

  usePotion(item) {
    for (const ef of item.effects) {
      this._effects.push(generateEffect(ef, this));
    }
    this.removeFromInv(item);
  }

  equip(item, slot) {
    if (!this[`_${item.type}`][slot]) this[`_${item.type}`][slot] = item;
    this.computeStats(item, true);
    console.log(`***${this._name} equipped ${item.name}!***`);
    console.log("");
    this.removeFromInv(item);
  }

  unequip(item) {
    for (const [slot, val] of Object.entries(this[`_${item.type}`])) {
      if (val)
        if (val.id === item.id) {
          console.log(`***${this._name} unequipped ${item.name}!***`);
          console.log("");
          this[`_${item.type}`][slot] = null;
          this.computeStats(item, false);
          return item;
        }
    }
  }

  addToInv(items) {
    if (this._inv.length + items.length < invLimit) {
      console.log(
        `---Added ${items.map((item) => item.name)} to ${
          this._name
        }'s inventory!---`
      );
      console.log("");
      this._inv.push(...items);
    } else {
      console.error("Not enough room in your inventory.");
    }
  }

  removeFromInv(item) {
    for (let i = 0; i > this._inv.length; i++) {
      if (this._inv[i].id === item.id) return this._inv.splice(i, 1);
    }
  }

  displayHealth() {
    console.log('hi from display health:player')
  }
}
