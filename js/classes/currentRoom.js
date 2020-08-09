import Rand from "../utils/rng.js";
import Enemy from "./enemy.js";
import Item from "./item.js";

class Room {
  constructor(direction = "") {
    this._direction = direction;
    this._contents = generateContents();
  }
}

export class CurrentRoom {
  constructor(room, player) {
    if (!room) room = new Room();

    this._room = room;
    this._connectedRooms = generatePaths();
    this._player = player;
  }
}

function generateContents() {
  let contentLen = Rand.random(4);
  let contents = [];
  for (let i = 0; i < contentLen; i++) {
    let content = null;
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
