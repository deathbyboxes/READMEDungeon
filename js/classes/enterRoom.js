import Rand from "../utils/rng.js";
import dec from "../utils/decimalPlace.js";
import generateEnemy from "./generateEnemy.js";
import generateChest from "./generateChest.js";

let currentRoom = null;

const roomItems = [
  {type: "enemy", weight:3},
  {type: "chest", weight:1},
]

const itemAmt = [
  {amt: 0, weight:1},
  {amt: 1, weight:3},
  {amt: 2, weight:6},
  {amt: 3, weight:2},
  {amt: 4, weight:1},
]

export default function enterNewRoom(iDir = null) {
  let oldRoom;
  if (!currentRoom) {
    currentRoom = new CurrentRoom();
  } else {
    oldRoom = currentRoom;
    currentRoom = new CurrentRoom(currentRoom._connectedRooms[iDir]);
    oldRoom.destroy();
  }
  return currentRoom;
}

// TODO: remove this before prod push. this is only for dev env
window.enterNewRoom = enterNewRoom;

class Room {
  constructor(direction = "") {
    this._id = dec(Rand.random(), 8);
    this.direction = direction;
    this.contentTypes = generateContents();
  }
}

class CurrentRoom {
  constructor(room) {
    if (!room) room = new Room();

    this._room = room;
    this._connectedRooms = generatePaths();
    this._contents = initContents(this._room.contentTypes);
  }

  destroy() {
    console.log(`Destroying old room: ${this._id}`);
  }
}

function initContents(contents) {
  let items = [];
  for (let item of contents) {
    if (item.type === 'enemy'){
      items.push(generateEnemy())
    } else if (item.type === 'chest') {
      items.push(generateChest());
    }
  }
  return items;
}

function generateContents() {
  const contentLen = Rand.weightedRandom(itemAmt).amt;
  let contents = [];
  for (let i = 0; i < contentLen; i++) {
    contents.push({
      type: Rand.weightedRandom(roomItems).type,
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
