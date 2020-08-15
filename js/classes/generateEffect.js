import Rand from "../utils/rng.js";
import dec from "../utils/decimalPlace.js";

export const effectTypes = {
  poison: 0,
  regenerate: 1,
  impervious: 2,
  invisible: 3,
  bleed: 4,
};

class Effect {
  constructor(effect, subject) {
    this._name = effect.name;
    this._id = dec(Rand.random(), 8);
    this._type = effectTypes[effect.type];
    this._interval = effect.interval;
    this._effect = function () {
      effect.action(subject);
    };
    this._timeout = effect.duration
      ? setTimeout(this.destroy, effect.duration)
      : null;
    if (effect.interval)
      this._interval = setInterval(this._effect, effect.interval);
    else {
      this._effect();
      this._interval = null;
    }
  }

  get id() {
    return this._id;
  }

  destroy() {
    // TODO: remove element from DOM
    if (this._timeout) clearTimeout(this._timeout);
    if (this._interval) clearInterval(this._interval);
  }
}

export default function generateEffect(effect, subject) {
  return new Effect(effect, subject);
}
