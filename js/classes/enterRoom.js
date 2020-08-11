import Rand from "../utils/rng.js";
import dec from "../utils/decimalPlace.js";
import { allObjs } from "../data/allObjs.js";

let currentRoom = null;

const contentTypes = {
  enemy: 0,
  chest: 1,
  potion: 2,
  weapon: 3,
  armor: 4,
};

export default function enterNewRoom (iDir = null) {
  let oldRoom
  if (!currentRoom) {
    currentRoom = new CurrentRoom();
  }
  else {
    oldRoom = currentRoom
    currentRoom = new CurrentRoom(currentRoom._connectedRooms[iDir]);
    oldRoom.destroy();
  }
  console.log(currentRoom._id)
  return currentRoom;
}

// TODO: remove this before prod push. this is only for dev env
window.enterNewRoom = enterNewRoom;

class Room {
  constructor(direction = "") {
    this.direction = direction;
    this.contentTypes = generateContents();
  }
}

class CurrentRoom {
  constructor(room) {
    if (!room) room = new Room();

    this._room = room;
    this._connectedRooms = generatePaths();
    this._id = dec(Rand.random(), 8);
    //this._contents = initContents(this._room.contentTypes);
  }

  destroy () {
    console.log(`Destroying old room: ${this._id}`)
  }
}

function generateContents() {
  const contentLen = Rand.random(4);
  let contents = [];
  for (let i = 0; i < contentLen; i++) {
    contents.push({
      type: Rand.weightedRandom(Rand.weightedRandom(allObjs).items),
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
