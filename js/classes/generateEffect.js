import Rand from "../utils/rng.js";
import dec from "../utils/decimalPlace.js";

export const effectTypes = {
  poison: "poison",
  regenerate: "regenerate",
  impervious: "impervious",
  invisible: "invisible",
  bleed: "bleed",
};

class Effect {
  constructor(effect, subject) {
    this._name = effect.name;
    this._id = dec(Rand.random(), 8);
    this._type = effectTypes[effect.type];
    this._effect = function () {
      effect.action(subject);
    };
    if (effect.interval)
      this._interval = setInterval(this._effect, effect.interval);
    else {
      this._interval = null;
      this._effect();
    }
    if (effect.duration) {
      subject.effects.push(this)
      setTimeout(() => {
        let self = this;
        self.destroy();
      }, effect.duration);
    }
    else {
      this._timeout = null;
      this.destroy();
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

export function generateEffect(effect, subject) {
  return new Effect(effect, subject);
}
