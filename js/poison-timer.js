let poison = new Component('#poison', {
  data: {
    time: 0,
    damage: 5,
    isPaused: false
  },
  template: function(props) {
    return -props.damage;
  }
});


//render to DOM
poison.render();

console.log(poison.data.time);

let poisonTimer = setInterval(fog, 6000);

function fog() {
  const poisonRightHalf = document.querySelector('#poison-filler');
  const poisonLeftHalf = document.querySelector('#poison-spinner');
  const poisonMask = document.querySelector('#poison-mask');

  poison.data.time++;
  let angle = mapRange(poison.data.time, 0, 6, 0, 360);
  poisonLeftHalf.style.transform = `rotate(${angle}deg)`;
  if (poison.data.time % 6 >= 3) {
    poisonMask.style.opacity = 0;
    poisonRightHalf.style.opacity = 1;
  } else {
    poisonMask.style.opacity = 1;
    poisonRightHalf.style.opacity = 0;
  }

  poison.render();
}