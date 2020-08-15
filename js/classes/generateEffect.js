class Effect {
  constructor(effect, subject) {
    this._name = effect.name;
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

  destroy() {
    // TODO: remove element from DOM
    if (this._timeout) clearTimeout(this._timeout);
  }
}

export default function generateEffect(effect, subject) {
  return new Effect(effect, subject);
} 
