import Rand from "../utils/rng.js";
import dec from "../utils/decimalPlace.js";

const itemType = {
  POTION: 0,
  WEAPON: 1,
  ARMOR: 2,
};

export default class Item {
  constructor(name, type, stats, effects = []) {
    this._name = name;
    this._type = type;
    this._stats = stats;
    this._effects = effects;
    this._id = dec(Rand.random(), 8);
  }

  get name() {
    return this._name;
  }

  get type() {
    return this._type;
  }

  get stats() {
    return this._stats;
  }

  get effects() {
    return this._effects;
  }

  get id() {
    return this._id;
  }
}
