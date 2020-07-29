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
    PoisonUI.data.time++;
    //if the player has health
    if (HealthUI.data.hp > 0) {
      //adjust poison visual
      let poisonAngle = mapRange(PoisonUI.data.time, 0, 6, 0, 360);
      poisonLeftHalf.style.transform = `rotate(${poisonAngle}deg)`;
    
      //checking for halfway point for poison visual
      if (PoisonUI.data.time % 6 >= 3) {
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
      if (PoisonUI.data.time % 6 === 0) {
        HealthUI.data.hp -= PoisonUI.data.damage;
      }
      //adjust health visual
      let healthAngle = mapRange(HealthUI.data.hp, 100, 0, 0, 360);
      healthLeftHalf.style.transform = `rotate(-${healthAngle}deg)`;

      //checking for halfway point for health visual
      if (HealthUI.data.hp < 50) {
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