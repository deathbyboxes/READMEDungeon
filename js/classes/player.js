import Character from "./character.js";
import buildElement from "../utils/buildElement.js";

export default class Player extends Character {
  constructor(name, hp, atk, spd, icon, def) {
    super(name, hp, atk, spd, icon);
    this.def = def;

    this._icon = 'user';

    //build an icon
    this._createIcon = buildElement('touch-icon', {class: 'player'}, this.getInfo);
  }

  damage(pts) {
    // TODO: create effect class that has an enum type to avoid comparing strings. -kc 8/6/2020
    if (this.effects.filter((ef) => ef.type === "impervious").length > 0)
      return;
    pts -= this.def;
    if (pts < 0) pts = 0;
    super.damage(pts);
  }

  get getInfo() {
    return {
      icon: this._icon,
    };
  }
}
