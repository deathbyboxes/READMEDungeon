// A collection of globally accessible timers

const timers = {
  poison: function() {
    //poison elements
    const poisonRightHalf = document.querySelector('#poison-filler');
    const poisonLeftHalf = document.querySelector('#poison-spinner');
    const poisonMask = document.querySelector('#poison-mask');

    //health elements
    const healthRightHalf = document.querySelector('#health-filler');
    const healthLeftHalf = document.querySelector('#health-spinner');
    const healthMask = document.querySelector('#health-mask');

    //update poison time counter
    effects.poison.counter++;
    //if the player has health
    if (player.hp > 0) {
      //adjust poison visual
      let poisonAngle = mapRange(effects.poison.counter, 0, effects.poison.spd, 0, 360);
      poisonLeftHalf.style.transform = `rotate(${poisonAngle}deg)`;
    
      //checking for halfway point for poison visual
      if (effects.poison.counter % effects.poison.spd >= Math.ceil(effects.poison.spd / 2)) {
        //timeout function to smooth animation
        setTimeout(function(){
          //hide poison mask
          poisonMask.style.opacity = 0;
          //show poison right half
          poisonRightHalf.style.opacity = 1;
        }, 1000)
      } else {
        //timeout function to smooth animation
        setTimeout(function(){
          //show poison mask
          poisonMask.style.opacity = 1;
          //hide poison right half
          poisonRightHalf.style.opacity = 0;
        }, 1000);
      }

      /************************************************/
      /*DECREASING HEALTH IS HERE FOR ANIMATION TIMING*/
      /************************************************/
      //decrease player health every six seconds
      if (effects.poison.counter % effects.poison.spd === 0) {
        player.hp += effects.poison.dmg;
      }
      //adjust health visual
      let healthAngle = mapRange(player.hp, 100, 0, 0, 360);
      healthLeftHalf.style.transform = `rotate(-${healthAngle}deg)`;

      //checking for halfway point for health visual
      if (player.hp < 50) {
        //hide health left half
        healthMask.style.opacity = 1;
        //hide health right half
        healthRightHalf.style.opacity = 0;
      }
    //player has zero health
    } else { 
      //stop poison timer
      clearInterval(poisonTimer);
    }

    //re-render components
    PoisonUI.render();
    HealthUI.render();
  } //end of poison timer
}