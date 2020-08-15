import { potions } from "../data/potions.js";
import { armor } from "../data/armor.js";
import { weapons } from "../data/weapons.js";
import { itemTypes, generateItem } from "./generateItem.js"
import buildElement from "../utils/buildElement.js";
import Rand from "../utils/rng.js";

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
  constructor(contents) {
    this._name = "Chest";
    this._icon = "boxes";
    this._isLocked = false;
    this._contents = contents;
    this._elements = {};
    this._elements["createIcon"] = buildElement(
      "touch-icon",
      { class: "icon" },
      this.getInfo
    );
  }

  get getInfo() {
    return {
      name: this._name,
      contents: this._contents,
      icon: this._icon,
      isLocked: this._isLocked,
    };
  }
}

export default function generateChest() {
  const chestSize = Rand.weightedRandom(chestAmt).amt;
  let contents = [];
  for (let i = 0; i < chestSize; i++) {
    generateItem(Rand.weightedRandom(chestItems));
  }
  return new Chest(contents);
}
