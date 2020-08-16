import Rand from "../utils/rng.js";
import dec from "../utils/decimalPlace.js";
import generateEnemy from "./generateEnemy.js";
import generateChest from "./generateChest.js";
import { generateEffect } from "./generateEffect.js";

export let currentRoom = null;

const roomItems = [
  { type: "enemy", weight: 3 },
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
  constructor(player, room) {
    if (!room) room = new Room();

    this._room = room;
    this._player = player;
    this._connectedRooms = generatePaths();
    this._contents = initContents(this._room.contentTypes);

    setTimeout(() => {
      this._poison = generateEffect(poison, this._player);
    }, 10000);
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
    if (i.type === "enemy") item = generateEnemy(unlockItem);
    else if (i.type === "chest") item = generateChest(unlockItem);

    item.isLocked = items.length === 0 ? false : true;
  }
  return items;
}

function unlockItem (curItem) {
  for(const item in this._contents) {
    if (item.isLocked) {
      item.isLocked = false;
      return;
    }
  }
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
