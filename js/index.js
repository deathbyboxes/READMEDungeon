const rng = new Math.seedrandom();

function giveMeDirection(times) {
  for (let i = 0; i < times; i++) {
    let str = "You can move ";
    let dirs = findHallways2();
    str += dirs.join(", ") + " from this room.";
    let i = str.lastIndexOf(", ");

    if (dirs.length > 1)
      str = str.slice(0, i) + str.slice(i).replace(", ", ", or ");

    console.log(str);
  }
}

`
you're given an array of directions: left, forward, right.
you're given a random number between 1, 3, inclusive.
take a random subset of directions equal to the random number
and print them out starting from left in clockwise order.
`

const findHallways2 = () => {
  const defHalls = ["left", "forward", "right"]
  let num = 1;
  if (rng() < 0.4) num++;
  if (rng() < 0.25) num++;
  let rand = Math.floor(rng() * 3)
  console.log(num)
  
  if (num === 3)
    return defHalls
  else if (num === 1)
    return defHalls.splice(rand, 1)
  else{
    defHalls.splice(rand, 1)
    return defHalls
  }
}

const findHallways = () => {
  const defHalls = [
    { i: 0, dir: "left" },
    { i: 1, dir: "forward" },
    { i: 2, dir: "right" },
  ];

  let halls = shuffle(defHalls);
  let num = 1;
  if (rng() < 0.4) num++;
  if (rng() < 0.25) num++;
  console.log(Math.floor(rng() * num))
  
  return halls
    .splice(0, num)
    .sort((a, b) => a.i - b.i)
    .map((h) => h.dir);
};

const shuffle = (array) => {
  let m = array.length,
    t,
    i;

  while (m) {
    i = Math.floor(rng() * m--);

    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};

giveMeDirection(1);
