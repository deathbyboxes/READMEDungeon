let PoisonUI = new Component('#poison', {
  data: {
    //timer
    time: effects.poison.counter,
    //damage to player
    damage: effects.poison.dmg,
    //pause flag
    isPaused: effects.poison.isPaused
  },
  template: function() {
    return '';
  }
});