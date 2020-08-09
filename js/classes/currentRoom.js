import Rand from "../utils/rng.js";
import Enemy from "./enemy.js";
import Item from "./item.js";

const contentTypes = {
  enemy: 0,
  chest: 1,
  potion: 2,
  weapon: 3,
  armor: 4,
};

class Room {
  constructor(direction = "") {
    this.direction = direction;
    this.contentTypes = generateContents();
  }
}

export class CurrentRoom {
  constructor(room, player) {
    if (!room) room = new Room();

    this._room = room;
    this._connectedRooms = generatePaths();
    this._player = player;
    this._contents = initContents(this._room.contentTypes);
  }
}

function generateContents() {
  const contentLen = Rand.random(4);
  const types = Object.keys(contentTypes);
  let contents = [];
  for (let i = 0; i < contentLen; i++) {
    contents.push({
      type: contentTypes[types[Rand.random(types.length - 1)]],
      isFound: false,
    });
  }
  return contents;
}

function generatePaths() {
  const dirs = generateDirections();
  return dirs.map((dir) => new Room(dir));
}

function generateDirections() {
  const defHalls = ["left", "forward", "right"];
  const paths = Rand.random(3, 1);
  const rmv = Rand.random(2);

  if (paths === 1) return defHalls.splice(rmv, 1);
  else if (paths === 2) defHalls.splice(rmv, 1);
  return defHalls;
}
