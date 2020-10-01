import { potions } from "../data/potions.js";
import { armor } from "../data/armor.js";
import { weapons } from "../data/weapons.js";
import { itemTypes, generateItem } from "./generateItem.js";
import {buildElement} from "../utils/webComponent.js";
import dec from "../utils/decimalPlace.js";
import Rand from "../utils/rng.js";
import { UI } from "../utils/ui.js";
import FSM from "../utils/fsm.js";

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
    this._type = "chest";
    this._icon = "chest";
    this._id = dec(Rand.random(), 8);
    this._unlock = unlock;
    this._contents = contents;
    this._elements = {};

    this._elements.infoPanel = buildElement("info-panel", null, {
      header: [this._name],
    });
    this._elements.actionBtn = buildElement("action-button");
    this._elements.createIcon = buildElement(
      "touch-icon",
      { class: "icon" },
      { icon: this._icon, action: () => this._elements.infoPanel.render() }
    );
    UI.iconBar.appendChild(this._elements.createIcon);

    this.fsm = new FSM({
      init: "locked",
      transitions: [
        { name: "unlock", from: "locked", to: "closed" },
        { name: "open", from: "closed", to: "opened" },
      ],
      callbacks: {
        onunlock: () => {
          this._elements.infoPanel.isLocked = false;
          this._elements.actionBtn.text = "open";
          this._elements.actionBtn.action = () => this.fsm.open();
          this._elements.actionBtn.render();
          this._elements.infoPanel.footer = [this._elements.actionBtn];
        },
        onopen: () => {
          let inv = document.createElement("div");
          for (const item of this._contents) {
            let el = document.createElement("div");
            el.innerHTML = `<div>${item.name}</div>`;
            inv.appendChild(el);
          }
          this._elements.infoPanel.body = [inv];
          this._elements.actionBtn.text = "Take All";
          this._elements.actionBtn.action = () => console.log("Take all the items!");
          this._elements.actionBtn.render();
          this._elements.infoPanel.footer = [this._elements.actionBtn];
          this._elements.infoPanel.render();
          this._unlock();
        },
      },
    });

    this._elements.createIcon.fsm = this.fsm;
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
