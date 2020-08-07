export default class Character {
  constructor(name, stats) {
    this._name = name;
    this._stats = stats;

    this._effects = [];
    this._elements = {};
  }

  damage(pts) {
    this._stats.hp -= pts;
    if(this._stats.hp <= 0){
      this._stats.hp = 0;
      console.log(`${this._name} has perished.`)
      this.destroy();
      return;
    }
    console.log(`${this._name} has ${this._stats.hp} health left.`)
  }

  heal(pts) {
    this._stats.hp += pts;
  }

  attack(char) {
    console.log(`${this._name} attacks ${char._name} with ${this._stats.atk} damage.`)
    char.damage(this._stats.atk);
  }

  destroy() {

  }
}
