import Character from "./character.js";
import buildElement from "../utils/buildElement.js";

export default class Enemy extends Character {
  // TODO: discuss differences enemy class has from generic character class -kc 8/6/2020
  constructor(name, hp, atk, spd, isLocked) {
    super(name, hp, atk, spd);

    this._icon = 'skull';

    this._isLocked = isLocked;

    //buildIcon()
    this._createIcon = buildElement('touch-icon', {class: 'icon'}, this.getInfo);
  }

  get getInfo() {
    return {
      name: this.name,
      hp: this.hp,
      atk: this.atk,
      spd: this.spd,
      icon: this._icon,
      isLocked: this._isLocked
    };
  }


}
