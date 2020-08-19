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

    let needsPush = true;

    if (effect.interval) { 
      this._interval = setInterval(this._effect, effect.interval);
      if (needsPush) {
        subject.effects.push(this);
        needsPush = false;
      }
    } else {
      this._interval = null;
      this._effect();
      this.destroy();
    }

    if (effect.duration) {
      this._timeout = setTimeout(() => {
        let self = this;
        self.destroy();
      }, effect.duration);
      if (needsPush) subject.effects.push(this);
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
