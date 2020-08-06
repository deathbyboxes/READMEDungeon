import Character from "./character.js";

export default class Enemy extends Character {
  // TODO: discuss differences enemy class has from generic character class -kc 8/6/2020
  constructor(name, hp, atk, spd) {
    super(name, hp, atk, spd);
  }
}
