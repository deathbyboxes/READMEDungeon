//create a health meter as a component
//requires access to player.js
let HealthUI = new Component('#health', {
  data: {
    hp: player.hp
  },
  template: function() {
    return '';
  }
});