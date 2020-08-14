import Character from "./character.js";
import buildElement from "../utils/buildElement.js";

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

class Player extends Character {
  constructor(name, stats) {
    super(name, stats);
    this._armor = armorSlots;
    this._weapon = weaponSlots;
    this._inv = [];

    this._icon = 'user';

    //build an icon
    this._elements['createIcon'] = buildElement('touch-icon', {class: 'player'}, this.getInfo);
  }

  get getInfo() {
    return {
      icon: this._icon,
    };
  }

  damage(pts) {
    // TODO: create effect class that has an enum type to avoid comparing strings. -kc 8/6/2020
    if (this._effects.filter((ef) => ef.type === "impervious").length > 0)
      return;
    pts -= this._stats.def;
    if (pts < 0) pts = 0;
    super.damage(pts);
  }

  
  computeStats(item, isEquip) {
    let multi = isEquip ? 1 : -1;
    for (const stat of Object.keys(item.stats)) {
      if (this._stats[stat] !== undefined)
        this._stats[stat] += item.stats[stat] * multi;
    }
  }

  usePotion(item) {
    this._effects.push(...item.effects);
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
      console.log(`---Added ${items.map((item) => item.name)} to ${this._name}'s inventory!---`);
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
}

export default Player;
