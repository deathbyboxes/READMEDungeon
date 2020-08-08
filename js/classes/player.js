import Character from "./character.js";
import buildElement from "../utils/buildElement.js";

const armorSlots = {
  head: null,
  neck: null,
  torso: null,
  back: null,
  ring: null
}

const weaponSlots = {
  lHand: null,
  rHand: null
}

class Player extends Character {
  constructor(name, stats) {
    super(name, stats);
    this._armor = armorSlots;
    this._weapon = weaponSlots;

    this._icon = 'user';

    //build an icon
    this._createIcon = buildElement('touch-icon', {class: 'player'}, this.getInfo);
  }

  

  damage(pts) {
    // TODO: create effect class that has an enum type to avoid comparing strings. -kc 8/6/2020
    if (this._effects.filter((ef) => ef.type === "impervious").length > 0)
      return;
    pts -= this._stats.def;
    if (pts < 0) pts = 0;
    super.damage(pts);
  }

  get getInfo() {
    return {
      icon: this._icon,
    };
  }
  
  computeStats(item, isEquip) {
    let multi = isEquip ? 1 : -1
    for(const stat of Object.keys(item.stats)) {
      if (this._stats[`${stat}`])
        this._stats[`${stat}`] += (item.stats[stat] * multi)
    }
  }

  equip(item, type, slot) {
    if(!this[`_${type}`][slot])
      this[`_${type}`][slot] = item
    computeStats(item, true)
  }

  unequip(type, slot) {
    let item = this[`_${type}`][slot]
    this[`_${type}`][slot] = null
    computeStats(item, false)
    return item;
  }

}

export default Player;