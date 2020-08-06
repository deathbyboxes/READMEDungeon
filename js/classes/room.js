// this is not a class yet but I plan to convert it to one.

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
