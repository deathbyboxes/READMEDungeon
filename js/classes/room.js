// TODO: this is not a class yet but I plan to convert it to one. -kc 8/6/2020

export const enterNewRoom = (iDir = null) => {
  currentRoom = iDir !== null ? currentRoom.newRooms.rooms[iDir] : generateRoom();
  currentRoom.newRooms = generateNewPaths();
  console.log(
    `${currentRoom.roomDialog} ${currentRoom.newRooms.dialog} What will you do?`
  );
};

const generateNewPaths = () => {
  const dirs = generateDirections();
  const newRooms = {
    dialog: `You can move ${strFormatList(
      dirs,
      ", ",
      ", or "
    )} from this room.`,
    rooms: dirs.map((dir) => generateRoom(dir)),
  };
  return newRooms;
};

const generateRoom = (dir) => {
  const roomContent = ["nothing", "a Skeleton Soldier", "a chest"];
  const newContent = roomContent[Math.floor(rng() * 3)];
  let roomDialog = dir
    ? `You go ${dir} into a new room to find ${newContent}.`
    : `You enter into a new room to find ${newContent}.`;
    /*
    let roomDialog = `You ${dir ? `go ${dir}` : 'enter'} into a new room to find ${newContent}`;
    --kw
    */
  return {
    roomDialog: roomDialog,
    roomContents: newContent,
    hallways: [],
  };
};

const generateDirections = () => {
  const defHalls = ["left", "forward", "right"];
  let num = 1;
  if (rng() < 0.4) num++;
  if (rng() < 0.25) num++;
  let rand = Math.floor(rng() * 3);

  if (num === 3) return defHalls;
  else if (num === 1) return defHalls.splice(rand, 1);
  else {
    defHalls.splice(rand, 1);
    return defHalls;
  }

  /*
  if (num === 1) return defHalls.splice(rand, 1);
  else {
    if (num === 2) {
      defHalls.splice(rand, 1);
    }
    return defHalls;
  }
  --kw */
};

// KEVIN TO TEST ICON CLASS
const playerInfo = {
  type: 'player',
  hp: 100,
  iconImg: 'user'
}

const enemy1Info = {
  type: 'enemy',
  hp: 10,
  atk: 3,
  spd: 3,
  isLocked: false,
  iconImg: 'skull'
}

const enemy2Info = {
  type: 'enemy',
  hp: 10,
  atk: 3,
  spd: 3,
  isLocked: true,
  iconImg: 'skull'
}

const chest1Info = {
  type: 'chest',
  inv: ['potion'],
  isLocked: true,
  iconImg: 'boxes'
}

const chest2Info = {
  type: 'chest',
  inv: ['armor'],
  isLocked: true,
  iconImg: 'boxes'
}

let iconBar = document.querySelector('#icon-bar');

let player = new TouchIcon();
let enemy1 = new TouchIcon();
let chest1 = new TouchIcon();
let enemy2 = new TouchIcon();
let chest2 = new TouchIcon();

player.setState = playerInfo;
enemy1.setState = enemy1Info;
chest1.setState = chest1Info;
enemy2.setState = enemy2Info;
chest2.setState = chest2Info;

iconBar.appendChild(player);
iconBar.appendChild(enemy1);
iconBar.appendChild(chest1);
iconBar.appendChild(enemy2);
iconBar.appendChild(chest2);