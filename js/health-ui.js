//create a health meter as a component
let HealthUI = new Component('#health', {
  data: {
    hp: player.hp
  },
  template: function() {
    return '';
  }
});