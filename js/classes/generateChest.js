import { potions } from "../data/potions.js";
import { armor } from "../data/armor.js";
import { weapons } from "../data/weapons.js";
import { itemTypes, generateItem } from "./generateItem.js"
import buildElement from "../utils/buildElement.js";
import dec from "../utils/decimalPlace.js";
import Rand from "../utils/rng.js";
import { UI } from "../utils/ui.js";

const chestItems = [
  { weight: 2, type: itemTypes.potion, items: potions },
  { weight: 1, type: itemTypes.armor, items: armor },
  { weight: 1, type: itemTypes.weapon, items: weapons },
];

const chestAmt = [
  { amt: 1, weight: 4 },
  { amt: 2, weight: 6 },
  { amt: 3, weight: 3 },
  { amt: 4, weight: 2 },
  { amt: 5, weight: 1 },
];

class Chest {
  constructor(contents, unlock) {
    this._name = "Chest";
    this._type = "chest"
    this._icon = "chest";
    this._id = dec(Rand.random(), 8);
    this._isLocked = null;
    this._unlock = unlock
    this._contents = contents;
    this._elements = {};
    this._elements["createIcon"] = buildElement(
      "touch-icon",
      { class: "icon" },
      this.getInfo
    );

    UI.iconBar.appendChild(this._elements["createIcon"]);
  }

  get getInfo() {
    return {
      name: this._name,
      contents: this._contents,
      icon: this._icon,
      type: this._type,
      id: this._id
    };
  }

  get isLocked() {
    return this._isLocked;
  }

  set isLocked(b) {
    this._isLocked = b; 
  }

  destroy () {
    this._unlock(this);
  }
}

export default function generateChest(unlock) {
  const chestSize = Rand.weightedRandom(chestAmt).amt;
  let contents = [];
  for (let i = 0; i < chestSize; i++) {
    contents.push(generateItem(Rand.weightedRandom(chestItems)));
  }
  return new Chest(contents, unlock);
}
