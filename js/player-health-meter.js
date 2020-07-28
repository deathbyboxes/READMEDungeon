//create a health meter as a component
let phm = new Component('#health', {
  data: {
    points: 100
  },
  template: function(props) {
    return props.points;
  }
});