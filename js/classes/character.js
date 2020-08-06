export default class Character {
  constructor(name, hp, atk, spd) {
    this.name = name;
    this.hp = hp;
    this.atk = atk;
    this.spd = spd;

    this.effects = [];
  }

  damage(pts) {
    this.hp -= pts;
  }

  heal(pts) {
    this.hp += pts;
  }

  attack(char) {
    char.damage(this.atk);
  }
}
