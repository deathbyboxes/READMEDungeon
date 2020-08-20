import Rand from "../utils/rng.js";
import dec from "../utils/decimalPlace.js";

export const itemTypes = {
  potion: 'potion',
  weapon: 'weapon',
  armor: 'armor',
};

class Item {
  constructor(name, type, stats = {}, effects = [], icon) {
    this._name = name;
    this._type = type;
    this._stats = stats;
    this._effects = effects;
    this._id = dec(Rand.random(), 8);
    this._icon = '';

    switch (icon) {
      case 'head':
        this._icon = 'helmet';
        break;
      case 'torso':
        this._icon = 'breastplate';
        break;
      default:
        this._icon = icon;
    }

    console.log(name)
    console.log(icon)
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

  get icon() {
    return this._icon;
  }
}

export function generateItem (type) {
  const item = Object.create(Rand.weightedRandom(type.items));
  const stats = Object.create(item.stats || null);
  const effects = Object.create(item.effects || null);
  const icon = item.slot || type.type;
  return new Item(item.name, type.type, stats, effects, icon)
}
