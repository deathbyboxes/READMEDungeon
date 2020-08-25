import Rand from "../utils/rng.js";
import dec from "../utils/decimalPlace.js";
import generateEnemy from "./generateEnemy.js";
import generateChest from "./generateChest.js";

export let currentRoom = null;

const roomItems = [
  { type: "enemy", weight: 1 },
  { type: "chest", weight: 1 },
];

const itemAmt = [
  { amt: 0, weight: 1 },
  { amt: 1, weight: 3 },
  { amt: 2, weight: 6 },
  { amt: 3, weight: 2 },
  { amt: 4, weight: 1 },
];

const poison = {
  name: "Mysterious Gas",
  interval: 5000,
  type: "poison",
  // no duration
  action: (subject) => {
    subject.damage(2);
  },
};

export function enterNewRoom(player, iDir = null) {
  let oldRoom;
  if (!currentRoom) {
    currentRoom = new CurrentRoom(player);
  } else {
    oldRoom = currentRoom;
    currentRoom = new CurrentRoom(player, currentRoom._connectedRooms[iDir]);
    oldRoom.destroy();
  }
  return currentRoom;
}

class Room {
  constructor(direction = "") {
    this._id = dec(Rand.random(), 8);
    this.direction = direction;
    this.contentTypes = generateContents();
  }
}

class CurrentRoom {
  constructor(player, room) {
    if (!room) room = new Room();
    this._room = room;
    this._player = player;
    this._connectedRooms = generatePaths();
    this._contents = initContents.bind(this,this._room.contentTypes)();

    /* poison works, but not needed for testing phase */
    // setTimeout(() => {
    //   this._poison = generateEffect(poison, this._player);
    // }, 2000);
  }

  get getContents() {
    return this._contents;
  }

  destroy() {
    let i = this._player.effects.findIndex((ef) => ef.id === this._poison.id);
    if (i >= 0) {
      this._player.effects[i]?.destroy();
      this._player.effects.splice(i, 1);
      console.log(`Destroying old room: ${this._id}`);
    }
  }
}

function initContents(contents) {
  let items = [];
  let item = null;
  for (let i of contents) {
    if (i.type === "enemy") item = generateEnemy(unlockItem.bind(this));
    else if (i.type === "chest") item = generateChest(unlockItem.bind(this));
 
    if(items.length === 0) item.fsm.unlock();
    items.push(item);
  }
  return items;
}

function unlockItem (curItem) {
  for(const item of this._contents) {
    if (item.fsm.is('locked')) {
      item.fsm.unlock();
      return;
    }
  }
  enterNewRoom(this._player, 0)
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
