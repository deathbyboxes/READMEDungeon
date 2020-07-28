//create a health meter as a component
let phm = new Component('#phm', {
  data: {
    points: 100
  },
  template: function(props) {
    return props.points;
  }
});

//render to DOM
phm.render();

//timer
let health = setInterval(dying, 1000);

function dying() {
  //html elements
  const rightHalf = document.querySelector('#filler');
  const leftHalf = document.querySelector('#spinner');
  const mask = document.querySelector('#mask');
  //when health hits 0, display a message
  if (phm.data.points > 0) {
    //take off one point per second
    phm.data.points--;
  } else {
    phm.data.points = "You have died!";
    //stop timer
    clearInterval(health);
    //just for me :)
    console.log('dead');
  }
  
  let angle = mapRange(phm.data.points, 100, 0, 0, 360);
  //set the rotate property of 'spinner'
  leftHalf.style.transform = `rotate(-${angle}deg)`;
  //rotate specific circle half
  if (phm.data.points < 50) {
    //hide the left half of the container
    mask.style.opacity = 1;
    //hide the right half of the circle
    rightHalf.style.opacity = 0;
  }
  phm.render(); //re-render every second
}

// linearly maps value from the range (a..b) to (c..d)
function mapRange (value, a, b, c, d) {
  // first map value from (a..b) to (0..1)
  value = (value - a) / (b - a);
  // then map it from (0..1) to (c..d) and return it
  return c + value * (d - c);
}