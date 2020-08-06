import Character from "./character.js";

export default class Player extends Character {
  constructor(name, hp, atk, spd, def) {
    super(name, hp, atk, spd);
    this.def = def;
  }

  damage(pts) {
    // TODO: create effect class that has an enum type to avoid comparing strings. -kc 8/6/2020
    if (this.effects.filter((ef) => ef.type === "impervious").length > 0)
      return;
    pts -= this.def;
    if (pts < 0) pts = 0;
    super.damage(pts);
  }
}
